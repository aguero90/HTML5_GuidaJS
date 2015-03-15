
/******************************************************************************
 CONCORRENZA IN JS, L'EVENT LOOP
 ******************************************************************************/

// Nella programmazione JS si fa spesso ricorso ad un modello di programmazione
// concorrente in base al quale possiamo pensare che diverse attività possano avvenire
// virtualmente in parallelo e possano comunicare tra di loro in maniera asincrona.
// 
// Pensiamo, ad esempio, al verificarsi di eventi: questi di possono verificare in maniera
// indipendente dall'esecuzione del flusso principale del nostro script e, virtualmente,
// possono verificarsi più eventi contemporaneamente.
// Se abbiamo previsto gestori di eventi per più eventi, ci aspettiamo che questi
// vengano eseguiti immediatamente al verificarsi del relativo evento.
// 
// In realtà le cose non stanno proprio così.
// Il modello di concorrenza di JS è diverso da quello di altri linguaggi come ad esempio il
// C o Java.
// 
// Mentre infatti nei linguaggi di programmazione che supportano la concorrenza una porzione
// di codice di un thread può essere interrotta per mandare avanti l'esecuzione di un altro
// thread, in JS tutto avviene in un unico thread.
// 
// Il modello di concorrenza in base al quale abbiamo l'illusione che più thread siano in
// esecuzione è quello dell'event loop: ogni evento inserisce un messaggio in una coda
// che viene elaborata sequenzialmente dal runtime di JS in un ciclo infinito.
// 
// In pratica, un engine JS non fa altro che verificare la presenza di messaggi nella coda
// ed eseguire il codice dell'eventuale gestore per passare poi al messaggio successivo.
// È importante avere chiaro che il codice eseguito tra un messaggio ed il successivo
// viene eseguito senza interruzioni.
// Qualsiasi evento che si verifica durante l'esecuzione di un ciclo dell'event loop non
// può interromperlo.
// 
// Comprendere il modello di concorrenza su cui si basa JS è importante per capire il
// motivo di certi comportamenti e per poter scrivere codice efficiente.
// 
// Infatti, se questo meccanismo ha dalla sua parte un'estrema semplicictà ed efficienza
// dovute all'assenza del cambio di contesto tra thread diversi, non è tuttavia immune da 
// piccoli inconvenienti.
// 
// Consideriamo ad esempio il metodo setTimeout() dell'oggetto window.
// Esso esegue una funzione dopo un determinato numero di millisecondi:
var myTimer = setTimeout(function () {
    console.log("test");
}, 5000);
// 
// Da questo snippet di codice ci aspettiamo che faccia apparire la scritta "test"
// sulla console dopo 5 secondi dall'inizio dell'esecuzione.
// In realtà questo non è garantito.
// 
// In base al meccanismo di concorrenza di JS, allo scadere dei 5 secondi il timere genera
// un messaggio e lo inserisce nella coda degli eventi.
// Se il runtime non sta eseguendo del codice eseguirà immediatamente la funzione
// pianificata da setTimeout(), altrimenti la funzione verrà eseguita non appena il
// runtime avrà terminato l'esecuzione corrente ed avrà smaltito la coda degli eventi.
// Questo potrebbe comportare un ritardo non prevedibile, dal momento che
// tutto dipende dall'impegno richiesto dal codice e dal numeor di eventi che sono in
// attesa di essere gestiti.
// 
// In altre parole, quando specifichiamo il numero di millisecondi per il metodo setTimeout()
// dobbiamo considerarlo come il tempo minimo dopo il quale eseguire la funzione.
// 
// L'imprecisione dei timer legati al modello di concorrenza di JS può generare addirittura
// situazioni inconsistenti o comunque diversi da come ce li attenderemmo.
// Consideriamo infatti il seguente codice:
function prima() {
    console.log("prima");
    setTimeout(seconda, 0);
    console.log("terza");
    quarta();
}

function seconda() {
    console.log("seconda");
}
function quarta() {
    console.log("quarta");
}

prima();
// 
// Poichè abbiamo specificato zero come intervallo di tempo per setTimeout(), ci
// aspetteremmo che l'esecuzione della funzione seconda() sia immediata.
// In realtà eseguendo il codice otterremo la seguente sequenza di stringe:
//      
//      prima terza quarta seconda
//      
// La funzione seconda() verrà eseguita al termine dell'intera esecuzione della funzione
// prima() e delle funzioni chiamate all'interno di essa.
// Ciò deriva dal fatto che il verificarsi dell'evento di scadenza del timer non fa altro che
// inserire un messaggio nella coda degli eventi, ma il runtime JS è già occupato ad
// eseguire la funzione prima(), per cui eseguirà la funzione seconda() soltanto al termine
// delle sue attività.




/******************************************************************************
 INPUT-OUTPUT NON BLOCCANTE
 ******************************************************************************/

// Dopo aver compreso il meccanismo dell'event loop è utile soffermarci su un'importante
// considerazione: in JS le operazioni di input e output non sono bloccanti
// ( differentemente da quanto accade in altri linguaggi ).
// 
// Il principio è abbastanza semplice: tutto ciò che riguarda l'esecuzione di codice JS
// puro viene eseguito all'interno di ciascun ciclo dell'event loop e non è interrmpibile;
// ogni interazione che coinvolge l'ambiente di esecuzione viene eseguita con l'approccio
// ad eventi tramite la coda di messaggi.
// 
// Quindi richieste come il caricamento di dati dal server o la scrittutra su un DB sono
// operazioni asincrone il cui completamento inserirà una richiesta di esecuzione della
// relativa funzione di callback nella coda dei messaggi.
// 
// Questo aspetto è uno dei punti di forza di JS che consente di ottenere elevate prestazioni
// nella gestione di più richieste contemporanee pur mantenendo un unico thread di
// elaborazione, come avviene, ad esempio, nella gestione delle richieste HTTP in node.js
// 
// ----------------- PAGE RENDERING -------------------------------------
// 
// In questo contesto ci aspetteremmo che anche il rendering di una pagina HTML sia
// asincrona, essendo il DOM un componente dello specifico ambiente di esecuzione del
// browser.
// In realtà in generale le cose non stanno così.
// Ce ne possiamo rendere conto eseguendo il seguente codice:
var msgDisplay = document.getElementById("msgDisplay");

msgDisplay.innerHTML = "Elaborazione in corso: fase 1";

for (var i = 0; i < 999999999; i++) {
}

msgDisplay.innerHTML = "Elaborazione in corso: fase 2";

for (var i = 0; i < 999999999; i++) {
}

msgDisplay.innerHTML = "Fine elaborazione";
// 
// L'utente vedrà a video soltanto l'ultimo messaggio, perdendosi tutti i messaggi precedenti.
// Infatti, la modifica del contenuto di un nodo del DOM non si riflette immediatamente
// in un'operazione di rendering, ma viene recepita soltanto al termine del ciclo di esecuzione
// di JS, rendendo praticamente impercettibili le variazioni precedenti all'ultima.
// 
// Un modo per aggirare il problema consiste nell'utilizzare setTimeout() come meccanismo
// per interrompere una elaborazione intensiva e dare spazio all'aggiornamento della pagina
// web, come mostrato di seguito:
var msgDisplay = document.getElementById("msgDisplay");

function fase1() {
    for (var i = 0; i < 999999999; i++) {
    }
    masgDisplay.innerHTML = "Elaborazione in corso: fase 2";
    setTimeout(fase2, 0);
}

function fase2() {
    for (var i = 0; i < 999999999; i++) {
    }
    masgDisplay.innerHTML = "Fine elaborazione";
}

msgDisplay.innerHTML = "Elaborazione in corso: fase 1";
setTimeout(fase1, 0);
// 
// In questo caso, ciascuna fase di elaborazione viene incapsulata all'interno di un ciclo di
// elaborazione sfruttando un timer, il cui compito consiste semplicemente nell'inserire
// nella coda dei messaggi un riferimento all'esecuzione delle varie fasi dell'elaborazione
// stessa.





/******************************************************************************
 WEB WORKER
 ******************************************************************************/

// Per mantenere responsiva l'interfaccia utente mentre si effettuano 
// elaborazioni impegnative con JS siamo costretti a ricorrere a qualche
// trucco sfruttando meglio che possiamo il ciclo di elaborazione del
// runtime.
// 
// L'uso di setTimeout() è un esempio tipico di questo approccio.
// Essa consente di rendere in qualche modo asincrona l'elaborazione JS,
// ma non parallela.
// In altre parole, qualsiasi elaborazione eseguita dall'interprete JS non può
// avvenire in parallelo a un'altra: tutte le attività sono sequenziali, anche
// se possiamo spezzarle, inframezzarle con altre ed avere l'illusione di una
// forma di parallelismo.
// 
// per sopperire a questa limitazione, la specifica HTML5 introduce
// un'importante novità in questo ambito: i Web Worker.
// Un Web Worker è un thread eseguito parallelamente all'esecuzione del
// thread principale dell'engine JS.
// 
// Per comprendere come utilizzare questi componenti, proviamo a trasformare
// il codice visto negli esempi precedenti in modo da eseguirlo in un
// Web Worker.
// 
// Inseriamo innanzitutto il codice della nostra elaborazione intensiva in un
// file separato worker.js:
function fase1() {
    for (var i = 0; i < 999999999; i++) {
    }
}

function fase2() {
    for (var i = 0; i < 999999999; i++) {
    }
}
// 
// Vediamo come creare un'istanza di Web Worker tramite il costruttore
// Worker():
var myWorker = new Worker("worker.js");
// 
// ------------ SCAMBI DI MESSAGGI TRA THREAD -----------------
// 
// Per consentire un'interazione tra il thread principale e il thread
// secondario è previsto un meccanismo basato su scambi di messaggi.
// Ad esmpio, per avviare l'elaborazione del nostro worker possiamo
// scrivere il seguente codice:
var myWorker = new Worker("worker.js");
myWorker.postMessage("start");
// 
// Il metodo postMessage() consente lo cambio di messaggi tra thread 
// generando un evento.
// Il messaggio può essere costituito da dati di tipo primitivo o da
// oggetti.
// Tuttavia, dal momento che i thread hanno spazi di memoria separati,
// I MESSAGGI VENGONO PASSATI PER VALORE e pertanto vengono
// serializzati e copiati nei rispettivi spazi di memoria.
// Per questo motivo è buona norma evitare di passare strutture complesse
// o grandi quantità di dati.
// 
// Abbiamo detto che l'invio di un messaggio genera un evento.
// Questo vuol dire che per ricevere il messaggio inviato dal thread principale,
// il worker dovrà intercettare e gestire questo evento.
// Il seguente codice mostra come fare:
self.addEventListener("message", function (event) {
    if (event.data == "start") {
        fase1();
        fase2();
    }
});
// 
// Come possiamo vedere, abbiamo gestito l'evento message come un qualsiasi
// eventoJS.
// In alternativa avremmo potuto associare il gestore dell'evento alla
// proprietà onmessage.
// 
// Nell'esempio abbiamo utilizzato self per fare riferimento al contesto
// globale del worker.
// In questo contesto, che è diverso dal contesto globale del thread principale,
// le parole chiave this e self rappresentano lo stesso oggetto.
// 
// L'oggetto event passato al gestore dell'evento prevede la proprietà data 
// che rappresenta il messaggio inviato dal thread chiamante
// 
// Lo stesso meccanismo utilizzato dal thread principale con il worker
// può essere utilizzato per la comunicazione inversa, dal worker al thread
// principale.
// Ad esempio, per segnalare al thread principale l'avanzamento delle fasi di
// elaborazione possiamo prevedere l'invio di messaggi come mostrato 
// nell'esempio:
function fase1() {
    for (var i = 0; i < 999999999; i++) {
    }
}

function fase2() {
    for (var i = 0; i < 999999999; i++) {
    }
}

self.addEventListener("message", function (event) {
    if (event.data == "start") {
        self.postMessage("Elaborazione in corso: fase 1");
        fase1();
        self.postMessage("Elaborazione in corso: fase 2");
        fase2();
        self.postMessage("Fine elaborazione");
    }
});
// 
// il thread principale intercetterà a sua volta l'evento message e lo gestirà
// di conseguenza.
// Ad sempio, nel nostro caso può aggiornare l'interfaccia utente visualizzando
// il messaggio sullo stato di avanzamento dell'elaborazione:
var msgDisplay = document.getElementById("msgDisplay");
var myWorker = new Worker("worker.js");
myWorker.postMessage("start");

myWorker.addEventListener("message", function (event) {
    msgDisplay.innerHTML = event.data;
});
// 
// Con questo approccio manterremmo un'interfaccia Web responsiva pur
// effettuando un'elaborazione impegnativa per JS.
// 
// È importante tenere in considerazione il fatto che il thread associato al
// worker non termina con l'elaborazione associata.
// Esso rimane in attesa di eventuali nuovi messaggi consumando risorse
// di calcolo prezione come memoria e processore.
// È opportuno quindi terminare il worker non appena ha terminato il suo
// compito.
// 
// La terminazione del worker può avvenire dall'interno del worker stesso
// tramite il metodo close():
self.close();
// 
// o dal thread principale tramite il metodo terminate();
myWorker.terminate();
// 
// -------------- GESTIONE DEGLI ERRORI ------------------------
// 
// Per gestire gli errori che possono verificarsi durante l'esecuzione di un worker,
// possiamo fare ricorso all'evento error, come mostrato nel seguente esempio:
worker.addEventListener("error", function (error) {
    console.log("Si è verificato l'errore " + error.message +
            " durante l'esecuzione del worker " + error.filename +
            " in corrispondenza della linea " + error.lineno);
});
// 
// Come possiamo dedurre dall'esempio, l'oggetto che rappresenta l'errore 
// verificatosi durante l'esecuzione del worker mette a disposizione tre
// importanti proprietà:
// il messaggio d'errore(message), il file contenente il codice del worker (filename)
// e il numero di linea in cui si è verificato l'errore (lineno).
// 
// ----------------- VINCOLI DEI WEB WORKER -------------------
// 
// I Web Worker rappresentano un'importante innovazione per il supporto
// della concorrenza in JS.
// Tuttavia occorre tener conto della presenza di alcune importanti limitazioni.
// 
// Innanzitutto dall'interno di un worker non è possibile accedere al DOM,
// nè ad oggetti del browser come window e console.
// Anche se queste limitazioni potrebbero sembrare a prima vista un po' troppo
// restrittive, in realtà esse rispondono ad un'esigenza di sicurezza 
// architetturale e, con alcuni accorgimenti, l'apparente limitazione è facilmente
// superabile.
// 
// Infatti, questa restrizione è dettata dal voler evitare un accesso incontrollato
// agli elementi del DOM e del browser che potrebbero creare situazioni di
// deadlock, ma è sufficiente delegare al thread principale il compito di
// riportare sul DOM il risultato delle elaborazioni di un worker, come abbiamo
// mostrato nell'esempio.
// 
// Inoltre, è utile ricordare che ai worker si applica la same-origin policy applicata
// al thread principale, così un worker può interagire solotanto con lo stesso
// server da cui è stato scaricato lo script del thread principale.
// 
// Altro aspetto a cui prestare attenzione è il fatto che gli URI relativi
// utilizzati all'interno di un worker vengono risolti rispetto all'indirizzo dello
// script padre e non rispetto all'indirizzo della pagina.
// 
// Come ulteriore limitazione possiamo identificare lo scambio di messaggi
// e dati tra i thread.
// Abbiamo visto come sia da preferire il passaggio di dati primitivi o strutture
// semplici, evitando di passare strutture dati di grandi dimensioni per
// l'impatto che possono avere sulle risorse di sistema.
// È invece del tutto inibito il passaggio di funzioni.





/******************************************************************************
 SHARED WORKER
 ******************************************************************************/

// Oltre ai Web Worker che abbiamo analizzato, le specifiche prevedono un altro
// tipo di worker: gli Shared Worker.
// 
// I worker che abbiamo visto finora, detti anche Dedicated Worker, hanno
// una relazione diretta con il thread e/o lo script che li hanno generati,
// cioè con essi può interagire soltanto il thread che li ha generati.
// Gli Shared Worker, invece, possono comunicare con tutti gli script che
// condividono la stessa origine, cioè tutti gli script appartenenti ad uno
// stesso sito o applicazione Web.
// 
// Esaminiamo questo elemento con dei semplici esempi.
// Per creare uno Shared Worker utilizziamo il costruttore SharedWorker():
var myWorker = new SharedWorker("worker.js");
// 
// L'interazione del thread principale con il worker condiviso avviene tramite
// una porta di comunicazione dedicata accessibile tramite la proprietà port:
myWorker.port.postMessage("start");
myWorker.port.onmessage = function (event) {
    /* ... */
};
// 
// Analogamente, dal lato worker è possibile comunicare con il thread
// principale tramite l'evento connect, che si verifica al momento della
// creazione dell'istanza del worker:
self.addEventListener("connect", function (event) {
    var clientPort = event.source;
    clientPort.onmessage = function (event) {
        var dati = event.data;
        // elaborazione di dati
        clientPort.postMessage("Dati elaborati");
    };
});
// 
// Come possiamo vedere dall'esempio, l'oggetto event mette a disposizione la
// proprietà source che rappresenta la porta tramite cui comunicare con il
// thread principale.
// 
// Gli Shared Worker rappresentano una evoluzione dei worker dedicati e,
// se ben utilizzati, possono contribuiread un migliore utilizzo delle risorse.
// Possono, ad esempio, essere impiegati in quelle situazioni in cui si ha 
// necessità di condividere una determinata elaborazione o per mantenere uno
// stato condiviso tra pagine Web diverse.
