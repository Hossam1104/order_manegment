using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace OrderManagement.API;

[ApiController]
[Route("api/configuration")]
public class ConfigurationController : ControllerBase
{
    private readonly AppDbContext _context;

    public ConfigurationController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<ConfigurationDto>>> GetConfiguration()
    {
        AppConfiguration? config = await _context.AppConfigurations.FindAsync(1);
        if (config == null)
        {
            return NotFound(ApiResponse<ConfigurationDto>.Fail("Configuration not found."));
        }

        ConfigurationDto dto = new ConfigurationDto
        {
            ServerName = config.ServerName,
            DatabaseName = config.DatabaseName,
            DbUsername = config.DbUsername,
            DbPassword = "***",
            UpdatedAt = config.UpdatedAt,
            SeedDataEnabled = config.SeedDataEnabled,
            SeedDataCount = config.SeedDataCount,
            SeedDataCategory = config.SeedDataCategory
        };

        return Ok(ApiResponse<ConfigurationDto>.Ok(dto));
    }

    [HttpPut]
    public async Task<ActionResult<ApiResponse<ConfigurationDto>>> UpdateConfiguration(
        [FromBody] UpdateConfigurationRequest request)
    {
        if (!ModelState.IsValid)
        {
            List<string> errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
            return BadRequest(ApiResponse<ConfigurationDto>.Fail("Validation failed.", errors));
        }

        AppConfiguration? config = await _context.AppConfigurations.FindAsync(1);
        if (config == null)
        {
            return NotFound(ApiResponse<ConfigurationDto>.Fail("Configuration not found."));
        }

        config.ServerName = request.ServerName;
        config.DatabaseName = request.DatabaseName;
        config.DbUsername = request.DbUsername;
        config.DbPassword = request.DbPassword;
        config.SeedDataEnabled = request.SeedDataEnabled;
        config.SeedDataCount = request.SeedDataCount;
        config.SeedDataCategory = request.SeedDataCategory;

        await _context.SaveChangesAsync();

        ConfigurationDto dto = new ConfigurationDto
        {
            ServerName = config.ServerName,
            DatabaseName = config.DatabaseName,
            DbUsername = config.DbUsername,
            DbPassword = "***",
            UpdatedAt = config.UpdatedAt,
            SeedDataEnabled = config.SeedDataEnabled,
            SeedDataCount = config.SeedDataCount,
            SeedDataCategory = config.SeedDataCategory
        };

        return Ok(ApiResponse<ConfigurationDto>.Ok(dto, "Configuration updated successfully."));
    }

    [HttpPost("test-connection")]
    public async Task<ActionResult<ApiResponse<object>>> TestConnection(
        [FromBody] TestConnectionRequest request)
    {
        try
        {
            SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder
            {
                DataSource = request.ServerName,
                InitialCatalog = request.DatabaseName,
                UserID = request.DbUsername,
                Password = request.DbPassword,
                TrustServerCertificate = true,
                ConnectTimeout = 10
            };

            using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
            {
                await connection.OpenAsync();
            }

            return Ok(ApiResponse<object>.Ok(new { success = true }, "Connection successful."));
        }
        catch (Exception ex)
        {
            return Ok(ApiResponse<object>.Fail($"Connection failed: {ex.Message}"));
        }
    }
}
