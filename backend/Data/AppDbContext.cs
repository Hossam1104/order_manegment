using Microsoft.EntityFrameworkCore;

namespace OrderManagement.API;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Item> Items { get; set; } = null!;
    public DbSet<AppConfiguration> AppConfigurations { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Item configuration
        modelBuilder.Entity<Item>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            entity.Property(e => e.ItemCode)
                .IsRequired()
                .HasMaxLength(50);

            entity.HasIndex(e => e.ItemCode)
                .IsUnique();

            entity.Property(e => e.NameEN)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(e => e.NameAR)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(e => e.ImagePath)
                .HasMaxLength(500);

            entity.Property(e => e.Category)
                .HasMaxLength(100);

            entity.Property(e => e.Price)
                .HasColumnType("decimal(18,2)");

            entity.Property(e => e.VatPercentage)
                .HasColumnType("decimal(5,2)");

            entity.Property(e => e.NetTotal)
                .HasColumnType("decimal(18,2)")
                .ValueGeneratedOnAddOrUpdate()
                .HasComputedColumnSql("Price + (Price * VatPercentage / 100)", stored: true);

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            // Soft delete query filter
            entity.HasQueryFilter(i => !i.IsDeleted);
        });

        // AppConfiguration configuration
        modelBuilder.Entity<AppConfiguration>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.ServerName)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(e => e.DatabaseName)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(e => e.DbUsername)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(e => e.DbPassword)
                .IsRequired()
                .HasMaxLength(200);

            // Seed data
            entity.HasData(new AppConfiguration
            {
                Id = 1,
                ServerName = ".",
                DatabaseName = "OrderManagementDB",
                DbUsername = "sa",
                DbPassword = "P@ssw0rd",
                UpdatedAt = null
            });
        });
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry entry in ChangeTracker.Entries())
        {
            if (entry.State == EntityState.Modified)
            {
                Microsoft.EntityFrameworkCore.Metadata.IProperty? updatedAtProperty = entry.Metadata.FindProperty("UpdatedAt");
                if (updatedAtProperty != null)
                {
                    entry.Property("UpdatedAt").CurrentValue = DateTime.UtcNow;
                }
            }
        }

        return await base.SaveChangesAsync(cancellationToken);
    }
}
