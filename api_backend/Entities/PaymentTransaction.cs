﻿using System;
using System.Collections.Generic;

namespace api_backend.Entities;

public partial class PaymentTransaction
{
    public int TransactionId { get; set; }

    public int ClassroomId { get; set; }

    public int StudentId { get; set; }

    public decimal Amount { get; set; }

    public string Method { get; set; } = null!;

    public string Status { get; set; } = null!;

    public string OrderCode { get; set; } = null!;

    public string? ProviderTxnId { get; set; }

    public string? MetaData { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? PaidAt { get; set; }

    public virtual Classroom Classroom { get; set; } = null!;

    public virtual ClassroomStudent ClassroomStudent { get; set; } = null!;

    public virtual User Student { get; set; } = null!;
}
