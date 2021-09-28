using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppOppgave1.Models
{
    public class DBInit
    {
        public static void init(IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            var context = serviceScope.ServiceProvider.GetService<DB>();

            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
        }
    }
}
