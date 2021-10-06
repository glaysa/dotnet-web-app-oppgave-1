
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
    merkerValgtRute();
    leggTilValgtMaaltid();
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

function plussLugar() {
    let lugar = $("#valgt-lugar").val();
    let btnWrapper = $('#' + lugar + '-btns');
    let plussBtn = $("#" + btnWrapper.id + " .pluss");
    let minusBtn = $("#" + btnWrapper.id + " .minus");

    let label = $("#" + lugar + "-antall-reservasjon");
    let value = Number(label.text());
    let maxValue = Number($('#' + lugar + '-max-reservasjon').text());
    
    if(value < maxValue) {
        value++;
        label.text(value);
        plussBtn.removeClass('disabled');
        minusBtn.removeClass('disabled');
    } else {
        plussBtn.addClass('disabled');
    }
}

function minusLugar() {
    let lugar = $("#valgt-lugar").val();
    let btnWrapper = $('#' + lugar + '-btns');
    let plussBtn = $("#" + btnWrapper.id + " .pluss");
    let minusBtn = $("#" + btnWrapper.id + " .minus");
    
    let label = $("#" + lugar + "-antall-reservasjon");
    let value = Number(label.text());

    if(value > 0) {
        value--;
        label.text(value);
        plussBtn.removeClass('disabled');
        minusBtn.removeClass('disabled');
    } else {
        minusBtn.addClass('disabled');
    }
}

// Setter id på valgt rom for separat tildeling av verdier
function tildeleRomId(id){
    // assign ids
    $("#valgt-lugar").val(id);
    $(".rom-btns").attr('id', id + '-btns');
    $(".rom-tittel").attr('id', id + '-tittel');
    $(".rom-beskrivelse").attr('id', id + '-beskrivelse');
    $(".rom-pris").attr('id', id + '-pris');
    $(".rom-kapasitet").attr('id', id + '-kapasitet');
    $(".rom-max-reservasjon").attr('id', id + '-max-reservasjon');
    $(".rom-antall-reservasjon").attr('id', id + '-antall-reservasjon');
    $(".rom-bilde").attr('id', id + '-bilde');
    $(".rom-vindu").attr('id', id + '-vindu');
    $(".rom-span").attr('id', id + '-span');
    generereRomDetaljer(id);
}

// Genererer rom info fordi alle romene deler kun en modal
function generereRomDetaljer(id) {
    let romTittel = $('#'+ id + '-tittel');
    let romBeskrivelse = $('#'+ id + '-beskrivelse');
    let romPris = $('#'+ id + '-pris');
    let romKapasitet = $('#'+ id + '-kapasitet');
    let romMaxReservasjon = $('#'+ id + '-max-reservasjon');
    let romAntallReservasjon = $('#'+ id + '-antall-reservasjon');
    let romBilde = $('#'+ id + '-bilde');
    let romVindu = $('#'+ id + '-vindu');
    let romSpan = $('#'+ id + '-span');
    
    switch (id) {
        case 'air-seat':
            romTittel.text('Air Seat');
            romPris.text('299');
            romKapasitet.text('1');
            romMaxReservasjon.text('10');
            romAntallReservasjon.text('0');
            romBilde.attr('src', 'assets/lugar/air-seat.jpg');
            romVindu.text('Ja');
            romSpan.text('seter');
            romBeskrivelse.text("De komfortable liggestolene er vårt billigste alternativ, og du finner " +
                "de på dekk 10.");
            break;
        case 'standard-rom':
            romTittel.text('Standard Rom');
            romPris.text('1200');
            romKapasitet.text('1-4 med kjæledyr');
            romMaxReservasjon.text('5');
            romAntallReservasjon.text('0');
            romBilde.attr('src', 'assets/lugar/standard.jpg');
            romVindu.text('Ja');
            romSpan.text('rom');
            romBeskrivelse.text("Komfortabel lugar for 1 person. Lugarene er 8,5 m² og er utstyrt med seng og " +
                "sovesofa, TV, bad med dusj og WC. Lugarene ligger på dekk 8 og 9");
            break;
        case 'familie-rom':
            romTittel.text('Familie Rom');
            romPris.text('1500');
            romKapasitet.text('3-5');
            romMaxReservasjon.text('2');
            romAntallReservasjon.text('0');
            romBilde.attr('src', 'assets/lugar/family.jpg');
            romVindu.text('Ja');
            romSpan.text('rom');
            romBeskrivelse.text("Familie rom er familievennlige lugarer som rommer en familie på inntil 5 " +
                "personer. Lugarene har dobbeltseng (120 cm bred), sovesofa og 2 køyesenger i taket, plass til 1 " +
                "babyseng. Videre er det TV, samt eget bad med dusj og WC. Størrelsen på lugarene er mellom " +
                "10,5 og 11,5 m² og de ligger midtskips på dekk 10.");
            break;
        case 'deluxe-rom':
            romTittel.text("Captain's Deluxe");
            romPris.text('2499');
            romKapasitet.text('1-4');
            romMaxReservasjon.text('1');
            romAntallReservasjon.text('0');
            romBilde.attr('src', 'assets/lugar/deluxe.jpg');
            romVindu.text('Ja');
            romSpan.text('rom');
            romBeskrivelse.text("Våre største deluxe-lugarer med plass til 1–3 personer. De har dobbeltseng og " +
                "sovesofa, plass til 2 babysenger, TV, samt eget bad med dusj og WC. Størrelsen på lugarene" +
                " er på rundt 20 m² og de ligger akter på dekk 8.");
            break;
        case 'suite-rom':
            romTittel.text("Captain's Suite");
            romPris.text('1999');
            romKapasitet.text('1-4');
            romMaxReservasjon.text('1');
            romAntallReservasjon.text('0');
            romBilde.attr('src', 'assets/lugar/suite.jpg');
            romVindu.text('Ja');
            romSpan.text('rom');
            romBeskrivelse.text("Flotte lugarer med plass til 1–4 personer. Her får du flott utsikt med vinduer " +
                "som går fra gulv til tak. Lugarene har dobbeltseng og sovesofa (dobbel), plass til 2 babysenger, TV, " +
                "minibar, bad med dusj og WC. Størrelsen på denne typen lugar er ca. 24 m² og de ligger " +
                "midtskips/akter på dekk 9. ");
            break;
    }
}

// Oppdater UI verdier basert på valgt verdier på de forskjellige trinnene

function oppdaterUIForRute(){
    let fraStedTekst = $('.fra-sted-tekst');
    let tilStedTekst = $('.til-sted-tekst');
    let fraDatoTekst = $('.fra-dato-tekst');
    let tilDatoTekst = $('.til-dato-tekst');
    let rutePrisTekst = $('.rute-pris-tekst');
    
    fraStedTekst.text(rute.ruteFra);
    tilStedTekst.text(rute.ruteTil);
    fraDatoTekst.text($('#fra-dato').val());
    tilDatoTekst.text($('#til-dato').val());
    rutePrisTekst.text(rute.pris);
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

function oppdaterUIForLugarer(){
    let lugarTekstTemplate = document.getElementById('valgt-lugar-tekst-template');
    let parent = $("#lugar-tekst-template-tray");
    lugarTotalPris = 0;
    parent.empty();
    
    for(let i = 0; i < lugarer.length; i++) {
        let clone = lugarTekstTemplate.content.cloneNode(true);
        let textElement = clone.querySelector('small');
        textElement.textContent = lugarer[i].antall + ' x ' + lugarer[i].type + ',';
        lugarTotalPris += lugarer[i].pris;
        parent.append(clone);
    }
    $('.lugar-totalpris-tekst').text(lugarTotalPris);
}

function oppdaterUIForMaaltid(){
    let maaltidTekstTemplate = document.getElementById('valgt-maaltid-tekst-template');
    let parent = $('#maaltid-tekst-template-tray');
    maaltidTotalPris = 0;
    
    if(maaltider.length > 0) {
        parent.empty();
        for(let i = 0; i < maaltider.length; i++) {
            let clone = maaltidTekstTemplate.content.cloneNode(true);
            let textElement = clone.querySelector('small');
            textElement.textContent = maaltider[i].navn + ', ';
            maaltidTotalPris += maaltider[i].pris;
            parent.append(clone);
        }
    } else {
        let clone = maaltidTekstTemplate.content.cloneNode(true);
        let textElement = clone.querySelector('small');
        textElement.textContent = 'Ingen';
        parent.append(clone);
    }
    let totalPris = antallVoksen * maaltidTotalPris;
    $('.maaltid-totalpris-tekst').text('Voksen ('+ maaltidTotalPris +' kr) x '+ antallVoksen + ' = ' + totalPris);
    maaltidTotalPris = totalPris;
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

// form hvor alle passasjerer må gi navnet og fødselsdato
function oppdaterUIForPassasjerForm(){
    let passasjerFormTemplate = document.getElementById('template-passasjer-form');
    let parent = $('#passasjerer-form-template-tray');
    parent.empty();
    
    let antallVoksen = Number($('.antall-voksen').text());
    let antallBarn = Number($('.antall-barn').text());
    let antallPassasjerer = antallVoksen + antallBarn;
    
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