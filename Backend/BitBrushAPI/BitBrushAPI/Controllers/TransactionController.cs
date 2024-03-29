using BitBrushAPI.Model;
using BitBrushAPI.Service;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace BitBrushAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : ControllerBase
    {
        // Service
        private readonly ITransactionRepo _transactionRepository;
        public TransactionController (ITransactionRepo transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }

        // Controller
        [HttpGet("{id}")]
        public IActionResult GetTransactionById(Guid id) 
        {
            try
            {
                return Ok(_transactionRepository.GetTransactionById(id));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("GetTransactionsByTransactionHash")]
        public IActionResult GetTransactionsByTransactionHash(string hash)
        {
            try
            {
                return Ok(_transactionRepository.GetTransactionsByTransactionHash(hash));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("GetTransactionsByUserId")]
        public IActionResult GetTransactionsByUserId(Guid id)
        {
            try
            {
                return Ok(_transactionRepository.GetTransactionsByUserId(id));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("GetTransactionByProductId")]
        public IActionResult GetTransactionByProductId(Guid id)
        {
            try
            {
                return Ok(_transactionRepository.GetTransactionByProductId(id));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public IActionResult AddTransaction(TransactionAddDTO newTransacion)
        {
            try
            {
                return Ok(_transactionRepository.AddTransaction(newTransacion));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}