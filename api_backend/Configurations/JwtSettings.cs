﻿namespace api_backend.Configurations
{
    public class JwtSettings
    {
        public string Issuer { get; set; } = string.Empty;
        public string Audience { get; set; } = string.Empty;
        public string Key { get; set; } = string.Empty;
        public int ExpiresMinutes { get; set; } = 120;
        public int RefreshTokenDays { get; set; } = 30;
    }
}
    