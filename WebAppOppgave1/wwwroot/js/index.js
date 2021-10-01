
////////////////////////////////////////////////////////////////////
/////                                                          /////
/////         Server relatert logikk er implementert her.      /////   
/////                                                          /////
////////////////////////////////////////////////////////////////////

// Data verdier: definert i validering.js

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
let valgtMaaltid = {
    'frokost': false,
    'lunsj': false,
    'middag': false
}

// Trinn 5: Passasjerer
let passasjerer = []; // array av passasjer objekter: har fornavn, etternavn og fødselsdato keys

function lagreRute(){
    validerTrinn1();
}

function lagrePassasjerer(){
    validerTrinn2()
}

function lagreLugar(){
    validerTrinn3()
    // post metode: skal implementeres i oppgave 2 hvis det kreves
}

function lagreMaaltider(){
    validerTrinn4()
    // post metode: skal implementeres i oppgave 2 hvis det kreves
}

function lagreOmbordProdukter(){
    validerTrinn5()
}

function lagreKunde(){
    validerTrinn6()
}

function lagreBestilling(){
    validerTrinn7()

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