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
                /*var NyKunde = new Kunde();
                NyKunde.Fornavn = innBestilling.Kunde.Fornavn;
                NyKunde.Tlfnummer = innBestilling.Kunde.Etternavn;
                NyKunde.Tlfnummer = innBestilling.Kunde.Tlfnummer;
                NyKunde.Epost = innBestilling.Kunde.Epost;
                NyKunde.Postnummer = innBestilling.Kunde.Postnummer;
                //TODO: sjekk om postnummer aksisterer i db.

                var NyeBilletter = new List<Billett>();
                foreach (Billett billett in innBestilling.Billetter)
                {
                    NyeBilletter.Add(new Billett()
                    {
                        Type = billett.Type,
                        Tur = billett.Tur,
                        Retur = billett.Retur,
                        Utreise = billett.Utreise,
                        Ankomst = billett.Ankomst,
                        Passasjer = billett.Passasjer
                    });
                }
                var Lugarer = innBestilling.Lugars;
                var Meals = innBestilling.Meals;

                var Bestilling = new Bestilling()
                {
                    Kunde = NyKunde,
                    Billetter = NyeBilletter,
                    Lugars = Lugarer,
                    Meals = Meals,
                    TotalPris = innBestilling.TotalPris
                };*/

                var Bestilling = innBestilling;
                _db.Bestillinger.Add(Bestilling);
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
