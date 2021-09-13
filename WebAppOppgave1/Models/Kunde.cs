using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppOppgave1.Models
{
    public class Kunde
    {
        public int kundeID { set; get; }
        public string fornavn { set; get; }
        public string etternavn { set; get; }
        public string tlfnummer { set; get; }
        public string epost { set; get; }
        public string adresse { set; get; }
        public string postnummer { set; get; }
        public string poststed { set; get; }
    }
}
