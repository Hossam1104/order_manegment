using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderManagement.API.Migrations
{
    /// <inheritdoc />
    public partial class AddCategoryAndSeedConfig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Items",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SeedDataCategory",
                table: "AppConfigurations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "SeedDataCount",
                table: "AppConfigurations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "SeedDataEnabled",
                table: "AppConfigurations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "AppConfigurations",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "SeedDataCategory", "SeedDataCount", "SeedDataEnabled" },
                values: new object[] { "All", 100, false });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "SeedDataCategory",
                table: "AppConfigurations");

            migrationBuilder.DropColumn(
                name: "SeedDataCount",
                table: "AppConfigurations");

            migrationBuilder.DropColumn(
                name: "SeedDataEnabled",
                table: "AppConfigurations");
        }
    }
}
