using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace woym.Models;

public class Post
{
	public Post() { }
	[Required] public Guid PostId { get; set; }
	[Column(TypeName = "VARCHAR(256)")] public string Title { get; set; }
	[Column(TypeName = "VARCHAR(1024)")] public string Description { get; set; }
	public User User { get; set; }
	public ICollection<Media>? Media { get; set; }
	public DateTime CreatedAt { get; set; }
}