namespace woym.Contracts;

public record EditUserRequest(
	string? Email,
	string? Name,
	string? Password,
	string? BirthDate,
	string? City
);