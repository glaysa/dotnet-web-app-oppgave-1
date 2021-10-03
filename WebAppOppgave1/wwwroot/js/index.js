
////////////////////////////////////////////////////////////////////
/////                                                          /////
/////         Server relatert logikk er implementert her.      /////   
/////                                                          /////
////////////////////////////////////////////////////////////////////

// Trinn 1: Rute

let rute = {}; // aksessere rutene med ruteFra og ruteTil keys
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

// Trinn 4: Måltid
let maaltider = [] // array av måltid objekter: har navn og pris keys

// Trinn 5: Passasjerer
let passasjerer = []; // array av passasjer objekter: har fornavn, etternavn og fodselsdato keys

// Trinn 7: Kundeinformasjon og betalingsdetaljer
let kunde = {};

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
}

function lagreBestilling(){
    validerTrinn7()
    location.href = 'kvittering.html';

    console.log('Rute fra:', rute.ruteFra);
    console.log('Rute til:', rute.ruteTil);
    console.log('Reisetype:', reiseType);
    console.log('Avreise dato:', avreiseDato);
    console.log('Retur dato:', returDato);
    console.log('voksen:', antallVoksen);
    console.log('Barn:', antallBarn);
    console.log('Kjæledyr:', antallDyr);
    console.log('Sykkel:', antallSykler);
    console.log('Lugar:', lugarer);
    console.log('Måltid:', maaltider);
    console.log('Passasjerer:', passasjerer);
    console.log('Kunde:', kunde);
}