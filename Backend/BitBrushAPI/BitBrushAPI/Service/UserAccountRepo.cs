using BitBrushAPI.Data;
using BitBrushAPI.Model;

namespace BitBrushAPI.Service
{
    public interface IUserAccountRepo
    {
        public UserAccountFullDTO GetUserAccountById(Guid id);
        public UserAccountFullDTO AddUserAccount(UserAccountAddDTO newUserAccount);
        public void UpdateUserAccount(Guid id, UserAccountAddDTO updateUserAccount);
        public void DeleteUserAccount (Guid id);
    }
    public class UserAccountRepo : IUserAccountRepo
    {
        private readonly MyDBContext _dbContext;

        public UserAccountRepo(MyDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public UserAccountFullDTO GetUserAccountById(Guid id)
        {
            var userAccount = _dbContext.UserAccounts
                                    .Where(a => a.userId == id)
                                    .Select(a => new UserAccountFullDTO
                                    {
                                        userId = a.userId,
                                        username = a.username,
                                        password = a.password,
                                        walletId = a.walletId,
                                        user = new UserCompactDTO
                                        {
                                            id = a.userId,
                                            firstName = _dbContext.Users.SingleOrDefault(u => u.id == a.userId).firstName,
                                            lastName = _dbContext.Users.SingleOrDefault(u => u.id == a.userId).lastName
                                        }
                                    }).FirstOrDefault();
            return userAccount;
        }

        public UserAccountFullDTO AddUserAccount(UserAccountAddDTO newUserAccount)
        {
            var userAccount = new UserAccount
            {
                userId = newUserAccount.userId,
                username = newUserAccount.username,
                password = newUserAccount.password,
                walletId = newUserAccount.walletId
            };

            _dbContext.UserAccounts.Add(userAccount);
            _dbContext.SaveChanges();

            return new UserAccountFullDTO
            {
                userId = userAccount.userId,
                username = userAccount.username,
                password = userAccount.password,
                walletId = userAccount.walletId,
                user = new UserCompactDTO
                {
                    id = userAccount.userId,
                    firstName = _dbContext.Users.SingleOrDefault(u => u.id == userAccount.userId).firstName,
                    lastName = _dbContext.Users.SingleOrDefault(u => u.id == userAccount.userId).lastName
                }
            };
        }

        public void UpdateUserAccount(Guid id, UserAccountAddDTO updateUserAccount)
        {
            var userAccount = _dbContext.UserAccounts.SingleOrDefault(a => a.userId == id);
            userAccount.username = updateUserAccount.username;
            userAccount.password = updateUserAccount.password;
            userAccount.walletId = updateUserAccount.walletId;
            _dbContext.Update(userAccount);
            _dbContext.SaveChanges();
        }
        public void DeleteUserAccount(Guid id)
        {
            var userAccount = _dbContext.UserAccounts.SingleOrDefault(a => a.userId == id);
            if (userAccount != null)
            {
                _dbContext.Remove(userAccount);
                _dbContext.SaveChanges();
            }
        }
    }
}
