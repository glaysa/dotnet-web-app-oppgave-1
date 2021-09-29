using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppOppgave1.Models
{
    public class Meal
    {
        [Key]
        public int MealsNummer { get; set; }
        public string Maaltid { get; set; }
        public double Pris { get; set; }
        public virtual Bestilling Bestilling { get; set; }
    }
}
