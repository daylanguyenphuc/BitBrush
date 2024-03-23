using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using BitBrushAPI.Model;

namespace BitBrushAPI.Data
{
    [Table("tblProduct")]
    public class Product
    {
        [Key]
        public Guid id { get; set; }
        [Required]
        public string name { get; set; }
        public string description { get; set; }
        public Guid collectionId { get; set; }
        [Required]
        public string thumbnailUrl { get; set; }
        [Required]
        public Guid ownerId { get; set; }
        [Required]
        public Guid creatorId { get; set; }
        [Required]
        public bool sellingStatus { get; set; }
        public decimal price { get; set; }

        // Define relationships
        [ForeignKey("collectionId")]
        public Collection collection { get; set; }
        [ForeignKey("ownerId")]
        public User owner { get; set; }
        [ForeignKey("creatorId")]
        public User creator { get; set; }
        public ICollection<ProductTag> tags { get; set;}
        public ICollection<Transaction> transactions { get; set; }

    }
}
