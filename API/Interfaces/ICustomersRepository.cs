using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICustomersRepository
    {
        Task<IEnumerable<AppUser>> GetPharmacies();
        Task<IEnumerable<InventoryPharmacyDto>> GetProducts();
        Task<IEnumerable<Sale>> GetPurchases(int id);

        Task<IEnumerable<InventoryPharmacy>> GetPharmacyProducts(int id);
        Task<InventoryPharmacy> GetProduct(int id);
        Task<Sale> GetPurchase(int id);

        Task<bool> BuyProduct(InventoryPharmacy pharmacyProduct, int CustomerId);
        Task<AppUser> GetUser(int id);
    }
}
