
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
    validerTrinn7();
    let Billetter = [];
    let Meals = [];
    let Lugarer = [];
    let Passasjer = [];

    // Reformatter slik at de har samme attributtene som i db tabellen.
    
    passasjerer.forEach(function (item) {
       let person = {Fornavn: item.fornavn, Etternavn: item.etternavn, Fodselsdato: item.fodselsDato };
       Passasjer.push(person);
    });

    maaltider.forEach(function (item) {
        let meal = { Maaltid: item.navn, Pris: item.pris };
        Meals.push(meal);
    });

    lugarer.forEach(function (item) {
        let lugar = { Type: item.type, Pris: item.pris };
        Lugarer.push(lugar);
    });

    Passasjer.forEach(function (item) {
        let tur = {
            tur: rute.ruteFra + "-" + rute.ruteTil,
                pris: rute.pris
        };

        let retur = {
            tur: null,
            pris: 0.0
        };

        if (reiseType !== "En-vei") {
            retur = {
                tur: rute.ruteTil + "-" + rute.ruteFra,
                pris: rute.Pris
            };
        }

        let billett = {
            Type: reiseType,
            Utreise: avreiseDato,
            Ankomst: returDato,
            AntallSykler: antallSykler,
            Kjæledyr: antallDyr,
            Passasjer: item,
            Tur: tur,
            Retur: retur
        };
        Billetter.push(billett);
    });

    let bestilling = {
        Kunde: {
            Fornavn: kunde.fornavn,
            Etternavn: kunde.etternavn,
            Tlfnummer: kunde.tlf,
            Epost: kunde.epost,
            Adresse: kunde.adresse,
            Postnummer: {
                Postnr: kunde.postnr,
                Poststed: kunde.poststed
            }
        },
        Billetter: Billetter,
        Lugars: Lugarer,
        Meals: Meals
    };

    const url = "Bestilling/Lagre";
    $.post(url, bestilling, (saved) => {
        console.log(bestilling);
        console.log(saved);
    });

}