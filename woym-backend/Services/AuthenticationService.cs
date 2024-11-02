using woym.Data;
using woym.Interfaces;
using woym.Models;

namespace woym.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly DataContext _context;
        public AuthenticationService(DataContext context)
        {
            _context = context;
        }
        public bool Register(string email, string name, string password)
        {
            var result = false;
            if (!CheckForExistingUserByEmail(email))
            {
                var user = new User()
                {
                    UserId = Guid.NewGuid(),
                    Email = email,
                    Name = name,
                    Password = BCrypt.Net.BCrypt.HashPassword(password, BCrypt.Net.BCrypt.GenerateSalt(8)),
                    Admin = false,
                    CreatedAt = DateTime.Now.ToString("dd-MM-yyyy HH:mmK"),
                };
                _context.Users.Add(user);
                _context.SaveChanges();
                result = true;
            }
            return result;
        }
        public bool Login(string email, string password)
        {
            if (!CheckForExistingUserByEmail(email)) return false;
            var user = GetUserByEmail(email);
            if (user == null) return false;
            return BCrypt.Net.BCrypt.Verify(password, user.Password);
        }
        public bool CheckForExistingUserById(string userId)
        {
            return _context.Users.Any(u => u.UserId.ToString() == userId);
        }
        public bool CheckForExistingUserByEmail(string email)
        {
            return _context.Users.Any(u => u.Email == email);
        }
        public bool IsAdmin(string userId)
        {
            var user = GetUserById(userId);
            if (user == null) return false;
            return user.Admin;
        }
        public User GetUserById(string userId)
        {
            return _context.Users.First(u => u.UserId.ToString() == userId);
        }
        public User GetUserByEmail(string email)
        {
            return _context.Users.First(u => u.Email == email);
        }
    }
}