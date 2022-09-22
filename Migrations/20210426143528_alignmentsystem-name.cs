using Microsoft.EntityFrameworkCore.Migrations;

namespace RedAlign.Portal.Service.Migrations
{
    public partial class alignmentsystemname : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "AlignmentSystems",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "AlignmentSystems");
        }
    }
}
