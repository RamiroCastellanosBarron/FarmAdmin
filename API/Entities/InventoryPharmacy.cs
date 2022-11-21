namespace API.Entities
{
    public class InventoryPharmacy
    {
        public int Id { get; set; }

        public int PharmacyId { get; set; }
        public AppUser Pharmacy { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int Quantity { get; set; }
    }
}
