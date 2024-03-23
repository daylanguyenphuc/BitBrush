using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BitBrushAPI.Data
{
    [Table("tblTransaction")]
    public class Transaction
    {
        [Key]
        public Guid id { get; set; }
        public Guid productId { get; set; }
        public Guid sellerId { get; set; }
        public Guid buyerId { get; set; }
        public DateTime time { get; set; }
        public decimal price { get; set; }

        // Define relationships
        public Product product { get; set; }
        public User seller { get; set; }
        public User buyer { get; set; }
    }
}
