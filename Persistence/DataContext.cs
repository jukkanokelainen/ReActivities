using Microsoft.EntityFrameworkCore;
using Domain;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        //Name of the table is Activities, columns are created by
        //activity class (in domain namespace)
        public DbSet<Activity> Activities { get; set; }
    }
}