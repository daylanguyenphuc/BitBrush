using BitBrushAPI.Model;
using BitBrushAPI.Service;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace BitBrushAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TagController : ControllerBase
    {
        // Service
        private readonly ITagRepo _tagRepository;
        public TagController(ITagRepo tagRepository)
        {
            _tagRepository = tagRepository;
        }

        // Controller
        [HttpGet]
        public IActionResult GetAllTag (string? name)
        {
            try
            {
                List<TagFullDTO> byElements = _tagRepository.GetAllTags();
                if (name != null)
                {
                    byElements = byElements.Where(t => t.name != null && t.name.Contains(name)).ToList();
                }
                return Ok(byElements);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetTagById (Guid id) 
        {
            try
            {
                return Ok(_tagRepository.GetTagById(id));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public IActionResult AddTag(TagAddDTO newTag)
        {
            try
            {
                return Ok(_tagRepository.AddTag(newTag));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTag(Guid id, TagAddDTO updateTag)
        {
            try
            {
                var tag = GetTagById(id);
                if (tag == null)
                {
                    return NotFound();
                }
                else
                {
                    _tagRepository.UpdateTag(id, updateTag);
                    return NoContent();
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTag(Guid id)
        {
            try
            {
                _tagRepository.DeleteTag(id);
                return NoContent();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}