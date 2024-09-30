using Microsoft.AspNetCore.Mvc;
using woym.Contracts;
using woym.Interfaces;

namespace woym.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase {
        private readonly IAuthenticationService _authenticationService;
        public AuthenticationController(IAuthenticationService authenticationService) {
            _authenticationService = authenticationService;
        }
        [Route("login")]
        [HttpPost]
        public IResult Login(LoginUserRequest user) {
            var jwt = _authenticationService.Login(user.Email, user.Password);
            return jwt;
        }
        [HttpPost]
        [Route("register")]
        public IResult Register(RegisterUserRequest user) {
            var result = _authenticationService.Register(user.Email, user.Name, user.Password);
            return result;
        }
    }
}
