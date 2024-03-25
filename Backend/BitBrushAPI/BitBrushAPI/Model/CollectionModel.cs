using BitBrushAPI.Data;
using System.ComponentModel.DataAnnotations;

namespace BitBrushAPI.Model
{
    public class CollectionModel
    {
        public Guid id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public Guid creatorId { get; set; }

        // Navigation properties
        public UserModel creator { get; set; }
        public List<ProductModel> products { get; set; }
    }

    public class CollectionFullDTO
    {
        public Guid id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public UserCompactDTO creator { get; set; }
        public List<ProductCompactDTO> products { get; set; }
    }

    public class CollectionCompactDTO
    {
        public Guid id { get; set; }
        public string name { get; set; }
    }

    public class CollectionAddDTO
    {
        public string name { get; set; }
        public string description { get; set; }
        public Guid creatorId { get; set; }
    }
}
