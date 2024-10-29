using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace woym_backend.Migrations
{
    /// <inheritdoc />
    public partial class _9thMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Media_Users_AuthorUserId",
                table: "Media");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_AuthorUserId",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "AuthorUserId",
                table: "Posts",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_AuthorUserId",
                table: "Posts",
                newName: "IX_Posts_UserId");

            migrationBuilder.RenameColumn(
                name: "AuthorUserId",
                table: "Media",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Media_AuthorUserId",
                table: "Media",
                newName: "IX_Media_UserId");

            migrationBuilder.AddColumn<string>(
                name: "AvatarUrl",
                table: "Users",
                type: "VARCHAR(2048)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BackgroundUrl",
                table: "Users",
                type: "VARCHAR(2048)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Users_UserId",
                table: "Media",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Users_UserId",
                table: "Posts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Media_Users_UserId",
                table: "Media");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_UserId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "AvatarUrl",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "BackgroundUrl",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Posts",
                newName: "AuthorUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_UserId",
                table: "Posts",
                newName: "IX_Posts_AuthorUserId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Media",
                newName: "AuthorUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Media_UserId",
                table: "Media",
                newName: "IX_Media_AuthorUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Users_AuthorUserId",
                table: "Media",
                column: "AuthorUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Users_AuthorUserId",
                table: "Posts",
                column: "AuthorUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
