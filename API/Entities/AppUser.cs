using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }

        public int AddressId { get; set; }
        public Address Address { get; set; }

        public ICollection<AppUserRole> UserRoles { get; set; }

        public ICollection<InventoryPharmacy> PharmacyProducts { get; set; }
        public ICollection<InventorySupplier> SupplierProducts{ get; set; }

        public ICollection<Sale> ProductsSold { get; set; }
        public ICollection<Sale> ProductsBought { get; set; }
    }
}
