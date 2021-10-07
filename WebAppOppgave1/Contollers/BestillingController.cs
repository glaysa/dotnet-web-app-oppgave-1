using System;
using System.Drawing;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using QRCoder;
using WebAppOppgave1.DAL.BestillingServices;
using WebAppOppgave1.Models;

namespace WebAppOppgave1.Contollers
{
    [Route("[controller]/[action]")]
    public class BestillingController : ControllerBase
    {
        private readonly IBestillingRepository _db;

        public BestillingController(IBestillingRepository db)
        {
            _db = db;
        }

        public async Task<bool> Lagre(Bestilling innBestilling)
        {
            return await _db.LagreBestilling(innBestilling);
        }

        public IActionResult HentQrCode()
        {
            Task<Bestilling> result =  _db.HentBestilling();
            Bestilling bestilling = result.Result;
            string qrText = bestilling.BestillingNummer + "\n" + bestilling.TotalPris + "\nGod Tur!";
            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(qrText, QRCodeGenerator.ECCLevel.Q);
            QRCode qrCode = new QRCode(qrCodeData);
            Bitmap qrCodeImage = qrCode.GetGraphic(20);
            return  base.File(BitmapToBytes(qrCodeImage), "image/jpeg");
        }

        private byte[] BitmapToBytes(Bitmap img)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                img.Save(stream, System.Drawing.Imaging.ImageFormat.Png);
                return stream.ToArray();
            }
        }
    }
}
