namespace API.Entities
{
    public class Sale
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public DateTime SaleDate { get; set; } = DateTime.Now;

        public int SellerId { get; set; }
        public AppUser Seller { get; set; }

        public int BuyerId { get; set; }
        public AppUser Buyer { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}
