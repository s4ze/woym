using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace woym_backend.Migrations
{
    /// <inheritdoc />
    public partial class _17thMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CreatedAt",
                table: "Users",
                type: "VARCHAR(25)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR(23)");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedAt",
                table: "Posts",
                type: "VARCHAR(25)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR(23)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CreatedAt",
                table: "Users",
                type: "VARCHAR(23)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR(25)");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedAt",
                table: "Posts",
                type: "VARCHAR(23)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR(25)");
        }
    }
}
