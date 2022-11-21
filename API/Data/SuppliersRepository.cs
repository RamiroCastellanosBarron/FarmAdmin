using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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

        public Task<bool> DeleteProduct(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<AppUser> GetCustomer(int id)
        {
            var user = await _context.Users
                .Include(x => x.PharmacyProducts)
                .ThenInclude(x => x.Product)
                .SingleOrDefaultAsync(x => x.Id == id);

            return user;
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
                .Include(x => x.SupplierProducts)
                .ThenInclude(x => x.Supplier)
                .SingleOrDefaultAsync(x => x.Id == id);

            return product;
        }

        public async Task<IEnumerable<InventorySupplier>> GetProducts(int id)
        {
            var products = await _context.SupplierProducts
                .Include(x => x.Product)
                .Where(x => x.SupplierId == id)
                .ToListAsync();

            return products;
        }

        public async Task<Sale> GetSale(int id)
        {
            var sale = await _context.Sales
                .Include(x => x.Seller)
                .Include(x => x.Product)
                .Include(x => x.Buyer)
                .SingleOrDefaultAsync(x => x.Id == id);

            return sale;
        }

        public async Task<IEnumerable<SaleDto>> GetSales(int id)
        {
            var sales = await _context.Sales
                .Include(x => x.Buyer)
                .Include(x => x.Product)
                .Where(x => x.SellerId == id)
                .OrderByDescending(x => x.SaleDate)
                .ProjectTo<SaleDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return sales;
        }
    }
}
