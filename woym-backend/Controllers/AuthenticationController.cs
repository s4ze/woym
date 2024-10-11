using Microsoft.AspNetCore.Mvc;
using woym.Contracts;
using woym.Interfaces;

namespace woym.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IAuthorizationService _authorizationService;
        public AuthenticationController(IAuthenticationService authenticationService, IAuthorizationService authorizationService)
        {
            _authenticationService = authenticationService;
            _authorizationService = authorizationService;
        }
        [HttpPost]
        [Route("login")]
        public IResult Login(LoginUserRequest user)
        {
            if (_authenticationService.Login(user.Email, user.Password) == Results.Ok())
            {
                var accessToken = _authorizationService.GenerateAccessToken(user.Email, _authenticationService.IsAdmin(user.Email));
                var refreshToken = _authorizationService.GenerateRefreshToken(user.Email);

                var refreshTokenCookieOptions = new CookieOptions()
                {
                    HttpOnly = true,
                    Secure = true,
                    Expires = DateTime.UtcNow.AddDays(15),
                };

                var accessTokenCookieOptions = new CookieOptions()
                {
                    Secure = true,
                    Expires = DateTime.UtcNow.AddMinutes(30),
                };

                Response.Cookies.Append("refreshToken", refreshToken, refreshTokenCookieOptions);
                Response.Cookies.Append("accessToken", accessToken, accessTokenCookieOptions);

                return Results.Ok();
            }
            return Results.Unauthorized();
        }
        [HttpPost]
        [Route("register")]
        public IResult Register(RegisterUserRequest user)
        {
            return _authenticationService.Register(user.Email, user.Name, user.Password);
        }
    }
}
