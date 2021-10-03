
////////////////////////////////////////////////////////////////////
/////                                                          /////
/////         Server relatert logikk er implementert her.      /////   
/////                                                          /////
////////////////////////////////////////////////////////////////////

// Trinn 1: Rute

let valgtRute = {}; // aksessere rutene med ruteFra og ruteTil keys
let valgtReiseType = ""; // kun 2 verdier: enVei og turRetur
let valgtAvreiseDato = ""; // string: DD/MM/YYYY
let valgtReturDato = ""; // string: DD/MM/YYYY

// Trinn 2: Antall reisefølger

let antallVoksen = 1; // minst 1 voksen må være tilstedet
let antallBarn = 0;
let antallDyr = 0;
let antallSykler = 0;

// Trinn 4: Måltid
let valgtMaaltid = [] // array av måltid objekter: har navn og pris keys

// Trinn 5: Passasjerer
let passasjerer = []; // array av passasjer objekter: har fornavn, etternavn og fodselsdato keys

function lagreRute(){
    validerTrinn1();
    oppdaterUIForRute();
}

function lagreAntallPassasjerer(){
    validerTrinn2();
    oppdaterUIForReisefolger();
}

function lagreLugar(){
    validerTrinn3();
    // post metode: skal implementeres i oppgave 2 hvis det kreves
}

function lagreMaaltider(){
    validerTrinn4();
    oppdaterUIForMaaltid();
    // post metode: skal implementeres i oppgave 2 hvis det kreves
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

    console.log('Rute fra:', valgtRute.ruteFra);
    console.log('Rute til:', valgtRute.ruteTil);
    console.log('Reisetype:', valgtReiseType);
    console.log('Avreise dato:', valgtAvreiseDato);
    console.log('Retur dato:', valgtReturDato);
    console.log('voksen:', antallVoksen);
    console.log('Barn:', antallBarn);
    console.log('Kjæledyr:', antallDyr);
    console.log('Sykkel:', antallSykler);
    console.log('Måltid:', valgtMaaltid);
    console.log('Passasjerer:', passasjerer);
}