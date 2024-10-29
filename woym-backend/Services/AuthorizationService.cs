using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using woym.Data;
using woym.Identity;
using woym.Interfaces;

namespace woym.Services
{
    public class AuthorizationService : IAuthorizationService
    {
        private readonly DataContext _context;
        private readonly IAuthenticationService _authenticationService;
        public AuthorizationService(DataContext context, IAuthenticationService authenticationService)
        {
            _context = context;
            _authenticationService = authenticationService;
        }
        public bool CheckAccessToken(string accessToken)
        {
            var handler = new JwtSecurityTokenHandler();
            handler.ValidateToken(accessToken, AuthenticationOptions.TokenValidationParameters, out SecurityToken validatedToken);

            if (validatedToken is not JwtSecurityToken jwtSecurityToken)
                return false;

            var issuedAt = jwtSecurityToken.Payload.IssuedAt;
            if (issuedAt.CompareTo(DateTime.UtcNow) > 0)
                return false;
            return true;
        }
        public bool CheckRefreshToken(string? refreshToken)
        {
            var handler = new JwtSecurityTokenHandler();
            handler.ValidateToken(refreshToken, AuthenticationOptions.TokenValidationParameters, out SecurityToken validatedToken);

            if (validatedToken is not JwtSecurityToken jwtSecurityToken)
            {
                return false;
            }

            var issuedAt = jwtSecurityToken.Payload.IssuedAt;
            if (issuedAt.CompareTo(DateTime.UtcNow) > 0)
            {
                return false;
            }

            var userId = jwtSecurityToken.Claims.First(claim => claim.Type == IdentityData.UserIdClaimName).Value;
            var user = _context.Users.First(u => u.UserId.ToString() == userId);

            if (user?.RefreshToken == null || user.RefreshToken != refreshToken)
            {
                return false;
            }

            return true;
        }
        public string GenerateAccessToken(string userId, bool admin = false)
        {
            // Создаём claims
            List<Claim> claims = [new(IdentityData.UserIdClaimName, userId)];
            if (admin == true)
                claims.Add(new("admin", "true"));
            // Создаём token, добавляем claims и указываем headers
            JwtSecurityToken accessTokenValues = new(
                    claims: claims,
                    issuer: AuthenticationOptions.ISSUER,
                    audience: AuthenticationOptions.AUDIENCE,
                    signingCredentials: new SigningCredentials(
                        AuthenticationOptions.GetSymmetricSecurityKey(),
                        SecurityAlgorithms.HmacSha256
                    ),
                    expires: DateTime.UtcNow.AddMinutes(30)
                );
            var accessToken = new JwtSecurityTokenHandler().WriteToken(accessTokenValues);

            return accessToken;
        }
        public string GenerateRefreshToken(string userId)
        {
            var user = _authenticationService.GetUserById(userId);
            // Создаём claims
            List<Claim> claims = [new(IdentityData.UserIdClaimName, userId)];
            if (user?.Admin == true)
                claims.Add(new("admin", "true"));
            // Создаём token, добавляем claims и указываем headers
            JwtSecurityToken refreshTokenValues = new(
                    claims: claims,
                    issuer: AuthenticationOptions.ISSUER,
                    audience: AuthenticationOptions.AUDIENCE,
                    signingCredentials: new SigningCredentials(
                        AuthenticationOptions.GetSymmetricSecurityKey(),
                        SecurityAlgorithms.HmacSha256
                    ),
                    expires: DateTime.UtcNow.AddDays(15)
                );

            var refreshToken = new JwtSecurityTokenHandler().WriteToken(refreshTokenValues);
            if (user != null)
            {
                user.RefreshToken = refreshToken;
                _context.Users.Update(user);
                _context.SaveChanges();
            }
            // if user is null - unexpected result in system
            return refreshToken;
        }
        public void RemoveRefreshToken(string refreshToken)
        {
            var user = _context.Users.FirstOrDefault(u => u.RefreshToken == refreshToken);
            if (user != null)
            {
                user.RefreshToken = null;
                _context.Users.Update(user);
                _context.SaveChanges();
            }
        }
    }
}