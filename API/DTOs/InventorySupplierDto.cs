using API.Entities;

namespace API.DTOs
{
    public class InventorySupplierDto
    {
        public int Id { get; set; }

        public int SupplierId { get; set; }
        public SupplierDto Supplier { get; set; }

        public int ProductId { get; set; }
        public ProductDto Product { get; set; }

        public int Quantity { get; set; }
    }
}
