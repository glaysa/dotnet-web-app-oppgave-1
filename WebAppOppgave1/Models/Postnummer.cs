using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppOppgave1.Models
{
    public class Postnummer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string postnr { get; set; }
        public string Poststed { get; set; }
    }
}
