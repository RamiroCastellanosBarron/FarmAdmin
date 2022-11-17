namespace API.Entities
{
    public class Address
    {
        public int Id { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public int ZipCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        public ICollection<AppUser> Users { get; set; }
    }
}
