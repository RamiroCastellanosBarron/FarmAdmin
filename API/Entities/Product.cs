namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }

        public int UserId { get; set; }
        public AppUser User { get; set; }
        public ICollection<Sale> Sales { get; set; }
    }
}
