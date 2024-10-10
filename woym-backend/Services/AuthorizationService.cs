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
        public bool CheckAccessToken(string accessToken)
        {
            var handler = new JwtSecurityTokenHandler();
            // verify token
            handler.ValidateToken(accessToken, AuthenticationOptions.TokenValidationParameters, out SecurityToken validatedToken);
            return validatedToken is JwtSecurityToken;
        }
        public bool CheckRefreshToken(string refreshToken)
        {
            // gets refreshtoken from user
            var handler = new JwtSecurityTokenHandler();
            handler.ValidateToken(refreshToken, AuthenticationOptions.TokenValidationParameters, out SecurityToken validatedToken);

            if (validatedToken is not JwtSecurityToken jwtSecurityToken)
            {
                return false;
            }
            // checks for expiry date
            var issuedAt = jwtSecurityToken.Payload.IssuedAt;
            if (issuedAt.CompareTo(DateTime.UtcNow) > 0)
            {
                return false;
            }

            // decodes token and finds user's email
            var email = jwtSecurityToken.Claims.First(claim => claim.Type == ClaimTypes.Email).Value;

            // gets this user's refreshToken from db
            var user = _context.Users.First(u => u.Email == email);

            // compares tokens. if both aren't compare then return 401 or 403
            if (user?.RefreshToken == null || user.RefreshToken != refreshToken)
            {
                return false;
            }

            return true;
        }
        public string GenerateAccessToken(string email, bool admin = false)
        {
            // Создаём claims
            List<Claim> claims = [new(ClaimTypes.Email, email)];
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
        public string GenerateRefreshToken(string email)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            // Создаём claims
            List<Claim> claims = new() { new(ClaimTypes.Email, email) };
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
        public string RefreshToken(string token)
        {
            string result;
            if (CheckRefreshToken(token))
            {
                var handler = new JwtSecurityTokenHandler();
                var jwtSecurityToken = handler.ReadJwtToken(token);

                var email = jwtSecurityToken.Claims.First(claim => claim.Type == ClaimTypes.Email).Value;
                var user = _context.Users.First(u => u.Email == email);

                var accessToken = GenerateAccessToken(email, user.Admin);
                var refreshToken = GenerateRefreshToken(email);

                TokenResponse tokens = new(accessToken, refreshToken);

                result = tokens.ToString()!;
            }
            else
            {
                result = "401";
            }
            return result;
        }
    }
}