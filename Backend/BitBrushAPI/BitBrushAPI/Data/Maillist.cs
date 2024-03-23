using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BitBrushAPI.Data
{
    [Table("tblMailist")]
    public class Maillist
    {
        [Key]
        public Guid id { get; set; }
        [Required]
        public string mail { get; set; }
    }
}
