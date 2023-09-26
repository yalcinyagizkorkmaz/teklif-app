using Microsoft.EntityFrameworkCore;
using webapi.Entity;
using webapi.Entity.Log;

namespace webapi.Data
{
    public class MainDbContext : DbContext
    {
        public DbSet<Entity.Customer> Customers { get; set; }
        public DbSet<ExceptionLog> ExceptionLog { get; set; }
        public DbSet<Musteri> Musteri { get; set; }
        public DbSet<Firma> Firma { get; set; }
      

        public string DbPath { get;set; }

        public MainDbContext(DbContextOptions<MainDbContext> options) : base(options)
        {
            var folder = Environment.SpecialFolder.Desktop;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "FiyatTeklifi.db");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite($"Data Source={DbPath}");
        }


    }
}
