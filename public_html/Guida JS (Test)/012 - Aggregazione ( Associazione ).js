
// l'aggregazione è la capacità di un oggetto di contenere altri oggetti.
// nulla di più facile in JS:

var marioRossi = {
    nome: "Mario",
    cognome: "Rossi",
    indirizzo: {
        via: "piazza Garibaldi",
        numero: 9
    }
};

// in questo caso l'oggetto mario rossi contiene al suo interno l'oggetto indirizzo.
// proviamo a farlo in stile programmazione orientata agli oggetti

function Indirizzo(v, n) {
    var via = v || ""; // privata
    var numero = n || 0; // privata

    this.getVia = function () {
        return via;
    };

    this.setVia = function (v) {
        via = v;
    };

    this.getNumero = function () {
        return numero;
    };

    this.setNumero = function (n) {
        numero = n;
    };
}

function Persona(n, c) {

    var nome = n || "";
    var cognome = c || "";
    var indirizzo = new Indirizzo();

    this.getNome = function () {
        return nome;
    };

    this.setNome = function (n) {
        nome = n;
    };

    this.getCognome = function () {
        return cognome;
    };

    this.setCognome = function (c) {
        cognome = c;
    };

    this.getIndirizzo = function () {
        return indirizzo;
    };

    this.setIndirizzo = function (i) {
        indirizzo = i;
    };
}

// in questo caso abbiamo 2 "classi" le cui proprietà sono tutte private ma tutte accessibili in lettura e scrittura
// tramite getter e setter.
// in particolare la "classe" Persona ha al suo interno un oggetto "indirizzo".
// quindi nel momento in cui verrà istanziato un oggetto di tipo Persona avrà al suo interno un oggetto di tipo
// indirizzo ( che potrebbe avere altri oggetti al suo interno e così via )

// l'associazione è il principio per il quale due oggetti vengono messi in relazione tra di loro.
// 
// In realtà la seconda è un'associazione più che un'aggregazione, poichè
// nell'aggregazione un oggetto può far parte di un solo oggetto ( primo esempio )
// nell'associazione un oggetto può essere in relazione con più di un oggetto ( secondo esempio )
//
// infatti possiamo facilmente assegnare lo stesso indirizzo a persone diverse per come è strutturato il codice!
//
// Però con JS non possiamo tracciare una differenza sintattica tra associazione e aggregazione.
// quindi con JS questa differenza è presente solo a livello concettuale.
