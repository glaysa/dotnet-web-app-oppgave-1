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
        public int [] Lugarer { set; get; }
        public int [] Meals { set; get; }
        public int [] SPA { set; get; }
    }
}
