using System.ComponentModel.DataAnnotations;

namespace woym.Contracts;

public record LoginUserRequest(
    [Required] string Email,
    [Required] string Password
);