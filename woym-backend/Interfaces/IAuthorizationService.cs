using woym.Models;

namespace woym.Interfaces;
public interface IAuthorizationService
{
    // string CheckAccessToken(string accessToken);
    string CheckRefreshToken(string refreshToken);
    string GenerateRefreshToken(string email);
    string GenerateAccessToken(string email, bool admin);
}