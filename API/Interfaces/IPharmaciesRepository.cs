using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IPharmaciesRepository
    {
        Task<IEnumerable<AppUser>> GetCustomers();
        Task<IEnumerable<AppUser>> GetSuppliers(string username);
        Task<IEnumerable<InventoryPharmacy>> GetProducts(int id);
        Task<IEnumerable<Sale>> GetSales(int id);
        Task<IEnumerable<SaleDto>> GetPurchases(int id);

        Task<IEnumerable<Sale>> GetCustomerPurchases(int id, int UserId);
        Task<AppUser> GetSupplier(int id);
        Task<InventoryPharmacy> GetProduct(int id);
        Task<Sale> GetSale(int id);
        Task<Sale> GetPurchase(int id);
        Task<AppUser> GetUser(int id);

        Task<IEnumerable<InventorySupplierDto>> GetItems();
        Task<InventorySupplier> GetItem(int id);

        Task<bool> BuyProduct(InventorySupplier supplierProduct, int CustomerId);
    }
}
