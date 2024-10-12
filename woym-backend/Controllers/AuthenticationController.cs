using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using woym.Contracts;
using woym.Data;
using woym.Interfaces;
using woym.Models;

namespace woym.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IAuthenticationService _authenticationService;
        private readonly Interfaces.IAuthorizationService _authorizationService;

        public AuthenticationController(DataContext context, IAuthenticationService authenticationService, Interfaces.IAuthorizationService authorizationService)
        {
            _context = context;
            _authenticationService = authenticationService;
            _authorizationService = authorizationService;
        }
        [HttpPost]
        [Route("login")]
        public IResult Login(LoginUserRequest user)
        {
            if (_authenticationService.Login(user.Email, user.Password) == Results.Ok())
            {
                var accessToken = new
                {
                    accessToken = _authorizationService.GenerateAccessToken(user.Email, _authenticationService.IsAdmin(user.Email))
                };
                var refreshToken = _authorizationService.GenerateRefreshToken(user.Email);

                var refreshTokenCookieOptions = new CookieOptions()
                {
                    HttpOnly = true,
                    Expires = DateTime.UtcNow.AddDays(15),
                };
                Response.Cookies.Append("refreshToken", refreshToken, refreshTokenCookieOptions);

                return Results.Ok(accessToken);
            }
            return Results.Unauthorized();
        }
        [HttpPost]
        [Route("register")]
        public IResult Register(RegisterUserRequest user)
        {
            return _authenticationService.Register(user.Email, user.Name, user.Password);
        }
        [Authorize]
        [HttpPost]
        [Route("logout")]
        public IResult Logout()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (refreshToken != null)
            {
                Response.Cookies.Delete("refreshToken");
                _authorizationService.RemoveRefreshToken(refreshToken);

                return Results.Ok();
            }
            return Results.Unauthorized();
        }
        [HttpGet]
        [Route("refresh")]
        public IResult RefreshToken(string refreshToken)
        {
            if (_authorizationService.CheckRefreshToken(refreshToken))
            {
                var handler = new JwtSecurityTokenHandler();
                var jwtSecurityToken = handler.ReadJwtToken(refreshToken);

                var email = jwtSecurityToken.Claims.First(claim => claim.Type == ClaimTypes.Email).Value;
                var user = _context.Users.First(u => u.Email == email);

                var accessToken = new
                {
                    accessToken = _authorizationService.GenerateAccessToken(email, user.Admin)
                };
                refreshToken = _authorizationService.GenerateRefreshToken(email);

                var refreshTokenCookieOptions = new CookieOptions()
                {
                    HttpOnly = true,
                    Expires = DateTime.UtcNow.AddDays(15),
                };

                Response.Cookies.Append("refreshToken", refreshToken, refreshTokenCookieOptions);

                return Results.Ok(accessToken);
            }

            return Results.Unauthorized();
        }
    }
}
