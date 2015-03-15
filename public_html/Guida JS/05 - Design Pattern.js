
/******************************************************************************
 DESIGN PATTERN
 ******************************************************************************/

// I Design Pattern sono soluzioni tecniche a problemi comuni di progettazione
// del software.
// Sono degli schemi logici per la risoluzione di un problema e sono riusabili
// ed indipendenti dal linguaggio di programmazione.
// Offrono anche un modello di riferimento per realizzare componenti
// software facilmente manutenibili.
// 
// Non garantiscono la soluzione ad un problema, ma quando si individua un
// problema con certe caratteristiche ci si può ispirare ad un Design Pattern
// per comprendere come risolverlo.
// 
// I Design Pattern vengono raggruppati in categorie per evidenziarne l'obiettivo
// principale su cui sono focalizzati.
// In Particolare possiamo raggrupparli in 3 categorie:
//      - Pattern Creazionali: Si occupano della creazione di classi e oggetti.
//                                 Anche se a prima vista può sembrare un problema 
//                                 banale, in applicazioni complesse può risultare
//                                 utile controllare il modo in cui vengono creati
//                                 gli oggetti.
//                                 Tra i pattern di questa categoria vedremo:
//                                      - Singleton Pattern
//                                      - Factory Pattern
//      
//      - Pattern Strutturali: Forniscono un modo per gestire le relazioni tra
//                                 gli oggetti, in questo modo, variazioni in una 
//                                 parte dell'applicazione hanno un impatto minimo
//                                 nelle altre parti.
//                                 Tra i pattern di questa categoria vedremo:
//                                      - Module Pattern
//                                      - Adapter Pattern
//                                      - Fecade Pattern
//                                      - MVC/MVVM Pattern
//                                  
//      - Pattern Comportamentali:  Si occupano della comunicazione tra gli
//                                          oggetti di un'applicazione.
//                                          Tra i pattern di questa categoria vedremo:
//                                                  - Observe Pattern
//                                       
//      - Altri Pattern: Ci sono altri pattern utili alla gestione e alla
//                          manutenzione del codice.
//                          A questo proposito vedremo un pattern utile a manipolare
//                          con semplicita la programmazione asincrona e le
//                          callback annidate:
//                                  - Promise Pattern





/******************************************************************************
 SINGLETON PATTERN
 ******************************************************************************/

// Il Singleton Pattern è un pattern che prevede l'esistenza di un'unica
// istanza di un oggetto.
// Per un linguaggio di programmazione basato sulle classi (es: JAVA) questo
// significa che una classe può essere istanziata una sola volta e che gli
// eventuali tentativi di creare nuove istanze della classe ottengono
// l'istanza già creata.
// 
// In JS possiamo creare oggetti direttamente, dal momento che non sono
// previste classi.
// Quindi ogni oggetto è in realtà già un sigleton.
var singleton = {
    proprieta: "abc",
    metodo: function () {
        // Corpo metodo
    }
};

singleton.metodo();
// 
// Che bisogno abbiamo di implementare questo design pattern?
// 
// Nell'esempio abbiamo creato l'oggetto nel contesto globale e una volta
// creato è disponibile in qualsiasi punto della nostra applicazione.
// Tuttavia non è detto che l'oggetto venga effettivamente utilizzato nel
// corso dell'esecuzione.
// Se per qualche flusso di esecuzione non facciamo uso dell'oggetto, abbiamo
// sprecato inutilmente risorse per la sua creazione.
// Inoltre, se per l'inizializzazione del notro oggetto abbiamo bisogno di
// dati non disponibili, dobbiamo rimandare la creazione dell'istanza.
// 
// Per gestire queste situazioni possiamo implementare il singleton come
// mostrato nel seguente esempio:
var singleton = (function () {
    var instance;
    return{
        getInstance: function () {
            if (!instance) {
                instance = {
                    proprieta: "abc",
                    metodo: function () {
                        // Corpo del metodo
                    }
                };
            }
            return istance;
        }
    };
}
)();
// 
// Ricorriamo ad una espressione IIFE per proteggere l'istanza effettiva
// del nostro oggetto.
// Il risultato dell'espressione assegnata alla variabile singleton è un oggetto
// con un solo metodo getInstance().
// Il singleton vero e proprio sarà creato quando sarà invocato questo metodo,
// il quale si preoccuperà di verificare se esiste già un'istanza dell'oggetto
// e solo se non esiste la creerà.
// 
// L'utilizzo tipico del singleton è quello mostrato di seguito:
var mySingleton = singleton.getInstance();
console.log(mySingleton.proprieta); // "abc"





/******************************************************************************
 FACTORY PATTERN
 ******************************************************************************/

// Il Factory Pattern è un pattern creazionale che ha l'obiettivo di semplificare
// creazione di oggetti in situazioni in cui abbiamo un'alta varietà di 
// impostazioni iniziali oppure quando l'istanza di oggetto da creare dipende
// dal contesto in cui ci troviamo.
// 
// Proviamo ad introdurre il pattern con un esempio:
// Immaginiamo di voler consentire la creazione di veicoli con caratteristiche
// specificate al momento della creazione.
// Il seguente codice mostra come può essere risolto il problema sfruttando
// il Factory Pattern:
var veicoloFactory = {
    creaVeicolo: function (opzioni) {
        var veicolo;
        if (opzioni && opzioni.length) {
            switch (opzioni.tipo) {
                case "auto":
                    veicolo = new Automobile(opzioni);
                    break;
                case "moto":
                    veicolo = new Moto(opzioni);
                    break;
                case "camion":
                    veicolo = new Camion(opzioni);
                    break;
            }
        }
    }
};
// 
// Abbiamo definito un oggetto veicoloFactory che mette a disposizione il
// metodo creaVeicolo() il cui compito è la creazione di un oggetto-veicolo
// con le caratteristiche specificate nelle opzioni.
// In particolare, l'opzione tipo determina il tipo di veicolo che vogliamo
// ottenere e fa in modo che all'interno del Factory venga invocato un 
// costruttore diverso.
// 
// Un esempio d'uso del metodo creaVeicolo() è il seguente:
var myAutomobile = veicoloFactory.creaVeicolo({tipo: "auto", colore: "rosso", modello: "berlina"});
// 
// Dall'esterno dell'oggetto Factory non si ha idea del modo in cui viene 
// generato l'oggetto richiesto.
// Questo fa sì che l'eventuale aggiunta della possibilità di creare un nuovo
// tipo di veicolo, ad esempio un autobus, non richieda l'utilizzo di un nuovo
// metodo, ma riutilizza lo stesso metodo creaVeicolo() con la possibilità di
// specificare un nuovo tipo:
var myAutobus = veicoloFactory.creaVeicolo({tipo: "bus", colore: "giallo"});




/******************************************************************************
 MODULE PATTERN
 ******************************************************************************/

// I moduli sono elementi essenziali dell'architettura di un'applicazione robusta
// e facilmente gestibile.
// Infatti consentono di organizzare le parti di un'applicazione in unità separate
// ma integrabili grazie ai meccanismi di esportazione e importazione, cioè
// rispettivamente dalla possibilità di rendere pubblicamente accessibile del codice
// e di accedere a codice esportato da altri moduli.
// 
// Purtroppo JS non ha un meccanismo nativo per la definizione di moduli.
// 
// Vediamo come implementare il Module Pattern in JS in maniera efficace.
// 
// Come abbiamo già detto, JS non ha un meccanismo nativo di incapsulamento
// ed information hiding, ma abbiamo visto come emularlo sfruttando la closure.
// 
// Anche nell'implementazione del Module Pattern il concetto di closure ci viene
// in aiuto
// 
// Consideriamo il seguente codice:
var modulo = (function () {
    function metodoPrivato() {
        // corpo metodo privato
    }

    return{
        metodoPubblico: function () {
            metodoPrivato();
        }
    };
})();
// 
// In esso assegniamo alla variabile modulo, che rappresenterà evidentemente il
// nostro modulo, il risultato di un'espressione IIFE(immediatly-invoked function
// expression), il cui effetto è la restituzione di un oggetto con il metodo
// metodoPubblico().
// Nell'esempio, questo metodo utilizza il metodo privato implementato
// internamente alla funzione anonima ed inaccessibile dall'esterno della
// closure.
// 
// Abbiamo di fatto implementato un modulo che esporta il metodo 
// metodoPubblico() e che potrà essere utilizzato così:
modulo.metodoPubblico();
// 
// Un modulo deve prevedere anche la possibilità di importare funzionalità
// da altri moduli.
// Si potrebbe essere tentati di utilizzare all'interno del nostro module
// direttamente variabili o funzioni globali, dal momento che JS consente di
// farlo.
// 
// Tuttavia questa non è una buona pratica dal momento che non risulterebbe
// chiara la dipendenza tra le funzionalità dell'applicazione e si perderebbe
// il vantaggio vero dei moduli, cioè la costruzione di un'applicazione come
// combinazione organizzata di unità di codice (i moduli)
// 
// L'importazione di uno o più moduli può essere implementata semplicemente
// prevedendo dei parametri nella nostra espressione IIFE:
var altroModulo = (function () {
    // corpo modulo
})();

var modulo = (function (moduloEsterno) {
    function metodoPrivato() {
        moduloEsterno.metodo();
        // corpo metodoPrivato()
    }

    return{
        metodoPubblico: function () {
            metodoPrivato();
        }
    };
})(altroModulo);
// 
// In questo modo definiamo chiaramente la dipendenza del modulo "modulo"
// dal modulo "altroModulo" ed evitiamo di creare dipendenze implicite
// difficili da individuare in applicazioni complesse




/******************************************************************************
 ADAPTER E FECADE PATTERN
 ******************************************************************************/

// ------------------- ADAPTER PATTERN -----------------------
// 
// In determinate situazioni di può avere la necessità di sostituire un oggetto
// con un altro che offre le medesime funzionalità ma ha migliori
// prestazioni o comunque lo preferiamo all'originale.
// 
// In questi casi è molto difficile che il nuovo oggetto offra gli stessi nomi
// per i metodi e le proprietà del vecchio.
// Per integrare il nuovo oggetto nella nostra applicazione dovremmo
// andare a modificare tutte le chiamate al vecchio oggetto per renderle
// compatibili con il nuovo.
// 
// In alternativa possiamo adottare l'Adapter Pattern che prevede la creazione
// di un nuovo oggetto che fa da tramite fra la vecchia e la nuova modalità
// di invocazione di metodi ed oggetti.
// 
// Supponiamo, ad esempio, che il vecchio oggetto da sostituire abbia la
// seguente struttura:
var vecchioObj = function () {
    this.metodo = function (x) {
        // ...
    };
};
// 
// e venga utilizzato nella nostra applicazione nel seguente modo: 
var obj = new vecchioObj();
obj.metodo(123);
// 
// Ora immaginiamo che il nuovo oggetto abbia questa struttura:
var nuovoObj = function () {
    this.nuovoMetodo = function (x) {
        // ...
    };
};
// 
// Per evitare di dover sostituire dappertutto la creazione del nuovo
// oggetto e la chiamata a metodo() con la chiamata a nuovoMetodo(),
// creiamo un adapter come il seguente:
var vecchioObj = function () {
    var myObj = new nuovoObj();
    this.metodo = myObj.nuovoMetodo;
};
// 
// Abbiamo ridefinito l'oggetto dismesso utilizzando al suo interno il nuovo
// oggetto.
// In particolare abbiamo mappato il vecchio metodo al nuovo in modo
// che l'utilizzo del nuovo oggetto risulti del tutto trasparente al resto
// dell'applicazione.
// 
// Naturalmente questo è un esempio semplice per spiegare i principi del
// pattern, ma in situazioni più complesse l'Adapter Pattern può darci
// una mano ad evitare di riscrivere buona parte del codice esistente.
// 
// ----------------- FECADE PATTERN --------------------------
// 
// Il pattern Fecade ha l'obiettivo di fornire un'interfaccia di alto livello per
// una funzionalità, nascondendo la complessità sottostante.
// 
// Supponiamo ad esempio che per effettuare una certa elaborazione
// bisogna coinvolgere diversi oggetti invocando determinati metodi e 
// controllando i rispettivi esiti.
// Adottando il Pattern Fecade costruiremo un metodo di semplice invocazione
// che si occupa di svolgere la parte complessa coordinando gli oggetti
// coinvolti.
// 
// Nel seguente esempio:
var cilindro = function () {

    this.calcolaArea = function (raggio, altezza) {
        var areaBase = cerchio.calcolaArea(raggio);
        var circonferenzaBase = cerchio.calcolaCirconferenza(raggio);
        var areaLaterale = rettangolo.calcolaArea(circonferenzaBase, altezza);
        return (areaBase * 2) + areaLaterale;
    };
};
// 
// Abbiamo definito il costruttore di un oggetto cilindro che prevede un metodo
// per calcolare l'area della sua superficie.
// In pratica, il metodo calcolaArea() espone un approccio semplificato al
// calcolo dell'area del solido, accollandosi il compito di fare i calcoli
// coinvolgendo gli altri oggetti, cerchio e rettangolo nel caso specifico.
// 
// In linea di massima, quindi, il Fecade Pattern propone una semplificazione
// nell'interazione con attività complesse o laboriose.




/******************************************************************************
 MVC E MVVM PATTERN
 ******************************************************************************/

// ------------------- MVC PATTERN -------------------------
// 
// Uno dei più noti pattern architetturali è MVC (Model-View-Controller) Pattern
// che si pone l'obiettivo di separare l'interfaccia utente dal modello dei dati
// in modo da ottenere un'architettura più flessibile.
// Come suggerisce il nome, questo pattern si basa su 3 componenti:
//      - Model: I dati da gestire tramite l'interfaccia utente
//      - View: L'insieme degli elementi dell'interfaccia utente che mostrano i
//                dati del Model (cose come label, caselle di testo, immagini ecc.)
//      - Controller: Il componente che fa da collante tra Model e View e definisce
//                      le funzionalità dell'applicazione.
//                      In pratica il Controller implementa la relazione tra il
//                      Model e la View.
//  
// Per fissare meglio le idee, immaginiamo di dover creare un'interfaccia Web per
// la gestione di dati anagrafici.
// I ruoli del Pattern MVC andranno così suddivisi:
//      - Model: L'oggetto che rappresenta una persona
//      - View: HTML che mostra i dati della persona e ne permette
//                l'interazione con l'utente, come ad esempio il salvataggio
//                dopo una modifica.
//      - Controller: Un oggetto che si occuperà di fornire i dati da mostrare
//                      alla View e di gestire i comandi impartiti dall'utente.
//                      
// Alla luce di queste considerazioni, possiamo scrivere il seguente codice
// HTML per l'interfaccia Web:
// <label for="txtNome"><input id="txtNome" type="text" value="" /><br />
// <label for="txtCognome"><input id="txtCognome" type="text" value="" /><br />
// <button id="btnSalva">Salva</button><br/>
// 
// Che sarà gestita dal seguente codice JS:
var model = {nome: "Mario", cognome: "Rossi"};

var view = {
    txtNome: document.getElementById("txtNome"),
    txtCognome: document.getElementById("txtCognome"),
    btnSalva: document.getElementById("btnSalva")
};

var controller = {
    init: function () {
        view.txtNome.value = model.nome;
        view.txtCognome.value = model.cognome;
        view.btnSalva.onclick = controller.salva;
    },
    salva: function () {
        model.nome = view.txtNome.value;
        model.cognome = view.txtCognome.value;
        // Invia il model al server
        invia(model);
    }
};
// 
// L'oggetto controller ha 2 metodi:
//      - init(): che inizializza la view associando a ciascun elemento grafico
//                il corrispondente valore dell'oggetto model
//      - salva(): che assegna all'oggetto model i valori prelevati dall'oggetto
//                  view ed invia il model al server tramite un'ipotetica
//                  funzione invia()
//                  
// Notiamo che la funzione init() si occupa anche di assegnare al click sul
// pulsante btnSalva l'esecuzione del metodo salva() del controller.
// 
// Questa architettura rende indipendente il Model dalla View, facendo sì che
// eventuali modifiche implementative sulla View non interferiscano sul Model
// e viceversa.
// 
// ------------------- MVVM PATTERN --------------------------
// 
// Una variante del Pattern MVC è MVVM (Model-View-ViewModel).
// Questo pattern propone un ruolo più attivo della View rispetto a 
// MVC: la View è in grado di gestire eventi, eseguire operazioni ed effettuare
// il data-binding.
// In questo contesto, quindi, alcune funzionalità del Controller vengono
// inglobate nella View, la quale si appoggia su un'estensione del Model,
// cioè il ViewModel.
// 
// Il ViewModel è quindi un Model esteso con funzionalità per la manipolazione
// dei dati e per l'interazione con la View
// 
// Aldilà delle sottigliezze concettuali, il Pattern MVC e i suoi derivati hanno
// un impatto positivo nella progettazione di interfacce utente ed il suo
// successo in ambito JS è testimoniato dalle diverse librerie disponibili che
// ne facilitano il suo utilizzo.




/******************************************************************************
 OBSERVER PATTERN
 ******************************************************************************/

// L'observer Pattern è basato su un concetto abbastanza semplice: un
// oggetto (observer) vuole essere avvisato al verificarsi di certe variazioni di
// stato di un altro oggetto (observable).
// Per far ciò si registra (subscribe) per ricevere notifiche di queste variazioni
// 
// In base alla definizione classica del pattern, l'observer deve avere la
// possibilità di annullare la registrazione se non è più interessato
// all'osservazione dell'observable.
// 
// Proviamo a spiegare il pattern con un esempio.
// 
// Supponiamo che un oggetto abbia il compito di diffondere messaggi che
// possono interessare ad altri oggetti. L'oggetto che diffonde i messaggi
// avrà il ruolo di observable mentre gli oggetti interessati ai messaggi
// rappresenteranno gli observer.
// 
// L'observable implementerà i metodi per registrare e annullare la
// registrazione ed un metodo per inserire un nuovo messaggio:
var centraleMessaggi = function () {
    this.listaObserver = [];
};

centraleMessaggi.prototype = {
    subscribe: function (callback) {
        this.listaObserver.push(callback);
    },
    unsubscribe: function (callback) {
        for (var i = 0; i > this.listaObserver.length; i++) {
            if (this.listaObserver[i] === callback) {
                this.listaObserver.splice(i, 1);
                return;
            }
        }
    },
    nuovoMessaggio: function (msg) {
        for (var i = 0; i > this.listaObserver.length; i++) {
            this.listaObserver[i](msg);
        }
    }
};
// 
// I metodi subscribe() e unsubscribe() aggiungono e tolgono rispettivamente
// dall'arrai listaObserver l'elemento passato come parametro.
// Nello specifico si tratta di una funzione da eseguire nel momento in cui
// arriva un nuovo messaggio.
// 
// La notifica dell'arrivo di un nuovo messaggio viene fatta dal metodo
// nuovoMessaggio() che si occupa di scorrere l'elenco delle funzioni presenti
// in listaObserver ed eseguirle passando il nuovo messaggio.
// 
// L'observer che vuole ricevere la notifica dell'arrivo di un nuovo messaggio
// dovrà quindi invocare il metodo subscribe() passando la funzione di
// callback da eseguire al verificarsi dell'evento:
var cm = new centraleMessaggi();

cm.subscribe(function (msg) {
    //... 
});
// 
// Un oggetto che invia un messaggio invocherà semplicemente il metodo
// nuovoMessaggio(), ignorando del tutto il fatto che ci siano altri oggetti in
// attesa di esso:
cm.nuovoMessaggio("Questo è un nuovo messaggio!");
// 
// Grazie alla flessibilità di JS ed al ruolo speciale delle funzioni, 
// possiamo sfruttare il meccanismo della callback per implementare la 
// notifica del verificarsi di un cambio di stato dell'observable.
// In altri linguaggi un observer verrebbe realizzato come un oggetto che
// implementa una specifica interfaccia e l'observable dovrebbe invocare il
// metodo previsto dall'interfaccia per notificare l'evento.
// 
// L'Observer Pattern è proprio il pattern utilizzato per l'implementazione
// della gestione degli eventi, tipica ad esempio nella interazione
// con l'interfaccia utente tramite l'HTML.




/******************************************************************************
 PROMISE PATTERN
 ( per le operazioni asincrone )
 ******************************************************************************/

// Questo pattern non è incluso tra i Design Pattern classici, ma ha acquisito
// un ruolo molto importante nella programmazione JS, in particolare
// nel supporto alla programmazione asincrona, cioè alla possibilità di
// eseguire attività in background che non interferiscono con il flusso di
// elaborazione principale.
// È ad esempio il caso di richieste dirette al server o ad altri componenti
// dell'ambiente di esecuzione della nostra applicazione.
// 
// Per elaborare il risultato di un'elaborazione asincrona viene normalmente
// sfruttato il meccanismo della callback, come mostrato nel seguente
// esempio:
getMessaggio(function (msg) {
    console.log(msg.contenuto);
});
// 
// Ipotizzando che la funzione getMessaggio() richieda in modo asincrono
// un nuovo messaggio ad un sistema di posta elettronica, il suo
// parametro rappresenta la funzione di callback da eseguire una volta
// che il messaggio è stato ottenuto.
// In questo caso l'operazione eseguita sul messaggio è la semplice
// visualizzazione del suo contenuto.
// Ma consideriamo il seguente codice:
getMessaggio(
        function (msg) {
            sendMessaggio(msg, "utente@dominio.com",
                    function () {
                        console.log("Messaggio inoltrato");
                    },
                    function (err) {
                        console.log("Si è verificato un errore: " + err.message);
                    });
        },
        function (err) {
            console.log("Si è verificato un errore: " + err.message);
        });
// 
// In questo esempio la funzione getMessaggio() prevede, oltre al primo
// parametro, anche un secondo che corrisponde alla funzione di callback
// da invocare nel caso si sia verificato un errore durante l'acquisizione del
// messaggio.
// In aggiunta, dopo aver ricevuto il messaggio, la callback lo inoltra tramite
// la funzione sendMessaggio().
// Anche questa funzione prevede sia la funzione di callback da eseguire dopo
// aver inviato con successo il messaggio che quella che gestisce la
// situazione d'errore.
// 
// Come possiamo vedere, però, il codice si è talmente complicato da
// diventare illegibile (lo diventa certamente di più all'aumentare della
// complessità delle chiamate).
// 
// Per mantenere il codice compatto e facilmente manutenibile possiamo
// adottare il Promise Pattern.
// 
// Secondo questo pattern, una promise è un oggetto che rappresenta il
// risultato pendente di un'operazione asincrona.
// Questo oggetto può essere usato per definire le attività da eseguire dopo
// che l'esecuzione asincrona sia terminata.
// 
// Seguendo questo pattern, il nostro codice potrebbe trasformarsi in questo
// modo:
var promise = getMessaggio();

promise.done(SendMessaggio).done(function () {
    console.log("Messaggio inoltrato");
});

promise.fail(function (err) {
    console.log("Si è verificato un errore: " + err.message);
});
// 
//  In sostanza sia la getMessaggio() che la sendMessaggio() restituiscono una
//  promise, cioè un oggetto che rappresenta l'esito di un'operazione
//  asincrona.
//  
//  i metodi done() e fail() di una promise consentono di specificare
//  cosa fare dopo aver ottenuto il risultato positivo o negativo
//  dell'elaborazione asincrona.
//  Questi stessi metodi restituiscono delle promise, così possiamo
//  concatenare più done() per mettere in sequenza operazioni asincrone
//  in maniera più leggibile delle callback annidate.
//  
//  Naturalmente il codice mostrato è solo un possibile esempio, in quanto la
//  sintassi dipenderà da come implementiamo il supporto per le
//  promise o quale libreria utilizziamo.
//  Un esempio di libreria che implementa le promise è 
//  Q(http://www.html.it/articoli/javascript-asincrono-le-promise-e-la-libreria-q/)
//  ma il pattern è diventato talmente popolare in JS che molte altre
//  librerie e framework, come ad esmpio JQuery(http://jquery.com/) o
//  AngularJS(http://angularjs.org/), forniscono un supporto
//  integrato