using API.Interfaces;
using AutoMapper;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IUserRepository UserRepository => new UserRepository(_context, _mapper);

        public ISuppliersRepository SuppliersRepository => new SuppliersRepository(_context, _mapper);

        public ICustomersRepository CustomersRepository => new CustomersRepository(_context, _mapper);

        public IPharmaciesRepository PharmaciesRepository => new PharmaciesRepository(_context, _mapper);
    }
}
