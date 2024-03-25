using BitBrushAPI.Data;
using System.ComponentModel.DataAnnotations;

namespace BitBrushAPI.Model
{
    public class UserModel
    {
        public Guid id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string mail { get; set; }
        public string phone { get; set; }
        public string gender { get; set; }
        public DateTime birthdate { get; set; }
        public DateTime joinDate { get; }

        // Navigation properties
        public UserAccountModel userAccount { get; set; }
        public List<ProductModel> createdProduct {  get; set; }
        public List<ProductModel> ownedProduct { get; set; }
        public List<TransactionModel> transactions { get; set; }
    }

    public class UserFullDTO
    {
        public Guid id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string mail { get; set; }
        public string phone { get; set; }
        public string gender { get; set; }
        public DateTime birthdate { get; set; }
        public DateTime joinDate { get; set; }
    }

    public class UserCompactDTO
    {
        public Guid id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
    }

    public class UserAddDTO
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string mail { get; set; }
        public string phone { get; set; }
        public string gender { get; set; }
        public DateTime birthdate { get; set; }
    }

    public class RankingDTO
    {
        public Guid id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public decimal total { get; set; }
    }
}
