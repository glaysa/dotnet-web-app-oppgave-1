
////////////////////////////////////////////////////////////////////
/////                                                          /////
/////        Denne filen gjør nettsiden dynamisk.              /////
/////    Ingen server relatert logikk er implementert her.     /////
/////                                                          /////
////////////////////////////////////////////////////////////////////

// Ready funksjon
$(document).ready(function () {
    visKalender();
    deaktiverInputs(fraStedInput, tilStedInput, fraDatoInput, tilDatoInput);
});

// Noen input felter må først velges før de andre

function deaktiverInputs(...params){
    for(let input of params) {
        input.attr('disabled', true);
    }
}
function aktiverInput(input){
    input.attr('disabled', false);
}

// Endrer meny ikonen på små enheter fra burger til X og omvendt.
$("#btn-toggle").click(function () {
    $("#btn-toggle").toggleClass("on");
});

// Viser kalender når dato input er klikket
function visKalender(){
    $('#fra-dato, #til-dato').datepicker({
        beforeShow: customRange,
        dateFormat: "dd. M yy",
    });
}

// Fjerner ugyldige datoer fra dato inputs
function customRange(input) {
    if (input.id === 'fra-dato') {
        let minDate = new Date();
        minDate.setDate(minDate.getDate())
        return { minDate: minDate };
    }
    if (input.id === 'til-dato') {
        let minDate = new Date($('#fra-dato').val());
        minDate.setDate(minDate.getDate() + 1)
        return { minDate: minDate };
    }
}