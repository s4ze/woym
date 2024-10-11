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
            return _authorizationService.RefreshToken(refreshToken);
        }
    }
}
