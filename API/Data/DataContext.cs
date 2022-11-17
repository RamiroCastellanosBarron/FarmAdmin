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
        public DbSet<Sale> Sales { get; set; }
        public DbSet<Address> Addresses { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<AppUser>().Navigation(x => x.UserRoles).AutoInclude();
            builder.Entity<AppUser>().Navigation(x => x.Address).AutoInclude();

            //user id es requerido para producto
            //address no requiere de UserId

            builder.Entity<Product>()
                .HasOne(x => x.User)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<AppUser>()
                .HasMany(x => x.Products)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId)
                //.HasForeignKey     AGREGAR VARIOS DE ESTOS DENTRO DE APPUSER ?????
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Sale>()
                .HasOne(x => x.Seller)
                .WithMany(x => x.ItemsSold)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Sale>()
                .HasOne(x => x.Buyer)
                .WithMany(x => x.ItemsBought)
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
