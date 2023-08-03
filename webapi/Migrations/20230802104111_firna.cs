using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class firna : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirmaAdi",
                table: "Musteri");

            migrationBuilder.AddColumn<int>(
                name: "FirmaId",
                table: "Musteri",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Musteri_FirmaId",
                table: "Musteri",
                column: "FirmaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Musteri_Firma_FirmaId",
                table: "Musteri",
                column: "FirmaId",
                principalTable: "Firma",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Musteri_Firma_FirmaId",
                table: "Musteri");

            migrationBuilder.DropIndex(
                name: "IX_Musteri_FirmaId",
                table: "Musteri");

            migrationBuilder.DropColumn(
                name: "FirmaId",
                table: "Musteri");

            migrationBuilder.AddColumn<string>(
                name: "FirmaAdi",
                table: "Musteri",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
