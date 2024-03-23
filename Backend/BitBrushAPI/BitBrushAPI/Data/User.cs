using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BitBrushAPI.Data
{
    [Table("tblUser")]
    public class User
    {
        [Key]
        public Guid id { get; set; }
        [Required]
        public string firstName { get; set; }
        [Required]
        public string lastName { get; set; }
        [Required]
        public string mail { get; set; }
        [Required]
        [MaxLength(10)]
        public string phone { get; set; }
        [Required]
        [MaxLength(1)]
        public string gender { get; set; }
        [Required]
        public DateTime birthdate { get; set; }
        [Required]
        public DateTime joinDate { get; set; }

        // Define relationship
        public UserAccount userAccount { get; set; }
        public List<Product> createdProduct { get; set; }
        public List<Product> ownedProduct { get; set; }
        public ICollection<Transaction> transactions { get; set; }
    }
}
