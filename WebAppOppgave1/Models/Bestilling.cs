using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppOppgave1.Models
{
    public class Bestilling
    {
        public int BestillingNummer { set; get; }
        public virtual Kunde Kunde { set; get; }
        public virtual List<Billett> Billetter { set; get; }
        public virtual List<Lugar> LugarNummer { set; get; }
        public virtual List<Meal> Meals { set; get; }
        public double TotalPris { set; get; }
    }
}
