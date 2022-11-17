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

        public async Task<Product> GetProduct(int id)
        {
            var product = await _context.Products
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

        public async Task<IEnumerable<Sale>> GetPurchases(int id)
        {
            var purchasesList = new List<Sale>();

            var purchases = await _context.Sales
                .Include(x => x.Product)
                .Include(x => x.Seller)
                .Include(x => x.Buyer)
                .Where(x => x.BuyerId == id)
                .ToListAsync();

            return purchases;
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
    }
}
