using woym.Models;

namespace woym.Interfaces;
public interface IAuthorizationService
{
    bool CheckAccessToken(string accessToken);
    string CheckRefreshToken(string refreshToken);
    string GenerateRefreshToken(string email);
    string GenerateAccessToken(string email, bool admin);
}