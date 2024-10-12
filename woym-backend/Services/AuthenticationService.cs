using woym.Data;
using woym.Interfaces;
using woym.Models;

namespace woym.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly DataContext _context;
        /* public AuthenticationService(DataContext context)
        {
            _context = context;
        } */
        public AuthenticationService(DataContext context)
        {
            _context = context;
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
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return Results.Ok();
            }
            return Results.Unauthorized();
        }
        public bool CheckForLogin(string email, string password)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            if (user == null)
            {
                return false;
            }
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