namespace OrderManagement.API;

public interface IItemService
{
    Task<(List<ItemDto> items, int totalCount)> GetItemsAsync(int page, int size, string? search);
    Task<ItemDto?> GetItemByIdAsync(Guid id);
    Task<bool> IsCodeUniqueAsync(string code, Guid? excludeId = null);
    Task<ItemDto> CreateItemAsync(CreateItemRequest request);
    Task<ItemDto?> UpdateItemAsync(Guid id, UpdateItemRequest request);
    Task<bool> DeleteItemAsync(Guid id);
    Task<string> UploadImageAsync(Guid id, IFormFile file);
    Task<BulkUploadResult> BulkCreateItemsAsync(Stream excelStream);
    byte[] GenerateBulkUploadTemplate();
}
