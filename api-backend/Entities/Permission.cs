﻿using System;
using System.Collections.Generic;

namespace api_backend.Entities;

public partial class Permission
{
    public int PermissionId { get; set; }

    public string Code { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();
}
