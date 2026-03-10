namespace OrderManagement.API;

public interface IFileStorageService
{
    Task<string> SaveImageAsync(IFormFile file);
    void DeleteImage(string relativePath);
    string GetAbsolutePath(string relativePath);
}
