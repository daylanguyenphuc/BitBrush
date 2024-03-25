using BitBrushAPI.Data;
using BitBrushAPI.Model;
using BitBrushAPI.Service;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Xml.Linq;

namespace BitBrushAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        // Service
        private readonly IProductRepo _productRepository;
        public ProductController(IProductRepo productRepository)
        {
            _productRepository = productRepository;
        }

        // Controller
        [HttpGet]
        public IActionResult GetAllProduct (string? name, Guid? collectionId, Guid? creatorId, Guid? ownerId, decimal? minPrice, decimal? maxPrice, bool? sellingStatus, string? sort)
        {
            try
            {
                List<ProductFullDTO> byElements = _productRepository.GetAllProducts();
                if (name != null)
                {
                    byElements = byElements.Where(p => p.name != null && p.name.Contains(name)).ToList();
                }
                if (collectionId != null)
                {
                    byElements = byElements.Where(p => p.collection.id == collectionId).ToList();
                }
                if (creatorId != null)
                {
                    byElements = byElements.Where(p => p.creator.id == creatorId).ToList();
                }
                if (ownerId != null)
                {
                    byElements = byElements.Where(p => p.owner.id == ownerId).ToList();
                }
                if (minPrice != null)
                {
                    byElements = byElements.Where(p => p.price >= minPrice).ToList();
                }
                if (maxPrice != null)
                {
                    byElements = byElements.Where(p => p.price <= maxPrice).ToList();
                }
                if (sellingStatus != null)
                {
                    byElements = byElements.Where(p => p.sellingStatus == sellingStatus).ToList();
                }
                if (sort == "priceLow")
                {
                    byElements = byElements.OrderBy(p => p.price).ToList();
                }
                if (sort == "priceHigh")
                {
                    byElements = byElements.OrderByDescending(p => p.price).ToList();
                }
                if (sort == "dateOld")
                {
                    byElements = byElements.OrderBy(p => p.createdDate).ToList();
                }
                if (sort == "dateNew")
                {
                    byElements = byElements.OrderByDescending(p => p.createdDate).ToList();
                }
                return Ok(byElements);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetProductById (Guid id) 
        {
            try
            {
                return Ok(_productRepository.GetProductById(id));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public IActionResult AddProduct(ProductAddDTO newProduct)
        {
            try
            {
                return Ok(_productRepository.AddProduct(newProduct));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(Guid id, ProductAddDTO updateProduct)
        {
            try
            {
                var product = GetProductById(id);
                if (product == null)
                {
                    return NotFound();
                }
                else
                {
                    _productRepository.UpdateProduct(id, updateProduct);
                    return NoContent();
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(Guid id)
        {
            try
            {
                _productRepository.DeleteProduct(id);
                return NoContent();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost("AddTagToProduct")]
        public IActionResult AddTagToProduct(ProductTagAddDTO newProductTag)
        {
            try
            {
                _productRepository.AddTagToProduct(newProductTag);
                return Ok();

            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("DeleteTagFromProduct")]
        public IActionResult DeleteTagFromProduct(Guid productId, Guid tagId)
        {
            try
            {
                _productRepository.DeleteTagFromProduct(productId, tagId);
                return Ok();

            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("ResellProduct")]
        public IActionResult ResellProduct (Guid id, ProductResellDTO resellProduct)
        {
            try
            {
                return Ok(_productRepository.ResellOwnedProduct(id, resellProduct));

            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}