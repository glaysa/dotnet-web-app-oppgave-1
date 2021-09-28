using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppOppgave1.Models
{
    public class DB:DbContext
    {
        public DB(DbContextOptions<DB> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public virtual DbSet<Kunde> Kunde { get; set; }
        public virtual DbSet<Bestilling> Bestilling { get; set; }
        public virtual DbSet<Billett> Billett { get; set; }
        public virtual DbSet<Passasjer> Passasjer { get; set; }
        public virtual DbSet<Meal> Meal { get; set; }
        public virtual DbSet<Lugar> Lugar { get; set; }
        public virtual DbSet<Postnummer> Postnummer { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //importert pakken Microsoft.EntityFrameworkCore.Proxies
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
