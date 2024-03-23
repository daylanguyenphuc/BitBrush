using BitBrushAPI.Data;
using System.ComponentModel.DataAnnotations;

namespace BitBrushAPI.Model
{
    public class TagModel
    {
        public Guid id { get; set; }
        public string name { get; set; }

        // Navigation properties
        public ICollection<ProductTagModel> products { get; set; }
    }
    public class TagDTO
    {
        public Guid id { get; set; }
        public string name { get; set; }
    }
    public class TagAddDTO
    {
        public string name { get; set; }
    }
}
