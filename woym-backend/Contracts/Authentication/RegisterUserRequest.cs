using System.ComponentModel.DataAnnotations;

namespace woym.Contracts;

public record RegisterUserRequest(
    [Required] string Email,
    [Required] string Name,
    [Required] string Password
);