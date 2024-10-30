using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using woym.Contracts;
using woym.Data;
using woym.Identity;
using woym.Interfaces;

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
            if (_authenticationService.Login(user.Email, user.Password))
            {
                var dbUser = _authenticationService.GetUserByEmail(user.Email);
                var result = new
                {
                    accessToken = _authorizationService.GenerateAccessToken(dbUser.UserId.ToString(), _authenticationService.IsAdmin(dbUser.UserId.ToString())),
                    user = new
                    {
                        dbUser.UserId,
                        dbUser.Email,
                        dbUser.Name,
                        dbUser.Admin,
                        dbUser.CreatedAt,
                        dbUser.AvatarUrl,
                        dbUser.BackgroundUrl,
                    },
                };
                var refreshToken = _authorizationService.GenerateRefreshToken(dbUser.UserId.ToString());

                var refreshTokenCookieOptions = new CookieOptions()
                {
                    HttpOnly = true,
                    Expires = DateTime.UtcNow.AddDays(15),
                };
                Response.Cookies.Append("refreshToken", refreshToken, refreshTokenCookieOptions);

                return Results.Ok(result);
            }
            return Results.Unauthorized();
        }
        [HttpPost]
        [Route("register")]
        public IResult Register(RegisterUserRequest user)
        {
            var result = Results.Unauthorized();
            if (_authenticationService.Register(user.Email, user.Name, user.Password))
            {
                result = Results.Ok();
            }
            return result;
        }
        [Authorize]
        [HttpPost]
        [Route("logout")]
        public IResult Logout()
        {
            Request.Cookies.TryGetValue("refreshToken", out var refreshToken);
            if (refreshToken != null)
            {
                Response.Cookies.Delete("refreshToken");

                return Results.Ok();
            }
            return Results.Unauthorized();
        }
        [HttpGet]
        [Route("refresh")]
        public IResult RefreshToken()
        {
            HttpContext.Request.Cookies.TryGetValue("refreshToken", out var refreshToken);

            if (refreshToken != null && _authorizationService.CheckRefreshToken(refreshToken))
            {
                var jwtSecurityToken = new JwtSecurityTokenHandler().ReadJwtToken(refreshToken);

                var userId = jwtSecurityToken.Claims.First(claim => claim.Type == IdentityData.UserIdClaimName).Value;
                var user = _authenticationService.GetUserById(userId);

                var result = new
                {
                    accessToken = _authorizationService.GenerateAccessToken(userId, user.Admin),
                    user = _authenticationService.GetUserById(userId),
                };
                refreshToken = _authorizationService.GenerateRefreshToken(userId);

                var refreshTokenCookieOptions = new CookieOptions()
                {
                    HttpOnly = true,
                    Expires = DateTime.UtcNow.AddDays(15),
                };

                Response.Cookies.Append("refreshToken", refreshToken, refreshTokenCookieOptions);

                return Results.Ok(result);
            }

            return Results.Unauthorized();
        }
        [Authorize]
        [RequiresClaim(IdentityData.AdminClaimName, "true")]
        [HttpPost]
        [Route("toadmin")]
        public IResult MakeAdmin([FromBody] string userId)
        {
            var user = _authenticationService.GetUserById(userId);
            if (user != null)
            {
                user.Admin = true;
                _context.SaveChanges();
                return Results.Ok();
            }
            return Results.Unauthorized();
        }
        [Authorize]
        [HttpPost]
        [Route("remove")]
        public IResult RemoveUser([FromBody] string userId, [FromHeader] string authorization)
        {
            if (_authenticationService.CheckForExistingUserById(userId))
            {
                // if (Request.Headers.TryGetValue("Authorization", out StringValues authToken))
                authorization = authorization.Replace("Bearer ", "");
                var jwtSecurityToken = new JwtSecurityTokenHandler().ReadJwtToken(authorization);

                // check if user is admin by decoded jwt token
                var isAdmin = jwtSecurityToken.Claims.FirstOrDefault(claim => claim.Type == IdentityData.AdminClaimName)?.Value == "true";

                var claimUserId = jwtSecurityToken.Claims.First(claim => claim.Type == IdentityData.UserIdClaimName).Value;

                if (isAdmin || claimUserId == userId)
                {
                    var user = _authenticationService.GetUserById(userId);
                    _context.Users.Remove(user);
                    _context.SaveChanges();
                }
                return Results.Ok();
            }
            return Results.Unauthorized();
        }
        [Authorize]
        [RequiresClaim(IdentityData.AdminClaimName, "true")]
        [HttpPost]
        [Route("removeall")]
        public IResult RemoveAllUsers([FromBody] string userId)
        {
            if (_authenticationService.IsAdmin(userId))
            {
                var users = _context.Users.Where(u => true);
                _context.Users.RemoveRange(users);
                _context.SaveChanges();
                return Results.Ok();
            }
            return Results.Unauthorized();
        }
    }
}
