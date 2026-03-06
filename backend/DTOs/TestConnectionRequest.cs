using System.ComponentModel.DataAnnotations;

namespace OrderManagement.API;

public class TestConnectionRequest
{
    [Required]
    public string ServerName { get; set; } = string.Empty;

    [Required]
    public string DatabaseName { get; set; } = string.Empty;

    [Required]
    public string DbUsername { get; set; } = string.Empty;

    [Required]
    public string DbPassword { get; set; } = string.Empty;
}
