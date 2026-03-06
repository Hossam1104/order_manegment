namespace OrderManagement.API;

public class AppConfiguration
{
    public int Id { get; set; }
    public string ServerName { get; set; } = ".";
    public string DatabaseName { get; set; } = "OrderManagementDB";
    public string DbUsername { get; set; } = "sa";
    public string DbPassword { get; set; } = string.Empty;
    public DateTime? UpdatedAt { get; set; }
    public bool SeedDataEnabled { get; set; } = false;
    public int SeedDataCount { get; set; } = 100;
    public string SeedDataCategory { get; set; } = "All";
}
