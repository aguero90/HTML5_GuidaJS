
// // Nella programmazione ad oggetti il polimorfismo è inteso in diversi modi,
// anche se alla base c'è una nozione comune:
//      1) overloading: la possibilità di prevedere metodi che manipolano
//                     tipi di dato diversi.
//      2) polimorfismo parametrico: la possibilità di prevedere tipi generici,
//                                  non conosciuti a priori.
//      3) polimorfismo per inclusione: la possibilità di avere espressioni il
//                                     cui tipo può essere rappresentato da una
//                                     classe e dalle classi da essa derivate
//                                     (Liskov)

// Poichè JS è un linguaggio a tipizzazione dinamica, è ovvio che possiede tipi generici non conosciuti in fase di
// compilazione, quindi 2) è soddisfatta.
// es:
var x = 10; // noi sappiamo che la variabile x è intera ( in questo momento ) ma il compilatore no!

// abbiamo visto che è possibile implementare l'ereditarietà in JS, quindi la possibilità di avere ereditarietà più la
// tipizzazione dinamica ci permette di usare i figli al posto del padre senza alcun problema. Di conseguenza
// anche la 3) è soddisfatta.
function Persona(n) {
    var nome = n;

    this.getNome = function () {
        return nome;
    };
}

function PersonaItaliana() {
    var nazionalità = "Italia";

    this.getNazionalità = function () {
        return nazionalità;
    };
}

PersonaItaliana.prototype = new Persona("Alessandro");

function salutaPersona(persona) {
    console.log("Ciao " + persona.getNome());
}

salutaPersona(new PersonaItaliana()); // Ciao Alessandro

// Sempre per via della tipizzazione dinamica, la 3) ( cioè l'overloading ) è ovviamente soddisfatto, infatti il seguente metodo:
function add(x, y) {
    return x + y;
}

// accetta come parametri sia 2 interi, sia 2 double, sia due stringhe ecc ecc.

