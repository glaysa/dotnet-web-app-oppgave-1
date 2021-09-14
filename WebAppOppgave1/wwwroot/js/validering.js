
////////////////////////////////////////////////////////////////////
/////                                                          /////
/////               Validerer alle input feltene               /////
/////             før bruker kan gå videre til neste           /////   
/////               trinn av billett bestillingen              /////
/////                                                          /////
////////////////////////////////////////////////////////////////////

// Input variabler

let reiseTypeInput = $("#reise-type");
let fraStedInput = $("#fra-sted");
let tilStedInput = $("#til-sted");
let fraDatoInput = $("#fra-dato");
let tilDatoInput = $("#til-dato");

// Feil meldinger

let reiseTypeFeilMelding = $("#reise-type-feil-melding");
let fraStedFeilMelding = $("#fra-sted-feil-melding");
let tilStedFeilMelding = $("#til-sted-feil-melding");
let fraDatoFeilMelding = $("#fra-dato-feil-melding");
let tilDatoFeilMelding = $("#til-dato-feil-melding");

function validerReiseType(){
    let valgt = reiseTypeInput.val();
    let ok = true;

    if (valgt === "") {
        reiseTypeInput.addClass('is-invalid');
        reiseTypeFeilMelding.removeClass('d-none');
        ok = false;
    } else if(valgt === "en-vei"){
        reiseTypeInput.removeClass('is-invalid');
        reiseTypeFeilMelding.addClass('d-none');
        aktiverInput(fraStedInput);
        // Skjul retur elementer
        // Skjul tilDatoInput
    } else {
        reiseTypeInput.removeClass('is-invalid');
        reiseTypeFeilMelding.addClass('d-none');
        aktiverInput(fraStedInput);
        // Vis retur elementer
        // Vis tilDatoInput
    }
    return ok;
}

function validerFraSted(){
    if (fraStedInput.val() === "") {
        fraStedInput.addClass('is-invalid');
        fraStedFeilMelding.removeClass('d-none');
        return false;
    } else {
        fraStedInput.removeClass('is-invalid');
        fraStedFeilMelding.addClass('d-none');
        aktiverInput(tilStedInput);
        // Fjern fraStedInput verdi fra tilStedInput options
        return true;
    }
}

function validerTilSted(){
    if (tilStedInput.val() === "") {
        tilStedInput.addClass('is-invalid');
        tilStedFeilMelding.removeClass('d-none');
        return false;
    } else {
        tilStedInput.removeClass('is-invalid');
        tilStedFeilMelding.addClass('d-none');
        aktiverInput(fraDatoInput);
        // Fjern tilStedInput verdi fra fraStedInput options
        return true;
    }
}

function validerFraDato(){
    let idag = moment(new Date()).format("DD. MMM YYYY");
    let ok = false;

    if(!datoErTom(fraDatoInput, fraDatoFeilMelding, "Velg en avreise dato.")) {
        if(fraDatoInput.val() === idag){
            visDatoFeilMelding(fraDatoInput, fraDatoFeilMelding, "Ingen billetter finnes for denne dato.");
        } else if(fraDatoInput.val() < idag){
            visDatoFeilMelding(fraDatoInput, fraDatoFeilMelding, "Ugyldig avreise dato.");
        } else {
            fjernDatoFeilMelding(fraDatoInput, fraDatoFeilMelding);
            aktiverInput(tilDatoInput);
            ok = true;
        }
    }
    return ok;
}

function validerTilDato(){
    if(reiseTypeInput.val() === "en-vei") return true;
    let ok = false;

    if(!datoErTom(tilDatoInput, tilDatoFeilMelding, "Velg en retur dato.")) {
        if(tilDatoInput.val() === fraDatoInput.val()) {
            visDatoFeilMelding(tilDatoInput, tilDatoFeilMelding, "Avreise og retur dato kan ikke være samme dag.");
        } else if(tilDatoInput.val() < fraDatoInput.val()){
            visDatoFeilMelding(tilDatoInput, tilDatoFeilMelding, "Ugyldig retur dato.");
        } else {
            fjernDatoFeilMelding(tilDatoInput, tilDatoFeilMelding);
            ok = true;
        }
    }
    return ok;
}

// Hjelpe funksjoner for dato valideringer

function datoErTom(datoInput, feilMeldingBox, feilMelding){
    if(datoInput.val() === "") {
        visDatoFeilMelding(datoInput, feilMeldingBox, feilMelding);
        return true;
    }
    return false;
}

function visDatoFeilMelding(datoInput, feilMeldingBox, feilMelding){
    datoInput.addClass('is-invalid');
    feilMeldingBox.removeClass('d-none');
    feilMeldingBox.text(feilMelding);
}

function fjernDatoFeilMelding(datoInput, feilMeldingBox){
    datoInput.removeClass('is-invalid');
    feilMeldingBox.addClass('d-none');
}

// Validerer trinn

function validerTrinn1(){
    let ok = validerReiseType() && validerFraSted() && validerTilSted() && validerFraDato() && validerTilDato();
    if(ok) alert("Ok!");
}