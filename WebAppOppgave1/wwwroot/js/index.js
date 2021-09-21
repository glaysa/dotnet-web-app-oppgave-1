
////////////////////////////////////////////////////////////////////
/////                                                          /////
/////         Server relatert logikk er implementert her.      /////   
/////                                                          /////
////////////////////////////////////////////////////////////////////

function lagreRute(){
    validerTrinn1();
    skjulOgVisTrinn('#trinn-1','#neste-trinn','','');
}

function lagrePassasjerer(){
    validerTrinn2()
    skjulOgVisTrinn('#trinn-2','#trinn-3','#trinn-2-btns','#trinn-3-btns');
}

function lagreLugar(){
    validerTrinn3()
    // post metode: skal implementeres i oppgave 2 hvis det kreves
    skjulOgVisTrinn('#trinn-3','#trinn-4','#trinn-3-btns','#trinn-4-btns');
}

function lagreMaaltider(){
    validerTrinn4()
    // post metode: skal implementeres i oppgave 2 hvis det kreves
    skjulOgVisTrinn('#trinn-4','#trinn-5','#trinn-4-btns','#trinn-5-btns');
}

function lagreOmbordProdukter(){
    validerTrinn5()
    skjulOgVisTrinn('#trinn-5','#trinn-6','#trinn-5-btns','#trinn-6-btns');
}

function lagreKunde(){
    validerTrinn6()
    skjulOgVisTrinn('#trinn-6','#trinn-7','#trinn-6-btns','#trinn-7-btns');
}

function lagreBestilling(){
    validerTrinn7()
    alert('Bestilling lagret!');
}