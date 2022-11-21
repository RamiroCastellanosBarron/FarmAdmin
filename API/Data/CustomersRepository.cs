using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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

        public async Task<bool> BuyProduct(InventoryPharmacy pharmacyProduct, int CustomerId)
        {
            if (pharmacyProduct == null)
            {
                return false;
            }

            var sale = new Sale()
            {
                BuyerId = CustomerId,
                SellerId = pharmacyProduct.PharmacyId,
                ProductId = pharmacyProduct.ProductId,
                Quantity = pharmacyProduct.Quantity,
            };

            await _context.Sales.AddAsync(sale);

            var pharmaProduct = await _context.PharmacyProducts
                .FirstOrDefaultAsync(x => x.Id == pharmacyProduct.Id);

            pharmaProduct.Quantity -= pharmacyProduct.Quantity;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<AppUser>> GetPharmacies()
        {
            var pharmacies = new List<AppUser>();

            var users = await _context.Users
                .Include(x => x.UserRoles)
                .ToListAsync();

            foreach (var user in users)
            {
                foreach(var u in user.UserRoles)
                {
                    if(u.RoleId == 2)
                    {
                        pharmacies.Add(user);
                    }
                }
            }

            return pharmacies;
        }

        public async Task<IEnumerable<InventoryPharmacy>> GetPharmacyProducts(int id)
        {
            var pharmacyProducts = await _context.PharmacyProducts
                .Include(x => x.Pharmacy)
                .Include(x => x.Product)
                .Where(x => x.PharmacyId== id)
                .ToListAsync();

            return pharmacyProducts;
        }

        public async Task<InventoryPharmacy> GetProduct(int id)
        {
            var pharmacyProduct = await _context.PharmacyProducts
                .Include(x => x.Product)
                .Include(x => x.Pharmacy)
                .FirstOrDefaultAsync(x => x.Id == id);

            return pharmacyProduct;
        }

        public async Task<IEnumerable<InventoryPharmacyDto>> GetProducts()
        {
            var pharmacyProducts = await _context.PharmacyProducts
                .Include(x => x.Product)
                .Include(x => x.Pharmacy)
                .ProjectTo<InventoryPharmacyDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return pharmacyProducts;
        }

        public async Task<Sale> GetPurchase(int id)
        {
            var purchase = await _context.Sales
                .Include(x => x.Product)
                .Include(x => x.Seller)
                .Include(x => x.Buyer)
                .SingleOrDefaultAsync(x => x.Id == id);

            return purchase;
        }

        public async Task<IEnumerable<Sale>> GetPurchases(int id)
        {
            var sales = await _context.Sales
                .Include(x => x.Product)
                .Include(x => x.Seller)
                .OrderByDescending(x => x.SaleDate)
                .Where(x => x.BuyerId == id)
                .ToListAsync();

            return sales;
        }

        public async Task<AppUser> GetUser(int id)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(x => x.Id == id);

            return user;
        }
    }
}
