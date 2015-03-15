
function testArguments(s){
    console.log("Parametro passato:" + s);
    for (var i in arguments){ // arguments è un array speciale predefinito che contiene tutti gli argomenti passati
        console.log(i);
    }
}

testArguments("ciao", "mamma", "guarda", "come", "mi", "diverto");
// Stampa:  Parametro passato: ciao
//          0
//          1
//          2
//          3
//          4
//          5





