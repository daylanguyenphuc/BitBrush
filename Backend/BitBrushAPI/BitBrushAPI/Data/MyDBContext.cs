using BitBrushAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace BitBrushAPI.Data
{
    public class MyDBContext : DbContext
    {
        public MyDBContext(DbContextOptions options) : base(options) { }

        #region DbSet
        public DbSet<Collection> Collections { get; set; }
        public DbSet<Maillist> Maillists { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductTag> ProductTags { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserAccount> UserAccounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Collection>()
                        .ToTable("tblCollection");

            modelBuilder.Entity<Maillist>()
                        .ToTable("tblMaillist");

            modelBuilder.Entity<Product>()
                        .ToTable("tblProduct")
                        .HasOne(p => p.creator)
                        .WithMany(c => c.createdProduct)
                        .HasForeignKey(p => p.creatorId)
                        .IsRequired()
                        .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Product>()
                        .HasOne(p => p.owner)
                        .WithMany(o => o.ownedProduct)
                        .HasForeignKey(p => p.ownerId)
                        .IsRequired()
                        .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ProductTag>(pt =>
            {
                pt.ToTable("tblProductTag");

                pt.HasKey(pt => new { pt.productId, pt.tagId });

                pt.HasOne(pt => pt.product)
                    .WithMany(pt => pt.tags)
                    .HasForeignKey(pt => pt.productId)
                    .OnDelete(DeleteBehavior.Restrict);

                pt.HasOne(pt => pt.tag)
                    .WithMany(pt => pt.products)
                    .HasForeignKey(pt => pt.tagId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Tag>()
                        .ToTable("tblTag");

            modelBuilder.Entity<UserAccount>()
                        .ToTable("tblUserAccount");

            modelBuilder.Entity<User>()
                        .ToTable("tblUser");

            modelBuilder.Entity<Transaction>(t =>
            {
                t.ToTable("tblTransaction");

                t.HasOne(t => t.product)
                    .WithMany(p => p.transactions)
                    .HasForeignKey(t => t.productId)
                    .OnDelete(DeleteBehavior.Restrict);

                //t.HasOne(t => t.seller)
                //    .WithMany(s => s.transactions)
                //    .HasForeignKey(t => t.sellerId)
                //    .OnDelete(DeleteBehavior.Restrict);

                t.HasOne(t => t.buyer)
                    .WithMany(b => b.transactions)
                    .HasForeignKey(t => t.buyerId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
