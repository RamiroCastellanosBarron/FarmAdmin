using API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Address> Addresses { get; set; }

        public DbSet<InventoryPharmacy> PharmacyProducts { get; set; }
        public DbSet<InventorySupplier> SupplierProducts { get; set; }

        public DbSet<Sale> Sales { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>().Navigation(x => x.Address).AutoInclude();
            builder.Entity<InventorySupplier>().Navigation(x => x.Product).AutoInclude();
            builder.Entity<Product>().Navigation(x => x.SupplierProducts).AutoInclude();

            builder.Entity<Address>()
                .HasMany(x => x.Users)
                .WithOne(x => x.Address)
                .HasForeignKey(x => x.AddressId)
                .IsRequired();

            builder.Entity<AppUser>()
                .HasMany(x => x.PharmacyProducts)
                .WithOne(x => x.Pharmacy)
                .HasForeignKey(x => x.PharmacyId)
                .IsRequired();
            
            builder.Entity<Product>()
                .HasMany(x => x.PharmacyProducts)
                .WithOne(x => x.Product)
                .HasForeignKey(x => x.ProductId)
                .IsRequired();

            builder.Entity<AppUser>()
                .HasMany(x => x.SupplierProducts)
                .WithOne(x => x.Supplier)
                .HasForeignKey(x => x.SupplierId)
                .IsRequired();

            builder.Entity<Product>()
                .HasMany(x => x.SupplierProducts)
                .WithOne(x => x.Product)
                .HasForeignKey(x => x.ProductId)
                .IsRequired();

            builder.Entity<Product>()
                .HasMany(x => x.ProductSales)
                .WithOne(x => x.Product)
                .HasForeignKey(x => x.ProductId)
                .IsRequired();

            builder.Entity<AppUser>()
                .HasMany(x => x.ProductsSold)
                .WithOne(x => x.Seller)
                .HasForeignKey(x => x.SellerId)
                .IsRequired();

            builder.Entity<Sale>()
                .HasOne(x => x.Seller)
                .WithMany(x => x.ProductsSold)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<AppUser>()
                .HasMany(x => x.ProductsBought)
                .WithOne(x => x.Buyer)
                .HasForeignKey(x => x.BuyerId)
                .IsRequired();

            builder.Entity<Sale>()
                .HasOne(x => x.Buyer)
                .WithMany(x => x.ProductsBought)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<AppUser>()
                .HasMany(x => x.UserRoles)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(x => x.UserRoles)
                .WithOne(x => x.Role)
                .HasForeignKey(x => x.RoleId)
                .IsRequired();
        }
    }
}
