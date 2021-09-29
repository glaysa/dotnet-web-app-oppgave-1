
////////////////////////////////////////////////////////////////////
/////                                                          /////
/////         Server relatert logikk er implementert her.      /////   
/////                                                          /////
////////////////////////////////////////////////////////////////////

// Data verdier: definert i validering.js

// Trinn 1: variabler

let valgtRute = []; // array av dict med lengde 2: inneholder ruteFra og ruteTil keys
let valgtReiseType = ""; // string
let valgtAvreiseDato = ""; // string
let valgtReturDato = ""; // string

// Trinn 2: variabler

let antallVoksen = 1; // minst 1 voksen må være tilstedet
let antallBarn = 0;
let antallDyr = 0;
let antallSykler = 0;

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
    alert('Bestilling lagret!');
}