using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BitBrushAPI.Data
{
    [Table("tblProductTag")]
    public class ProductTag
    {
        [Key]
        public Guid productId { get; set; }
        [Key]
        public Guid tagId { get; set; }

        // Define relationships
        public Product product { get; set; }
        public Tag tag { get; set; }
    }
}

