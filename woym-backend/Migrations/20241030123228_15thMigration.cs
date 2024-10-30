using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace woym_backend.Migrations
{
    /// <inheritdoc />
    public partial class _15thMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Posts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Posts",
                type: "VARCHAR(256)",
                nullable: false,
                defaultValue: "");
        }
    }
}
