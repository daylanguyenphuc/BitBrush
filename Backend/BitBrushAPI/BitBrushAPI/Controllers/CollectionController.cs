using BitBrushAPI.Model;
using BitBrushAPI.Service;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace BitBrushAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CollectionController : ControllerBase
    {
        // Service
        private readonly ICollectionRepo _collectionRepository;
        public CollectionController(ICollectionRepo collectionRepository)
        {
            _collectionRepository = collectionRepository;
        }

        // Controller
        [HttpGet]
        public IActionResult GetAllCollection (string? name, Guid? creatorId)
        {
            try
            {
                List<CollectionFullDTO> byElements = _collectionRepository.GetAllCollections();
                if (name != null)
                {
                    byElements = byElements.Where(c => c.name != null && c.name.Contains(name)).ToList();
                }
                if (creatorId != null)
                {
                    byElements = byElements.Where(c => c.creator.id == creatorId).ToList();
                }
                return Ok(byElements);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetCollectionById (Guid id) 
        {
            try
            {
                return Ok(_collectionRepository.GetCollectionById(id));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public IActionResult AddCollection(CollectionAddDTO newCollection)
        {
            try
            {
                return Ok(_collectionRepository.AddCollection(newCollection));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCollection(Guid id, CollectionAddDTO updateCollection)
        {
            try
            {
                var collection = GetCollectionById(id);
                if (collection == null)
                {
                    return NotFound();
                }
                else
                {
                    _collectionRepository.UpdateCollection(id, updateCollection);
                    return NoContent();
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCollection(Guid id)
        {
            try
            {
                _collectionRepository.DeleteCollection(id);
                return NoContent();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}