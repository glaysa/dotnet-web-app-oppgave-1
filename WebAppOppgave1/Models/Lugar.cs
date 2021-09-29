using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppOppgave1.Models
{
    public class Lugar
    {
        [Key]
        public int LugarNummer { get; set; }
        public string Type { get; set; }
        public double Pris { get; set; }
    }
}
