using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppOppgave1.Models
{
    public class Bestilling
    {
        public int BestillingNummer { set; get; }
        public int KundeID { set; get; }
        public int [] BillettID { set; get; }
        public int [] LugarNummer { set; get; }
        public int [] MealsNummer { set; get; }
        public double TotalPris { set; get; }
    }
}
