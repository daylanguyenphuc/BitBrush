using BitBrushAPI.Model;
using BitBrushAPI.Service;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace BitBrushAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserAccountController : ControllerBase
    {
        // Service
        private readonly IUserAccountRepo _userAccountRepository;
        public UserAccountController(IUserAccountRepo userAccountRepository)
        {
            _userAccountRepository = userAccountRepository;
        }

        // Controller

        [HttpGet("{id}")]
        public IActionResult GetUserAccountById (Guid id) 
        {
            try
            {
                return Ok(_userAccountRepository.GetUserAccountById(id));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public IActionResult AddUserAccount(UserAccountAddDTO newUserAccount)
        {
            try
            {
                return Ok(_userAccountRepository.AddUserAccount(newUserAccount));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUserAccount(Guid id, UserAccountAddDTO updateUserAccount)
        {
            try
            {
                var userAccount = GetUserAccountById(id);
                if (userAccount == null)
                {
                    return NotFound();
                }
                else
                {
                    _userAccountRepository.UpdateUserAccount(id, updateUserAccount);
                    return NoContent();
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUserAccount(Guid id)
        {
            try
            {
                _userAccountRepository.DeleteUserAccount(id);
                return NoContent();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}