
/******************************************************************************
 STORAGE API
 ******************************************************************************/

// Tra le limitazioni storiche di JS c'era l'impossibilità di memorizzare i
// dati in maniera persistente.
// Gli unici 2 approcci disponibili sfruttavano i cookie per la persistenza
// locale e il server per la persistenza remota.
// Ma mentre il primo apporccio ha delle limitazioni sia in quantità di dati
// memorizzabili che in flessibilità di accesso, il secondo prevede la presenza
// di un backend lato server che si occupi dell'effettiva persistenza e
// presuppone di essere online.
// Le cose poi sono cambiate, anche grazie all'avvento di HTML5.
//
// JS dispone di una serie di API che permettono di gestire dati in maniera
// più flessibile e senza intermediari.
// In questa sezione esploreremo quindi le soluzioni disponibili per gestire
// la persistenza dei dati con JS.




/******************************************************************************
 WEB STORAGE
 ******************************************************************************/

// Il Web Storage può essere considerato l'evoluzione dell'approccio basato
// sui cookie, mediante il quale un'applicazione JS può memorizzare dati
// localmente sul browser.
// A differenza dei cookie, il Web Storage mette a disposizione maggior
// spazio disco, generalmente intorno ai 5MB, e le informazioni non vengono
// mai trasferite al server.
//
// Tuttavia, come i cookie, viene mantenuta la "same origin policy" in base
// alla quale soltanto gli script che provengono dallo stesso dominio possono
// accedere allo stesso Web Storage.
//
// La specifica del Web Storage prevede due oggetti per la persistenza dei
// dati:
//          - localStorage: consente la memorizzazione permanente dei dati.
//          - sessionStorage: prevede l'eliminazione dei dati alla fine della
//                            sessione, che avviene quando viene chiuso il
//                            browser o la finestra in cui è eseguita
//                            l'applicazione.
//
// A parte questa differenza sulla durata della persistenza, i due oggetti
// vengono utilizzati allo stesso modo consentendo di creare coppie di
// chiave-valore come mostrato nel seguente esempio:
if (typeof (Storage) != "undefined") {
    localStorage.utente = "Mario Rossi";
}
//
// La prima cosa che abbiamo fatto è stata controllare il supporto del
// Web Storage da parte del browser corrente, verificando che sia definito
// l'oggetto Storage, da cui derivano localStorage e sessionStorage.
// Quindi abbiamo semplicemente assegnato alla proprietà utente una stringa,
// creando implicitamente la proprietà se questa non esisteva già, come per
// un normale oggetto JS.
//
// A differenza però delle proprietà di un normale oggetto JS, i valori
// assegnabili ad una proprietà dello storage devono essere di tipo stringa.
// Quindi se abbiamo intenzione di memorizzare dati complessi come oggetti o
// array, dobbiamo prima serializzarli, ad esempio in JSON:
localStorage.utente = JSON.stringify({nome: "Mario", cognome: "Rossi"});
//
// Anche il recupero dei dati memorizzati nello storage è altrettanto semplice.
// È sufficiente accedere alla proprietà a cui siamo interessati, come nel
// seguente esempio.
var utente = JSON.parse(localStorage.utente);

document.getElementByID("myDiv").innerHTML = "Ciao " + utente.nome + " " + utente.cognome;
//
// Come per un qualsiasi oggetto JS, possiamo considerare lo storage come un
// array associativo ed accedere ai suoi elementi tramite chiave:
localStorage["pigreco"] = "3.14";
var pigreco = localStorage["pigreco"];
//
// È anche prevista la possibilità di gestire gli elementi dello storage
// tramite i metodi getItem() e setItem(), come mostrato nel seguente esempio:
localStorage.setItem("pigreco", "3.14");
var pigreco = localStorage.getItem("pigreco");
//
// ----------------------- L'EVENTO STORAGE -----------------------------------
//
// L'evento "storage", come gestire la persistenza in modo asincrono.
//
// Anche se l'utilizzo delle diverse notazioni ha sempre lo stesso effetto
// sullo storage, l'uso di getItem() e setItem() ha la particolarità di
// poter generare l'evento "storage" che ci consente di tracciare le
// modifiche fatte allo storage gestendolo secondo l'approccio standard:
window.addEventListener("storage", function (event) {
    console.log("La pagina " + event.url +
            " ha modificato la chiave " + event.key +
            " sostituendo il valore " + event.oldValue +
            " con il valore " + event.newValue);
});
//
// L'oggetto event passato al gestore dell'evento mette a disposizione
// dettagli come l'URL della pagina che ha effettuato la modifica (url),
// la chiave dello storage che è stata modificata (key), il suo vecchio
// valore (oldValue) e il nuovo valore assegnato (newValue).
//
// Sottolineiamo che l'evento si verifica soltanto se c'è un'effettiva
// modifica allo storage.
// Ad esempio, se ad una chiave viene assegnato il suo stesso valore,
// l'evento storage non viene generato.
//
// Oltre a getItem() e setItem() sono anche previsti i metodi:
//          - removeItem(): consente di rimuovere una chiave dallo storage
//          - clear(): elimina tutte le chiavi
//
// Anche l'esecuzione di questi metodi generano l'evento storage.
// In sintesi, la Web Storage API offre un approccio semplice e lineare nella
// gestione dei dati locali, superando i limiti storici dei coockie.
// La persistenza dei dati non è però strutturata e le stringhe
// rappresentano l'unico tipo di dati consentito.
// Inoltre, in presenza di grandi quantità di dati si può assistere ad un
// calo delle prestazioni sia in lettura che in scrittura.
//
// Rappresentano comunque una buona soluzione nella maggior parte delle
// situazioni in cui l'accesso a dati persistenti non rappresenta l'attività
// principali dell'applicazione





/******************************************************************************
 INDEXED DATABASE API
 ******************************************************************************/

// Un approccio più strutturato ed efficiente nella gestione di grandi quantità
// di dati non può prescindere da una qualche forma di database.
// Ed in effetti un tentativo di introdurre il supporto di un motore di
// database locale accessibile da JS è stato fatto con le specifiche di
// Web SQL Database.
// Purtroppo già nel mondo SQL non esiste una vera omogeneità nell'aderenza a
// quello che dovrebbe essere uno standard affermato, come dimostra la
// moltitudine di dialetti SQL esistenti.
// Proporre un supporto standard all'SQL nel mondo Web non ha fatto che
// complicare le cose per cui il progetto di definire delle specifiche accettate
// da tutti è presto naufragato e di fatto Web SQL Database non è più
// supportato dal W3C.
//
// Al suo posto è stato proposto Indexed Database API, noto anche come
// IndexedDB.
//
// IndexedDB non è un database relazionale ma un Object Store.
// Comprendere la differenza è fondamentale per poter utilizzare al meglio
// IndexedDB.
// Infatti, mentre un database relazionale organizza i dati in tabelle composte
// da colonne e righe e prevede un linguaggio specializzato per gestire i dati
// ( tipicamente SQL ), un Object Store consente direttamente la persistenza
// di oggetti e prevede la definizione di indici per un loro recupero
// efficiente.
//
// Tra le altre caratteristiche di IndexedDB segnialiamo la natura transazionale
// delle operazioni e la disponibilità dia di API sincrone che asincrone.
//
// Vediamo come interagire con un database tramite IndexedDB.
// Al solito, la verifica del supporto IndexedDB da parte del browser corrente
// va fatta semplicemente verificando che l'oggetto omonimo sia disponibile:
if (!window.indexedDB) {
    console.log("Il tuo browser non supporta IndexedDB");
}
//
// ---------------------------- OPEN ------------------------------------------
//
// Possiamo quindi effettuare l'apertura di un database tramite il metodo
// open(), come mostrato di seguito:
var request = window.indexedDB.open("dati", 1);
//
// Abbiamo specificato come parametri del metodo open() il nome del database
// e il numero di versione.
// Come vedremo più avanti, quest'ultimo è fondamentale nella creazione e nella
// modifica della struttura di un Object Store.
//
// Il metodo Open() opera in maniera asincrona restituendo un oggetto di tipo
// IDBRequest sul quale possiamo definire dei gestori di evento.
// In particolare possiamo gestire i seguenti eventi:
//              - success: l'apertura del database è andata a buon fine
//              - error: c'è un problema nell'apertura del database
//              - upgradeneeded: il database non esiste o la sua versione è
//                               differente da quella specificata
//
// La gestione di questi avviene assegnando ad alcune proprietà dell'oggetto
// di tipo IDBRequest il relativo gestore.
// Ad esempio, possiamo assegnare la seguente funzione da eseguire in
// corrispondenza dell'apertura con successo di un database:
request.onsuccess = function (event) {

    db = event.target.result;
    // ....
};
//
// Notiamo come l'oggetto corrispondente al database appena aperto è ricavato
// da una roprietà dell'oggetto event passata dal gestore del sistema.
//
// Per gestire situazioni d'errore assegnamo un'apposita funzione alla
// proprietà onerror:
request.onerror = function (event) {

    console.log("Si è verificato un errore nell'apertura del DB");
};
//
//---------------------- CREARE UN OBJECT STORE -------------------------------
//
// Nella creazione di un nuovo database o nella modifica di un database
// esistente possiamo gestire l'evento upgradeneeded per creare, ad esempio,
// il nostro Object Store:
request.onupgradeneeded = function (event) {

    var db = event.target.result;

    if (db.objectStoreNames.contains("utenti")) {
        db.deleteObjectStore("utenti");
    }

    var store = db.createObjectStore("utenti", {keyPath: "id"});
};
//
// Come possiamo vedere, per prima cosa recuperiamo il database da modificare
// o appena creato.
// Quindi verifichiamo se il nostro Object Store, cioè il contenitore di
// oggetti, esiste già.
// Nel nostro esempio se esiste un Object Store dal nome "utenti" lo eliminiamo
// dal database;
//
// Infine creiamo l'Object Store tramite il metodo createObjectStore() a cui
// passiamo il nome dello store e un oggetto che ci consente di definire delle
// importanti proprietà opzionali.
// Nel caso specifico abbiamo definito la proprietà "id" come chiave univoca
// dello store.
// Questo vuol dire che tutti gli oggetti che saranno memorizzati nello store
// dovranno avere questa proprietà e che non possono esserci più oggetti nello
// store con lo stesso valore per questa proprietà.
//
// La gestione dell'evento upgradeneeded è l'unica maniera per modificare la
// struttura di un database, aggiungendo o togliendo Object Store o
// definendo indici.
// Pertanto, se vogliamo modificare il nostro database dobbiamo cambiare la
// sua versione in modo da scatenare questo evento.
//
// NOTA: Se il database che intendiamo aprire tramite open() esiste ed è della
//       stessa versione indicata, l'evento upgradeneeded non verrà generato.
//
// ----------------------- PARTICOLARITA' open() ------------------------------
//
// Prima di proseguire nell'esplorazione delle API di IndexedDB, evidenziamo una
// particolarità del metodo open().
// La sua esecuzione non è immediata, ma avviene all'uscita dell'esecuzione
// della funzione in cui viene invocata.
// Questo è il motivo per cui possiamo invocare questo metodo ed assegnare
// subito dopo i gestori di evento all'oggetto restituito.
//
// In genere lo schema seguito nella gestione di un database IndexedDB è quello
// mostrato di seguito:
var dati = {};
dati.version = 1;

dati.open = function () {

    var request = window.indexedDB.open("dati", this.version);

    request.onupgradedneeded = function (event) {
        var db = event.target.result;
        if (db.objectStoreNames.contains("utenti")) {
            db.deleteObjectStore("utenti");
        }
    };

    request.onsuccess = function (event) {
        dati.db = event.target.result;
    };

    request.onerror = function (event) {
        console.log("Si è verificato un errore nell'apertura del DB");
    };
};
//
// Nell'esempio, la variabile dati rappresenta l nostro database e il suo
// metodo open() si occupa di aprirlo o crearlo definendo i relativi eventi.
//
// ------------------------- ADD e PUT ----------------------------------------
//
// Vediamo ora come aggiungere un oggetto all'Object Store "utenti":
dati.addUtente = function (utente) {

    var db = dati.db;
    var trans = db.transaction(["utenti"], "readwrite");
    var store = trans.objectStore("utenti");

    var request = store.add({
        id: utente.id,
        nome: utente.nome,
        cognome: utente.cognome
    });

    request.onsuccess = function (e) {
        console.log("Utente inserito correttamente!");
    };

    request.onerror = function (e) {
        console.log("Si è verificato un errore nell'inserimento dell'utente");
    };
};
//
// Come possiamo vedere, creiamo prima di tutto una transazione in lettura e
// scrittura sull'Object Store "utenti".
// Ogni operazione su un Object Store deve essere eseguita all'intetno di una
// transazione.
// Da questa otteniamo un riferimento all'Object Store di cui invochiamo il
// metodo add() specificando l'oggetto da aggiungere.
// I gestori di evento permettono di gestire opportunamente l'esito
// dell'operazione.
//
// Per la modifica di un oggetto esistente l'approccio è del tutto analogo.
// Al posto del metodo add() utilizziamo il metodo put():
dati.updateUtente = function (utente) {

    var db = dati.db;
    var trans = db.transaction(["utenti"], "readwrite");
    var store = trans.objectStore("utenti");

    var request = store.put({
        id: utente.id,
        nome: utente.nome,
        cognome: utente.cognome
    });

    request.onsuccess = function (e) {
        console.log("Utente inserito correttamente!");
    };

    request.onerror = function (e) {
        console.log("Si è verificato un errore nell'inserimento di un utente!");
    };
};
//
// In realtà avremmo potuto utilizzare il metodo put() anche per inserire un
// nuovo utente, quindi al posto di add().
// Infatti, la differenza sostanziale tra i due metodi consiste nel fatto che
// add() richiede che non sia presente sullo store un altro oggetto con la
// stessa chiave, mentre put() non pone questo vincolo: se esiste un oggetto lo
// aggiorna altrimenti ne inserisce uno nuovo.
//
// -------------------------- GET ---------------------------------------------
//
// Per recuperare l'utente in base al suo ID possiamo scrivere il seguente
// codice:
dati.getUtente = function (idUtente) {

    var db = dati.db;
    var trans = db.transaction(["utenti"], "readonly");
    var store = trans.objectStore("utenti");
    var request = store.get(idUtente);

    request.onsuccess = function (e) {
        console.log("Utente trovato: " + e.target.result.nome + " " + e.target.result.cognome);
    };

    request.onerror = function (e) {
        console.log("Si è verificato un errore nella ricerca dell'utente");
    };
};
//
// Sempre partendo da una transazione sull'Object Store "utenti" abbiamo
// utilizzato il metodo get() dello store passando il valore della chiave in
// base alla quale recuperare l'utente.
//
// -------------------------- DELETE ------------------------------------------
//
// L'eliminazione di un oggetto dallo store è altrettanto semplice:
dati.deleteUtente = function (idUtente) {

    var db = dati.db;
    var trans = db.transaction(["utenti"], "readwrite");
    var store = trans.objectStore("utenti");
    var request = store.delete(idUtente);

    request.onsuccess = function (e) {
        console.log("Utente eliminato");
    };

    request.onerror = function (e) {
        console.log("Si è verificato un errore durante l'eliminazione di un utente");
    };
};
//
// In questo caso utilizziamo il metodo delete() passando la chiave di
// identificazione dell'oggetto da eliminare.
//
// ----------------- SFRUTTARE GLI INDICI DEGLI IndexedDB ---------------------
//
// Come il nome stesso suggerisce, IndexedDB consente di creare indici per
// recuperare gli oggetti presenti nello store in maniera efficiente.
// Mentre negli esempi che abbiamo visto finora abbiamo sfruttato la chiave
// primaria per recuperare gli oggetti dallo store, se vogliamo recuperare un
// oggetto utilizzando il valore di un'altra proprietà dobbiamo definire e
// utilizzare un indice.
//
// Supponiamo ad esempio di voler effettuare una ricerca nello store "utenti"
// tramite il "cognome".
// Come prima cosa, il database deve avere un indice definito su questa
// proprietà.
// Lo possiamo creare come mostrato di seguito:
var store = db.createObjectStore("utenti", {keyPath: "id"});
store.createIndex("indiceCognome", "cognome", {unique: false});
//
// Dopo aver creato lo store, utilizziamo il suo metodo createIndex() passando
// come primo parametro il nome dell'indice, come secondo parametro il nome
// della proprietà da indicizzare e come terzo parametreo un oggetto che
// rappresenta le opzioni di creazione dell'indice.
// Nel nostro caso abbiamo specificato che l'indice non è univoco cioè
// possono esistere nello store utenti con lo stesso cognome.
//
// Per utilizzare un indice nelle ricerche procediamo nel seguente modo:
dati.getUtentePerCognome = function (cognome) {

    var db = dati.db;
    var trans = db.transaction(["utenti"], "readonly");
    var store = trans.objectStore("utenti");
    var indice = store.index("indiceCognome");
    var request = indice.get(cognome);

    request.onsuccess = function (e) {
        console.log("Utente trovato: " + e.target.result.nome + " " + e.target.result.cognome);
    };

    request.onerror = function (e) {
        console.log("Si è verificato un errore nella ricerca dell'utente");
    };
};
//
// Come possiamo vedere, dopo aver recuperato l'indice dello store tramite il
// metodo index(), invochiamo il suo metodo get() specidicando come
// parametro il cognome dell'utente.
//
// Il resto della gestione e dell'esito della ricerca avviene come al solito.
//
//
//
//
//
//
//



