using System.ComponentModel.DataAnnotations;

namespace woym.Contracts;

public record NewPostRequest(
	[Required] string UserId,
	[Required] string Description,
	string Media
);