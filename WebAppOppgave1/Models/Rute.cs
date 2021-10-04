using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppOppgave1.Models
{
    public class Rute
    {
        [Key]
        public int RuteID { get; set; }
        public string Tur { get; set; }
        public string Retur { get; set; }
        public double Pris { get; set; }
        public virtual Billett Billett { get; set; }
    }
}
