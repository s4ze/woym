using Microsoft.AspNetCore.Mvc;

namespace woym.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private Interfaces.IAuthorizationService _authorizationService;
        public AuthorizationController(Interfaces.IAuthorizationService authorizationService)
        {
            _authorizationService = authorizationService;
        }
        [HttpPost]
        [Route("refresh")]
        public IResult RefreshToken(string refreshToken)
        {
            // call auth service with check refresh token method and return access and refresh (last in protected cookies) tokens
            var result = _authorizationService.CheckRefreshToken(refreshToken);

            if (result == "expired") return Results.Unauthorized();
            if (result == "401 staus. log in again") return Results.Unauthorized();

            return Results.Ok(result);
        }
    }
}
