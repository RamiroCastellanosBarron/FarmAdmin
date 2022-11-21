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

                // CLIENTES

                var users = new List<AppUser>
                {
                    new AppUser { UserName = "ramiro", FirstName="Ramiro", LastName="Castellanos",Email="ramiro.castellanos@udem.edu",PhoneNumber="(81) 2080 0336",Gender="Male", AddressId = 1},
                    new AppUser { UserName = "leslie", FirstName="Leslie", LastName="López",Email="leslie.fabiola@udem.edu",PhoneNumber="(81) 2366 9680",Gender="Female", AddressId = 2 },
                    new AppUser { UserName = "raulms", FirstName="Raúl", LastName="Morales",Email="raul.morales@udem.edu",PhoneNumber="(553) 899 2863",Gender="Male", AddressId = 3},
                    new AppUser { UserName = "axel", FirstName="Axel", LastName="Leonardo",Email="axel.leonardo@udem.edu",PhoneNumber="(811) 510 5734",Gender="Male", AddressId = 4 },
                    new AppUser { UserName = "jan", FirstName="Jan", LastName="Reyes",Email="jan.reyes@udem.edu",PhoneNumber="(811) 568 1823",Gender="Male", AddressId = 5},
                };
                foreach (var u in users) { await userManager.CreateAsync(u, "Pa$$w0rd"); await userManager.AddToRoleAsync(u, "Customer"); }

                // ADMIN
                // 6 -> admin
                var admin = new AppUser { UserName = "admin", FirstName = "Ramiro", LastName = "Castellanos", Gender = "Male", PhoneNumber = "(81) 2080 0336", Email = "ramiro.castellanos@udem.edu", AddressId = 1 };
                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] { "Admin" });

                // PHARMACIES
                // 7 -> ahorro
                // 8 -> especializadas
                // 9 -> benavides
                // 10 -> darox
                // 11 -> proasse

                // FARMACIAS

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

                // PROVEEDORES

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
                new Product { Name = "Tylenol", Description = "Tableta 500 mg", Price = 43.5, },
                new Product { Name = "Aspirina", Description = "500 mg 20 tabletas", Price = 25, },
                new Product { Name = "Celestone", Description = "Solución Ampula 1 ML", Price = 210, },
                new Product { Name = "Vermox Plus", Description = "Oral con 2 tabletas", Price = 43.50, },
                new Product { Name = "Advil 12 horas", Description = "600 mg analgésico 12 tabletas", Price = 142, },
                new Product { Name = "Capin BH", Description = "Butilhioscina Tableta 10 mg", Price = 310.50, },
            };
            if (await context.Products.AnyAsync() == false) { for (int i = 0; i <= products.Count - 1; i++) { await context.Products.AddAsync(products[i]); } await context.SaveChangesAsync(); }

            var supplierProducts = new List<InventorySupplier>
            {
                new InventorySupplier { Quantity = 1000, ProductId = 1, SupplierId = 12 },
                new InventorySupplier { Quantity = 1000, ProductId = 2, SupplierId = 12 },
                new InventorySupplier { Quantity = 1000, ProductId = 3, SupplierId = 12 },
                new InventorySupplier { Quantity = 1000, ProductId = 4, SupplierId = 12 },
                new InventorySupplier { Quantity = 1000, ProductId = 5, SupplierId = 12 },
                new InventorySupplier { Quantity = 1000, ProductId = 6, SupplierId = 12 },

                new InventorySupplier { Quantity = 1000, ProductId = 1, SupplierId = 13 },
                new InventorySupplier { Quantity = 1000, ProductId = 2, SupplierId = 13 },
                new InventorySupplier { Quantity = 1000, ProductId = 3, SupplierId = 13 },
                new InventorySupplier { Quantity = 1000, ProductId = 4, SupplierId = 13 },
                new InventorySupplier { Quantity = 1000, ProductId = 5, SupplierId = 13 },
                new InventorySupplier { Quantity = 1000, ProductId = 6, SupplierId = 13 },

                new InventorySupplier { Quantity = 1000, ProductId = 1, SupplierId = 14 },
                new InventorySupplier { Quantity = 1000, ProductId = 2, SupplierId = 14 },
                new InventorySupplier { Quantity = 1000, ProductId = 3, SupplierId = 14 },
                new InventorySupplier { Quantity = 1000, ProductId = 4, SupplierId = 14 },
                new InventorySupplier { Quantity = 1000, ProductId = 5, SupplierId = 14 },
                new InventorySupplier { Quantity = 1000, ProductId = 6, SupplierId = 14 },

                new InventorySupplier { Quantity = 1000, ProductId = 1, SupplierId = 15 },
                new InventorySupplier { Quantity = 1000, ProductId = 2, SupplierId = 15 },
                new InventorySupplier { Quantity = 1000, ProductId = 3, SupplierId = 15 },
                new InventorySupplier { Quantity = 1000, ProductId = 4, SupplierId = 15 },
                new InventorySupplier { Quantity = 1000, ProductId = 5, SupplierId = 15 },
                new InventorySupplier { Quantity = 1000, ProductId = 6, SupplierId = 15 },

                new InventorySupplier { Quantity = 1000, ProductId = 1, SupplierId = 16 },
                new InventorySupplier { Quantity = 1000, ProductId = 2, SupplierId = 16 },
                new InventorySupplier { Quantity = 1000, ProductId = 3, SupplierId = 16 },
                new InventorySupplier { Quantity = 1000, ProductId = 4, SupplierId = 16 },
                new InventorySupplier { Quantity = 1000, ProductId = 5, SupplierId = 16 },
                new InventorySupplier { Quantity = 1000, ProductId = 6, SupplierId = 16 },
            };

            if (await context.SupplierProducts.AnyAsync() == false) { for (int i = 0; i <= supplierProducts.Count - 1; i++) { await context.SupplierProducts.AddAsync(supplierProducts[i]); } await context.SaveChangesAsync(); }

            var pharmacyProducts = new List<InventoryPharmacy>
            {
                new InventoryPharmacy { Quantity = 200, ProductId = 1, PharmacyId = 7 },
                new InventoryPharmacy { Quantity = 200, ProductId = 2, PharmacyId = 7 },
                new InventoryPharmacy { Quantity = 200, ProductId = 3, PharmacyId = 7 },
                new InventoryPharmacy { Quantity = 200, ProductId = 4, PharmacyId = 7 },
                new InventoryPharmacy { Quantity = 200, ProductId = 5, PharmacyId = 7 },
                new InventoryPharmacy { Quantity = 200, ProductId = 6, PharmacyId = 7 },

                new InventoryPharmacy { Quantity = 200, ProductId = 1, PharmacyId = 8 },
                new InventoryPharmacy { Quantity = 200, ProductId = 2, PharmacyId = 8 },
                new InventoryPharmacy { Quantity = 200, ProductId = 3, PharmacyId = 8 },
                new InventoryPharmacy { Quantity = 200, ProductId = 4, PharmacyId = 8 },
                new InventoryPharmacy { Quantity = 200, ProductId = 5, PharmacyId = 8 },
                new InventoryPharmacy { Quantity = 200, ProductId = 6, PharmacyId = 8 },

                new InventoryPharmacy { Quantity = 200, ProductId = 1, PharmacyId = 9 },
                new InventoryPharmacy { Quantity = 200, ProductId = 2, PharmacyId = 9 },
                new InventoryPharmacy { Quantity = 200, ProductId = 3, PharmacyId = 9 },
                new InventoryPharmacy { Quantity = 200, ProductId = 4, PharmacyId = 9 },
                new InventoryPharmacy { Quantity = 200, ProductId = 5, PharmacyId = 9 },
                new InventoryPharmacy { Quantity = 200, ProductId = 6, PharmacyId = 9 },

                new InventoryPharmacy { Quantity = 200, ProductId = 1, PharmacyId = 10 },
                new InventoryPharmacy { Quantity = 200, ProductId = 2, PharmacyId = 10 },
                new InventoryPharmacy { Quantity = 200, ProductId = 3, PharmacyId = 10 },
                new InventoryPharmacy { Quantity = 200, ProductId = 4, PharmacyId = 10 },
                new InventoryPharmacy { Quantity = 200, ProductId = 5, PharmacyId = 10 },
                new InventoryPharmacy { Quantity = 200, ProductId = 6, PharmacyId = 10 },

                new InventoryPharmacy { Quantity = 200, ProductId = 1, PharmacyId = 11 },
                new InventoryPharmacy { Quantity = 200, ProductId = 2, PharmacyId = 11 },
                new InventoryPharmacy { Quantity = 200, ProductId = 3, PharmacyId = 11 },
                new InventoryPharmacy { Quantity = 200, ProductId = 4, PharmacyId = 11 },
                new InventoryPharmacy { Quantity = 200, ProductId = 5, PharmacyId = 11 },
                new InventoryPharmacy { Quantity = 200, ProductId = 6, PharmacyId = 11 },
            };

            if (await context.PharmacyProducts.AnyAsync() == false) { for (int i = 0; i <= pharmacyProducts.Count - 1; i++) { await context.PharmacyProducts.AddAsync(pharmacyProducts[i]); } await context.SaveChangesAsync(); }

            var supplierSales = new List<Sale>
            {
                new Sale { BuyerId = 7, SellerId = 12, ProductId = 1, Quantity = 1 },
                new Sale { BuyerId = 7, SellerId = 12, ProductId = 2, Quantity = 1 },
                new Sale { BuyerId = 7, SellerId = 12, ProductId = 3, Quantity = 1 },
                new Sale { BuyerId = 7, SellerId = 12, ProductId = 4, Quantity = 1 },
                new Sale { BuyerId = 7, SellerId = 12, ProductId = 5, Quantity = 1 },
                new Sale { BuyerId = 7, SellerId = 12, ProductId = 6, Quantity = 1 },

                new Sale { BuyerId = 8, SellerId = 13, ProductId = 1, Quantity = 1 },
                new Sale { BuyerId = 8, SellerId = 13, ProductId = 2, Quantity = 1 },
                new Sale { BuyerId = 8, SellerId = 13, ProductId = 3, Quantity = 1 },
                new Sale { BuyerId = 8, SellerId = 13, ProductId = 4, Quantity = 1 },
                new Sale { BuyerId = 8, SellerId = 13, ProductId = 5, Quantity = 1 },
                new Sale { BuyerId = 8, SellerId = 13, ProductId = 6, Quantity = 1 },

                new Sale { BuyerId = 9, SellerId = 14, ProductId = 1, Quantity = 1 },
                new Sale { BuyerId = 9, SellerId = 14, ProductId = 2, Quantity = 1 },
                new Sale { BuyerId = 9, SellerId = 14, ProductId = 3, Quantity = 1 },
                new Sale { BuyerId = 9, SellerId = 14, ProductId = 4, Quantity = 1 },
                new Sale { BuyerId = 9, SellerId = 14, ProductId = 5, Quantity = 1 },
                new Sale { BuyerId = 9, SellerId = 14, ProductId = 6, Quantity = 1 },

                new Sale { BuyerId = 10, SellerId = 15, ProductId = 1, Quantity = 1 },
                new Sale { BuyerId = 10, SellerId = 15, ProductId = 2, Quantity = 1 },
                new Sale { BuyerId = 10, SellerId = 15, ProductId = 3, Quantity = 1 },
                new Sale { BuyerId = 10, SellerId = 15, ProductId = 4, Quantity = 1 },
                new Sale { BuyerId = 10, SellerId = 15, ProductId = 5, Quantity = 1 },
                new Sale { BuyerId = 10, SellerId = 15, ProductId = 6, Quantity = 1 },

                new Sale { BuyerId = 11, SellerId = 16, ProductId = 1, Quantity = 1 },
                new Sale { BuyerId = 11, SellerId = 16, ProductId = 2, Quantity = 1 },
                new Sale { BuyerId = 11, SellerId = 16, ProductId = 3, Quantity = 1 },
                new Sale { BuyerId = 11, SellerId = 16, ProductId = 4, Quantity = 1 },
                new Sale { BuyerId = 11, SellerId = 16, ProductId = 5, Quantity = 1 },
                new Sale { BuyerId = 11, SellerId = 16, ProductId = 6, Quantity = 1 },

                new Sale { BuyerId = 1, SellerId = 7, ProductId = 1, Quantity = 1 },
                new Sale { BuyerId = 1, SellerId = 7, ProductId = 2, Quantity = 1 },
                new Sale { BuyerId = 1, SellerId = 7, ProductId = 3, Quantity = 1 },
                new Sale { BuyerId = 1, SellerId = 7, ProductId = 4, Quantity = 1 },
                new Sale { BuyerId = 1, SellerId = 7, ProductId = 5, Quantity = 1 },
                new Sale { BuyerId = 1, SellerId = 7, ProductId = 6, Quantity = 1 },

                new Sale { BuyerId = 2, SellerId = 8, ProductId = 1, Quantity = 1 },
                new Sale { BuyerId = 2, SellerId = 8, ProductId = 2, Quantity = 1 },
                new Sale { BuyerId = 2, SellerId = 8, ProductId = 3, Quantity = 1 },
                new Sale { BuyerId = 2, SellerId = 8, ProductId = 4, Quantity = 1 },
                new Sale { BuyerId = 2, SellerId = 8, ProductId = 5, Quantity = 1 },
                new Sale { BuyerId = 2, SellerId = 8, ProductId = 6, Quantity = 1 },

                new Sale { BuyerId = 3, SellerId = 9, ProductId = 1, Quantity = 1 },
                new Sale { BuyerId = 3, SellerId = 9, ProductId = 2, Quantity = 1 },
                new Sale { BuyerId = 3, SellerId = 9, ProductId = 3, Quantity = 1 },
                new Sale { BuyerId = 3, SellerId = 9, ProductId = 4, Quantity = 1 },
                new Sale { BuyerId = 3, SellerId = 9, ProductId = 5, Quantity = 1 },
                new Sale { BuyerId = 3, SellerId = 9, ProductId = 6, Quantity = 1 },

                new Sale { BuyerId = 4, SellerId = 10, ProductId = 1, Quantity = 1 },
                new Sale { BuyerId = 4, SellerId = 10, ProductId = 2, Quantity = 1 },
                new Sale { BuyerId = 4, SellerId = 10, ProductId = 3, Quantity = 1 },
                new Sale { BuyerId = 4, SellerId = 10, ProductId = 4, Quantity = 1 },
                new Sale { BuyerId = 4, SellerId = 10, ProductId = 5, Quantity = 1 },
                new Sale { BuyerId = 4, SellerId = 10, ProductId = 6, Quantity = 1 },

                new Sale { BuyerId = 5, SellerId = 11, ProductId = 1, Quantity = 1 },
                new Sale { BuyerId = 5, SellerId = 11, ProductId = 2, Quantity = 1 },
                new Sale { BuyerId = 5, SellerId = 11, ProductId = 3, Quantity = 1 },
                new Sale { BuyerId = 5, SellerId = 11, ProductId = 4, Quantity = 1 },
                new Sale { BuyerId = 5, SellerId = 11, ProductId = 5, Quantity = 1 },
                new Sale { BuyerId = 5, SellerId = 11, ProductId = 6, Quantity = 1 },
            };

            if (await context.Sales.AnyAsync() == false) { for (int i = 0; i <= supplierSales.Count - 1; i++) { await context.Sales.AddAsync(supplierSales[i]); } await context.SaveChangesAsync(); }
        }
    }
}
