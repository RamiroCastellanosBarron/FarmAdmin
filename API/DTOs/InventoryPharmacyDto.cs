using API.Entities;

namespace API.DTOs
{
    public class InventoryPharmacyDto
    {
        public int Id { get; set; }

        public int PharmacyId { get; set; }
        public PharmacyDto Pharmacy { get; set; }

        public int ProductId { get; set; }
        public ProductDto Product { get; set; }

        public int Quantity { get; set; }
    }
}
