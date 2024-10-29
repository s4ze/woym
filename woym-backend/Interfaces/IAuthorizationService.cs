namespace woym.Interfaces;
public interface IAuthorizationService
{
    bool CheckAccessToken(string accessToken);
    bool CheckRefreshToken(string? refreshToken);
    string GenerateRefreshToken(string userId);
    string GenerateAccessToken(string userId, bool admin = false);
}