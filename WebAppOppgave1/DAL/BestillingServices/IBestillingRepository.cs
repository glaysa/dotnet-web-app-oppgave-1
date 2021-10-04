using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppOppgave1.Models;

namespace WebAppOppgave1.DAL.BestillingServices
{
    public interface IBestillingRepository
    {
        Task<bool> LagreBestilling(Bestilling innBestilling);
    }
}
