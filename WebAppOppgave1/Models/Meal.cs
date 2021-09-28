using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppOppgave1.Models
{
    public class Meal
    {
        public int MealsNummer { get; set; }
        public string Maaltid { get; set; }
        public double Pris { get; set; }
        public virtual Bestilling Bestiling { get; set; }
    }
}
