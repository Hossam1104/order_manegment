using Microsoft.AspNetCore.Mvc;

namespace OrderManagement.API;

[ApiController]
[Route("api/items")]
public class ItemsController : ControllerBase
{
    private readonly IItemService _itemService;
    private readonly IFileStorageService _fileStorageService;

    public ItemsController(IItemService itemService, IFileStorageService fileStorageService)
    {
        _itemService = itemService;
        _fileStorageService = fileStorageService;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<object>>> GetItems(
        [FromQuery] int page = 1,
        [FromQuery] int size = 10,
        [FromQuery] string? search = null)
    {
        (List<ItemDto> items, int totalCount) = await _itemService.GetItemsAsync(page, size, search);

        object result = new { items, totalCount, page, size };
        return Ok(ApiResponse<object>.Ok(result));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<ItemDto>>> GetItem(Guid id)
    {
        ItemDto? item = await _itemService.GetItemByIdAsync(id);
        if (item == null)
        {
            return NotFound(ApiResponse<ItemDto>.Fail("Item not found."));
        }

        return Ok(ApiResponse<ItemDto>.Ok(item));
    }

    [HttpGet("check-code")]
    public async Task<ActionResult<ApiResponse<bool>>> CheckCode(
        [FromQuery] string code,
        [FromQuery] Guid? excludeId = null)
    {
        bool isUnique = await _itemService.IsCodeUniqueAsync(code, excludeId);
        return Ok(ApiResponse<bool>.Ok(isUnique));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<ItemDto>>> CreateItem([FromBody] CreateItemRequest request)
    {
        if (!ModelState.IsValid)
        {
            List<string> errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
            return BadRequest(ApiResponse<ItemDto>.Fail("Validation failed.", errors));
        }

        bool isUnique = await _itemService.IsCodeUniqueAsync(request.ItemCode);
        if (!isUnique)
        {
            return Conflict(ApiResponse<ItemDto>.Fail($"Item code '{request.ItemCode}' is already in use."));
        }

        try
        {
            ItemDto item = await _itemService.CreateItemAsync(request);
            return CreatedAtAction(nameof(GetItem), new { id = item.Id }, ApiResponse<ItemDto>.Ok(item, "Item created successfully."));
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ApiResponse<ItemDto>.Fail(ex.Message));
        }
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<ItemDto>>> UpdateItem(Guid id, [FromBody] UpdateItemRequest request)
    {
        if (!ModelState.IsValid)
        {
            List<string> errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
            return BadRequest(ApiResponse<ItemDto>.Fail("Validation failed.", errors));
        }

        bool isUnique = await _itemService.IsCodeUniqueAsync(request.ItemCode, id);
        if (!isUnique)
        {
            return Conflict(ApiResponse<ItemDto>.Fail($"Item code '{request.ItemCode}' is already in use."));
        }

        try
        {
            ItemDto? item = await _itemService.UpdateItemAsync(id, request);
            if (item == null)
            {
                return NotFound(ApiResponse<ItemDto>.Fail("Item not found."));
            }

            return Ok(ApiResponse<ItemDto>.Ok(item, "Item updated successfully."));
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ApiResponse<ItemDto>.Fail(ex.Message));
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> DeleteItem(Guid id)
    {
        bool deleted = await _itemService.DeleteItemAsync(id);
        if (!deleted)
        {
            return NotFound(ApiResponse<object>.Fail("Item not found."));
        }

        return NoContent();
    }

    [HttpPost("{id:guid}/image")]
    public async Task<ActionResult<ApiResponse<object>>> UploadImage(Guid id, [FromForm] IFormFile file)
    {
        try
        {
            string imagePath = await _itemService.UploadImageAsync(id, file);
            string filename = Path.GetFileName(imagePath);
            string imageUrl = $"/api/items/image/{filename}";

            return Ok(ApiResponse<object>.Ok(new { imagePath, imageUrl }, "Image uploaded successfully."));
        }
        catch (KeyNotFoundException)
        {
            return NotFound(ApiResponse<object>.Fail("Item not found."));
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ApiResponse<object>.Fail(ex.Message));
        }
    }

    [HttpGet("image/{filename}")]
    public IActionResult GetImage(string filename)
    {
        // Sanitize filename to prevent path traversal
        string sanitizedFilename = Path.GetFileName(filename);
        string fullPath = _fileStorageService.GetAbsolutePath($"items/{sanitizedFilename}");

        if (!System.IO.File.Exists(fullPath))
        {
            return NotFound();
        }

        string extension = Path.GetExtension(fullPath).ToLowerInvariant();
        string contentType = extension == ".png" ? "image/png" : "image/jpeg";

        return PhysicalFile(fullPath, contentType);
    }

    [HttpGet("bulk-upload/template")]
    public IActionResult DownloadBulkUploadTemplate()
    {
        byte[] fileBytes = _itemService.GenerateBulkUploadTemplate();
        return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "items_bulk_upload_template.xlsx");
    }

    [HttpPost("bulk-upload")]
    public async Task<ActionResult<ApiResponse<BulkUploadResult>>> BulkUpload([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(ApiResponse<BulkUploadResult>.Fail("No file uploaded."));
        }

        string extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (extension != ".xlsx")
        {
            return BadRequest(ApiResponse<BulkUploadResult>.Fail("Only .xlsx files are allowed."));
        }

        if (file.Length > 5 * 1024 * 1024)
        {
            return BadRequest(ApiResponse<BulkUploadResult>.Fail("File size must be under 5MB."));
        }

        using var stream = file.OpenReadStream();
        BulkUploadResult result = await _itemService.BulkCreateItemsAsync(stream);

        if (result.ErrorCount > 0)
        {
            return BadRequest(ApiResponse<BulkUploadResult>.Fail("Some rows have validation errors. No items were created.", 
                result.RowErrors.SelectMany(r => r.Errors.Select(e => $"Row {r.Row}: {e}")).ToList()));
        }

        return Ok(ApiResponse<BulkUploadResult>.Ok(result, $"{result.SuccessCount} items created successfully."));
    }
}
