using BitBrushAPI.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BitBrushAPI.Model
{
    public class MaillistModel
    {
        public Guid id { get; set; }
        public string mail { get; set; }
    }
}
