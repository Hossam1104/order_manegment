using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;

namespace OrderManagement.API;

public class ItemService : IItemService
{
    private readonly AppDbContext _context;
    private readonly IFileStorageService _fileStorageService;

    public ItemService(AppDbContext context, IFileStorageService fileStorageService)
    {
        _context = context;
        _fileStorageService = fileStorageService;
    }

    public async Task<(List<ItemDto> items, int totalCount)> GetItemsAsync(int page, int size, string? search)
    {
        IQueryable<Item> query = _context.Items.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            string searchLower = search.ToLower();
            query = query.Where(i =>
                i.ItemCode.ToLower().Contains(searchLower) ||
                i.NameEN.ToLower().Contains(searchLower) ||
                i.NameAR.Contains(search));
        }

        int totalCount = await query.CountAsync();

        List<Item> items = await query
            .OrderByDescending(i => i.CreatedAt)
            .Skip((page - 1) * size)
            .Take(size)
            .ToListAsync();

        List<ItemDto> dtos = items.Select(MapToDto).ToList();

        return (dtos, totalCount);
    }

    public async Task<ItemDto?> GetItemByIdAsync(Guid id)
    {
        Item? item = await _context.Items.FindAsync(id);
        if (item == null) return null;
        return MapToDto(item);
    }

    public async Task<bool> IsCodeUniqueAsync(string code, Guid? excludeId = null)
    {
        IQueryable<Item> query = _context.Items.Where(i => i.ItemCode == code);

        if (excludeId.HasValue)
        {
            query = query.Where(i => i.Id != excludeId.Value);
        }

        return !await query.AnyAsync();
    }

    public async Task<ItemDto> CreateItemAsync(CreateItemRequest request)
    {
        bool isUnique = await IsCodeUniqueAsync(request.ItemCode);
        if (!isUnique)
        {
            throw new InvalidOperationException($"Item code '{request.ItemCode}' is already in use.");
        }

        Item item = new Item
        {
            ItemCode = request.ItemCode,
            NameEN = request.NameEN,
            NameAR = request.NameAR,
            Category = request.Category,
            Price = request.Price,
            VatPercentage = request.VatPercentage,
            CreatedAt = DateTime.UtcNow
        };

        _context.Items.Add(item);
        await _context.SaveChangesAsync();

        // Reload to get computed column
        await _context.Entry(item).ReloadAsync();

        return MapToDto(item);
    }

    public async Task<ItemDto?> UpdateItemAsync(Guid id, UpdateItemRequest request)
    {
        Item? item = await _context.Items.FindAsync(id);
        if (item == null) return null;

        bool isUnique = await IsCodeUniqueAsync(request.ItemCode, id);
        if (!isUnique)
        {
            throw new InvalidOperationException($"Item code '{request.ItemCode}' is already in use.");
        }

        item.ItemCode = request.ItemCode;
        item.NameEN = request.NameEN;
        item.NameAR = request.NameAR;
        item.Category = request.Category;
        item.Price = request.Price;
        item.VatPercentage = request.VatPercentage;

        if (request.ImagePath != null)
        {
            item.ImagePath = request.ImagePath;
        }

        await _context.SaveChangesAsync();

        // Reload to get computed column
        await _context.Entry(item).ReloadAsync();

        return MapToDto(item);
    }

    public async Task<bool> DeleteItemAsync(Guid id)
    {
        Item? item = await _context.Items.FindAsync(id);
        if (item == null) return false;

        item.IsDeleted = true;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<string> UploadImageAsync(Guid id, IFormFile file)
    {
        Item? item = await _context.Items.FindAsync(id);
        if (item == null)
        {
            throw new KeyNotFoundException($"Item with ID '{id}' not found.");
        }

        string relativePath = await _fileStorageService.SaveImageAsync(file);
        item.ImagePath = relativePath;
        await _context.SaveChangesAsync();

        return relativePath;
    }

    public byte[] GenerateBulkUploadTemplate()
    {
        using var workbook = new XLWorkbook();
        var ws = workbook.Worksheets.Add("Items");

        // Headers
        ws.Cell(1, 1).Value = "ItemCode";
        ws.Cell(1, 2).Value = "NameEN";
        ws.Cell(1, 3).Value = "NameAR";
        ws.Cell(1, 4).Value = "Price";
        ws.Cell(1, 5).Value = "VatPercentage";

        // Style headers
        var headerRange = ws.Range(1, 1, 1, 5);
        headerRange.Style.Font.Bold = true;
        headerRange.Style.Fill.BackgroundColor = XLColor.LightSteelBlue;
        headerRange.Style.Border.BottomBorder = XLBorderStyleValues.Thin;

        // Column widths
        ws.Column(1).Width = 20;
        ws.Column(2).Width = 30;
        ws.Column(3).Width = 30;
        ws.Column(4).Width = 15;
        ws.Column(5).Width = 18;

        // Data validation: VatPercentage must be 0 or 15
        var vatRange = ws.Range(2, 5, 1000, 5);
        vatRange.CreateDataValidation().List("0,15", true);

        // Data validation: Price must be >= 0
        var priceRange = ws.Range(2, 4, 1000, 4);
        priceRange.CreateDataValidation().WholeNumber.EqualOrGreaterThan(0);

        // Set text format for ItemCode column to preserve leading zeros
        ws.Column(1).Style.NumberFormat.Format = "@";

        // Add a sample row for guidance
        ws.Cell(2, 1).Value = "ITEM-001";
        ws.Cell(2, 2).Value = "Sample Item";
        ws.Cell(2, 3).Value = "صنف تجريبي";
        ws.Cell(2, 4).Value = 100;
        ws.Cell(2, 5).Value = 15;
        var sampleRow = ws.Range(2, 1, 2, 5);
        sampleRow.Style.Font.FontColor = XLColor.Gray;

        using var ms = new MemoryStream();
        workbook.SaveAs(ms);
        return ms.ToArray();
    }

    public async Task<BulkUploadResult> BulkCreateItemsAsync(Stream excelStream)
    {
        var result = new BulkUploadResult();

        using var workbook = new XLWorkbook(excelStream);
        var ws = workbook.Worksheet(1);

        // Validate headers
        string[] expectedHeaders = { "ItemCode", "NameEN", "NameAR", "Price", "VatPercentage" };
        for (int col = 1; col <= expectedHeaders.Length; col++)
        {
            string header = ws.Cell(1, col).GetString().Trim();
            if (!string.Equals(header, expectedHeaders[col - 1], StringComparison.OrdinalIgnoreCase))
            {
                result.RowErrors.Add(new BulkUploadRowError
                {
                    Row = 1,
                    Errors = new List<string> { $"Invalid header in column {col}. Expected '{expectedHeaders[col - 1]}', found '{header}'." }
                });
                result.ErrorCount = 1;
                return result;
            }
        }

        // Get last used row
        int lastRow = ws.LastRowUsed()?.RowNumber() ?? 1;
        if (lastRow <= 1)
        {
            result.RowErrors.Add(new BulkUploadRowError
            {
                Row = 0,
                Errors = new List<string> { "The file contains no data rows." }
            });
            return result;
        }

        result.TotalRows = lastRow - 1;

        // Collect all existing codes for uniqueness check
        var existingCodes = await _context.Items
            .Select(i => i.ItemCode.ToLower())
            .ToListAsync();
        var existingCodesSet = new HashSet<string>(existingCodes);
        var newCodesInBatch = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        var validItems = new List<Item>();

        for (int row = 2; row <= lastRow; row++)
        {
            var rowErrors = new List<string>();

            // Read cell values
            string itemCode = ws.Cell(row, 1).GetString().Trim();
            string nameEN = ws.Cell(row, 2).GetString().Trim();
            string nameAR = ws.Cell(row, 3).GetString().Trim();
            string priceStr = ws.Cell(row, 4).GetString().Trim();
            string vatStr = ws.Cell(row, 5).GetString().Trim();

            // Skip completely empty rows
            if (string.IsNullOrEmpty(itemCode) && string.IsNullOrEmpty(nameEN) &&
                string.IsNullOrEmpty(nameAR) && string.IsNullOrEmpty(priceStr) &&
                string.IsNullOrEmpty(vatStr))
            {
                result.TotalRows--;
                continue;
            }

            // Validate ItemCode
            if (string.IsNullOrEmpty(itemCode))
                rowErrors.Add("ItemCode is required.");
            else if (itemCode.Length > 50)
                rowErrors.Add("ItemCode must be 50 characters or less.");
            else if (existingCodesSet.Contains(itemCode.ToLower()))
                rowErrors.Add($"ItemCode '{itemCode}' already exists in the database.");
            else if (newCodesInBatch.Contains(itemCode))
                rowErrors.Add($"ItemCode '{itemCode}' is duplicated within the uploaded file.");

            // Validate NameEN
            if (string.IsNullOrEmpty(nameEN))
                rowErrors.Add("NameEN is required.");
            else if (nameEN.Length > 200)
                rowErrors.Add("NameEN must be 200 characters or less.");

            // Validate NameAR
            if (string.IsNullOrEmpty(nameAR))
                rowErrors.Add("NameAR is required.");
            else if (nameAR.Length > 200)
                rowErrors.Add("NameAR must be 200 characters or less.");

            // Validate Price
            if (string.IsNullOrEmpty(priceStr))
                rowErrors.Add("Price is required.");
            else if (!decimal.TryParse(priceStr, System.Globalization.NumberStyles.Any, System.Globalization.CultureInfo.InvariantCulture, out decimal price))
                rowErrors.Add("Price must be a valid number.");
            else if (price < 0)
                rowErrors.Add("Price must be >= 0.");

            // Validate VatPercentage
            if (string.IsNullOrEmpty(vatStr))
                rowErrors.Add("VatPercentage is required.");
            else if (!decimal.TryParse(vatStr, System.Globalization.NumberStyles.Any, System.Globalization.CultureInfo.InvariantCulture, out decimal vat))
                rowErrors.Add("VatPercentage must be a valid number.");
            else if (vat != 0 && vat != 15)
                rowErrors.Add("VatPercentage must be 0 or 15.");

            if (rowErrors.Count > 0)
            {
                result.RowErrors.Add(new BulkUploadRowError { Row = row, Errors = rowErrors });
                result.ErrorCount++;
            }
            else
            {
                decimal parsedPrice = decimal.Parse(priceStr, System.Globalization.CultureInfo.InvariantCulture);
                decimal parsedVat = decimal.Parse(vatStr, System.Globalization.CultureInfo.InvariantCulture);

                validItems.Add(new Item
                {
                    ItemCode = itemCode,
                    NameEN = nameEN,
                    NameAR = nameAR,
                    Price = parsedPrice,
                    VatPercentage = parsedVat,
                    CreatedAt = DateTime.UtcNow
                });

                newCodesInBatch.Add(itemCode);
            }
        }

        // Only insert if ALL rows are valid (atomic operation)
        if (result.ErrorCount == 0 && validItems.Count > 0)
        {
            _context.Items.AddRange(validItems);
            await _context.SaveChangesAsync();
            result.SuccessCount = validItems.Count;
        }
        else if (result.ErrorCount > 0)
        {
            // Don't insert any items if there are errors
            result.SuccessCount = 0;
        }

        return result;
    }

    private static ItemDto MapToDto(Item item)
    {
        string? imageUrl = null;
        if (!string.IsNullOrEmpty(item.ImagePath))
        {
            if (item.ImagePath.StartsWith("http", StringComparison.OrdinalIgnoreCase))
            {
                imageUrl = item.ImagePath;
            }
            else
            {
                string filename = Path.GetFileName(item.ImagePath);
                imageUrl = $"/api/items/image/{filename}";
            }
        }

        return new ItemDto
        {
            Id = item.Id,
            ItemCode = item.ItemCode,
            NameEN = item.NameEN,
            NameAR = item.NameAR,
            ImagePath = item.ImagePath,
            ImageUrl = imageUrl,
            Category = item.Category,
            Price = item.Price,
            VatPercentage = item.VatPercentage,
            NetTotal = item.NetTotal,
            CreatedAt = item.CreatedAt,
            UpdatedAt = item.UpdatedAt
        };
    }
}
