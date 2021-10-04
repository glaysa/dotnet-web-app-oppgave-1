using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppOppgave1.Models
{
    public class Bestilling
    {
        [Key]
        public int BestillingNummer { get; set; }
        public virtual Kunde Kunde { get; set; }
        public virtual List<Billett> Billetter { get; set; }
        public virtual List<Lugar> Lugars { get; set; }
        public virtual List<Meal> Meals { get; set; }
        public double TotalPris { get; set; }
    }
}
