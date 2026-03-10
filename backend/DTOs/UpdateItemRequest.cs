using System.ComponentModel.DataAnnotations;

namespace OrderManagement.API;

public class UpdateItemRequest
{
    [Required]
    [MaxLength(50)]
    public string ItemCode { get; set; } = string.Empty;

    [Required]
    [MaxLength(200)]
    public string NameEN { get; set; } = string.Empty;

    [Required]
    [MaxLength(200)]
    public string NameAR { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Category { get; set; } = string.Empty;

    [Required]
    [Range(0, double.MaxValue, ErrorMessage = "Price must be >= 0")]
    public decimal Price { get; set; }

    [Required]
    [RegularExpression("^(0|15)$", ErrorMessage = "VatPercentage must be 0 or 15")]
    public decimal VatPercentage { get; set; }

    public string? ImagePath { get; set; }
}
