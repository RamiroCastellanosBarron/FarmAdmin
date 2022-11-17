using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<AppUser>> GetUsers();
    }
}
