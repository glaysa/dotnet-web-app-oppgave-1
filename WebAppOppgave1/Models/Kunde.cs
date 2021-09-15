using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppOppgave1.Models
{
    public class Kunde
    {
        public int KundeID { set; get; }
        public string Fornavn { set; get; }
        public string Etternavn { set; get; }
        public string Tlfnummer { set; get; }
        public string Epost { set; get; }
        public string Adresse { set; get; }
        public string Postnummer { set; get; }
        public string Poststed { set; get; }
    }
}
