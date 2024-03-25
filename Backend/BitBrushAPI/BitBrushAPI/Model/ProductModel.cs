using BitBrushAPI.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;

namespace BitBrushAPI.Model
{
    public class ProductModel
    {
        public Guid id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public Guid collectionId { get; set; }
        public string thumbnailUrl { get; set; }
        public Guid ownerId { get; set; }
        public Guid creatorId { get; set; }
        public DateTime createdDate { get; set; }
        public bool sellingStatus { get; set; }
        public decimal price { get; set; }

        // Navigation properties
        public CollectionModel collection { get; set; }
        public UserModel owner { get; set; }
        public UserModel creator { get; set; }
        public List<ProductTagModel> tags { get; set; }
    }

    public class ProductFullDTO
    {
        public Guid id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public CollectionCompactDTO collection { get; set; }
        public string thumbnailUrl { get; set; }
        public UserCompactDTO owner { get; set; }
        public UserCompactDTO creator { get; set; }
        public DateTime createdDate { get; set; }
        public bool sellingStatus { get; set; }
        public decimal price { get; set; }
        public List<ProductTagCompactDTOforProduct> tags { get; set; }
    }

    public class ProductCompactDTO
    {
        public Guid id { get; set; }
        public string name { get; set; }
        public string thumbnailUrl { get; set; }
    }

    public class ProductAddDTO
    {
        public string name { get; set; }
        public string description { get; set; }
        public Guid collectionId { get; set; }
        public string thumbnailUrl { get; set; }
        public Guid ownerId { get; set; }
        public Guid creatorId { get; set; }
        public bool sellingStatus { get; set; }
        public decimal price { get; set; }
    }
    public class ProductResellDTO
    {
        public decimal price { get; set; }
    }
}
