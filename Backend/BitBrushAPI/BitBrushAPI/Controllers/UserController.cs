using BitBrushAPI.Model;
using BitBrushAPI.Service;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace BitBrushAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        // Service
        private readonly IUserRepo _userRepository;
        public UserController(IUserRepo userRepository)
        {
            _userRepository = userRepository;
        }

        // Controller
        [HttpGet]
        public IActionResult GetAllUser (string? firstName, string? lastName, string? mail, string? phone, string? gender)
        {
            try
            {
                List<UserFullDTO> byElements = _userRepository.GetAllUsers();
                if (firstName != null)
                {
                    byElements = byElements.Where(u => u.firstName != null && u.firstName.Contains(firstName)).ToList();
                }
                if (lastName != null)
                {
                    byElements = byElements.Where(u => u.lastName != null && u.lastName.Contains(lastName)).ToList();
                }
                if (mail != null)
                {
                    byElements = byElements.Where(u => u.mail == mail).ToList();
                }
                if (phone != null)
                {
                    byElements = byElements.Where(u => u.phone == phone).ToList();
                }
                if (gender != null)
                {
                    byElements = byElements.Where(u => u.gender == gender).ToList();
                }
                return Ok(byElements);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById (Guid id) 
        {
            try
            {
                return Ok(_userRepository.GetUserById(id));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public IActionResult AddUser(UserAddDTO newUser)
        {
            try
            {
                return Ok(_userRepository.AddUser(newUser));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(Guid id, UserAddDTO updateUser)
        {
            try
            {
                var user = GetUserById(id);
                if (user == null)
                {
                    return NotFound();
                }
                else
                {
                    _userRepository.UpdateUser(id, updateUser);
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
                _userRepository.DeleteUser(id);
                return NoContent();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("Ranking")]
        public IActionResult Ranking()
        {
            try
            {
                return Ok(_userRepository.Ranking());
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}