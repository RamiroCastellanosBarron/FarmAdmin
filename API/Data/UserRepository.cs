using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AppUser>> GetCustomersForPharmacy(string username)
        {
            var customers = await _context.Users
                .Where(x => x.UserName != username)
                .ToListAsync();

            // 1 for customers

            var customersList = new List<AppUser>();

            foreach (var customer in customers)
            {
                foreach (var c in customer.UserRoles)
                {
                    if(c.RoleId == 1)
                    {
                        customersList.Add(customer);
                    }
                }
            }

            return customersList;
        }

        public async Task<IEnumerable<AppUser>> GetFarmaciesForSupplier(string username)
        {
            var farmacies = await _context.Users
                .Where(x => x.UserName != username)
                .ToListAsync();

            var farmacyList = new List<AppUser>();

            foreach (var farm in farmacies)
            {
                foreach(var f in farm.UserRoles)
                {
                    if(f.RoleId == 3)
                    {
                        farmacyList.Add(farm);
                    }
                }
            }

            return farmacyList;
        }

        public async Task<IEnumerable<AppUser>> GetSuppliersForPharmacy(string username)
        {
            var suppliers = await _context.Users
                .Where(x => x.UserName != username)
                .ToListAsync();

            // 3 for supplier

            var suppliersList = new List<AppUser>();

            foreach (var supplier in suppliers)
            {
                foreach (var s in supplier.UserRoles)
                {
                    if (s.RoleId == 3)
                    {
                        suppliersList.Add(supplier);
                    }
                }
            }

            return suppliersList;
        }

        public async Task<IEnumerable<AppUser>> GetUsers()
        {
            var users = await _context.Users
                .ToListAsync();

            return users;
        }
    }
}
