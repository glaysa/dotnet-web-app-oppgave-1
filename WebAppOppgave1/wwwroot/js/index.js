
////////////////////////////////////////////////////////////////////
/////                                                          /////
/////         Server relatert logikk er implementert her.      /////   
/////                                                          /////
////////////////////////////////////////////////////////////////////

// Trinn 1: Rute
let rute = {}; // aksessere rutene med ruteFra, ruteTil og rutePris keys
let reiseType = ""; // kun 2 verdier: enVei og turRetur
let avreiseDato = ""; // string: DD/MM/YYYY
let returDato = ""; // string: DD/MM/YYYY

// Trinn 2: Antall reisefølger

let antallVoksen = 1; // minst 1 voksen må være tilstedet
let antallBarn = 0;
let antallDyr = 0;
let antallSykler = 0;

// Trinn 3: Lugarer
let lugarer = []; // array av lugar objekter: har type, antall og totalPris keys
let lugarTotalPris = 0;

// Trinn 4: Måltid
let maaltider = [] // array av måltid objekter: har navn og pris keys
let maaltidTotalPris = 0;

// Trinn 5: Passasjerer
let passasjerer = []; // array av passasjer objekter: har fornavn, etternavn og fodselsdato keys

// Trinn 7: Kundeinformasjon
let kunde = {};
let bestillingTotalPris = 0;

function lagreRute(){
    validerTrinn1();
    oppdaterUIForRute();
}

function lagreAntallPassasjerer(){
    validerTrinn2();
    oppdaterUIForReisefolger();
    oppdaterUIForPassasjerForm();
}

function lagreLugar(){
    validerTrinn3();
    oppdaterUIForLugarer();
}

function lagreMaaltider(){
    validerTrinn4();
    oppdaterUIForMaaltid();
}

function lagrePassasjerInfo(){
    validerTrinn5();
    oppdaterUIForPassasjerer();
}

function bekreft(){
    validerTrinn6()
    $('.bestilling-totalpris-tekst').text(bestillingTotalPris);
}

function lagreBestilling(){
    validerTrinn7()
    
    let billett = {
        'rute': rute.ruteFra + '/' + rute.ruteTil,
        'type': reiseType,
        'utreise': avreiseDato,
        'ankomst': returDato,
        'pris': rute.rutePris,
        'antallSykler': antallSykler,
        'kjaeledyr': antallDyr
    }
    
    console.log(billett);
}