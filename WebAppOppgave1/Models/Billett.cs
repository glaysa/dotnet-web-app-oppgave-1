using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppOppgave1.Models
{
    public class Billett
    {
        public int BillettID { set; get; }
        public int KundeID { get; }
        //usikker om vi lagrer idene eller hele objektet.
        public Lugar [] Lugarer { set; get; }
        public int [] Meals { set; get; }
        public int [] SPA { set; get; }
        public string Rute { set; get; }
        public DateTime UtreiseDato { set; get; }
        public DateTime UtreiseTid { set; get; }
        public DateTime AnkomstDato { set; get; }
        public DateTime AnkomstTid { set; get; }
        public double Pris { set; get; }
    }
}
