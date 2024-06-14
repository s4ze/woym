using System.ComponentModel.DataAnnotations;

namespace woym.Data;

public class User
{
    [Required]
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Password { get; set; }
}
