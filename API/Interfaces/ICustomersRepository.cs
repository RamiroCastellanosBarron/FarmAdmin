using API.Entities;

namespace API.Interfaces
{
    public interface ICustomersRepository
    {
        Task<IEnumerable<AppUser>> GetPharmacies();
        Task<IEnumerable<Product>> GetProducts();
        Task<IEnumerable<Sale>> GetPurchases(int id);

        Task<AppUser> GetPharmacy(int id);
        Task<Product> GetProduct(int id);
        Task<Sale> GetPurchase(int id); 
    }
}
