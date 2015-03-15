
var saluta = function(){ return "ciao"; }; // poichè una funzione è un oggetto può 
                                           // essere assegnata ad una variabile
                                           // e richiamata grazie a quest'ultima
                                           // NOME_VARIABILE()
console.log(saluta()); // ciao

// È possibile invocare immediatamente una funzione anonima:
(function(){ return "Vengo invocata immediatamente"; }()); // Questo tipo di espressione è
                                                           // detta IIFE 
                                                           // (immediately-invoked function expression)

// Vediamo le proprietà delle funzioni

function conta(){ return "1, 2, 3 ..."; };
var nome_funzione = conta.name;             // ritorna il nome della funzione
var nome_funzione_anonima = saluta.name;   // se questa è anonima ritorna la stringa vuota
var num_argomenti_passati = conta.length;   // ritorna il numero di argomenti previsti dalla funzione
console.log(nome_funzione);         // conta
console.log(nome_funzione_anonima); // ""
console.log(num_argomenti_passati); // 0

// Una funzione passata come parametro è detta callback
// L'uso di queste funzioni è molto diffuso in JS

function usoUnaCallback(callback, x, y){ // callback è una funzione di callback
    return callback(x, y);               // infatti viene passata come parametro
}                                        // e viene poi invocata sugli altri
                                         // argomenti
function callback(x, y){
    return x + y;
}

var z = usoUnaCallback(callback, 5, 3);
console.log(z); // 8

// Nulla mi vieta di inserire una funzione anonima come callback

function usoUnaCallbackAnonima(func, x, y){
    return func(x, y);
}

var w = usoUnaCallbackAnonima(function(x, y){ return x + y;}, 3, 7); // passo una funzione anonima
console.log(w); // 10

// Le funzioni possono essere restituite da altre funzioni:

var saluta_con_nome = function(saluto){ // la variabile saluta_con_nome 
    return function(nome){              // contiene una funzione che prende
        return saluto + " " + nome;     // come parametro un argomento che
    };                                  // dovrebbe essere il nome della persona da
};                                      // salutare e qualunque sia questo nome
                                        // restituirà "ciao NOME"

var saluto = saluta_con_nome("Ciao");
var saluto_con_nome = saluto("Giorgio");
console.log(saluto); // function(nome){ return saluto + " " + nome, }
console.log(saluto_con_nome); // Ciao Giorgio

// NOTA: Questo esempio è una piccola introduzione al concetto di CLOSURE
//       La funzione saluto() è definita così:
//       function(nome){ return saluto + " " + nome, }
//       Allora perché vede la variabile saluto che è il parametro che prende
//       la funzione sopra di lei?
//       Perché lo scope di saluto è la funzione che lo prende come parametro.
//       Quindi è visibile anche all'interno della funzione saluto()





