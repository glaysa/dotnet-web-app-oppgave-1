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
            _db.Billetter.Find(0);

            Console.Write(innBestilling);
            // Bestilling objektet skal i utgangspunktet inneholde objekter av all modeler
            //det skal lages objekter av objektet og legge den i db asynkront.
            return true;
        }
    }
}
