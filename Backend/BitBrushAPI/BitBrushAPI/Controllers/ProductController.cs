using BitBrushAPI.Model;
using BitBrushAPI.Service;
using Microsoft.AspNetCore.Mvc;
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
        public IActionResult GetAllProduct (string? name, Guid? collectionId, decimal? minPrice, decimal? maxPrice, bool? sellingStatus)
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
    }
}