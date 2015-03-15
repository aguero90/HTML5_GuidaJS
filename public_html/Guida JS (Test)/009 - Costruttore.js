
// Poichè in JS non esiste il concetto di classe, il costruttore è una semplice funzione
// che se viene invocata tramite il costrutto "new" costruisce un oggetto in memoria
// vediamo un esempio

// per convenzione la variabile/funzione che identifica il costruttore inizia con la maiuscola
var Persona = function () {

    // variabili della classe
    this.nome = "";
    this.cognome = "";

    // metodi della classe
    this.getNome = function () {
        return this.nome;
    };
    this.setNome = function (nome) {
        return this.nome = nome;
    };
    this.getCognome = function () {
        return this.cognome;
    };
    this.setCognome = function (cognome) {
        return this.cognome = cognome;
    };
};

var p = new Persona();

// nel momento in cui il costruttore viene invocato, viene creato un oggetto vuoto in memoria e poi popolato
// durante l'esecuzione del costruttore grazie alla parola chiave this che si riferisce appunto al contesto di esecuzione
// che in questo caso è l'oggetto appena creato
// Infatti la console ci dice che la variabile p è un oggetto con le proprietà "nome" e "cognome" e con i metodi
// "getNome", "setNome", "getCognome", "setCognome"


