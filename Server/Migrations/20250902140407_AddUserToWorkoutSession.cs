using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddUserToWorkoutSession : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "WorkoutSessions",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutSessions_ApplicationUserId",
                table: "WorkoutSessions",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutSessions_AspNetUsers_ApplicationUserId",
                table: "WorkoutSessions",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutSessions_AspNetUsers_ApplicationUserId",
                table: "WorkoutSessions");

            migrationBuilder.DropIndex(
                name: "IX_WorkoutSessions_ApplicationUserId",
                table: "WorkoutSessions");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "WorkoutSessions");
        }
    }
}
