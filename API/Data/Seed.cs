using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Reflection;
using System.Text.Json;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, DataContext context)
        {
            if (await userManager.Users.AnyAsync() == false)
            {
                var addresses = new List<Address>()
                { 
                    new Address {Street = "La Gloria",Number="220",ZipCode=66247,City="San Pedro", Country="México"},
                    new Address {Street = "Av Manuel Ordoñez",Number="421",ZipCode=66350,City="Santa Catarina", Country="México"},
                  new Address {Street = "Av Paseo de los Leones",Number="150-Local 4",ZipCode=643449,City="Monterrey", Country="México"},
                  new Address {Street = "Miguel Hidalgo y Costilla",Number="700",ZipCode=66350,City="Santa Catarina", Country="México"}, 
                  new Address {Street = "Río Mississippi",Number="218",ZipCode=66220,City="Monterrey", Country="México"},
                  new Address {Street = "Av Gonzalitos",Number="108",ZipCode=64620,City="Monterrey", Country="México"},
                  new Address {Street = "Calle",Number="100",ZipCode=66220,City="Monterrey", Country="México"},
                };

                if (await context.Addresses.AnyAsync() == false)
                {
                    foreach (var address in addresses)
                    {
                        await context.Addresses.AddAsync(address);
                    }
                    await context.SaveChangesAsync();
                }

                // ROLES
                // 1 -> Customer
                // 2 -> Pharmacy
                // 3 -> Supplier
                // 4 -> Admin
                var roles = new List<AppRole>
                {
                    new AppRole { Name = "Customer" },
                    new AppRole { Name = "Pharmacy" },
                    new AppRole { Name = "Supplier" },
                    new AppRole { Name = "Admin" }
                };

                foreach (var role in roles) { await roleManager.CreateAsync(role); }

                // CUSTOMERS
                // 1 -> ramiro
                // 2 -> leslie
                // 3 -> raulms
                // 4 -> axel
                // 5 -> jan
                var users = new List<AppUser>
                {
                    new AppUser { UserName = "ramiro", FirstName="Ramiro", LastName="Castellanos",Email="ramiro.castellanos@udem.edu",PhoneNumber="(81) 2080 0336",Gender="Male", AddressId = 7},
                    new AppUser { UserName = "leslie", FirstName="Leslie", LastName="Castellanos",Email="leslie.fabiola@udem.edu",PhoneNumber="(81) 2366 9680",Gender="Female", AddressId = 7 },
                    new AppUser { UserName = "raulms", FirstName="Raúl", LastName="Morales",Email="raul.morales@udem.edu",PhoneNumber="(553) 899 2863",Gender="Male", AddressId = 7},
                    new AppUser { UserName = "axel", FirstName="Axel", LastName="Leonardo",Email="axel.leonardo@udem.edu",PhoneNumber="(811) 510 5734",Gender="Male", AddressId = 7 },
                    new AppUser { UserName = "jan", FirstName="Jan", LastName="Reyes",Email="jan.reyes@udem.edu",PhoneNumber="(811) 568 1823",Gender="Male", AddressId = 7},
                };
                foreach (var u in users) { await userManager.CreateAsync(u, "Pa$$w0rd"); await userManager.AddToRoleAsync(u, "Customer"); }

                // ADMIN
                // 6 -> admin
                var admin = new AppUser { UserName = "admin", FirstName = "Ramiro", LastName = "Castellanos", Gender = "Male", PhoneNumber = "(81) 2080 0336", Email="ramiro.castellanos@udem.edu", AddressId = 1 };
                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] { "Admin" });

                // PHARMACIES
                // 7 -> ahorro
                // 8 -> especializadas
                // 9 -> benavides
                // 10 -> darox
                // 11 -> proasse
                var pharmacies = new List<AppUser>()
                {
                    new AppUser { UserName="ahorro", FirstName="Farmacias del Ahorro", LastName=", S.A. de C.V.", PhoneNumber="(800) 711 2222", Gender="Male", AddressId = 2, },
                    new AppUser { UserName="especializadas", FirstName="Farmacias Especializadas", LastName=", S.A. de C.V.", PhoneNumber="(81) 8196 9323", Gender="Male", AddressId = 3, },
                    new AppUser { UserName="benavides", FirstName="Farmacias Benavides", LastName=", S.A. de C.V.", PhoneNumber="(81) 8126 0000", Gender="Male", AddressId = 4, },
                    new AppUser { UserName="darox", FirstName="Farmacia Darox", LastName=", S.A. de C.V.", PhoneNumber="(81) 8335 0620", Gender="Male", AddressId = 5, },
                    new AppUser { UserName="proasse", FirstName="Farmacia Proasse", LastName=", S.A. de C.V.", PhoneNumber="(81) 1972 6030", Gender="Male", AddressId = 6, },
                };

                foreach (var p in pharmacies) { await userManager.CreateAsync(p, "Pa$$w0rd"); await userManager.AddToRolesAsync(p, new[] { "Pharmacy" }); }

                // SUPPLIERS
                // 12 -> rase
                // 13 -> bunzl
                // 14 -> sands
                // 15 -> regiomed
                // 16 -> alpilo
                var suppliers = new List<AppUser>()
                {
                    new AppUser { UserName = "rase", FirstName = "Proveedora Farmacéutica Rase", LastName = ", S.A. de C.V.", Gender = "Masculino", PhoneNumber = "(81) 8311 1103", AddressId = 2, },
                    new AppUser { UserName = "bunzl", FirstName = "Bunzl de México", LastName = ", S.A. de C.V.", Gender = "Masculino", PhoneNumber = "(81) 8313 9440", AddressId = 3, },
                    new AppUser { UserName = "sands", FirstName = "Grupo Sands", LastName = ", S.A. de C.V.", Gender = "Masculino", PhoneNumber = "(81) 8340 8096", AddressId = 4, },
                    new AppUser { UserName = "regiomed", FirstName = "Regiomed", LastName = ", S.A. de C.V.", Gender = "Masculino", PhoneNumber = "(81) 8358 5800", AddressId = 5, },
                    new AppUser { UserName = "alpilo", FirstName = "Alpilo", LastName = ", S.A. de C.V.", Gender = "Masculino", PhoneNumber = "(81) 8340 5919", AddressId = 6, },
                };
                foreach (var s in suppliers) { await userManager.CreateAsync(s, "Pa$$w0rd"); await userManager.AddToRolesAsync(s, new[] { "Supplier" }); }
            }

            var products = new List<Product>
            {
                // SUPPLIERS products
                // 12 -> rase (1-5)
                /* 1 */ new Product { Name = "Vick Pyrena Noche", Description = "5 sobres", Price = 105.00, Quantity = 1000, UserId = 12 },
                /* 2 */ new Product { Name = "Reddy", Description = "Jarabe adulto 150mg", Price = 113.00, Quantity = 1000, UserId = 12 },
                /* 3 */ new Product { Name = "Zyrtec orodispersables", Description = "10 mg 10 tabletas", Price = 170.50, Quantity = 1000, UserId = 12 },
                /* 4 */ new Product { Name = "Tylenol analgésico", Description = "10 tabletas", Price = 43.50, Quantity = 1000, UserId = 12 },
                /* 5 */ new Product { Name = "Motrin analgésico suspensión infantil", Description = "120 ml", Price = 144.00, Quantity = 1000, UserId = 12 },
                // 13 -> bunzl (6-10)
                /* 6 */ new Product { Name = "Vick Pyrena Noche", Description = "5 sobres", Price = 105.00, Quantity = 1000, UserId = 13 },
                /* 7 */ new Product { Name = "Reddy", Description = "Jarabe adulto 150mg", Price = 113.00, Quantity = 1000, UserId = 13 },
                /* 8 */ new Product { Name = "Zyrtec orodispersables", Description = "10 mg 10 tabletas", Price = 170.50, Quantity = 1000, UserId = 13 },
                /* 9 */ new Product { Name = "Tylenol analgésico", Description = "10 tabletas", Price = 43.50, Quantity = 1000, UserId = 13 },
                /* 10 */ new Product { Name = "Motrin analgésico suspensión infantil", Description = "120 ml", Price = 144.00, Quantity = 1000, UserId = 13 },
                // 14 -> sands (11-15)
                /* 11 */ new Product { Name = "Vick Pyrena Noche", Description = "5 sobres", Price = 105.00, Quantity = 1000, UserId = 14 },
                /* 12 */ new Product { Name = "Reddy", Description = "Jarabe adulto 150mg", Price = 113.00, Quantity = 1000, UserId = 14 },
                /* 13 */ new Product { Name = "Zyrtec orodispersables", Description = "10 mg 10 tabletas", Price = 170.50, Quantity = 1000, UserId = 14 },
                /* 14 */ new Product { Name = "Tylenol analgésico", Description = "10 tabletas", Price = 43.50, Quantity = 1000, UserId = 14 },
                /* 15 */ new Product { Name = "Motrin analgésico suspensión infantil", Description = "120 ml", Price = 144.00, Quantity = 1000, UserId = 14 },
                // 15 -> regiomed (16-20)
                /* 16 */ new Product { Name = "Vick Pyrena Noche", Description = "5 sobres", Price = 105.00, Quantity = 1000, UserId = 15 },
                /* 17 */ new Product { Name = "Reddy", Description = "Jarabe adulto 150mg", Price = 113.00, Quantity = 1000, UserId = 15 },
                /* 18 */ new Product { Name = "Zyrtec orodispersables", Description = "10 mg 10 tabletas", Price = 170.50, Quantity = 1000, UserId = 15 },
                /* 19 */ new Product { Name = "Tylenol analgésico", Description = "10 tabletas", Price = 43.50, Quantity = 1000, UserId = 15 },
                /* 20 */ new Product { Name = "Motrin analgésico suspensión infantil", Description = "120 ml", Price = 144.00, Quantity = 1000, UserId = 15 },
                // 16 -> alpilo (21-25)
                /* 21 */ new Product { Name = "Vick Pyrena Noche", Description = "5 sobres", Price = 105.00, Quantity = 1000, UserId = 16 },
                /* 22 */ new Product { Name = "Reddy", Description = "Jarabe adulto 150mg", Price = 113.00, Quantity = 1000, UserId = 16 },
                /* 23 */ new Product { Name = "Zyrtec orodispersables", Description = "10 mg 10 tabletas", Price = 170.50, Quantity = 1000, UserId = 16 },
                /* 24 */ new Product { Name = "Tylenol analgésico", Description = "10 tabletas", Price = 43.50, Quantity = 1000, UserId = 16 },
                /* 25 */ new Product { Name = "Motrin analgésico suspensión infantil", Description = "120 ml", Price = 144.00, Quantity = 1000, UserId = 16 },

                // PHARMACIES products
                // 7 -> ahorro (26-30)
                /* 26 */ new Product { Name = "Vick Pyrena Noche", Description = "5 sobres", Price = 105.00, Quantity = 200, UserId = 7 },
                /* 27 */ new Product { Name = "Reddy", Description = "Jarabe adulto 150mg", Price = 113.00, Quantity = 200, UserId = 7 },
                /* 28 */ new Product { Name = "Zyrtec orodispersables", Description = "10 mg 10 tabletas", Price = 170.50, Quantity = 200, UserId = 7 },
                /* 29 */ new Product { Name = "Tylenol analgésico", Description = "10 tabletas", Price = 43.50, Quantity = 200, UserId = 7 },
                /* 30 */ new Product { Name = "Motrin analgésico suspensión infantil", Description = "120 ml", Price = 144.00, Quantity = 200, UserId = 7 },
                // 8 -> especializadas (31-35)
                /* 31 */ new Product { Name = "Vick Pyrena Noche", Description = "5 sobres", Price = 105.00, Quantity = 200, UserId = 8 },
                /* 32 */ new Product { Name = "Reddy", Description = "Jarabe adulto 150mg", Price = 113.00, Quantity = 200, UserId = 8 },
                /* 33 */ new Product { Name = "Zyrtec orodispersables", Description = "10 mg 10 tabletas", Price = 170.50, Quantity = 200, UserId = 8 },
                /* 34 */ new Product { Name = "Tylenol analgésico", Description = "10 tabletas", Price = 43.50, Quantity = 200, UserId = 8 },
                /* 35 */ new Product { Name = "Motrin analgésico suspensión infantil", Description = "120 ml", Price = 144.00, Quantity = 200, UserId = 8 },
                // 9 -> benavides (36-40)
                /* 36 */ new Product { Name = "Vick Pyrena Noche", Description = "5 sobres", Price = 105.00, Quantity = 200, UserId = 9 },
                /* 37 */ new Product { Name = "Reddy", Description = "Jarabe adulto 150mg", Price = 113.00, Quantity = 200, UserId = 9 },
                /* 38 */ new Product { Name = "Zyrtec orodispersables", Description = "10 mg 10 tabletas", Price = 170.50, Quantity = 200, UserId = 9 },
                /* 39 */ new Product { Name = "Tylenol analgésico", Description = "10 tabletas", Price = 43.50, Quantity = 200, UserId = 9 },
                /* 40 */ new Product { Name = "Motrin analgésico suspensión infantil", Description = "120 ml", Price = 144.00, Quantity = 200, UserId = 9 },
                // 10 -> darox (41-45)
                /* 41 */ new Product { Name = "Vick Pyrena Noche", Description = "5 sobres", Price = 105.00, Quantity = 200, UserId = 10 },
                /* 42 */ new Product { Name = "Reddy", Description = "Jarabe adulto 150mg", Price = 113.00, Quantity = 200, UserId = 10 },
                /* 43 */ new Product { Name = "Zyrtec orodispersables", Description = "10 mg 10 tabletas", Price = 170.50, Quantity = 200, UserId = 10 },
                /* 44 */ new Product { Name = "Tylenol analgésico", Description = "10 tabletas", Price = 43.50, Quantity = 200, UserId = 10 },
                /* 45 */ new Product { Name = "Motrin analgésico suspensión infantil", Description = "120 ml", Price = 144.00, Quantity = 200, UserId = 10 },
                // 11 -> proasse (46-50)
                /* 46 */ new Product { Name = "Vick Pyrena Noche", Description = "5 sobres", Price = 105.00, Quantity = 200, UserId = 11 },
                /* 47 */ new Product { Name = "Reddy", Description = "Jarabe adulto 150mg", Price = 113.00, Quantity = 200, UserId = 11 },
                /* 48 */ new Product { Name = "Zyrtec orodispersables", Description = "10 mg 10 tabletas", Price = 170.50, Quantity = 200, UserId = 11 },
                /* 49 */ new Product { Name = "Tylenol analgésico", Description = "10 tabletas", Price = 43.50, Quantity = 200, UserId = 11 },
                /* 50 */ new Product { Name = "Motrin analgésico suspensión infantil", Description = "120 ml", Price = 144.00, Quantity = 200, UserId = 11 },
            };

            if (await context.Products.AnyAsync() == false) { for (int i = 0; i <= products.Count - 1; i++) { await context.Products.AddAsync(products[i]); } await context.SaveChangesAsync(); }

            var sales = new List<Sale>()
            {
                // SUPPLIER (Seller) -> PHARMACY (Buyer)
                //             12                   7
                new Sale { Quantity = 100, SellerId = 12, BuyerId = 7, ProductId = 1 },
                new Sale { Quantity = 100, SellerId = 12, BuyerId = 8, ProductId = 2 },
                new Sale { Quantity = 100, SellerId = 12, BuyerId = 9, ProductId = 3 },
                new Sale { Quantity = 100, SellerId = 12, BuyerId = 10, ProductId = 4 },
                new Sale { Quantity = 100, SellerId = 12, BuyerId = 11, ProductId = 5 },
                // SUPPLIER (Seller) -> PHARMACY (Buyer)
                //             13                   8
                new Sale { Quantity = 100, SellerId = 13, BuyerId = 7, ProductId = 6 },
                new Sale { Quantity = 100, SellerId = 13, BuyerId = 8, ProductId = 7 },
                new Sale { Quantity = 100, SellerId = 13, BuyerId = 9, ProductId = 8 },
                new Sale { Quantity = 100, SellerId = 13, BuyerId = 10, ProductId = 9 },
                new Sale { Quantity = 100, SellerId = 13, BuyerId = 11, ProductId = 10 },
                // SUPPLIER (Seller) -> PHARMACY (Buyer)
                //             14                   9
                new Sale { Quantity = 100, SellerId = 14, BuyerId = 7, ProductId = 11 },
                new Sale { Quantity = 100, SellerId = 14, BuyerId = 8, ProductId = 12 },
                new Sale { Quantity = 100, SellerId = 14, BuyerId = 9, ProductId = 13 },
                new Sale { Quantity = 100, SellerId = 14, BuyerId = 10, ProductId = 14 },
                new Sale { Quantity = 100, SellerId = 14, BuyerId = 11, ProductId = 15 },
                // SUPPLIER (Seller) -> PHARMACY (Buyer)
                //             15                   10
                new Sale { Quantity = 100, SellerId = 15, BuyerId = 7, ProductId = 16 },
                new Sale { Quantity = 100, SellerId = 15, BuyerId = 8, ProductId = 17 },
                new Sale { Quantity = 100, SellerId = 15, BuyerId = 9, ProductId = 18 },
                new Sale { Quantity = 100, SellerId = 15, BuyerId = 10, ProductId = 19 },
                new Sale { Quantity = 100, SellerId = 15, BuyerId = 11, ProductId = 20 },
                // SUPPLIER (Seller) -> PHARMACY (Buyer)
                //             16                   11
                new Sale { Quantity = 100, SellerId = 16, BuyerId = 7, ProductId = 21 },
                new Sale { Quantity = 100, SellerId = 16, BuyerId = 8, ProductId = 22 },
                new Sale { Quantity = 100, SellerId = 16, BuyerId = 9, ProductId = 23 },
                new Sale { Quantity = 100, SellerId = 16, BuyerId = 10, ProductId = 24 },
                new Sale { Quantity = 100, SellerId = 16, BuyerId = 11, ProductId = 25 },
                // PHARMACIES
                //Pharmacy (Seller [7] [26-30]) -> Customer (Buyer (1-5))
                new Sale { Quantity = 2, SellerId = 7, BuyerId = 1, ProductId = 26 },
                new Sale { Quantity = 2, SellerId = 7, BuyerId = 2, ProductId = 27 },
                new Sale { Quantity = 2, SellerId = 7, BuyerId = 3, ProductId = 28 },
                new Sale { Quantity = 2, SellerId = 7, BuyerId = 4, ProductId = 29 },
                new Sale { Quantity = 2, SellerId = 7, BuyerId = 5, ProductId = 30 },
                //Pharmacy (Seller [8] [31-35]) -> Customer (Buyer (1-5))
                new Sale { Quantity = 2, SellerId = 8, BuyerId = 1, ProductId = 31 },
                new Sale { Quantity = 2, SellerId = 8, BuyerId = 2, ProductId = 32 },
                new Sale { Quantity = 2, SellerId = 8, BuyerId = 3, ProductId = 33 },
                new Sale { Quantity = 2, SellerId = 8, BuyerId = 4, ProductId = 34 },
                new Sale { Quantity = 2, SellerId = 8, BuyerId = 5, ProductId = 35 },
                //Pharmacy (Seller [9] [36-40]) -> Customer (Buyer (1-5))
                new Sale { Quantity = 2, SellerId = 9, BuyerId = 1, ProductId = 36 },
                new Sale { Quantity = 2, SellerId = 9, BuyerId = 2, ProductId = 37 },
                new Sale { Quantity = 2, SellerId = 9, BuyerId = 3, ProductId = 38 },
                new Sale { Quantity = 2, SellerId = 9, BuyerId = 4, ProductId = 39 },
                new Sale { Quantity = 2, SellerId = 9, BuyerId = 5, ProductId = 40 },
                //Pharmacy (Seller [10] [41-45]) -> Customer (Buyer (1-5))
                new Sale { Quantity = 2, SellerId = 10, BuyerId = 1, ProductId = 41 },
                new Sale { Quantity = 2, SellerId = 10, BuyerId = 2, ProductId = 42 },
                new Sale { Quantity = 2, SellerId = 10, BuyerId = 3, ProductId = 43 },
                new Sale { Quantity = 2, SellerId = 10, BuyerId = 4, ProductId = 44 },
                new Sale { Quantity = 2, SellerId = 10, BuyerId = 5, ProductId = 45 },
                //Pharmacy (Seller [11] [46-50]) -> Customer (Buyer (1-5))
                new Sale { Quantity = 2, SellerId = 11, BuyerId = 1, ProductId = 46 },
                new Sale { Quantity = 2, SellerId = 11, BuyerId = 2, ProductId = 47 },
                new Sale { Quantity = 2, SellerId = 11, BuyerId = 3, ProductId = 48 },
                new Sale { Quantity = 2, SellerId = 11, BuyerId = 4, ProductId = 49 },
                new Sale { Quantity = 2, SellerId = 11, BuyerId = 5, ProductId = 50 },
            };

            if (await context.Sales.AnyAsync() == false) { for (int i = 0; i <= sales.Count - 1; i++) { await context.Sales.AddAsync(sales[i]); } await context.SaveChangesAsync(); } 
        }
    }
}
