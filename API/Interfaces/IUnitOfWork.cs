namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }

        ISuppliersRepository SuppliersRepository { get; }
        ICustomersRepository CustomersRepository { get; }
        IPharmaciesRepository PharmaciesRepository { get; }
    }
}
