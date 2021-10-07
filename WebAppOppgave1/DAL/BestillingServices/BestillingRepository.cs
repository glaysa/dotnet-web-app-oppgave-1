using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppOppgave1.Models;

namespace WebAppOppgave1.DAL.BestillingServices
{
    public class BestillingRepository : IBestillingRepository
    {
        private readonly DB _db;
        public BestillingRepository(DB db)
        {
            _db = db;
        }
        public async Task<bool> LagreBestilling(Bestilling innBestilling)
        {
            try
            {
                var nyKunde = new Kunde();
                nyKunde.Fornavn = innBestilling.Kunde.Fornavn;
                nyKunde.Etternavn = innBestilling.Kunde.Etternavn;
                nyKunde.Tlfnummer = innBestilling.Kunde.Tlfnummer;
                nyKunde.Adresse = innBestilling.Kunde.Adresse;
                nyKunde.Epost = innBestilling.Kunde.Epost;
                //nyKunde.Postnummer = innBestilling.Kunde.Postnummer; //midlertidig
                
                var sjekketPostnr = await _db.Poststeder.FindAsync(innBestilling.Kunde.Postnummer.Postnr);
                if (sjekketPostnr == null)
                {
                    var nyPoststedRecord = new Postnummer()
                    {
                        Postnr = innBestilling.Kunde.Postnummer.Postnr,
                        Poststed = innBestilling.Kunde.Postnummer.Poststed
                    };
                    nyKunde.Postnummer = nyPoststedRecord;
                }
                else
                {
                    nyKunde.Postnummer = sjekketPostnr;
                }
                
                var nyeBilletter = new List<Billett>();
                innBestilling.Billetter.ForEach(billett =>
                {
                    nyeBilletter.Add(new Billett()
                    {
                        Type = billett.Type,
                        Tur = billett.Tur,
                        Retur = billett.Retur,
                        Utreise = billett.Utreise,
                        Ankomst = billett.Ankomst,
                        Passasjer = billett.Passasjer
                    });
                });
                
                var lugarer = innBestilling.Lugars;
                var meals = innBestilling.Meals;

                var bestilling = new Bestilling()
                {
                    Kunde = nyKunde,
                    Billetter = nyeBilletter,
                    Lugars = lugarer,
                    Meals = meals,
                    TotalPris = innBestilling.TotalPris
                };
                
                _db.Bestillinger.Add(bestilling);
                await _db.SaveChangesAsync();
                
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
