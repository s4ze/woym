using woym.Models;

namespace woym.Interfaces;
public interface IAuthorizationService {
    // string CheckAccessToken(string accessToken);
    string CheckRefreshToken(string refreshToken);
    string GenerateRefreshToken(User user);
    string GenerateAccessToken(string email);
}