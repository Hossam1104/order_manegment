namespace OrderManagement.API;

public class FileStorageService : IFileStorageService
{
    private readonly string _basePath;

    public FileStorageService(IConfiguration configuration)
    {
        _basePath = configuration["FileStorage:BasePath"]
            ?? throw new InvalidOperationException("FileStorage:BasePath is not configured.");
    }

    public async Task<string> SaveImageAsync(IFormFile file)
    {
        string[] allowedMimeTypes = new[] { "image/jpeg", "image/png" };
        if (!allowedMimeTypes.Contains(file.ContentType.ToLowerInvariant()))
        {
            throw new ArgumentException("Only JPG and PNG files are allowed.");
        }

        long maxSize = 5 * 1024 * 1024;
        if (file.Length > maxSize)
        {
            throw new ArgumentException("Image must be under 5MB.");
        }

        string extension = file.ContentType.ToLowerInvariant() == "image/png" ? "png" : "jpg";
        string filename = $"{Guid.NewGuid()}.{extension}";
        string fullPath = Path.Combine(_basePath, filename);

        Directory.CreateDirectory(_basePath);

        using (FileStream stream = new FileStream(fullPath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return $"items/{filename}";
    }

    public void DeleteImage(string relativePath)
    {
        string fullPath = GetAbsolutePath(relativePath);
        Console.WriteLine($"[FileStorage] Soft delete requested for: {fullPath}");
    }

    public string GetAbsolutePath(string relativePath)
    {
        string filename = relativePath.Replace("items/", "");
        return Path.Combine(_basePath, filename);
    }
}
