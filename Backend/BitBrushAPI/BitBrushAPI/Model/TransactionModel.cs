using BitBrushAPI.Data;
using System.ComponentModel.DataAnnotations;

namespace BitBrushAPI.Model
{
    public class TransactionModel
    {
        public Guid id { get; set; }
        public Guid productId { get; set; }
        public Guid sellerId { get; set; }
        public Guid buyerId { get; set; }
        public DateTime time { get; set; }
        public decimal price { get; set; }
        public string hash { get; set; }

        // Navigation properties
        public Product product { get; set; }
        public User seller { get; set; }
        public User buyer { get; set; }
    }

    public class TransactionFullDTO
    {
        public Guid id { get; set; }
        public ProductCompactDTO product { get; set; }
        public UserCompactDTO seller { get; set; }
        public UserCompactDTO buyer { get; set; }
        public DateTime time { get; set; }
        public decimal price { get; set; }
        public string hash { get; set; }
    }

    public class TransactionAddDTO
    {
        public Guid productId { get; set; }
        public Guid buyerId { get; set; }
        public decimal price { get; set; }
        public string hash { get; set; }
    }

    public class TransactionCompactDTO
    {
        public Guid id { get; set; }
        public UserCompactDTO seller { get; set; }
        public UserCompactDTO buyer { get; set; }
        public decimal price { get; set; }
        public string hash { get; set; }
    }
}
