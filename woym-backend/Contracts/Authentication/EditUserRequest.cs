namespace woym.Contracts;

public record EditUserRequest(
	string? Email,
	string? Name,
	string? Password,
	DateOnly? BirthDate,
	string? City
);