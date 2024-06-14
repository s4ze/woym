using Microsoft.EntityFrameworkCore;

namespace woym.Data;

public class WoymDataContext : DbContext
{
    public WoymDataContext(DbContextOptions<WoymDataContext> options):
        base(options) 
    {}
    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.UseSerialColumns();
    }
    public DbSet<User> Users { get; set; }
}
