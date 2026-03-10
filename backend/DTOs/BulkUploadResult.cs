namespace OrderManagement.API;

public class BulkUploadResult
{
    public int SuccessCount { get; set; }
    public int ErrorCount { get; set; }
    public int TotalRows { get; set; }
    public List<BulkUploadRowError> RowErrors { get; set; } = new();
}

public class BulkUploadRowError
{
    public int Row { get; set; }
    public List<string> Errors { get; set; } = new();
}
