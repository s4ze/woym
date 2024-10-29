using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace woym_backend.Migrations
{
    /// <inheritdoc />
    public partial class _11thMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Users",
                type: "VARCHAR(256)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "CHAR(60)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Users",
                type: "CHAR(60)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR(256)");
        }
    }
}
