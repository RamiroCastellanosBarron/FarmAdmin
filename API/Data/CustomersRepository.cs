using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CustomersRepository : ICustomersRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public CustomersRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AppUser>> GetPharmacies()
        {
            var pharmaciesList = new List<AppUser>();

            var pharmacies = await _context.Users
                .Include(x => x.UserRoles)
                .ToListAsync();

            foreach (var pharmacy in pharmacies)
            {
                foreach (var p in pharmacy.UserRoles)
                {
                    if (p.RoleId == 2) pharmaciesList.Add(pharmacy);
                }
            }

            return pharmaciesList;
        }

        public async Task<AppUser> GetPharmacy(int id)
        {
            var pharmacy = await _context.Users
                .Include(x => x.Products)
                .SingleOrDefaultAsync(x => x.Id == id);

            return pharmacy;
        }

        public async Task<Product> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(x => x.User)
                .SingleOrDefaultAsync(x => x.Id == id);

            return product;
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            var pharmaciesList = new List<AppUser>();

            var productsList = new List<Product>();

            var pharmaciesIds = new List<int>();

            var products = await _context.Products
                .Include(x => x.User)
                .ToListAsync();

            var pharmacies = await _context.Users
                .Include(x => x.UserRoles)
                .ToListAsync();

            foreach (var pharmacy in pharmacies)
            {
                foreach (var p in pharmacy.UserRoles)
                {
                    if (p.RoleId == 2) pharmaciesList.Add(pharmacy);
                }
            }

            foreach (var pharmacy in pharmaciesList)
            {
                pharmaciesIds.Add(pharmacy.Id);
            }

            foreach (var product in products)
            {
                for(int i = 0; i < pharmaciesList.Count - 1; i++)
                {
                    if (product.UserId == pharmaciesIds[i]) productsList.Add(product);
                }
            }

            return productsList;
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

            foreach (var purchase in purchases)
            {
                if (purchase.BuyerId == id) purchasesList.Add(purchase);
            }

            return purchasesList;
        }

        public async Task<Sale> GetPurchase(int id)
        {
            var sale = await _context.Sales
                .Include(x => x.Seller)
                .Include(x => x.Buyer)
                .Include(x => x.Product)
                .SingleOrDefaultAsync(x => x.Id == id);

            return sale;
        }

        public async Task<bool> BuyProduct(Product product, int CustomerId)
        {
            if (product == null) return false;

            var sale = new Sale()
            {
                Quantity= product.Quantity,
                ProductId = product.Id,
                SellerId = product.UserId,
                BuyerId = CustomerId
            };

            var prod = await _context.Products
                .SingleOrDefaultAsync(x => x.Id == product.Id);

            prod.Quantity-=product.Quantity;

            await _context.Sales.AddAsync(sale);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<AppUser> GetUser(int id)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(x => x.Id == id);

            return user;
        }
    }
}
