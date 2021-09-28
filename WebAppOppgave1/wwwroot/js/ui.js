
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
    sjekkValgtMaaltid('#frokost');
    sjekkValgtMaaltid('#lunsj');
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

// Manipulerer css når maaltid sjekkboks verdier er endret
function sjekkValgtMaaltid(maaltid){
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