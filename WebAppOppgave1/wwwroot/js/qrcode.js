$(document).ready(()=>{
    $.get("Bestilling/HentQrCode", (img) => {
        console.log(img);
        $("#qr_image").attr("src","data:image/jpeg;base64," + img);
    })
})