﻿using System;
using System.Collections.Generic;

namespace api_backend.Entities;

public partial class QuizQuestionMedia
{
    public int Id { get; set; }

    public int QuestionId { get; set; }

    public int MediaId { get; set; }

    public int OrderIndex { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Medium Media { get; set; } = null!;

    public virtual QuizQuestion Question { get; set; } = null!;
}
