using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PharmaciesRepository : IPharmaciesRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public PharmaciesRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> BuyProduct(Product product, int CustomerId)
        {
            if (product == null) return false;

            var sale = new Sale()
            {
                Quantity = product.Quantity,
                ProductId = product.Id,
                SellerId = product.UserId,
                BuyerId = CustomerId
            };

            var prod = await _context.Products
                .SingleOrDefaultAsync(x => x.Id == product.Id);

            prod.Quantity -= product.Quantity;

            await _context.Sales.AddAsync(sale);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<Sale>> GetCustomerPurchases(int id, int UserId)
        {
            var purchases = await _context.Sales
                .Include(x => x.Buyer)
                .Include(x => x.Product)
                .Where(x => x.SellerId == UserId)
                .Where(x => x.BuyerId == id)
                .ToListAsync();

            return purchases;
        }

        public async Task<IEnumerable<AppUser>> GetCustomers()
        {
            var customersList = new List<AppUser>();

            var customers = await _context.Users
                .Include(x => x.UserRoles)
                .ToListAsync();

            foreach (var customer in customers)
            {
                foreach (var c in customer.UserRoles)
                {
                    if (c.RoleId == 1) customersList.Add(customer);
                }
            }

            return customersList;
        }

        public async Task<Product> GetItem(int id)
        {
            var product = await _context.Products
                .Include(x => x.User)
                .SingleOrDefaultAsync(x => x.Id == id);

            return product;
        }

        public async Task<IEnumerable<Product>> GetItems()
        {
            var suppliersList = new List<AppUser>();

            var productsList = new List<Product>();

            var suppliersIds = new List<int>();

            var products = await _context.Products
                .Include(x => x.User)
                .ToListAsync();

            var suppliers = await _context.Users
                .Include(x => x.UserRoles)
                .ToListAsync();

            foreach (var supplier in suppliers)
            {
                foreach (var s in supplier.UserRoles)
                {
                    if (s.RoleId == 3) suppliersList.Add(supplier);
                }
            }

            foreach (var supplier in suppliersList)
            {
                suppliersIds.Add(supplier.Id);
            }

            foreach (var product in products)
            {
                for (int i = 0; i < suppliersList.Count - 1; i++)
                {
                    if (product.UserId == suppliersIds[i]) productsList.Add(product);
                }
            }

            return productsList;
        }

        public async Task<Product> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(x => x.User)
                .SingleOrDefaultAsync(x => x.Id == id);

            return product;
        }

        public async Task<IEnumerable<Product>> GetProducts(string username)
        {
            var products = await _context.Products
                .Include(x => x.User)
                .Where(x => x.User.UserName == username)
                .ToListAsync();

            return products;
        }

        public async Task<Sale> GetPurchase(int id)
        {
            var purchase = await _context.Sales
                .Include(x => x.Seller)
                .Include(x => x.Buyer)
                .Include(x => x.Product)
                .SingleOrDefaultAsync(x => x.Id == id);

            return purchase;
        }

        public async Task<IEnumerable<Sale>> GetPurchases(int id)
        {
            var purchasesList = new List<Sale>();

            var purchases = await _context.Sales
                .Include(x => x.Product)
                .Include(x => x.Seller)
                .Include(x => x.Buyer)
                .Where(x => x.BuyerId == id)
                .OrderByDescending(x => x.SaleDate)
                .ToListAsync();

            return purchases;
        }

        public async Task<Sale> GetSale(int id)
        {
            var sale = await _context.Sales
                .Include(x => x.Product)
                .Include(x => x.Seller)
                .Include(x => x.Buyer)
                .SingleOrDefaultAsync(x => x.Id == id);

            return sale;
        }

        public async Task<IEnumerable<Sale>> GetSales(string username)
        {
            var sales = await _context.Sales
                .Include(x => x.Buyer)
                .Include(x => x.Product)
                .Where(x => x.Seller.UserName == username)
                .ToListAsync();

            return sales;
        }

        public async Task<AppUser> GetSupplier(int id)
        {
            var supplier = await _context.Users
                .Include(x => x.Products)
                .SingleOrDefaultAsync(x => x.Id == id);

            return supplier;
        }

        public async Task<IEnumerable<AppUser>> GetSuppliers(string username)
        {
            var suppliersList = new List<AppUser>();

            var suppliers = await _context.Users
                .Include(x => x.UserRoles)
                .ToListAsync();

            foreach (var supplier in suppliers)
            {
                foreach (var s in supplier.UserRoles)
                {
                    if (s.RoleId == 3) suppliersList.Add(supplier);
                }
            }

            return suppliersList;
        }

        public async Task<AppUser> GetUser(int id)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(x => x.Id == id);

            return user;
        }
    }
}
