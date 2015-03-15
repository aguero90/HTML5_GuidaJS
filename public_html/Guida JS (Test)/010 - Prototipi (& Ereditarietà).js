
// il prototipo è il meccanismo alla base dell'ereditarietà con JS
// il prototipo di un oggetto B non è nient'altro che un riferimento ad un altro oggetto A
// l'oggetto B può accedere a tutte le proprietà definite nell'oggetto A, quindi in un certo senso è come se
// A estendesse B
// vediamo un esempio:
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

var PersonaItaliana = function () {

    this.nazionalità = "Italia";
};

PersonaItaliana.prototype = new Persona();

var pi = new PersonaItaliana();

// Se eseguiamo questo codice la console ci dirà che la variabile pi conterrà tutte le proprietà di Persona,
// cioè "nome" e "cognome" più la proprietà "nazionalità" impostata al valore "Italia", inoltre conterrà tutti i metodi
// di Persona ed infine conterrà una proprietà chiamata "proto__" che è un semplice riferimento all'oggetto creato
// da "new Persona()"

// La logica di funzionamento di questo meccanismo è molto semplice e può essere visto in due modi differenti:
//
//      1) nel momento in cui viene chiamato il costruttore viene creato un oggetto vuoto in memoria e riempito prima
//         con tutte le proprietà del prototipo e poi con le proprietà dell'oggetto che stiamo costruendo
//          (quindi nel nostro caso viene prima creato un oggetto vuoto, poi invocato il costruttore "Persona()" e poi
//           viene effettuato il corpo del costruttore invocato)
//
//      2) nel momento in cui si deve cercare una proprietà all'interno di un oggetto ( es: pi.nome ) JS prima cerca quella
//          proprietà all'interno dell'oggetto stesso e se non la trova la cerca all'interno del suo prototipo

// da notare che Persona() poteva avere a sua volta come prototipo un costruttore che a sua volta poteva avere
// come prototipo un costruttore ecc. in questi casi si parla di CATENA PROTOTIPALE, ma il concetto non cambia.

// un altro metodo per ottenere l'ereditarietà è quello di chiamare il costruttore della superclasse
// all'inizio dell'esecuzione del costruttore della classe figlia.
// vediamone un esempio sempre con PersonaItaliana:
var PersonaItaliana = function () {

    Persona.call(this);

    this.nazionalità = "Italia";
};

// stiamo praticamente chiamando il costruttore della classe padre impostando come contesto di esecuzione l'oggetto
// appena creato di tipo classe figla, quindi tutte le proprietà che il costruttore della classe padre andrà a creare
// saranno inserite all'interno dell'oggetto che si sta costruendo
//
// la differenza con il metodo visto precedentemente per implementare l'ereditarietà è che lì viene inserito il tutto
// nel prototipo mentre qui viene inserito tutto direttamente all'interno dell'oggetto che si sta costruendo.

// NOTA: JS non supportà l'ereditarietà multipla.


// NOTA: un ultima cosa da dire sui prototipi, e anche molto più semplice, riguarda la possibilità di aggiungere a runtime
// una qualsiasi proprietà/metodo a TUTTI gli oggetti creati tramite un unico costruttore
// vediamo un esempio per capire
var giuseppe = new Persona();
var mario = new Persona();

giuseppe.indirizzo = "";

var gianni = new Persona();

// così facendo abbiamo aggiunto la proprietà "indirizzo" SOLO all'oggetto giuseppe!
// ma se avessimo voluto aggiungere la proprietà alla classe persona? come avremmo potuto fare?
// un metodo banale è quello di scrivere this.indirizzo = "" all'interno del costruttore Persona()
// ma in questo caso l'inserimento della proprietà dobbiamo farla per forza a tempo di compilazione
// mentre per inserire la proprietà a TUTTI gli oggetti creati tramite il costruttore Persona() usiamo il prototipo

// ma vediamo un esempio per capire:
// in questo preciso momento, l'unico ad avere la proprietà indirizzo è giuseppe
Persona.prototype.indirizzo = "";

// ora tutti hanno la proprietà indirizzo: oltre a giuseppe, anche mario e gianni hanno questa proprietà
// inoltre da adesso in poi, qualsiasi oggetto istanziato con il costruttore Persona() avrà quella proprietà

var Giorgio = new Persona();

// perchè a questo punti hanno tutti quanti la proprietà indirizzo?
// perchè è stata inserita nel prototipo!
// quindi, se stiamo vedendo l'oggetto all'interno della console, per trovare la proprietà indirizzo
// dobbiamo controllare all'interno del protitipo

// N.B: a questo punto giuseppe ha 2 volte la proprietà indirizzo, una "sua" e una del "prototipo" e questo
// è uno SPRECO DI MEMORIA!