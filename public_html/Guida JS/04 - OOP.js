
/******************************************************************************
 OGGETTI
 ******************************************************************************/

//  Come abbiamo visto, gli oggetti sono elementi fondamentali in JS, tanto da
//  poter affermare che, esclusi i tipi di dato primitivi, in JS tutto è un
//  oggetto: array, funzioni, espressioni regolari ecc.
// 
// Gli oggetti in JS sono oggetti molto flessibili e dinamici
// 
// In JS un oggetto appare come un array associativo che è possibile costruire 
// o modificare dinamicamente 
var persona = {
    nome: "Mario",
    cognome: "Rossi"
};
// 
// Oppure può essere definito sfruttando l'oggetto Object
var persona = new Object({
    nome: "Mario",
    cognome: "Rossi"
});
// 
// Possiamo poi tranquillamenta aggiungere nuove proprietà ad un oggetto
// senza problemi
persona.indirizzo = "Via Garibaldi, 50 - Roma";
// 
// È possibile anche eliminare una proprietà tramite l'istruzione delete
delete persona.cognome;
// 
// Dopo aver eliminato la proprietà cognome ogni tentativo di accesso ad essa
// restituirà undefined
// 
// Si nota che un oggetto in JS non necessita di una classe, come avviene nella
// classica programmazione ad oggetti.
// Infatti JS è basato su un approccio diverso che vedremo nel corso di questa
// sezione.
// 
// In JS un metodo non è altro che una proprietà di un oggetto alla quale è 
// stata assegnata una funzione.
persona.mostraNomeCompleto = function () {
    console.log(this.nome + " " + this.cognome);
};




/******************************************************************************
 COSTRUTTORI
 ******************************************************************************/

// Come abbiamo visto, la cerazione di un oggetto è molto semplice utilizzando
// la notazione letterale.
// Non c'è bisogno di definire una classe ma definiamo direttamente l'oggetto
// così come ci serve al momento ed eventualmente possiamo modificarne la
// struttura nel corso dell'escuzione dello script.
// Immaginiamo però di avere bisogno di più oggetti dello stesso tipo, ad
// esempio persona, tutti con la stessa struttura
var persona = {
    nome: "Mario",
    cognome: "Rossi",
    indirizzo: "Via Garibaldi, 50 - Roma",
    email: "mario.rossi@html.it",
    mostraNomeCompleto: function () {
    },
    calcolaCodiceFiscale: function () {
    }
};
// 
// Utilizzando la notazione letterale saremmo costretti a ripetere la definizione
// per ciascun oggetto che vogliamo creare. Cosa indispensabile per elementi
// identificativi della persona ma inutili per elementi costanti come i metodi.
// 
// Proprio per evitare questo caso possiamo ricorrere ai costruttori.
// Un costruttore non è altro che una normale funzione JS invocata tramite
// l'operatore new
// Vediamo un esempio:
function persona() {
    this.nome = "";
    this.cognome = "";
    this.indirizzo = "";
    this.email = "";
    this.mostraNomeCompleto = function () {
    };
    this.calcolaCodiceFiscale = function () {
    };
}
;
//  
// Questa funzione definisce le proprietà del nostro oggetto assegnandole
// a se stesso (this).
// A questo punto per creare un oggetto di tipo persona ci basterà fare così:
var marioRossi = new persona();
marioRossi.nome = "Mario";
marioRossi.cognome = "Rossi";

var giuseppeVerdi = new persona();
giuseppeVerdi.nome = "Giuseppe";
giuseppeVerdi.cognome = "Verdi";
// 
// In questo modo nella creazione di più oggetti con la stessa struttura ci
// limiteremo ad impostare solo i valori specifici che differenziano un
// oggetto dall'altro
// 
// Quando definiamo un costruttore possiamo prevedere dei parametri
// da usare per inizializzare l'oggetto
function persona(nome, cognome) {
    this.nome = nome;
    this.cognome = cognome;
    this.indirizzo = "";
    this.email = "";
    this.mostraNomeCompleto = function () {
    };
    this.calcolaCodiceFiscale = function () {
    };
}
;

var marioRossi = new persona("Mario", "Rossi");
var giuseppeVerdi = new persona("Giuseppe", "Verdi");
// 
// È fondamentale utilizzare l'operatore new per la creazione di un oggetto
// tramite il costruttore. Infatti, se lo omettiamo, quello che otteniamo non
// è la creazione di un oggetto, ma l'esecuzione della funzione con risultati
// imprevedibili.
// Facciamo un esempio:
var marioRossi = persona();
// 
// Il valore della variabile marioRossi sarà undefined dato che la funzione
// persona() non restituisce alcun valore.
// Inoltre tutte le proprietà e i metodi definiti all'interno del corpo della
// funzione saranno assegnati all'oggetto this valido nel contesto di esecuzione
// della funzione (ad esempio l'oggetto globale).
// Questa assegnazione potrebbe ridefinire il valore di variabili omonime
// con effetti collaterali difficilmente prevedibili.
// 
// Per cercare di ovviare a eventuali dimenticanze dell'operatore new
// si può ricorrere ad una convenzione abbastanza diffusa che prevede l'uso
// del maiuscolo per la prima lettera del nome di un costruttore.
function Persona() {
}
;
// 
// Possiamo affiancare a questa convenzione l'uso della "strict mode"
function Persona() {
    'use strict'
}
;
// 
// In questa modalità l'oggetto this risulta undefined l'esecuzione del
// codice durante la chiamata alla funzione.
// Questo genera un errore a runtime per il tentativo di accedere a delle
// proprietà di un oggetto che non esiste, evitanto quindi invocazioni
// non volute del costruttore.
// 
// Purtroppo questo metodo non è sufficiente quando il costruttore è il
// metodo di un oggetto:
var gente = {
    persona: function () {
        'use strict'

    }

};

var marioRossi = gente.persona();
// 
// in questo caso this si riferisce all'oggetto gente e quindi non avremmo un
// errore che ci avvisa dell'errato utilizzo del costruttore.




/******************************************************************************
 PROTOTIPI
 ******************************************************************************/

// Anche se usiamo il costruttore per creare un oggetto possiamo modificare
// quest'ultimo durante l'esecuzione dello script:
var marioRossi = new persona("Mario", "Rossi");
var giuseppeVerdi = new persona("Giuseppe", "Verdi");

marioRossi.telefono = "0612345678";
// 
// creando la proprietà telefono per l'oggetto marioRossi non siamo andati a 
// toccare la struttura dell'oggetto giuseppeVerdi.
// Cioè possiamo dare una struttura comune agli oggetti definita dal costruttore
// e poi personalizzare la struttura del singolo oggetto a nostro piacimento.
// 
// Ma se volessimo invece modificare la struttura di tutti gli oggetti creati
// tramite il costruttore?
// Se ad esempio, dopo aver creato diversi oggetti dal costruttore Persona() 
// vogliamo aggiungere per tutti la proprietà telefono?
// Possiamo sfruttare una delle caratteristiche più interessanti della
// programmazione orientata agli oggetti di JS: il prototype
Persona.prototype.telefono = "123456";
// 
// Questo assegnamento fa si che tutti gli oggetti creati tramite il costruttore 
// Persona() abbiano immediatamente anche la proprietà telefono impostata al
// valore specificato.
// 
// Ad essere precisi, la nuova proprietà non è direttemente agganciata a ciascun
// oggetto, ma accessibile come se fosse una sua proprietà.
// Questo grazie al meccanismo di prototyping che sta alla base dell'ereditarietà
// nella programmazione ad oggetti di JS.
// 
// In JS, il prototipo di un oggetto è una sorta di riferimento ad un altro
// oggetto. 
// Tutti gli oggetti che creiamo con la notazione letterale hanno come
// prototipo l'oggetto Object.
// 
// Quando creiamo un oggetto tramite il costruttore, il suo prototipo
// è l'oggetto prototype del costruttore.





/******************************************************************************
 EREDITA' PROTOTIPALE
 ******************************************************************************/

// Il meccanismo su cui si basa l'eredità prototipale di JS è abbastanza
// semplice: se una proprietà non si trova in un oggetto viene cercata nel suo
// prototipo.
// 
// Il prototipo di un oggetto può a sua volta avere un altro prototipo.
// In questo caso la ricerca di una proprietà o di un metodo risale la catena 
// dei prototipi fino ad arrivare all'oggetto Object: il prototipo base di
// tutti gli oggetti.
// 
// Anche gli oggetti predefiniti di JS hanno un prototipo di riferimento.
// La loro gestione, nella maggior parte dei casi, è del tutto analoga alla
// gestione dei prototipi degli oggeti creati tramite costruttore.
// Questo ci permette di aggiungere funzionalità non previste dagli oggetti
// predfiniti in modo abbastanza semplice.
// 
// Ad esempio, se vogliamo rendere disponibile per tutte le stringhe un metodo
// per effettuare il padding, possiamo intervenire sul prototype del
// costruttore String().
// Vediamo come:
String.prototype.padLeft = function (width, char) {

    var result = this;
    char = char || "";

    if (this.length < width) {
        result = new Array(width - this.length + 1).join(char) + this;
    }

    return result;
};
// 
// Grazie a questa definizione possiamo usare il metodo padLeft come se fosse
// un metodo predefinito:
console.log("abc".padLeft(10, "x")); //xxxxxxxabc





/******************************************************************************
 PRINCIPI OOP IN JS
 ******************************************************************************/

// JS supporta la programmazione orientata agli oggetti in maniera particolare
// rispetto ai classici linguaggi di programmazione orientati agli oggetti
// come Java, C++ o C#.
// Infatti abbiamo visto che non ha le classi, ma consente un meccanismo che
// permette di ottenere un risultato analogo e di implementare
// l'ereditarietà: i prototipi.
// 
// La sua natura dinamica e la sua flessibilità non prevedono costrutti 
// predefiniti per supportare alcuni dei principi generali della 
// programmazione orientata agli oggetti.
// Esistono però dei "pattern di riferimento" con cui implementare questi
// principi.
// 
// In particolare, un linguaggio OOP deve supportare i seguenti principi:
//      - Incapsulamento: la capacità di concentrare in un'unica entità
//                        (oggetto) dati e funzionalità
//      - Aggregazione: La possibilità di un oggetto di avere altri oggetti
//                      al suo interno.
//      - Ereditarietà: La dipendenza delle caratterisctiche di un oggetto
//                      da una o più definizioni di altri oggetti
//      - Polimorfismo: La capacità di gestire gli oggetti senza conoscerne
//                      in anticipo i dettagli
//      - Associazione: La possibilità per un oggetto di fare riferimento ad
//                      un altro oggetto.
//                      
// Vediamo ora come implementare questi principi in JS:
// 
// ---------------------   INCAPSULAMENTO   -----------------------------------
// 
// L'incapsulamento avviene attraverso gli oggetti e, come già detto, in JS
// (quasi) tutto è un oggetto. 
// Quindi da questo punto di vista possiamo dire che il principio di
// incapsulamento è pienamente supportato in JS.
// 
// Tuttavia l'incapsulamento è spesso collegato ad un principio, l'information
// hiding, che consiste nel proteggere e controllare le parti di un oggetto 
// accessibili dall'esterno.
// Cioè un oggetto deve avere la capacità di imporre regole di accesso 
// dall'esterno ai propri membri.
// 
// I membri di un oggetto JS sono tutti pubblici.
// Ad esempio, i membri dell'oggetto persona definito dal seguente costruttore
// sono accessibili e modificabili da qualsiasi funzione esterna:
function persona() {
    this.nome = "";
    this.cognome = "";
    this.email = "";
    this.mostraNomeCompleto = function () {
    };
}
;

var marioRossi = new persona();
marioRossi.nome = "Mario";
marioRossi.cognome = "Rossi";
marioRossi.email = "mario.rossi@html.it";
// 
// Un tipico membro privato in un oggetto JS è una variabile locale definita
// dal costruttore: 
function persona(nome, cognome) {
    var privNome = nome;
    var privCognome = cognome;
    var privEmail = "";

    this.nome = privNome;
    this.cognome = privCognome;
    this.email = privEmail;
    this.mostraNomeCompleto = function () {
        console.log(this.nome + ' ' + this.cognome);
    };
}
// 
// Le variabili privNome, privCognome e privEmail non sono direttamente
// accessibili dall'esterno anche se lo sono tramite le corrispondenti
// proprietà.
// E questo non ha una vera utilità.
// 
// Avere membri non direttamente accessibili dall'esterno, ma accessibili
// tramite un intermediario consente di effettuare una serie di operazioni
// (controlli di validità dei valori ecc) che non devono necessariamente 
// essere conosciute all'esterno dell'oggetto.
// 
//  Ad esempio, un oggetto può implementare un controllo di validità
//  dell'indirizzo mail prima di assegnarlo alla sua variabile privata.
//  Questo è il ruolo dei membri "privilegiati", cioè di membri pubblici 
//  che hanno accesso a membri privati.
//  
//  Nel seguente esempio getMail() e setMail() sono membri privilegiati che
//  consentono rispettivamente di restituire il valore corrente della
//  variabile privata privEmail e di assegnargli un valore
function persona(nome, cognome) {
    var privNome = nome;
    var privCognome = cognome;
    var privEmail = "";

    function isValidEmail(value) {
        return true; // è solo per prova, non verifica nulla
    }

    this.nome = privNome;
    this.cognome = privCognome;

    this.getEmail = function () {
        return privEmail;
    };
    this.setEmail = function (value) {
        if (isValidEmail(value))
            privEmail = value;
    };

    this.mostraNomeCompleto = function () {
        console.log(this.nome + " " + this.cognome + " " + this.getEmail());
    };
}
;
// 
//  Purtroppo JS non ha un supporto diretto per i membri protetti, cioè non
//  prevede che un membro si accessibile solamente agli oggetti che ereditano
//  le sue caratteristiche.
//  
//  È comunque possibile implementare il supporto ai membri protetti
//  prevedendo il passaggio di un argomento supplementare nel 
//  costruttore della classe base.
//  Questo argomento è un oggetto che funge da repository dei membri protetti.
//  Vediamo un esempio:
function persona(nome, cognome, protectedInfo) {

    var privNome = nome;
    var privCognome = cognome;
    var privEmail = "";

    protectedInfo = protectedInfo || {};
    protectedInfo.codiceInterno = "12345ABC";

    function isValidEmail(value) {
        return true; // è solo per prova, non verifica nulla
    }

    this.nome = privNome;
    this.cognome = privCognome;
    this.getEmail = function () {
        return privEmail;
    };
    this.setEmail = function (value) {
        if (isValidEmail(value))
            privEmail = value;
    };

    this.mostraNomeCompleto = function () {
        console.log(this.nome + ' ' + this.cognome + ' ' + this.getEmail());
    };
}

function programmatore(nome, cognome) {

    var protectedInfo = {}; // creiamo una oggetto privato per avere un riferimento

    // facciamo in modo che il valore sia impostato dalla classe padre 
    persona.call(this, nome, cognome, protectedInfo);

    this.codice = protectedInfo.codiceInterno;
    this.linguaggiConosciuti = [];
}
// 
// Come possiamo vedere, il costruttore dell'oggetto persona prevede 
// l'argomento aggiuntivo protectedInfo.
// Questo è un oggetto che viene inizializzato nel caso in cui non venga
// passato e a cui viene assegnata la proprietà codiceInterno.
// Naturalmente l'oggetto protectedInfo non è accessibile dall'esterno.
// 
// Il costruttore programmatore(), nell'invocazione del costruttore base,
// passa un oggetto vuoto a cui verranno assegnati i membri protetti.
// Ricordiamo infatti che il passaggio degli oggetti avviene per riferimento,
// quindi ogni modifica apportata all'oggetto protectedInfo durante 
// l'esecuzione del costruttore base sarà disponibile al ritorno dell'esecuzione
// stessa.
// Il contenuto di protectedInfo sarà quindi pienamente accessibile dal
// costruttore dell'oggetto derivato programmatore.
// 
// Quindi, il supporto dei livelli di incapsulamento è in qualche modo
// disponibile in JS.
// Questo grazie alla relazione che c'è tra membri privati e membri pubblici
// e al concetto di closure che consente ad un metodo di accedere ai membri
// privati del costruttore anche dopo che è terminata l'esecuzione del
// costruttore stesso.
// 
// Tutto ciò non è purtroppo valido quando proviamo a combinare
// l'incapsulamento con l'eredità prototipata.
// Infatti, un metodo assegnato al prototipo di un costruttore non ha
// accesso ai membri privati del costruttore stesso.
function persona(nome, cognome) {
    var privNome = nome;
    var privCognome = cognome;

    this.nome = privNome;
    this.cognome = privCognome;
}

persona.prototype.mostraNomeCompleto = function () {
    return privNome + privCognome;
};
// 
// In questo esempio se proviamo a creare un oggetto persona e proviamo ad
// invocare il metodo mostraNomeCompleto() otteremo un errore, dal momento
// che le due variabili privNome e privCognome non sono accessibili.
// Quindi nella progettazione di un oggetto che può essere derivato
// bisogna trovare un compromesso tra livello di incapsulamento ed ereditarietà.
// 
// ----------------------   AGGREGAZIONE   ------------------------------------
// 
// L'aggregazione è la capacità di un oggetto di contenere altri oggetti.
// Come abbiamo visto, JS supporta senza particolari problemi questa 
// caratteristica.
// 
// Ad esempio, la seguente definizione di persona include la proprietà di
// indirizzo come un oggetto:
var marioRossi = {
    nome: "Mario",
    cognome: "Rossi",
    indirizzo: {
        via: "Via Garibaldi",
        numero: "11",
        comune: "Roma",
        provincia: "RM"
    }
};
// 
// Il risultato può essere visto come un oggetto generato dall'aggregazione di
// due oggetti.
// Naturalmente è possibile che l'oggetto indirizzo sia a sua volta il
// risultato di un'aggregazione e così via consenendo la creazione di
// gerarchie di oggetti.
// 
// ------------------------   EREDITARIETA'   ---------------------------------
// 
// Abbiamo già visto che l'erediterietà di JS è diversa dalla classica
// ereditarietà dei linguaggi orientati agli oggetti. Infatti per implementarla
// abbiamo bisogno dei prototipi.
// 
// Come abbiamo visto, ci sono diversi modi per derivare un oggetto da un altro.
// Possiamo ad esempio creare un oggetto derivato da un altro impostando 
// opportunamente il suo prototipo.
// Ad esempio, facendo riferimento al costruttore dell'oggetto persona,
// possiamo definire il costruttore dell'oggetto programmatore nel seguente
// modo:
function programmatore() {
    this.linguaggiConosciuti = [];
}

programmatore.prototype = new persona();

var marioRossi = new programmatore();
// 
// Impostando il prototipo del costruttore programmatore come istanza del
// costruttore persona, abbiamo di fatto ereditato le cratteristiche di
// persona.
// 
// In alternativa possiamo invocare il costruttore di persona all'interno del
// costruttore di programmatore:
function programmatore() {
    persona.call(this);
    this.linguaggiConosciuti = [];
}

var marioRossi = new programmatore();
// 
// JS non supporta l'ereditarietà multipla, cioè la possibilità di creare un
// oggetto che eredita le caratteristiche di 2 o più oggetti.
// 
// ------------------------   POLIMORFISMO   ----------------------------------
// 
// Nella programmazione ad oggetti il polimorfismo è inteso in diversi modi,
// anche se alla base c'è una nozione comune:
//      - overloading: la possibilità di prevedere metodi che manipolano
//                     tipi di dato diversi.
//      - polimorfismo parametrico: la possibilità di prevedere tipi generici,
//                                  non conosciuti a priori.
//      - polimorfismo per inclusione: la possibilità di avere espressioni il
//                                     cui tipo può essere rappresentato da una
//                                     classe e dalle classi da essa derivate
//                                     (Liskov)
//                                     
// Per un linguaggio a tipizzazione dinamica come JS, risulta implicito poter
// lavorare con tipi generici e gestire senza problemi oggetti di tipo diverso.
// Risulta altrettanto immediato il fatto che un metodo JS supporti l'overloading
// manipolando tipi di dato diversi.
// 
// Tra l'altro, a differenza dei linguaggi fortemente tipizzati, non è necessario
// avere due o più definizioni diverse in base al tipo.
// Ad esempio, mentre in C# dobbiamo ricorrere ad una definizione del genere:
// public string Add(int x, int y){
//      return x + y;
// }
// 
// public string Add(string x, string y){
//      return x + y;
// }
// 
// In JS definiamo un solo metodo:
function add(x, y) {
    return x + y;
}
// 
// -----------------------   ASSOCIAZIONE   -----------------------------------
// 
// L'associazione di solito non è ritenuta come un requisito fondamentale 
// per poter definire un linguaggio orientato agli oggetti.
// Tuttavia è utile prenderla in considerazione dato il frequente utilizzo
// di questa caratteristica.
// In pratica, l'associazione è il principio in base al quale un oggetto
// viene messo in relazione con un altro oggetto.
// Ad esempio, per definire una relazione genitore-figlio tra persone possiamo
// fare nel seguente modo:
function persona(nome, cognome) {
    this.nome = nome;
    this.cognome = cognome;
    this.genitore = null;
}

var marioRossi = new persona("Mario", "Rossi");
var giuseppeRossi = new persona("Giuseppe", "Rossi");

marioRossi.genitore = giuseppeRossi;
// 
// L'assegnazione dell'oggetto giuseppeRossi alla proprietà genitore 
// dell'oggetto marioRossi definisce l'associazione tra due oggetti.
// 
// È importante non confondere l'associazione con l'aggregazione.
// Anche se il supporto dei due principi è sintatticamente identico,
// l'assegnamento di un oggetto ad una proprietà, da un punto di vista
// concettuale rappresentano situazioni diverse:
//      - aggregazione: è il principio che consente di creare un oggetto
//                      composto da più oggetti.
//      - associazione: mette in relazione oggetti autonomi.
//      
// Inoltre, mentre l'aggregazione non prevede che un oggetto faccia parte di
// oggetti diversi, l'associazione prevede che un oggetto possa essere
// associato a più oggetti.
// Vediamone un esempio:
marioRossi.genitore = giuseppeRossi;
giuliaRossi.genitore = giuseppeRossi;
marcoRossi.genitore = giuseppeRossi;
// 
// JS non fa controlli su come associamo gli oggetti tra di loro.
// L'associazione pone quindi più un vincolo concettuale che tecnico.





/******************************************************************************
 ECCEZIONI
 ******************************************************************************/

// Un'eccezione è un errore che si verifica a runtime dovuto ad un'operazione
// non consentita.
// Ad esempio il riferimento ad una variabile non definita oppure l'invocazione
// di un metodo che non esiste.
// 
// In JS per gestire le eccezioni possiamo ricorrere al costrutto try...catch
// che funziona in modo analogo a tutti gli altri linguaggi orientati agli
// oggetti.
// 
// Tramite questo costrutto possiamo intercettare un'eccezione e definire una
// strategia per gestirla.
try {
    //blocco di codice
} catch (e) {
    //gestione dell'eccezione
}
// 
// Se nel blocco try non si verificano eccezioni il controllo passa all'istruzione
// successiva al blocco catch.
// Altrimenti il constrollo passa al blocco catch.
// 
// Quando si verific un'eccezione il sistema crea un oggetto che contiene 
// informazioni sul problema riscontrato, in modo da poter essere analizzzato
// all'interno del blocco di codice incaricato di gestire l'eccezione.
// 
// Ecco un esempio di utilizzo del try..catch:
var x = 0;

try {
    func();
    x = x + 1;
} catch (e) {
    console.log(e.message);  // func is not defined
}
console.log(x);  //0 
// 
// Dato che la funzione func() non è stata definita, nel blocco try verrà
// generata un'eccezione che sarà gestita dal blocco catch.
// In questo caso la gestione dell'eccezione è molto semplice. Infatti viene
// semplicemente visualizato un messaggio di sistema associato all'eccezione.
// 
// Da notare che le istruzioni successive nel blocco try a quella che ha
// generato l'eccezione non vengono eseguite. Infatti la variabile x non viene 
// incrementata e viene stampato 0.
// Cioè il verificarsi di un'eccezione interrompe l'esecuzione soltanto
// all'interno del blocco try, consentendo la prosecuzione dell'esecuzione
// al suo esterno.
// 
// Il costrutto try...catch prevede la clausola opzionale finally che consente
// di specificare un blocco di codice da eseguire in ogni caso, anche se si
// verificano eccezioni:
var x = 0;

try {
    func();
    x = x + 1;
} catch (e) {
    console.log(e.message);  // func is not defined
} finally {
    x = x - 1;
}
console.log(x);  // -1
// 
// In questo caso, dopo che si è verificata l'eccezione ed è stato 
// visualizzato il messaggio di errore, viene eseguito il blocco di codice 
// associato a finally, ottenendo -1 come valore finale della x.
// 
// Anche se la funzione func() fosse stata definita senza quindi generare
// alcuna eccezione, il blocco di codice finally viene sempre eseguito facendo
// assumere alla x valore 0;
// 
// L'oggetto che rappresenta l'errore viene passato come una sorta di
// parametro al catch.
// Questo oggetto prevede fondamentalmente 2 proprietà: nome, che identifica 
// il tipo di eccezione e message, che indica il messaggio specifico
// dell'eccezione verificatasi.
// Eventuali proprietà aggiuntive possono essere presenti in base allo
// specifico engine JS.
// 
// La possibilità di individuare il tipo di errore tramite name ci consente di
// gestire diversamente le situazioni di errore:
try {
    //Blocco di codice
} catch (e) {
    switch (e.name) {
        case "ReferenceError":
            console.log("Variabile o funzione non definita");
            break;
        case "TypeError":
            console.log("Non è stato utilizzato il tipo di dato previsto");
            break;
            // ecc
    }
}
// 
// Infine abbiamo la possibilità di generare eccezioni da programma tramite
// l'istruzione throw in modo da avere una gestione uniforme degli errori.
function convalidaEmail(value) {
    var emailRegExp = /\w+@\w+\.\w{2,4}/i;

    if (emailRegExp.test(value)) {
        return true;
    } else {
        throw new Error("Email non valida!");
    }
}
// 
// Ad esempio qui generiamo un'ecezione se l'indirizzo mail non è valido.