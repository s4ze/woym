using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using BCrypt.Net;

namespace woym.Models;

public class User
{
    public User(string email, string name, string password)
    {
        this.Id = Guid.NewGuid();
        this.Email = email;
        this.Name = name;
        var salt = BCrypt.Net.BCrypt.GenerateSalt(8);
        this.Password = BCrypt.Net.BCrypt.HashPassword(password, salt);
    }
    public User(string email, string name, string password, bool admin)
    {
        this.Id = Guid.NewGuid();
        this.Email = email;
        this.Name = name;
        this.Admin = admin;
        var salt = BCrypt.Net.BCrypt.GenerateSalt(8);
        this.Password = BCrypt.Net.BCrypt.HashPassword(password, salt);
    }
    public User() { }
    public string? RefreshToken { get; set; }
    [Required]
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Password { get; set; }
    public bool Admin { get; set; } = false;
}
