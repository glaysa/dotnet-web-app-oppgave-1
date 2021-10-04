
////////////////////////////////////////////////////////////////////
/////                                                          /////
/////               Validerer alle input feltene               /////
/////             før bruker kan gå videre til neste           /////   
/////               trinn av billett bestillingen              /////
/////                                                          /////
////////////////////////////////////////////////////////////////////

// Input variabler

let reiseTypeInput = $("#reise-type");
let fraDatoInput = $("#fra-dato");
let tilDatoInput = $("#til-dato");

// Valideringsfunksjoner for trinn 1: Rute

function validerRute(){
    let checkedRute = $("input[name=ruter]:checked").val();
    let checkedRutePris = $('#' + checkedRute + '-pris').text();
    let ruteInputFeilMelding = $("#rute-feil-melding");
    
    if (checkedRute === undefined || checkedRute === "") {
        $("#rute-input-placeholder").addClass('is-invalid');
        ruteInputFeilMelding.removeClass('d-none');
        return false;
    } else {
        // Slik at navn til steder kan aksesseres
        rute['ruteFra'] = $('#' + checkedRute + '-col .rute-fra').text();
        rute['ruteTil'] = $('#' + checkedRute + '-col .rute-til').text();
        rute['rutePris'] = Number(checkedRutePris);
        $("#rute-input-placeholder").removeClass('is-invalid');
        ruteInputFeilMelding.addClass('d-none');
        aktiverInput(reiseTypeInput);
        return true;
    }
}

function validerReiseType(){
    let reiseTypeFeilMelding = $("#reise-type-feil-melding");
    let type = reiseTypeInput.val();
    let ok = true;

    if (type === "") {
        reiseTypeInput.addClass('is-invalid');
        reiseTypeFeilMelding.removeClass('d-none');
        ok = false;
    } else if(type === "en-vei"){
        reiseTypeInput.removeClass('is-invalid');
        reiseTypeFeilMelding.addClass('d-none');
        $("#til-dato-col").addClass('d-none');
        reiseType = 'enVei';
        aktiverInput(fraDatoInput);
        $('.retur-element').addClass('d-none');
    } else {
        reiseTypeInput.removeClass('is-invalid');
        reiseTypeFeilMelding.addClass('d-none');
        $("#til-dato-col").removeClass('d-none');
        reiseType = 'turRetur';
        aktiverInput(fraDatoInput);
        $('.retur-element').removeClass('d-none');
    }
    return ok;
}

function validerFraDato(){
    let fraDatoFeilMelding = $("#fra-dato-feil-melding");
    let idag = moment(new Date());
    let fra = moment(new Date(fraDatoInput.datepicker('getDate')));
    let ok = false;
    
    if(!datoErTom(fraDatoInput, fraDatoFeilMelding, "Velg en avreise dato.")) {
        if(fra.isSameOrBefore(idag)){
            visDatoFeilMelding(fraDatoInput, fraDatoFeilMelding, "Ingen billetter finnes for denne dato.");
        } else if(fra.isBefore(idag)){
            visDatoFeilMelding(fraDatoInput, fraDatoFeilMelding, "Ugyldig avreise dato.");
        } else {
            avreiseDato = fra.format('DD/MM/YYYY');
            fjernDatoFeilMelding(fraDatoInput, fraDatoFeilMelding);
            aktiverInput(tilDatoInput);
            ok = true;
        }
    }
    return ok;
}

function validerTilDato(){
    if(reiseTypeInput.val() === "en-vei") return true;
    let tilDatoFeilMelding = $("#til-dato-feil-melding");
    let fra = moment(new Date(fraDatoInput.datepicker('getDate')));
    let til = moment(new Date(tilDatoInput.datepicker('getDate')));
    let ok = false;

    if(!datoErTom(tilDatoInput, tilDatoFeilMelding, "Velg en retur dato.")) {
        if(til.isSame(fra)) {
            visDatoFeilMelding(tilDatoInput, tilDatoFeilMelding, "Avreise og retur dato kan ikke være samme dag.");
        } else if(til.isBefore(fra)){
            visDatoFeilMelding(tilDatoInput, tilDatoFeilMelding, "Ugyldig retur dato.");
        } else {
            returDato = til.format('DD/MM/YYYY'); 
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

function formatterDato(id) {
    let datoInput = $("#" + id);
    let datoVerdi = moment(new Date(datoInput.datepicker('getDate')));
    return  datoVerdi.format('DD/MM/YYYY');
}

// Valideringsfunksjoner for trinn 2: Antall Reisefølger

function plussReisefolger(type, max) {
    let plussBtn = $("#" + type + " .pluss");
    let minusBtn = $("#" + type + " .minus");
    let label = $(".antall-" + type);
    let value = Number(label.text());
    
    if(value < max) {
        value++;
        label.text(value);
        plussBtn.removeClass('disabled');
        minusBtn.removeClass('disabled');
    } else {
        plussBtn.addClass('disabled');
    }
}

function minusReisefolger(type, min) {
    let plussBtn = $("#" + type + " .pluss");
    let minusBtn = $("#" + type + " .minus");
    let label = $(".antall-" + type);
    let value = Number(label.text());
    
    if(value > min) {
        value--;
        label.text(value);
        plussBtn.removeClass('disabled');
        minusBtn.removeClass('disabled');
    } else {
        minusBtn.addClass('disabled');
    }
}

// Valideringsfunksjoner for trinn 3: Lugarer

function validerLugar(){
    let lugar = $('#valgt-lugar').val();
    let romAntallReservasjon = $('#' + lugar + '-antall-reservasjon').text();
    
    if(Number(romAntallReservasjon > 0)) {
        skjulLugarFeilMelding();
        lageLugarObjekt(lugar);
        visValgteLugarer();
        return true;
    } else {
        visLugarFeilMelding();
        return false;
    }
}

// Lager lugar objekt
function lageLugarObjekt(lugar){
    let romAntallReservasjon = $('#' + lugar + '-antall-reservasjon').text();
    let romPris = $('#' + lugar + '-pris').text();
    let totalPris = Number(romAntallReservasjon) * Number(romPris);
    let objekt = {'type': lugar, 'antall': Number(romAntallReservasjon), 'pris': totalPris};
    
    // Hvis lugar er allerede i arrayet, fjern den og legg den ny lugar: unngår duplikater
    lugarer.forEach(function (item, index) {
        if(item.type === lugar) lugarer.splice(index, 1);
    });
    lugarer.push(objekt);
}

// Viser valgte lugarer på klient siden
function visValgteLugarer(){
    let lugarTemplate = document.getElementById('lugar-template');
    let parent = $('#valgt-lugar-template-tray');
    parent.empty();

    for(let i = 0; i < lugarer.length; i++) {
        let clone = lugarTemplate.content.cloneNode(true);
        clone.querySelector('.antall').innerText = lugarer[i].antall;
        clone.querySelector('.tittel').innerText = lugarer[i].type;
        clone.querySelector('.rom-fjern-btn').name = lugarer[i].type;
        parent.append(clone);
    }
}

// Fjerner lugar fra arrayet og på klient siden
function fjernLugar(button){
    let toRemove = button.name;
    lugarer.forEach(function (item, index) {
        if(item.type === toRemove) {
            lugarer.splice(index, 1);
            visValgteLugarer();
        }
    });
}

function visLugarFeilMelding(){
    let lugarFmPlaceholder = $("#lugar-fm-placeholder");
    let lugarFeilMelding = $(".lugar-feil-melding");
    lugarFmPlaceholder.addClass('is-invalid');
    lugarFeilMelding.text('Velg minst èn lugar.');
    lugarFeilMelding.removeClass('d-none');
}

function skjulLugarFeilMelding(){
    let lugarFmPlaceholder = $("#lugar-fm-placeholder");
    let lugarFeilMelding = $(".lugar-feil-melding");
    lugarFmPlaceholder.removeClass('is-invalid');
    lugarFeilMelding.addClass('d-none');
}

// Valideringsfunksjon for trinn 4: Måltider

function leggTilValgtMaaltid(){
    $(".maaltid-row").on('click', function () {
        let inputId = '#' + $('#' + this.id + ' input').attr('id')
        let maaltidPris = Number($('#' + this.id + ' span.pris').text());
        let maaltidNavn = $('#' + this.id + ' .tittel').text();
        let input = $(inputId);

        // virker som en checked/unchecked toggle
        $(input).attr("checked", !$(input).attr("checked"));

        if($(input).is(':checked')) {
            maaltider.push({'id': inputId, 'navn': maaltidNavn, 'pris': maaltidPris});
            $(inputId + "-ikon").removeClass('d-none');
            $(inputId + '-info').addClass('on');
        } else {
            // Fjern det fra valgt måltid array hvis unchecked
            maaltider.forEach(function (item, index) {
                if(item.id === inputId) maaltider.splice(index, 1);
            });
            $(inputId + "-ikon").addClass('d-none');
            $(inputId + '-info').removeClass('on');
        }
    });
}

// Valideringsfunksjoner for trinn 5: Passasjerer form

function validerPassajerForm(fornavnListe, etternavnListe, fodselsDatoListe) {
    let valid = false;
    for(let i = 0; i < fornavnListe.length; i++){
        let ok = validerFornavn(fornavnListe[i].id)
            && validerEtternavn(etternavnListe[i].id)
            && validerFodselsDato(fodselsDatoListe[i].id);

        if(ok) {
            valid = true;
        } else {
            location.href = '#bestill';
            valid = false;
            break;
        }
    }
    return valid;
}

function lagePassasjerObjekt(fornavnListe, etternavnListe, datoListe){
    // Tæmmer arrayet når bruker går tilbake og endrer antall passasjerer
    passasjerer.length = 0;
    
    for(let i = 0; i < fornavnListe.length; i++) {
        let fornavn = fornavnListe[i].value;
        let etternavn = etternavnListe[i].value;
        let formattedDate = formatterDato(datoListe[i].id);
        
        let objekt = {'fornavn': fornavn, 'etternavn':etternavn, 'fodselsDato': formattedDate };
        passasjerer.push(objekt);
    }
}

// Valideringsfunksjon for trinn 7: Betal

function validerKundeInfo(){
    let fornavnId = $("#kunde-fornavn").attr('id');
    let etternavnId = $("#kunde-etternavn").attr('id');
    let tlfId = $("#kunde-tlf").attr('id');
    let epostId = $("#kunde-epost").attr('id');
    let adresseId = $("#kunde-adresse").attr('id');
    let postnrId = $("#kunde-postnr").attr('id');
    let poststedId = $("#kunde-poststed").attr('id');
    
    let ok = validerFornavn(fornavnId) && validerEtternavn(etternavnId) && validerTlf(tlfId) && validerEpost(epostId)
        && validerAdresse(adresseId) && validerPostnr(postnrId) && validerPoststed(poststedId);
    
    if(ok) {
        kunde['fornavn'] = $("#kunde-fornavn").val();
        kunde['etternavn'] = $("#kunde-etternavn").val();
        kunde['tlf'] = $("#kunde-tlf").val();
        kunde['epost'] = $("#kunde-epost").val();
        kunde['adresse'] = $("#kunde-adresse").val();
        kunde['postnr'] = $("#kunde-postnr").val();
        kunde['poststed'] = $("#kunde-poststed").val();
        return true;
    }
    return false;
}

// Validerer de forskjellige trinnene

// Trinn 1: Rute
function validerTrinn1(){
    let ok = validerRute() && validerReiseType() && validerFraDato() && validerTilDato();
    if(ok) {
        merkerFerdig('#trinn-1');
        skjulOgVisTrinn('#trinn-1','#neste-trinn','','');
    }
}

// Trinn 2: Antall Reisefølger
function validerTrinn2() {
    antallVoksen = Number($('.antall-voksen').text());
    antallBarn = Number($('.antall-barn').text());
    antallDyr = Number($('.antall-dyr').text());
    antallSykler = Number($('.antall-sykkel').text());
    merkerFerdig('#neste-trinn');
    skjulOgVisTrinn('#trinn-2','#trinn-3','#trinn-2-btns','#trinn-3-btns');
}

// Trinn 3: Lugar
function validerTrinn3() {
    if(lugarer.length > 0) {
        merkerFerdig('#trinn-3');
        skjulOgVisTrinn('#trinn-3','#trinn-4','#trinn-3-btns','#trinn-4-btns');
        skjulLugarFeilMelding();
    } else {
        visLugarFeilMelding();
    }
}

// Trinn 4: Måltider
function validerTrinn4() {
    merkerFerdig('#trinn-4');
    skjulOgVisTrinn('#trinn-4','#trinn-5','#trinn-4-btns','#trinn-5-btns');
}

// Trinn 5: Passasjerform
function validerTrinn5() {
    let fornavnListe = $('input[name=fornavn]');
    let etternavnListe = $('input[name=etternavn]');
    let fodselsDatoListe = $('input[name=fodselsdato]');
    if(validerPassajerForm(fornavnListe, etternavnListe, fodselsDatoListe)) {
        lagePassasjerObjekt(fornavnListe, etternavnListe, fodselsDatoListe);
        merkerFerdig('#trinn-5');
        skjulOgVisTrinn('#trinn-5','#trinn-6','#trinn-5-btns','#trinn-6-btns');
    }
}

// Trinn 6: Se over bestillingen
function validerTrinn6() {
    bestillingTotalPris = rute.rutePris + maaltidTotalPris + lugarTotalPris;
    merkerFerdig('#trinn-6');
    skjulOgVisTrinn('#trinn-6','#trinn-7','#trinn-6-btns','#trinn-7-btns');
}

// Trinn 7: Betal
function validerTrinn7() {
    if(validerKundeInfo()) {
        merkerFerdig('#trinn-7') 
    }
}

// Felles input validering /////////////////////////////////////////////////////////////////////////////////////////////

function validerFornavn(id){
    let input = $('#' + id);

    if(input.val() === '' || input.val() === undefined) {
        visInputFeilMelding(id, 'Fornavn er tomt.');
        return false;
    } else {
        skjulInputFeilMelding(id);
        return true;
    }
}

function validerEtternavn(id){
    let input = $('#' + id);

    if(input.val() === '' || input.val() === undefined) {
        visInputFeilMelding(id, 'Etternavn er tomt.');
        return false;
    } else {
        skjulInputFeilMelding(id);
        return true;
    }
}

function validerFodselsDato(id){
    let input = $('#' + id);

    if(input.val() === '' || input.val() === undefined) {
        visInputFeilMelding(id, 'Fødselsdato er tomt.');
        return false;
    } else {
        skjulInputFeilMelding(id);
        return true;
    }
}

function validerTlf(id){
    let input = $('#' + id);

    if(input.val() === '' || input.val() === undefined) {
        visInputFeilMelding(id, 'Telefonnummer er tomt.');
        return false;
    } else {
        skjulInputFeilMelding(id);
        return true;
    }
}

function validerEpost(id){
    let input = $('#' + id);

    if(input.val() === '' || input.val() === undefined) {
        visInputFeilMelding(id, 'E-post er tomt.');
        return false;
    } else {
        skjulInputFeilMelding(id);
        return true;
    }
}

function validerAdresse(id){
    let input = $('#' + id);

    if(input.val() === '' || input.val() === undefined) {
        visInputFeilMelding(id, 'Adressen er tomt.');
        return false;
    } else {
        skjulInputFeilMelding(id);
        return true;
    }
}

function validerPostnr(id){
    let input = $('#' + id);

    if(input.val() === '' || input.val() === undefined) {
        visInputFeilMelding(id, 'Postnummer er tomt.');
        return false;
    } else {
        skjulInputFeilMelding(id);
        return true;
    }
}

function validerPoststed(id){
    let input = $('#' + id);

    if(input.val() === '' || input.val() === undefined) {
        visInputFeilMelding(id, 'Poststed er tomt.');
        return false;
    } else {
        skjulInputFeilMelding(id);
        return true;
    }
}

function visInputFeilMelding(id, melding) {
    let input = $('#' + id);
    let feilMelding = $('#' + id + '-feil-melding');
    input.addClass('is-invalid');
    feilMelding.removeClass('d-none');
    feilMelding.text(melding);
}

function skjulInputFeilMelding(id){
    let input = $('#' + id);
    let feilMelding = $('#' + id + '-feil-melding');
    input.removeClass('is-invalid');
    feilMelding.addClass('d-none');
}