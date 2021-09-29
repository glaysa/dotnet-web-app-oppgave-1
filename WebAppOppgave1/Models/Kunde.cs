using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppOppgave1.Models
{
    public class Kunde
    {
        [Key]
        public int KundeID { get; set; }
        public string Fornavn { get; set; }
        public string Etternavn { get; set; }
        public string Tlfnummer { get; set; }
        public string Epost { get; set; }
        public string Adresse { get; set; }
        public virtual Postnummer Postnummer{ get; set; }
        public virtual List<Bestilling> Bestillinger{ get; set; }
    }
}
