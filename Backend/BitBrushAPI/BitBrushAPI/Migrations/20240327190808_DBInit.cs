using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BitBrushAPI.Migrations
{
    public partial class DBInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblMaillist",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    mail = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMaillist", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tblTag",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblTag", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tblUser",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    firstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    lastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    mail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    phone = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    gender = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false),
                    birthdate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    joinDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblUser", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tblCollection",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    creatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblCollection", x => x.id);
                    table.ForeignKey(
                        name: "FK_tblCollection_tblUser_creatorId",
                        column: x => x.creatorId,
                        principalTable: "tblUser",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblUserAccount",
                columns: table => new
                {
                    userId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    walletId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblUserAccount", x => x.userId);
                    table.ForeignKey(
                        name: "FK_tblUserAccount_tblUser_userId",
                        column: x => x.userId,
                        principalTable: "tblUser",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblProduct",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    collectionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    thumbnailUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ownerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    creatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    createdDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    sellingStatus = table.Column<bool>(type: "bit", nullable: false),
                    price = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblProduct", x => x.id);
                    table.ForeignKey(
                        name: "FK_tblProduct_tblCollection_collectionId",
                        column: x => x.collectionId,
                        principalTable: "tblCollection",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblProduct_tblUser_creatorId",
                        column: x => x.creatorId,
                        principalTable: "tblUser",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_tblProduct_tblUser_ownerId",
                        column: x => x.ownerId,
                        principalTable: "tblUser",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "tblProductTag",
                columns: table => new
                {
                    productId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    tagId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblProductTag", x => new { x.productId, x.tagId });
                    table.ForeignKey(
                        name: "FK_tblProductTag_tblProduct_productId",
                        column: x => x.productId,
                        principalTable: "tblProduct",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_tblProductTag_tblTag_tagId",
                        column: x => x.tagId,
                        principalTable: "tblTag",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "tblTransaction",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    productId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    sellerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    buyerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    hash = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblTransaction", x => x.id);
                    table.ForeignKey(
                        name: "FK_tblTransaction_tblProduct_productId",
                        column: x => x.productId,
                        principalTable: "tblProduct",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_tblTransaction_tblUser_buyerId",
                        column: x => x.buyerId,
                        principalTable: "tblUser",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_tblTransaction_tblUser_sellerId",
                        column: x => x.sellerId,
                        principalTable: "tblUser",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblCollection_creatorId",
                table: "tblCollection",
                column: "creatorId");

            migrationBuilder.CreateIndex(
                name: "IX_tblProduct_collectionId",
                table: "tblProduct",
                column: "collectionId");

            migrationBuilder.CreateIndex(
                name: "IX_tblProduct_creatorId",
                table: "tblProduct",
                column: "creatorId");

            migrationBuilder.CreateIndex(
                name: "IX_tblProduct_ownerId",
                table: "tblProduct",
                column: "ownerId");

            migrationBuilder.CreateIndex(
                name: "IX_tblProductTag_tagId",
                table: "tblProductTag",
                column: "tagId");

            migrationBuilder.CreateIndex(
                name: "IX_tblTransaction_buyerId",
                table: "tblTransaction",
                column: "buyerId");

            migrationBuilder.CreateIndex(
                name: "IX_tblTransaction_productId",
                table: "tblTransaction",
                column: "productId");

            migrationBuilder.CreateIndex(
                name: "IX_tblTransaction_sellerId",
                table: "tblTransaction",
                column: "sellerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblMaillist");

            migrationBuilder.DropTable(
                name: "tblProductTag");

            migrationBuilder.DropTable(
                name: "tblTransaction");

            migrationBuilder.DropTable(
                name: "tblUserAccount");

            migrationBuilder.DropTable(
                name: "tblTag");

            migrationBuilder.DropTable(
                name: "tblProduct");

            migrationBuilder.DropTable(
                name: "tblCollection");

            migrationBuilder.DropTable(
                name: "tblUser");
        }
    }
}
