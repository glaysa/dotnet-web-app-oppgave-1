
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
    merkerValgtMaaltid('frokost');
    merkerValgtMaaltid('lunsj');
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
        yearRange: '1940:'
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

// Manipulerer css når maaltid sjekkboks verdier er endret
function merkerValgtMaaltid(maaltid){
    let m = '#' + maaltid;
    $(m +"-row").on('click', function(){
        
        // virker som en checked/unchecked toggle
        $(m).attr("checked", !$(m).attr("checked"));
        
        // if checked: viser sjekk ikonen
        if($(m).is(':checked')) {
            valgtMaaltid[maaltid] = true;
            $(m + "-ikon").removeClass('d-none');
            $(m + '-info').addClass('on');
            maaltidCheckedOnHover(m);
        } else {
            valgtMaaltid[maaltid] = false;
            $(m + "-ikon").addClass('d-none');
            $(m + '-info').removeClass('on');
        }
    });
}

// maaltid on hover gjelder kun store enheter
function maaltidCheckedOnHover(maaltid){
    if(window.screen.width > 991){
        // viser rød dash ikon
        $(maaltid + "-row").hover(
            function (){
                $(maaltid + "-ikon i").removeClass('bi-check');
                $(maaltid + "-ikon i").addClass('bi-x text-danger');
                $(maaltid + "-ikon").css('background-color','#ffebeb');
            },
            function () {
                $(maaltid + "-ikon i").removeClass('bi-x text-danger');
                $(maaltid + "-ikon i").addClass('bi-check');
                $(maaltid + "-ikon").css('background-color','#ebffed');
            }
        )
    }
}

// template renders

// form hvor alle passasjerer må gi navnet og fødselsdato

let passasjerFormTemplate = document.getElementById('template-passasjer-form');
let passasjerForm = $('#passasjerer-form');

function renderPassasjerInputsTemplate(antallVoksen, antallBarn){
    let antallPassasjerer = antallVoksen + antallBarn;
    passasjerForm.empty();
    
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

        passasjerForm.append(clone);
    }
    enableBirthDatePicker();
}