using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace woym.Models;

public class Media
{
	public Media() { }
	[Required] public Guid MediaID { get; set; }
	[Column(TypeName = "VARCHAR(256)")] public string Url { get; set; }
	public User User { get; set; }
	public Post? Post { get; set; }
}
