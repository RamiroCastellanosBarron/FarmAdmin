using API.Entities;

namespace API.Interfaces
{
    public interface IPharmaciesRepository
    {
        Task<IEnumerable<AppUser>> GetCustomers();
        Task<IEnumerable<AppUser>> GetSuppliers(string username);
        Task<IEnumerable<Product>> GetProducts(string username);
        Task<IEnumerable<Sale>> GetSales(string username);
        Task<IEnumerable<Sale>> GetPurchases(int id);

        Task<IEnumerable<Sale>> GetCustomerPurchases(int id, int UserId);
        Task<AppUser> GetSupplier(int id);
        Task<Product> GetProduct(int id);
    }
}
