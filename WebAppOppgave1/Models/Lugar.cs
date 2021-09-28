using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppOppgave1.Models
{
    public class Lugar
    {
        public int LugarNummer { get; set; }
        public string Type { get; set; }
        public double Pris { get; set; }
        public virtual Bestilling Bestiling { get; set; }
    }
}
