using API.Entities;

namespace API.DTOs
{
    public class SaleDto
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public DateTime SaleDate { get; set; } = DateTime.Now;

        public int ProductId { get; set; }
        public ProductDto Product { get; set; }

        public int SellerId { get; set; }
        public SellerDto Seller { get; set; }

        public int BuyerId { get; set; }
        public BuyerDto Buyer { get; set; }
    }
}
