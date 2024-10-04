using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
// using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using woym.Data;
using woym.Interfaces;
using woym.Models;

namespace woym.Services
{
    public class AuthorizationService : IAuthorizationService
    {
        private readonly DataContext _context;
        public AuthorizationService(DataContext context)
        {
            _context = context;
        }
        /*public string CheckAccessToken(string accessToken)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);
            // verify token
            // jwtSecurityToken.EncryptingCredentials.Key.
            return "";
        }*/
        public string CheckRefreshToken(string refreshTokenFromRequest)
        {
            // gets refreshtoken from user
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(refreshTokenFromRequest);

            // checks for expiry date
            var issuedAt = jwtSecurityToken.Payload.IssuedAt;

            // if expired return 401 or 403 idk else
            if (issuedAt.CompareTo(DateTime.UtcNow) > 0) return "expired";

            // decodes token and finds user's email
            var email = jwtSecurityToken.Claims.First(claim => claim.Type == ClaimTypes.Email).Value;

            // gets this user's refreshToken from db
            var user = _context.Users.First(u => u.Email == email);
            var refreshTokenFromDatabase = user.RefreshToken;

            // compares tokens. if both aren't compare then return 401 or 403
            if (refreshTokenFromDatabase == null || refreshTokenFromDatabase != refreshTokenFromRequest) return "401 status. log in again";

            // generates new access and refresh tokens. saves refresh token to db. returns accessT and refreshT to user,
            var accessToken = GenerateAccessToken(email);
            refreshTokenFromDatabase = GenerateRefreshToken(email);

            user.RefreshToken = refreshTokenFromDatabase;
            _context.SaveChanges();

            TokenResponse tokens = new(accessToken, refreshTokenFromDatabase);
            string json = JsonConvert.SerializeObject(tokens);

            return json;
        }
        public string GenerateAccessToken(string email, bool admin = false)
        {
            // Создаём claims
            List<Claim> claims = [new(ClaimTypes.Email, email)];
            if (admin == true)
                claims.Add(new("admin", "true"));
            // Создаём refreshToken, добавляем claims и указываем headers
            JwtSecurityToken accessToken = new(
                    claims: claims,
                    issuer: AuthenticationOptions.ISSUER,
                    audience: AuthenticationOptions.AUDIENCE,
                    signingCredentials: new SigningCredentials(
                        AuthenticationOptions.GetSymmetricSecurityKey(),
                        SecurityAlgorithms.HmacSha256
                    ),
                    expires: DateTime.UtcNow.AddMinutes(30)
                );
            var accessTokenValue = new JwtSecurityTokenHandler().WriteToken(accessToken);
            return accessTokenValue;
        }
        public string GenerateRefreshToken(string email)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            // Создаём claims
            List<Claim> claims = new() { new(ClaimTypes.Email, email) };
            if (user?.Admin == true)
                claims.Add(new("admin", "true"));
            // Создаём refreshToken, добавляем claims и указываем headers
            JwtSecurityToken refreshToken = new(
                    claims: claims,
                    issuer: AuthenticationOptions.ISSUER,
                    audience: AuthenticationOptions.AUDIENCE,
                    signingCredentials: new SigningCredentials(
                        AuthenticationOptions.GetSymmetricSecurityKey(),
                        SecurityAlgorithms.HmacSha256
                    ),
                    expires: DateTime.UtcNow.AddDays(15)
                );
            var refreshTokenValue = new JwtSecurityTokenHandler().WriteToken(refreshToken);
            if (user != null)
            {
                user.RefreshToken = refreshTokenValue;
                _context.Users.Update(user);
                _context.SaveChanges();
            }
            return refreshTokenValue;
        }
    }
}