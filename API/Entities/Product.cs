namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }

        public ICollection<InventoryPharmacy> PharmacyProducts { get; set; }
        public ICollection<InventorySupplier> SupplierProducts { get; set; }

        public ICollection<Sale> ProductSales { get; set; }
    }
}
