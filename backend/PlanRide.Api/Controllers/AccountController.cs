using Microsoft.AspNetCore.Mvc;
using PlanRide.Api.Models;
using PlanRide.Infrastructure;

namespace PlanRide.Api.Controllers
{
    [ApiController]
    [Route("account")]
    public class AccountController : ControllerBase
    {
        private readonly ISignupService _signupService;
        public AccountController(ISignupService signupService)
        {
            _signupService = signupService;
        }

        [HttpPost("signup", Name = "Signup")]
        public async Task<IActionResult> Signup([FromBody] SignupInputModel model)
        {
            await _signupService.SignupAsync(model.FirstName, model.LastName, model.Email, model.Mobile);
            return NoContent();
        }
    }
}