namespace dotNet514072019.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DodatSadrzaj : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Sadrzajs",
                c => new
                    {
                        SadrzajId = c.Int(nullable: false, identity: true),
                        SadrzajSlikaLink = c.String(),
                        SadrzajTekst = c.String(),
                        SadrzajArhiviran = c.Boolean(nullable: false),
                        KosarkasId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.SadrzajId)
                .ForeignKey("dbo.Kosarkas", t => t.KosarkasId, cascadeDelete: true)
                .Index(t => t.KosarkasId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Sadrzajs", "KosarkasId", "dbo.Kosarkas");
            DropIndex("dbo.Sadrzajs", new[] { "KosarkasId" });
            DropTable("dbo.Sadrzajs");
        }
    }
}
