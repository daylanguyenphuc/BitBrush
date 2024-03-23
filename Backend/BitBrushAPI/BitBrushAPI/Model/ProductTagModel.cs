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
}
