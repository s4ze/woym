using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace woym.Models;

public class Post
{
	public Post() { }
	[Required] public Guid PostId { get; set; }
	[Column(TypeName = "VARCHAR(1024)")] public string Description { get; set; }
	public User User { get; set; }
	public ICollection<Media>? Media { get; set; }
	[Column(TypeName = "VARCHAR(25)")] public string CreatedAt { get; set; }
	// public DateTime CreatedAt { get; set; }

}
