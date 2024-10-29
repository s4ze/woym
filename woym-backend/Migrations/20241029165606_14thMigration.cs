﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace woym_backend.Migrations
{
    /// <inheritdoc />
    public partial class _14thMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RefreshToken",
                table: "Users");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RefreshToken",
                table: "Users",
                type: "VARCHAR(256)",
                nullable: true);
        }
    }
}
