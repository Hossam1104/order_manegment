namespace OrderManagement.API;

public class Item
{
    public Guid Id { get; set; }
    public string ItemCode { get; set; } = string.Empty;
    public string NameEN { get; set; } = string.Empty;
    public string NameAR { get; set; } = string.Empty;
    public string? ImagePath { get; set; }
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal VatPercentage { get; set; }
    public decimal NetTotal { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool IsDeleted { get; set; }
}
