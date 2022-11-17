using API.Entities;

namespace API.Interfaces
{
    public interface ISuppliersRepository
    {
        Task<IEnumerable<AppUser>> GetCustomers();
        Task<IEnumerable<Product>> GetProducts(int id);
        Task<IEnumerable<Sale>> GetSales(int id);

        Task<AppUser> GetCustomer(int id);
        Task<Product> GetProduct(int id);
        Task<Sale> GetSale(int id);

        Task<bool> DeleteProduct(int id);
    }
}
