using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using woym.Data;
using woym.Interfaces;
using woym.Models;

namespace woym.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly DataContext _context;
        private readonly IAuthorizationService _authorizationService;
        /* public AuthenticationService(DataContext context)
        {
            _context = context;
        } */
        public AuthenticationService(DataContext context, IAuthorizationService authorizationService)
        {
            _context = context;
            _authorizationService = authorizationService;
        }
        public IResult Register(string email, string name, string password)
        {
            if (!CheckForExistingUserByEmail(email))
            {
                _context.Users.Add(new User(email, name, password));
                _context.SaveChanges();
                return Results.Ok();
            }
            return Results.Unauthorized();
        }
        public IResult Login(string email, string password)
        {
            if (CheckForLogin(email, password))
            {
                var accessToken = _authorizationService.GenerateAccessToken(email, IsAdmin(email));
                var refreshToken = _authorizationService.GenerateRefreshToken(email);

                TokenResponse tokens = new(accessToken, refreshToken);
                // TODO: ADD AUTHORIZATIONSERVICE.GENERATEREFRESHTOKEN. SEND REFRESHTOKEN IN REQUEST. CLIENT UPDATES REFRESHTOKEN IN LOCALSTORAGE
                return Results.Ok(tokens);
            }
            return Results.Unauthorized();
        }
        public bool CheckForLogin(string email, string password)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            if (user == null) return false;
            return BCrypt.Net.BCrypt.Verify(password, user.Password);
        }
        public bool CheckForExistingUserByEmail(string email)
        {
            return _context.Users.Any(u => u.Email == email);
        }
        public bool IsAdmin(string email)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            if (user == null) return false;
            return user.Admin;
        }
    }
}