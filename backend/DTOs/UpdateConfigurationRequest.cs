using System.ComponentModel.DataAnnotations;

namespace OrderManagement.API;

public class UpdateConfigurationRequest
{
    [Required]
    public string ServerName { get; set; } = string.Empty;

    [Required]
    public string DatabaseName { get; set; } = string.Empty;

    [Required]
    public string DbUsername { get; set; } = string.Empty;

    [Required]
    public string DbPassword { get; set; } = string.Empty;

    public bool SeedDataEnabled { get; set; }
    public int SeedDataCount { get; set; } = 100;
    public string SeedDataCategory { get; set; } = "All";
}
