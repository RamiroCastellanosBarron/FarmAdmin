namespace API.Entities
{
    public class InventorySupplier
    {
        public int Id { get; set; }

        public int SupplierId { get; set; }
        public AppUser Supplier { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int Quantity { get; set; }
    }
}
