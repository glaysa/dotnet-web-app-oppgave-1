using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppOppgave1.Models
{
    public class Billett
    {
        public int BillettID { get; set; }
        public string Rute { get; set; }
        public DateTime UtreiseDato { get; set; }
        public DateTime UtreiseTid { get; set; }
        public DateTime AnkomstDato { get; set; }
        public DateTime AnkomstTid { get; set; }
        public double Pris { get; set; }
        public virtual Bestilling Bestilling { get; set; }
        public virtual Passasjer Passasjer { get; set; }
    }
}
