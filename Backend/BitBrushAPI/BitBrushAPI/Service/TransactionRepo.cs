using BitBrushAPI.Data;
using BitBrushAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace BitBrushAPI.Service
{
    public interface ITransactionRepo
    {
        //List<CollectionFullDTO> GetAllTransaction(); // ??? cos can khum
        public TransactionFullDTO GetTransactionById(Guid id);
        public List<TransactionFullDTO> GetTransactionsByUserId(Guid id);
        public List<TransactionFullDTO> GetTransactionByProductId(Guid id);
        public TransactionFullDTO AddTransaction(TransactionAddDTO newTransacion);
    }
    public class TransactionRepo : ITransactionRepo
    {
        private readonly MyDBContext _dbContext;

        public TransactionRepo(MyDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public TransactionFullDTO GetTransactionById(Guid id)
        {
            var transaction = _dbContext.Transactions
                                        .Include(t => t.product)
                                        .Include(t => t.seller)
                                        .Include(t => t.buyer)
                                        .Where(t => t.id == id)
                                        .Select(t => new TransactionFullDTO
                                        {
                                            id = t.id,
                                            product = new ProductCompactDTO
                                            {
                                                id = t.product.id,
                                                name = t.product.name,
                                                thumbnailUrl = t.product.thumbnailUrl
                                            },
                                            seller = new UserCompactDTO 
                                            {
                                                id = t.seller.id,
                                                firstName = t.seller.firstName,
                                                lastName = t.seller.lastName,
                                            },
                                            buyer = new UserCompactDTO
                                            {
                                                id = t.buyer.id,
                                                firstName = t.buyer.firstName,
                                                lastName = t.buyer.lastName,
                                            },
                                            time = t.time,
                                            price = t.price,
                                        }).FirstOrDefault();
                                    
            return transaction;
        }

        public List<TransactionFullDTO> GetTransactionsByUserId(Guid id)
        {
            var transactions = _dbContext.Transactions
                                        .Include(t => t.product)
                                        .Include(t => t.seller)
                                        .Include(t => t.buyer)
                                        .Where(t => t.sellerId == id || t.buyerId == id)
                                        .Select(t => new TransactionFullDTO
                                        {
                                            id = t.id,
                                            product = new ProductCompactDTO
                                            {
                                                id = t.product.id,
                                                name = t.product.name,
                                                thumbnailUrl = t.product.thumbnailUrl
                                            },
                                            seller = new UserCompactDTO
                                            {
                                                id = t.seller.id,
                                                firstName = t.seller.firstName,
                                                lastName = t.seller.lastName,
                                            },
                                            buyer = new UserCompactDTO
                                            {
                                                id = t.buyer.id,
                                                firstName = t.buyer.firstName,
                                                lastName = t.buyer.lastName,
                                            },
                                            time = t.time,
                                            price = t.price,
                                        }).ToList();

            return transactions;
        }

        public List<TransactionFullDTO> GetTransactionByProductId(Guid id)
        {
            var transactions = _dbContext.Transactions
                            .Include(t => t.product)
                            .Include(t => t.seller)
                            .Include(t => t.buyer)
                            .Where(t => t.productId == id)
                            .Select(t => new TransactionFullDTO
                            {
                                id = t.id,
                                product = new ProductCompactDTO
                                {
                                    id = t.product.id,
                                    name = t.product.name,
                                    thumbnailUrl = t.product.thumbnailUrl
                                },
                                seller = new UserCompactDTO
                                {
                                    id = t.seller.id,
                                    firstName = t.seller.firstName,
                                    lastName = t.seller.lastName,
                                },
                                buyer = new UserCompactDTO
                                {
                                    id = t.buyer.id,
                                    firstName = t.buyer.firstName,
                                    lastName = t.buyer.lastName,
                                },
                                time = t.time,
                                price = t.price,
                            }).ToList();

            return transactions;
        }

        public TransactionFullDTO AddTransaction(TransactionAddDTO newTransaction)
        {
            var transaction = new Transaction
            {
                productId = newTransaction.productId,
                sellerId = _dbContext.Products.SingleOrDefault(p => p.id == newTransaction.productId).ownerId,
                buyerId = newTransaction.buyerId,
                time = DateTime.UtcNow,
                price = newTransaction.price,
            };

            // Update owner Id, sellingStatus
            var product = _dbContext.Products.SingleOrDefault(d => d.id == newTransaction.productId);
            product.sellingStatus = false;
            product.ownerId = newTransaction.buyerId;
            _dbContext.Update(product);
            _dbContext.SaveChanges();

            // Add transaction row to DB
            _dbContext.Transactions.Add(transaction);
            _dbContext.SaveChanges();

            return new TransactionFullDTO
            {
                id = transaction.id,
                product = new ProductCompactDTO
                {
                    id = transaction.productId,
                    name = _dbContext.Products.SingleOrDefault(p => p.id == transaction.productId).name,
                    thumbnailUrl = _dbContext.Products.SingleOrDefault(p => p.id == transaction.productId).thumbnailUrl
                },
                seller = new UserCompactDTO { 
                    id = transaction.sellerId,
                    firstName = _dbContext.Users.SingleOrDefault(u => u.id == transaction.sellerId).firstName,
                    lastName = _dbContext.Users.SingleOrDefault(u => u.id == transaction.sellerId).lastName,
                },
                buyer = new UserCompactDTO
                {
                    id = transaction.buyerId,
                    firstName = _dbContext.Users.SingleOrDefault(u => u.id == transaction.buyerId).firstName,
                    lastName = _dbContext.Users.SingleOrDefault(u => u.id == transaction.buyerId).lastName,
                },
                time = transaction.time,
                price = transaction.price
            };
        }
    }
}
