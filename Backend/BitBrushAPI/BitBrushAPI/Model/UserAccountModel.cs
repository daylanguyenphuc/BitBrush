using BitBrushAPI.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BitBrushAPI.Model
{
    public class UserAccountModel
    {
        public Guid userId { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string walletId { get; set; }

        // Navigation properties
        public UserModel user { get; set; }
    }
    public class UserAccountFullDTO
    {
        public Guid userId { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string walletId { get; set; }
        public UserCompactDTO user { get; set; }
    }

    public class UserAccountAddDTO
    {
        public Guid userId { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string walletId { get; set; }
    }
}
