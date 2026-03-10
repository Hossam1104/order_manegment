using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using OrderManagement.API;

// Ensure required directories exist
Directory.CreateDirectory(@"D:\order_managment");
Directory.CreateDirectory(@"D:\order_managment\assets\items");

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });

builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IFileStorageService, FileStorageService>();
builder.Services.AddScoped<IItemService, ItemService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

WebApplication app = builder.Build();

using (IServiceScope scope = app.Services.CreateScope())
{
    AppDbContext dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await dbContext.Database.MigrateAsync();

    // Seed data if enabled in configuration
    AppConfiguration? seedConfig = await dbContext.AppConfigurations.FindAsync(1);
    if (seedConfig is { SeedDataEnabled: true })
    {
        int existingCount = await dbContext.Items.CountAsync();
        if (existingCount < seedConfig.SeedDataCount)
        {
            int toGenerate = seedConfig.SeedDataCount - existingCount;
            Console.WriteLine($"[Seed] Generating {toGenerate} items (existing: {existingCount}, target: {seedConfig.SeedDataCount})...");

            var seedItems = SeedDataGenerator.Generate(toGenerate, existingCount, seedConfig.SeedDataCategory);
            dbContext.Items.AddRange(seedItems);
            await dbContext.SaveChangesAsync();
            Console.WriteLine($"[Seed] Successfully seeded {seedItems.Count} items.");
        }
        else
        {
            Console.WriteLine($"[Seed] Already have {existingCount} items (target: {seedConfig.SeedDataCount}). Skipping.");
        }
    }
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseMiddleware<GlobalExceptionMiddleware>();
app.UseHttpsRedirection();
app.UseCors();
app.UseRouting();
app.MapControllers();

app.Run();
