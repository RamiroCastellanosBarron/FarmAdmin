using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }

        public ICollection<AppUserRole> UserRoles { get; set; }
        public ICollection<Product> Products { get; set; }

        public ICollection<Sale> ItemsSold { get; set; }
        public ICollection<Sale> ItemsBought { get; set; }

        public int AddressId { get; set; }
        public Address Address { get; set; }
    }
}
