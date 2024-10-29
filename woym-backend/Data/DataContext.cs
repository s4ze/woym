using Microsoft.EntityFrameworkCore;
using woym.Models;

namespace woym.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) :
        base(options)
    { }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseSerialColumns();
    }
    public DbSet<User> Users { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Media> Media { get; set; }
}
