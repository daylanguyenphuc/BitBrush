using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BitBrushAPI.Data
{
    [Table("tblCollection")]
    public class Collection
    {
        [Key]
        public Guid id { get; set; }
        [Required]
        public string name { get; set; }
        public string description { get; set; }
        [Required]
        public Guid creatorId { get; set; }

        // Define relationships
        [ForeignKey("creatorId")]
        public User creator { get; set; }
        public ICollection<Product> products { get; set; }
        public Collection()
        {
            products = new List<Product>();
        }
    }
}
