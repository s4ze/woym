using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using woym.Data;
using woym.Interfaces;
using woym.Models;

namespace woym.Services {
    public class AuthenticationService : IAuthenticationService
    {
        private readonly DataContext _context;
        public AuthenticationService(DataContext context) {
            _context = context;
        }
        public IResult Register(string email, string name, string password)
        {
            if (!CheckForExistingUserByEmail(email)) {
                _context.Users.Add(new User(email, name, password));
                _context.SaveChanges();
                return Results.Ok();
            }
            return Results.Unauthorized();
        }
        public IResult Login(string email, string password)
        {
            if (CheckForLogin(email, password)) {
                // REPLACE WITH AUTHORIZATIONSERVICE.GENERATEACCESSTOKEN METHOD
                // ADD AUTHORIZATIONSERVICE.GENERATEREFRESHTOKEN. SEND REFRESHTOKEN IN REQUEST. CLIENT UPDATES REFRESHTOKEN IN LOCALSTORAGE
            }
            return Results.Unauthorized();
        }
        public bool CheckForLogin(string email, string password) {
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            if (user != null) return BCrypt.Net.BCrypt.Verify(password, user.Password);
            return false;
        }
        public bool CheckForExistingUserByEmail(string email) {
            return _context.Users.Any(u => u.Email == email);
        }
    }
}