using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BitBrushAPI.Data
{
    [Table("tblTag")]
    public class Tag
    {
        [Key]
        public Guid id { get; set; }
        [Required]
        public string name { get; set; }

        // Define relationship
        public ICollection<ProductTag> products { get; set; }
    }
}
