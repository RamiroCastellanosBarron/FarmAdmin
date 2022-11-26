using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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

        public async Task<bool> BuyProduct(InventorySupplier supplierProduct, int CustomerId)
        {
            if (supplierProduct == null)
            {
                return false;
            }

            var sale = new Sale()
            {
                BuyerId = CustomerId, 
                SellerId = supplierProduct.SupplierId,
                ProductId= supplierProduct.ProductId,
                Quantity = supplierProduct.Quantity,
            };

            await _context.Sales.AddAsync(sale);

            var supProduct = await _context.SupplierProducts
                .Where(x => x.SupplierId == supplierProduct.SupplierId && x.ProductId == supplierProduct.ProductId)
                .SingleAsync();

            supProduct.Quantity-=supplierProduct.Quantity;

            var pharmacyProduct = await _context.PharmacyProducts
                .Where(x => x.PharmacyId == CustomerId && x.ProductId == supplierProduct.ProductId)
                .SingleAsync();

            pharmacyProduct.Quantity+=supplierProduct.Quantity;

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
                .OrderByDescending(x => x.SaleDate)
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

        public async Task<InventorySupplier> GetItem(int id)
        {
            var item = await _context.SupplierProducts
                .Include(x => x.Supplier)
                .Include(x => x.Product)
                .FirstOrDefaultAsync(x => x.Id == id);

            return item;
        }

        // for supplier
        public async Task<IEnumerable<InventorySupplierDto>> GetItems()
        {
            var products = await _context.SupplierProducts
                .Include(x => x.Supplier)
                .Include(x => x.Product)
                .ProjectTo<InventorySupplierDto>(_mapper.ConfigurationProvider)
                .OrderByDescending(x => x.SupplierId)
                .ToListAsync();

            return products;
        }

        public async Task<InventoryPharmacy> GetProduct(int id)
        {
            var product = await _context.PharmacyProducts
                .Include(x => x.Product)
                .Include(x => x.Pharmacy)
                .FirstOrDefaultAsync(x => x.Id == id);

            return product;
        }

        public async Task<IEnumerable<InventoryPharmacy>> GetProducts(int id)
        {
            var products = await _context.PharmacyProducts
                .Include(x => x.Product)
                .Where(x => x.PharmacyId == id)
                .ToListAsync();

            return products;
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

        public async Task<IEnumerable<SaleDto>> GetPurchases(int id)
        {
            var purchases = await _context.Sales
                .Include(x => x.Product)
                .Include(x => x.Seller)
                .Where(x => x.BuyerId == id)
                .OrderByDescending(x => x.SaleDate)
                .ProjectTo<SaleDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return purchases;
        }

        public async Task<Sale> GetSale(int id)
        {
            var sale = await _context.Sales
                .Include(x => x.Product)
                .Include(x => x.Buyer)
                .Include(x => x.Seller)
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

        public async Task<AppUser> GetSupplier(int id)
        {
            var supplier = await _context.Users
                 .Include(x => x.SupplierProducts)
                 .ThenInclude(x => x.Product)
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
