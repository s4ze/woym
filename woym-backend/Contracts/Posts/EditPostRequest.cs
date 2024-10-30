using System.ComponentModel.DataAnnotations;

namespace woym.Contracts;

public record EditPostRequest(
	[Required] string Description
);