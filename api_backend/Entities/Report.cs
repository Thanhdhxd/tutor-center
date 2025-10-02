﻿using System;
using System.Collections.Generic;

namespace api_backend.Entities;

public partial class Report
{
    public int ReportId { get; set; }

    public int ReporterId { get; set; }

    public string TargetType { get; set; } = null!;

    public int TargetId { get; set; }

    public string? Reason { get; set; }

    public string? Category { get; set; }

    public string Status { get; set; } = null!;

    public int? HandlerId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? HandledAt { get; set; }

    public string? Notes { get; set; }

    public virtual User? Handler { get; set; }

    public virtual User Reporter { get; set; } = null!;
}
