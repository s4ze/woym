using System.ComponentModel.DataAnnotations;

namespace woym.Contracts;

public record NewPostRequest(
	[Required] string UserId,
	[Required] string Title,
	[Required] string Description
);