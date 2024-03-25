using BitBrushAPI.Data;
using System.ComponentModel.DataAnnotations;

namespace BitBrushAPI.Model
{
    public class ProductTagModel
    {
        public Guid productId { get; set; }
        public Guid tagId { get; set; }

        // Navigation properties
        public ProductModel product { get; set; }
        public TagModel tag { get; set; }
    }
    public class ProductTagCompactDTO
    {
        public ProductCompactDTO product { get; set; }
        public TagCompactDTO tag { get; set; }
    }
    public class ProductTagCompactDTOforProduct
    {
        public TagCompactDTO tag { get; set; }
    }
    public class ProductTagFullDTO
    {
        public ProductCompactDTO product { get; set; }
        public TagCompactDTO tag { get; set; }
    }
    public class ProductTagAddDTO
    {
        public Guid productId { get; set; }
        public Guid tagId { get; set; }
    }
}
