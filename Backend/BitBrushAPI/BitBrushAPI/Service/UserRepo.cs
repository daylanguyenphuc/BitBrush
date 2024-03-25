using BitBrushAPI.Data;
using BitBrushAPI.Model;
using Microsoft.EntityFrameworkCore;
using System.Runtime.Intrinsics.Arm;

namespace BitBrushAPI.Service
{
    public interface IUserRepo
    {
        public List<UserFullDTO> GetAllUsers();
        public UserFullDTO GetUserById(Guid id);
        public UserFullDTO AddUser(UserAddDTO user);
        public void UpdateUser(Guid id, UserAddDTO updateUser);
        public void DeleteUser(Guid id);
        public List<RankingDTO> Ranking();
    }
    public class UserRepo : IUserRepo
    {
        private readonly MyDBContext _dbContext;

        public UserRepo(MyDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<UserFullDTO> GetAllUsers()
        {
            var users = _dbContext.Users
                                    .Select(u => new UserFullDTO
                                    {
                                        id = u.id,
                                        firstName = u.firstName,
                                        lastName = u.lastName,
                                        mail = u.mail,
                                        phone = u.phone,
                                        gender = u.gender,
                                        birthdate = u.birthdate,
                                        joinDate = u.joinDate,
                                    }).ToList();
            return users;
        }

        public UserFullDTO GetUserById(Guid id)
        {
            var user = _dbContext.Users
                                    .Where(u => u.id == id)
                                    .Select(u => new UserFullDTO
                                    {
                                        id = u.id,
                                        firstName = u.firstName,
                                        lastName = u.lastName,
                                        mail = u.mail,
                                        phone = u.phone,
                                        gender = u.gender,
                                        birthdate = u.birthdate,
                                        joinDate = u.joinDate,
                                    }).FirstOrDefault();
            return user;
        }

        public UserFullDTO AddUser(UserAddDTO newUser) 
        {
            var user = new User
            {
                firstName = newUser.firstName,
                lastName = newUser.lastName,
                mail = newUser.mail,
                phone = newUser.phone,
                gender = newUser.gender,
                birthdate = newUser.birthdate,
                joinDate = DateTime.UtcNow,
            };

            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();

            return new UserFullDTO
            {
                id = user.id,
                firstName = user.firstName,
                lastName = user.lastName,
                mail = user.mail,
                phone = user.phone,
                gender = user.gender,
                birthdate = user.birthdate,
                joinDate = user.joinDate,
            };
        }

        public void UpdateUser (Guid id, UserAddDTO updateUser)
        {
            var user = _dbContext.Users.SingleOrDefault(u => u.id == id);
            user.firstName = updateUser.firstName;
            user.lastName = updateUser.lastName;
            user.mail = updateUser.mail;
            user.phone = updateUser.phone;
            user.gender = updateUser.gender;
            user.birthdate = updateUser.birthdate;
            _dbContext.Update(user);
            _dbContext.SaveChanges();
        }

        public void DeleteUser (Guid id)
        {
            var user = _dbContext.Users.SingleOrDefault(u => u.id == id);
            if (user != null)
            {
                _dbContext.Remove(user);
                _dbContext.SaveChanges();
            }
        }

        public List<RankingDTO> Ranking()
        {
            var users = _dbContext.Users
                                    .OrderByDescending(u => u.transactions.Sum(t => t.price))
                                    .Take(10)
                                    .Select(u => new RankingDTO
                                    {
                                        id = u.id,
                                        firstName = u.firstName,
                                        lastName = u.lastName,
                                        total = u.transactions.Sum(t => t.price),
                                    }).ToList();

            return users;
        }

    }
}
