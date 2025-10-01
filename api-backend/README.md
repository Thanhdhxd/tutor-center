# Tutor Center API Backend

## C?u tr�c Entity Framework

D? �n n�y ???c t? ch?c theo m� h�nh clean architecture v?i vi?c t�ch bi?t c�c Fluent API configurations.

### Th? m?c c?u tr�c:
- **Entities/**: Ch?a t?t c? c�c entity classes ???c t?o t? ??ng t? database
- **DbContexts/**: Ch?a DbContext classes
- **Configurations/**: Ch?a c�c IEntityTypeConfiguration cho t?ng entity
- **Extensions/**: Ch?a extension methods h?u �ch

### C�ch s? d?ng:

#### 1. Entity Framework Setup
```csharp
// Program.cs
builder.Services.AddDbContext<TutorCenterDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
```

#### 2. T?o Configuration cho Entity m?i
Khi b?n c?n t?o configuration cho m?t entity m?i, h�y t?o file trong th? m?c `Configurations/`:

```csharp
// Configurations/YourEntityConfiguration.cs
using api_backend.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api_backend.Configurations
{
    public class YourEntityConfiguration : IEntityTypeConfiguration<YourEntity>
    {
        public void Configure(EntityTypeBuilder<YourEntity> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Name).HasMaxLength(100);
            // ... c�c c?u h�nh kh�c
        }
    }
}
```

#### 3. C?u h�nh t? ??ng
T?t c? c�c configuration s? ???c �p d?ng t? ??ng th�ng qua `ApplyConfigurationsFromAssembly()` trong `TutorCenterDbContext`.

### Scaffold Entity t? Database

?? c?p nh?t entities t? database:

```bash
dotnet ef dbcontext scaffold "Server=.;Database=TutorCenterDb;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=true" Microsoft.EntityFrameworkCore.SqlServer -o Entities -c TutorCenterDbContext -f --context-dir DbContexts
```

### C�c Configuration ?� ???c t?o (9 files):
- ? **UserConfiguration** - C?u h�nh cho b?ng Users
- ? **ClassroomConfiguration** - C?u h�nh cho b?ng Classrooms
- ? **RoleConfiguration** - C?u h�nh cho b?ng Roles (bao g?m many-to-many v?i Permissions)
- ? **PermissionConfiguration** - C?u h�nh cho b?ng Permissions
- ? **MediumConfiguration** - C?u h�nh cho b?ng Media
- ? **QuizConfiguration** - C?u h�nh cho b?ng Quizzes
- ? **LessonConfiguration** - C?u h�nh cho b?ng Lessons
- ? **ExerciseConfiguration** - C?u h�nh cho b?ng Exercises
- ? **PaymentTransactionConfiguration** - C?u h�nh cho b?ng PaymentTransactions

### Entities ch?a c� Configuration ri�ng:
C�c entity sau v?n ???c c?u h�nh trong `ConfigureRemainingEntities()` method c?a `TutorCenterDbContext`:

**AI-related entities:**
- Aiagent, Aiconversation, Aimessage, AimessageMedia

**Communication entities:**
- Announcement
- ClassroomChatMessage, ClassroomChatMessageMedia

**Student-related entities:**
- ClassroomStudent, JoinRequest

**Assignment entities:**
- ExerciseSubmission, Material

**Quiz sub-entities:**
- QuizAnswer, QuizAttempt, QuizOption, QuizQuestion, QuizSection
- QuizQuestionGroup, QuizQuestionGroupMedia, QuizQuestionMedia, QuizOptionMedia

**System entities:**
- Report

### H??ng d?n t?o Configuration m?i:

1. **T?o file m?i** trong th? m?c `Configurations/`
2. **Implement IEntityTypeConfiguration<T>**
3. **Di chuy?n c?u h�nh** t? `ConfigureRemainingEntities()` v�o file m?i
4. **Configuration s? t? ??ng ???c load** nh? `ApplyConfigurationsFromAssembly()`

V� d? t?o configuration cho Announcement:

```csharp
// Configurations/AnnouncementConfiguration.cs
public class AnnouncementConfiguration : IEntityTypeConfiguration<Announcement>
{
    public void Configure(EntityTypeBuilder<Announcement> builder)
    {
        builder.HasKey(e => e.AnnouncementId).HasName("PK__Announce__9DE445740D919A96");
        builder.Property(e => e.CreatedAt).HasPrecision(0).HasDefaultValueSql("(sysutcdatetime())");
        builder.Property(e => e.Title).HasMaxLength(200);
        
        builder.HasOne(d => d.Classroom).WithMany(p => p.Announcements)
            .HasForeignKey(d => d.ClassroomId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK__Announcem__Class__01142BA1");
            
        builder.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Announcements)
            .HasForeignKey(d => d.CreatedBy)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK__Announcem__Creat__02084FDA");
    }
}
```

### L?u �:
- Connection string ???c c?u h�nh trong `appsettings.json`
- S? d?ng `TutorCenterDbContext` tr?c ti?p ?? ??n gi?n h�a c?u tr�c
- S? d?ng `ApplyConfigurationsFromAssembly()` ?? t? ??ng load t?t c? configurations
- **File configuration tr?ng ?� ???c x�a** ?? gi? codebase s?ch s?
- Ch? t?o configuration file khi th?c s? c?n thi?t

### Build Status:
? Project builds successfully  
? All configurations are working properly  
? No empty configuration files  
? Simplified DbContext usage