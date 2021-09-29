
////////////////////////////////////////////////////////////////////
/////                                                          /////
/////        Denne filen gjør nettsiden dynamisk.              /////
/////    Ingen server relatert logikk er implementert her.     /////
/////                                                          /////
////////////////////////////////////////////////////////////////////

// Ready funksjon
$(document).ready(function () {
    enableRuteDatePicker();
    deaktiverInputs(reiseTypeInput ,fraDatoInput, tilDatoInput);
    merkerValgtMaaltid('#frokost');
    merkerValgtMaaltid('#lunsj');
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
        dayNamesShort: ['Man','Tir','Ons','Tor','Fre','Lør','Søn'],
        dayNamesMin: ['Ma','Ti','On','To','Fr','Lø','Sø'],
        monthNamesShort: ['Jan','Feb','Mar','Apr','Mai','Jun', 'Jul','Aug','Sept','Okt','Nov','Des'],
        monthNames: ['Januar','Februar','Mars','April','Mai','Juni', 'Juli','August','September','Oktober','November','Desember'],
    });
}

function enableBirthDatePicker(){
    $('.fodselsdato').datepicker({
        changeYear: true,
        changeMonth: true,
        dateFormat: "D dd. M yy",
        dayNamesShort: ['Man','Tir','Ons','Tor','Fre','Lør','Søn'],
        dayNamesMin: ['Ma','Ti','On','To','Fr','Lø','Sø'],
        monthNamesShort: ['Jan','Feb','Mar','Apr','Mai','Jun', 'Jul','Aug','Sept','Okt','Nov','Des'],
        monthNames: ['Januar','Februar','Mars','April','Mai','Juni', 'Juli','August','September','Oktober','November','Desember'],
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
        let minDate = new Date($('#fra-dato').val());
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
    $(maaltid +"-row").on('click', function(){
        
        // virker som en checked/unchecked toggle
        $(maaltid).attr("checked", !$(maaltid).attr("checked"));
        
        // if checked: viser sjekk ikonen
        if($(maaltid).is(':checked')) {
            $(maaltid + "-ikon").removeClass('d-none');
            $(maaltid + '-info').addClass('on');
            maaltidCheckedOnHover(maaltid);
        } else {
            $(maaltid + "-ikon").addClass('d-none');
            $(maaltid + '-info').removeClass('on');
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

function renderTemplateAntallPassasjerer(antallVoksen, antallBarn){
    let antallPassasjerer = antallVoksen + antallBarn;
    passasjerForm.empty();
    
    for(let i = 0; i < antallPassasjerer; i++) {
        let clone = passasjerFormTemplate.content.cloneNode(true);
        
        let passasjerType = clone.querySelector('.passasjer-type');
        let passasjerFornavnInput = clone.querySelector('input[name=fornavn]');
        let passasjerEtterNavnInput = clone.querySelector('input[name=etternavn]');
        let passasjerFodselsDatoInput = clone.querySelector('input[name=fodsels-dato]');
        let passasjerInputFeilMelding = clone.querySelector('.passasjer-feil-melding');
        
        passasjerType.innerText = 'Person ' + (i + 1);
        passasjerFornavnInput.setAttribute('id','fornavn-' + i);
        passasjerEtterNavnInput.setAttribute('id','etternavn-' + i);
        passasjerFodselsDatoInput.setAttribute('id', 'fodselsdato-' + i);
        passasjerInputFeilMelding.setAttribute('id', 'person-' + i + '-feil-melding');

        passasjerForm.append(clone);
    }
    enableBirthDatePicker();
}