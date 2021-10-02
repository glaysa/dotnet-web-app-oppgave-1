
////////////////////////////////////////////////////////////////////
/////                                                          /////
/////        Denne filen gjør nettsiden dynamisk.              /////
/////    Ingen server relatert logikk er implementert her.     /////
/////                                                          /////
////////////////////////////////////////////////////////////////////

// Ready funksjon
$(document).ready(function () {
    $.datepicker.setDefaults($.datepicker.regional['no']); // endrer dato språk
    enableRuteDatePicker();
    deaktiverInputs(reiseTypeInput ,fraDatoInput, tilDatoInput);
    leggTilValgtMaaltid();
    merkerValgtRute();
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

function enableRuteDatePicker(){
    $('#fra-dato, #til-dato').datepicker({
        beforeShow: customRange,
        dateFormat: "D dd. M yy",
    });
}

function enableBirthDatePicker(){
    $('.fodselsdato').datepicker({
        changeYear: true,
        changeMonth: true,
        dateFormat: "D dd. M yy",
        yearRange: '1940:',
        defaultDate: 'man 01. Jan 1999'
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
        let minDate = new Date($('#fra-dato').datepicker('getDate'));
        minDate.setDate(minDate.getDate() + 1)
        return { minDate: minDate };
    }
}

// Skjuler og viser de forskjellige trinnene for bestillingen

function tilbake(toHide, toShow, toHideBtns, toShowBtns){
    skjulOgVisTrinn(toHide, toShow, toHideBtns, toShowBtns);
    fjernMerke(toHide);
}

function skjulOgVisTrinn(toHide, toShow, toHideBtns, toShowBtns){
    $(toHide).addClass('d-none');
    $(toShow).removeClass('d-none');
    $(toHideBtns).addClass('d-none');
    $(toShowBtns).removeClass('d-none');
    // skroller til 'top': bedre ux for små enheter
    location.href = "#bestill";
}

function merkerFerdig(ikon_id){
    $(ikon_id + '-ikon').removeClass('bi-dash-circle');
    $(ikon_id + '-ikon').addClass('bi-check-circle');
    $(ikon_id + '-ikon').css('color','lightseagreen');
}

function fjernMerke(ikon_id){
    $(ikon_id + '-ikon').addClass('bi-dash-circle');
    $(ikon_id + '-ikon').removeClass('bi-check-circle');
    $(ikon_id + '-ikon').css('color','lightgrey');
}

// Manipulerer css når rute radioboks verdier er endret
function merkerValgtRute() {
    let valgtRute = "";
    $("input[name=ruter]").on('change', function () {
        // Viser sjekk ikon
        valgtRute = $("input[name=ruter]:checked").val();
        $('#' + valgtRute + "-ikon").removeClass('d-none');
        $('#' + valgtRute + "-col").css('background-color','#ebf9ff');
        
        // Fjerner sjekk ikon
        let ikkeValgtRuter = $('input[type="radio"]:not(:checked)');
        ikkeValgtRuter.each((index, value) => {
            $('#' + value.id + "-ikon").addClass('d-none');
            $('#' + value.id + "-col").css('background-color', 'transparent');
        });
    });
}

// Oppdater UI verdier basert på valgt verdier på de forskjellige trinnene

function oppdaterUIForRute(){
    let fraStedTekst = $('.fra-sted-tekst');
    let tilStedTekst = $('.til-sted-tekst');
    let fraDatoTekst = $('.fra-dato-tekst');
    let tilDatoTekst = $('.til-dato-tekst');
    
    fraStedTekst.text(valgtRute.ruteFra);
    tilStedTekst.text(valgtRute.ruteTil);
    fraDatoTekst.text($('#fra-dato').val());
    tilDatoTekst.text($('#til-dato').val())
}

function oppdaterUIForReisefolger(){
    let antallVoksenTekst = $('.antall-voksen-tekst');
    let antallBarnTekst = $('.antall-barn-tekst');
    let antallDyrTekst = $('.antall-dyr-tekst');
    let antallSykkelTekst = $('.antall-sykkel-tekst');
    
    antallVoksenTekst.text(antallVoksen);
    antallBarnTekst.text(antallBarn);
    antallDyrTekst.text(antallDyr);
    antallSykkelTekst.text(antallSykler);
}

function oppdaterUIForMaaltid(){
    let maaltidTekstTemplate = document.getElementById('valgt-maaltid-tekst-template');
    let parent = $('#maaltid-tekst-template-tray');
    if(valgtMaaltid.length > 0) {
        parent.empty();
        for(let i = 0; i < valgtMaaltid.length; i++) {
            let clone = maaltidTekstTemplate.content.cloneNode(true);
            let textElement = clone.querySelector('small');
            textElement.textContent = valgtMaaltid[i].navn + ', ';
            parent.append(clone);
        }
    } else {
        let clone = maaltidTekstTemplate.content.cloneNode(true);
        let textElement = clone.querySelector('small');
        textElement.textContent = 'Ingen';
        parent.append(clone);
    }
}

function oppdaterUIForPassasjerer(){
    let passasjerTekstTemplate = document.getElementById('passasjer-tekst-template');
    let parent = $("#passasjer-tekst-template-tray");
    parent.empty();
    for(let i = 0; i < passasjerer.length; i++) {
        let clone = passasjerTekstTemplate.content.cloneNode(true);
        let textElement = clone.querySelector('small');
        textElement.textContent = passasjerer[i].fornavn + ' ' + passasjerer[i].etternavn + ',';
        parent.append(clone);
    }
}

// template renders

// form hvor alle passasjerer må gi navnet og fødselsdato
function renderPassasjerInputsTemplate(antallVoksen, antallBarn){
    let passasjerFormTemplate = document.getElementById('template-passasjer-form');
    let parent = $('#passasjerer-form-template-tray');
    let antallPassasjerer = antallVoksen + antallBarn;
    parent.empty();
    
    for(let i = 0; i < antallPassasjerer; i++) {
        let clone = passasjerFormTemplate.content.cloneNode(true);
        
        // Inputs
        let passasjerTittel = clone.querySelector('.passasjer-tittel');
        let passasjerFornavnInput = clone.querySelector('input[name=fornavn]');
        let passasjerEtterNavnInput = clone.querySelector('input[name=etternavn]');
        let passasjerFodselsDatoInput = clone.querySelector('input[name=fodselsdato]');
        
        // feil meldinger
        let fornavnInputFeilMelding = clone.querySelector('.fornavn-feil-melding');
        let etternavnInputFeilMelding = clone.querySelector('.etternavn-feil-melding');
        let fodselsdatoInputFeilMelding = clone.querySelector('.fodselsdato-feil-melding');

        // assign ids to input
        passasjerTittel.innerText = 'Person ' + (i + 1);
        passasjerFornavnInput.setAttribute('id','fornavn-' + i);
        passasjerEtterNavnInput.setAttribute('id','etternavn-' + i);
        passasjerFodselsDatoInput.setAttribute('id', 'fodselsdato-' + i);
        
        // assign ids to feil meldinger
        fornavnInputFeilMelding.setAttribute('id', 'fornavn-' + i + '-feil-melding');
        etternavnInputFeilMelding.setAttribute('id', 'etternavn-' + i + '-feil-melding');
        fodselsdatoInputFeilMelding.setAttribute('id', 'fodselsdato-' + i + '-feil-melding');

        // kobler input til feil melding elementer slik at den viser på riktig input
        passasjerFornavnInput.setAttribute('aria-describedby', 'fornavn-' + i + '-feil-melding');
        passasjerEtterNavnInput.setAttribute('aria-describedby', 'etternavn-' + i + '-feil-melding');
        passasjerFodselsDatoInput.setAttribute('aria-describedby', 'fodselsdato-' + i + '-feil-melding');

        parent.append(clone);
    }
    enableBirthDatePicker();
}