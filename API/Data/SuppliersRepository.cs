using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class SuppliersRepository : ISuppliersRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public SuppliersRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> DeleteProduct(int id)
        {
            var product = await _context.Products
                .SingleOrDefaultAsync(x => x.Id == id);

            var response = _context.Products.Remove(product);

            if (response == null) return false;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<AppUser> GetCustomer(int id)
        {
            var customer = await _context.Users
                .Include(x => x.Products)
                .SingleOrDefaultAsync(x => x.Id == id);

            return customer;
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
                    if (c.RoleId == 2) customersList.Add(customer);
                }
            }

            return customersList;
        }

        public async Task<Product> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(x => x.User)
                .SingleOrDefaultAsync(x => x.Id == id);

            return product;
        }

        public async Task<IEnumerable<Product>> GetProducts(int id)
        {
            var products = await _context.Products
                .Where(x => x.UserId == id)
                .ToListAsync();

            return products;
        }

        public async Task<Sale> GetSale(int id)
        {
            var sale = await _context.Sales
                .SingleOrDefaultAsync(x => x.Id == id);

            return sale;
        }

        public async Task<IEnumerable<Sale>> GetSales(int id)
        {
            var sales = await _context.Sales
                .Include(x => x.Product)
                .Include(x => x.Buyer)
                .Where(x => x.SellerId == id)
                .ToListAsync();

            return sales;
        }
    }
}
