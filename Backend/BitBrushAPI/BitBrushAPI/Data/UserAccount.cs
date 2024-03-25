using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BitBrushAPI.Data
{
    [Table("tblUserAccount")]
    public class UserAccount
    {
        [Key]
        public Guid userId { get; set; }
        [Required]
        public string username { get; set; }
        [Required]
        public string password { get; set; }
        [Required]
        public string walletId { get; set; }

        // Define relationship
        [ForeignKey("userId")]
        public User user { get; set; }
    }
}
