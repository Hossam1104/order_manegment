namespace OrderManagement.API;

public class ConfigurationDto
{
    public string ServerName { get; set; } = string.Empty;
    public string DatabaseName { get; set; } = string.Empty;
    public string DbUsername { get; set; } = string.Empty;
    public string DbPassword { get; set; } = "***";
    public DateTime? UpdatedAt { get; set; }
    public bool SeedDataEnabled { get; set; }
    public int SeedDataCount { get; set; }
    public string SeedDataCategory { get; set; } = "All";
}
