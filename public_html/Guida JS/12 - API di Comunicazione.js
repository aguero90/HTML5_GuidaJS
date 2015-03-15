
/******************************************************************************
 AJAX & JS
 ******************************************************************************/

// Una delle limitazioni delle pagine Web di qualche anno fa era l'impossibilità di
// interagire direttamente con il server ed aggiornare i contenuti senza dover
// ricaricare la pagina.
// 
// Oggi queste limitazioni sono state superate grazie a delle API standard che
// consentono una certa flessibilità nell'interazione con il server usando JS.
// In questa sezione vedremo le tre principali API di comunicazione disponibili
// per una pagina Web per interagire con il server:
//          - AJAX
//          - Server-Sent Events
//          - WebSocket





/******************************************************************************
 AJAX
 ******************************************************************************/

// La possibilità di comunicare con il server tramite codice dall'interno di una
// pagina Web è stato uno dei principali motivi della rinascita di JS.
// La tecnologia nota come AJAX ( Asynchronous Javascript And XML )
// rappresenta la rivisitazione di tecnologie esistenti sotto una nuova luce,
// con l'obiettivo di consentire di inviare e ricevere dati dal server in maniera
// asincrona e con la possibilità di aggiornare porzioni di una pagina Web.
// 
// Anche se l'acronimo fa riferimento a XML come formato di rappresentazione
// dei dati, in realtà esso non è obbligatorio: infatti una delle rappresentazioni
// più utilizzate è JSON ( JavaScript Object Notation ).
// 
// -------------- EFFETTUARE UNA RICHIESTA AJAX -------------------                    
// 
// AJAX ruota intorno all'oggetto XMLHttpRequest che rappresenta
// l'intermediario tra il codice JS eseguito sul browser e il codice eseguito sul
// server.
// Questo oggetto mette a disposizione tutti gli strumenti per cercare ed inviare
// richieste HTTP e ricevere ed analizzare le relative risposte.
// 
// Quello che segue è un semplice esempio di utilizzo di XMLHttpRequest:
var httpReq = new XMLHttpRequest();

httpReq.onreadystatechange = function () {

    if (httpReq.readyState === 4 && httpReq.status === 200) {
        document.getElementById("myDiv").innerHTML = httpReq.responseText;
    }
};

httpReq.open("GET", "/myServerPage", true);
httpReq.send();
// 
// Analizziando il codice vediamo che, dopo aver creato un'istanza del nostro
// oggetto, abbiamo associato all'evento readystatechange un gestore che ha il
// compito di catturare la risposta del server ed assegnarla come contenuto
// del <div> myDiv.
// 
// L'evento readystatechange si verifica ad ogni variazione del valore della
// proprietà readyState di XMLHttpRequest, che rappresenta lo stato di
// avanzamento della richiesta.
// I possibili valori di questa proprietà sono:
//          - 0: richiesta non inizializzata
//          - 1: connessione al server stabilita
//          - 2: ricezione degli header HTTP
//          - 3: ricevimento della risposta
//          - 4: operazione completata
//          
// Nel nostro caso, quando la risposta ricevuta dal server è completa ed il codice
// di stato HTTP inviato dal server è 200 ( valore che indica che non si sono
// verificati errori ), il contenuto inviato dal server e rappresentato dalla
// proprietà responseText viene assegnato al <div> myDiv.
// 
// Dopo aver preparato la funzione che gestirà l'evento di risposta, apriamo una
// connessione HTTP con il server tramite il metodo open().
// I parametri che passiamo a questo metodo rappresentano:
//          - "GET": il verbo HTTP
//          - "/myServerPage": l'URL della pagina o dello script server side richiesto
//          - true: un valore booleano opzionale che indica se la richiesta deve
//                   essere effettuata in maniera asincrona ( true ) o sincrona ( false )
// 
// Se non è specificato il terzo parametro viene assunto il valore true e la chiamata
// sarà asincrona.
// Infine inviamo la richiesta tramite il metodo send().
// 
// NOTA: se l'interazione con il server è sincrona, cioè il terzo parametro del metodo
//          open() è false, non dobbiamo gestire readystatechange ma possiamo gestire
//          la risposta del server subito dopo l'invocazione del metodo send().
var httpReq = new XMLHttpRequest();

httpReq.open("GET", "/myServerPage", false);
httpReq.send();

if (httpReq.status === 200) {
    document.getElementById("myDiv").innerHTML = httpReq.responseText;
}
// 
// ----------------- GESTIRE LA RISPOSTA DEL SERVER ---------------
// 
// Nell'esempio che abbiamo analizzato abbiamo ignorato la possibilità che il
// server ci segnali situazioni di errore.
// In situazioni reali dobbiamo prevedere questa eventualità  e gestire opportunamente
// i codice di stato inviati dal server.
// Un possibile modo di gestire la situazione è mostrato di seguito:
var httpReq = new XMLHttpRequest();

httpReq.onreadystatechange = function () {

    if (httpReq.readyState === 4) {
        switch (httpReq.status) {
            case 200:
                document.getElementById("myDiv").innerHTML = httpReq.responseText;
                break;
            case 404:
                alert("La pagina indicata non esiste!");
                break;
            case 500:
                alert("Si è verificato un errore sul server!");
                break;
            default:
                alert("Non è possibile elaborare la richiesta ( " + httpReq.statusText + " )");
        }
    }
};
// 
// Quando la ricezione della risposta è completa viene analizzato il codice di stato
// ed eseguite le istruzioni corrispondenti.
// Da notare l'utilizzo della proprietà statusText che rappresenta il testo associato
// al codice di stato HTTP.
// 
// Nel nostro esempio abbiamo utilizzato la proprietà responseText, che restituisce
// la risposta del server come semplice testo.
// Se il server invia una risposta in formato XML possiamo utilizzare la proprietà
// responseXML che restituisce la risposta come documento XML e a cui possiamo
// applicare i metodi per la relativa manipolazione.
// 
// Il seguente esempio mostra come assegnare al <div> myDiv il contenuto
// dell'elemento rappresentato dal tag <testo> presente nell'XML inviato dal server:
httpReq.onreadystatechange = function () {

    if (httpReq.readyState === 4) {
        switch (httpReq.status) {
            case 200:
                var xmlDoc = httpReq.responseXML;
                document.getElementById("myDiv").innerHTML = xmlDoc.getElementsByTagName("testo")[0].childNodes[0].nodeValue;
                break;

                // ...
        }
    }
};
// 
// La dicitura XML ha motivazioni stiriche: infatti anche un documento HTML è
// disponibile tramite la proprietà responseXML.
// 
// Un approccio più generale all'analisi della risposta server, soprattutto quando
// il formato dell'informazione che il server ci invia non è determinato a priori,
// prevede l'utilizzo delle proprietà responseType e response.
// La proprietà responseType indica il tipo di dato inviato dal server assumendo
// uno dei seguenti valori:
//          - text: formato testuale
//          - document: un documento XML o HTML
//          - json: un oggetto JSON risultante dal parsing di una stringa inviata al server
//          - arraybuffer: un buffer di dati binary rappresentati come ArrayBuffer
//          - blob: un oggetto Blob, assimilabile ad un file
//          
// Una volta determinato il tipo possiamo utilizzare la proprietà response per
// accedere al contenuto della risposta:
httpReq.onreadystatechange = function () {

    if (httpReq.readyState === 4) {

        switch (httpReq.status) {

            case 200:
                switch (httpReq.responseType) {
                    case "text":
                        elaboraTesto(httpReq.response);
                        break;

                    case "document":
                        elaboraDocumento(httpReq.response);
                        break;

                        // ...
                }
                break;

                // ... 
        }
    }
};
// 
// In alcune situazioni può essere necessario inviare al server degli header HTTP
// insieme alla richiesta.
// È ad esempio questo il caso quando si invia una richiesta al server utilizzando
// il metodo POST, come vedremo più avanti.
// 
// In generale, per l'impostazione di un header abbiamo a disposizione il metodo
// setRequestHeader() che prevede due parametri: il nome dell'header e il suo valore.
// 
// Il seguente esempio mostra come impostare l'header Accept per indicare al
// server in quali formati si preferisce ricevere la risposta:
httpReq.setRequestHeader("Accept", "application/json, text/html, text/*");
httpReq.open("GET", "/myServerPage", true);
httpReq.send();
// 
// Nel caso specifico abbiamo indicato che si preferiscono nell'ordine il formato
// JSON, HTML e qualsiasi formato di tipo testo.
// 
// Analogamente è possibile analizzare gli header HTTP inviati dal server con la
// risposta tramite i metodi getAllResponseHeaders() e getResponseHeader().
// Il primo restituisce una stringa con tutti gli header inviati dal server,
// mentre il secondo restituisce il valore per un header specifico.
// 
// Il seguente esempio mostra come ottenere le dimensioni in byte della risposta
// inviata dal server:
var dimensioni = httpReq.getResponseHeader("Content-Length");





/******************************************************************************
 SERVER-SENT EVENTS (EventSource)
 ******************************************************************************/

// Abbiamo visto come AJAX ci consenta di interagire con il server in maniera
// elegante ed efficiente inviando richiestr HTTP ed elaborando le relative
// risposte senza dover ricaricare l'intera pagina.
// 
// Immaginiamo uno scenario in cui un'applicazione ha bisogno di elaborare dati in
// tempo reale, quando questi sono disponibili sul server.
// Pensiamo ad esempio ad un sistema di messaggistica istantanea o al monitoraggio
// di informazioni sullo stato di avanzamento di un processo sul server o ancora
// al monitoraggio di una grandezza misurata da una board IoT.
// 
// Per gestire situazioni di questo tipo con AJAX dovremmo prevedere un meccanismo
// di polling che a intervalli regolari invii una richiesta al server per verificare l'esistenza
// di nuove informazioni.
// 
// Le informazioni potrebbero non essere disponibili a intervalli regolari, ciò implicherebbe
// una serie di chiamate al server praticamente inutili, sprecando risorse di calcolo
// sia sul client che sul server.
// 
// In questi ed in altri contesti analoghi possiamo utilizzare i Server-Sent Events,
// tecnologia nota anche come EventSource dal nome dell'oggetto JS che ne
// consente l'implementazione.
// 
// Grazie a questa tecnologia possiamo metterci in ascolto di eventi generati dal server
// e gestirli quando il server ha qualcosa da comunicarci.
// 
// il seguente è un semplice esempio di utilizzo:
var eventSource = new EventSource("/myServerPage");

eventSource.addEventListener("message", function (e) {

    var myDiv = document.getElementById("myDiv");
    myDiv.innerHTML = e.data;
});
// 
// Come possiamo vedere dal codice, abbiamo creato un'istanza di EventSource
// facendo riferimento ad una pagina sul server.
// Abbiamo quindi definito un gestore dell'evento message, in corrispondenza del quale
// visualizziamo su un <div> i dati inviati dal server e recuperati tramite la
// proprietà e.data.
// 
// Una volta definito il gestore d'evento, visualizzeremo sulla pagina le informazioni
// inviate dal server quando queste saranno disponibili, senza alcuna attesa attiva da
// parte di JS.
// 
// Diventa fondamentale a questo punto comprendere come il server deve inviare
// i dati al browser.
// Innanzitutto il Content-Type associato alla risposta da parte del server deve
// essere text/event-stream.
// Nel più semplice dei casi il contenuto è costituito da una riga che inizia con
// "data:" e termina con due fine riga consecutivi:
//          data: messaggio
//          
//          
// La presenza di due ritorni a capo consecutivi ( in pratica una riga vuota dopo la
// riga dei dati ) indica la fine del messaggio.
// Ecco un esempio del codice server-side per inviare un messaggio al client, declinato
// in PHP:
//          header('Content-Type: text/event-stream');
//          echo "data: messaggio\n\n";
//          flush();     
// 
// ... e in C# in ambito ASP.NET
//          Response.ContentType = "text/event-stream"; 
//          Response.Write("data: messaggio\n\n");
//          Response.Flush();
// 
// Per inviare messaggi multiriga possiamo scrivere più righe consecutive, ma
// tutte devono iniziare con "data:", come mostrato nell'esempio seguente:
//          data: questo è un messaggio
//          data: su più righe
//          
// 
// Il contenuto di un messaggio viene trattato come una qualsiasi stringa,
// quindi nulla vieta di inviare dati nel formato che ci è più comodo.
// Ad esempio, possiamo inviare dati in formato JSON per poi analizzarlo
// opportunamente con JS.
// Quindi se il server invia un messaggio come il seguente:
//          data: { "codice": "123",
//          data: "msg": "messaggio dal server" }
//          
// 
// Il gestore dell'evento deve effettuare il parsing del messaggio come mostrato di
// seguito:
eventSource.addEventListener("message", function (e) {

    var myDiv = document.getElementById("myDiv");
    var messaggio = JSON.parse(e.data);

    myDiv.innerHTML = messaggio.msg;
});
// 
// È possibile associare un identificatore a ciascun messaggio includendo una riga 
// che inizia con id:
//          id: 12345 
//          data: { "codice": "123",
//          data: "msg": "messaggio dal server" }
// 
// 
// La presenza di un identificatore consente al browser di tenere traccia dell'ultimo
// messaggio ricevuto e di risincronizzarsi con il server in caso di caduta della 
// connessione, in modo da ricevere eventuali messaggi inviati nel frattempo dal
// server.
// 
// Lato server è anche possibile assegnare un nome d'evento a ciascun messaggio.
// Questo consente di differenziare i messaggi ricevuti sul browser in maniera appropriata.
// 
// Se per esempio il server genere i seguenti messaggi:
//          data: { "codice": "123",
//          data: "msg": "messaggio dal server" } 
//          event: update
//          data: { "codice": "567",
//          data: "msg": "Nuovo messaggio dal server" }
//          
//          
// Il primo messaggio sarà gestito dal gestore generico che intercetta l'evento
// standard "message", come abbiamo già visto, mentre il secondo messaggio
// verrà gestito dal seguente gestore:
eventSource.addEventListener("update", function (e) {

    var myDiv = document.getElementById("myDiv");
    var messaggio = JSON.parse(e.data);

    myDiv.innerHTML = "Nuovo aggiornamento: " + messaggio.msg;
});
// 
// In pratica, la stessa sorgente di eventi può generare eventi diversi che possono
// essere gestiti automaticamente l'uno dall'altro.
// 
// Due eventi predefiniti ci informano sullo stato della connessione.
// Il primo è l'evento open che si verifica al momento dell'apertura della
// connessione con il server:
eventSource.addEventListener("open", function (e) {

    console.log("Una connessione è stata aperta");
});
// 
// L'altro evento è error che ci informa di un problema di connession o di
// comunicazione.
// Nella gestione dell'evento error possiamo avere informazione sullo stato della
// connessione analizzando la proprietà readyState dell'oggetto event:
eventSource.addEventListener("error", function (e) {

    if (e.readyState === EventSource.CLOSED) {

        console.log("La connessione è stata chiusa");
    }
});
// 
// Normalmente, se si verifica un errore di connessione il browser si riconnette
// automaticamente al server evitando di doverci occupare del monitoraggio della
// connession.
// Quando intendiamo esplicitamente interrompere la connessione possiamo
// farlo sia lato client che lato server.
// 
// Sul client possiamo semplicemente invocare il metodo close():
eventSource.close();
// 
// Lato server possiamo inviare del contenuto che non abbia text/event-stream come
// Content-Type oppure restituitr un codice HTTP diverso da 200 OK.
// 
// Indipendentemente da chi interrompe la connessione, il browser non ritenterà
// la riconnessione automatica.





/******************************************************************************
 WEB SOCKET
 ******************************************************************************/

// Con WebSocket, si identifica una tecnologia che consente di creare una connessione
// persistente tra client e server tramite cui scambiarsi dati in maniera
// efficiente.
// 
// I Server-Sent Events consentono di avere informazioni dal server quando queste
// sono effettivamente disponibili, evitando di dover ricorrere a meccanismi di
// polling o altre soluzioni che possono rappresentare un inutile spreco di risorse
// come la CPU e la banda.
// 
// Pur rappresentando un'ottima soluzione nella maggior parte dei casi, i 
// Server-Sent Events hanno alcune limitazioni che non li rendono ideonei per
// l'utilizzo in determinati contesti.
// 
// In particolare, essi non implementano una comunicazione bidirezionale, cioè
// i Server-Sent Events mettono a disposizione un canale con cui il server
// comunica con il client, ma non consentono al client di inviare informazioni
// verso il server.
// Inoltre, essi si fondano sempre sul protocollo HTTP che non è proprio adatto in
// contesti in cui è necessaria una comunicazione bidirezionale efficiente, come ad
// esempio un gioco online o una chat in cui interagiscono più utenti e la
// comunicazione in tempo reale deve essere la più efficiente possibile.
// 
// Dal punto di vista di JS, le API per utilizzare WebSocket non sono molto 
// diverse da quelle per utilizzare i Server-Sent Events.
// Anche in questo caso abbiamo un costruttore specifico che ci consente di
// creare un oggetto tramite cou gestire la comunicazione client-server:
var ws = new WebSocket("ws://www.html.it/myServerPage");
// 
// L'URL della pagina che passiamo al costruttore indica il protocollo "ws".
// Infatti, requisito fondamentale per poter utilizzare i WebSocket è che il server
// supporti questo protocollo.
// Esiste anche la versione sicura di WebSocket che prevede il prefisso "wss".
// 
// Una volta creato l'oggetto WebSocket possiamo gestire gli eventi di apertura della
// connessione, di ricezione di un messaggio dal server, di intercettazione di un 
// errore di comunicazione e di chiusura della connessione come mostrato di seguito:
ws.addEventListener("open", function () {
    console.log("È stata aperta una connessione");
});

ws.addEventListener("message", function (e) {
    console.log("Il server ha inviato il messaggio: " + e.data);
});

ws.addEventListener("error", function (error) {
    console.log("Si è verificato il seguente errore: " + error);
});

ws.addEventListener("close", function () {
    console.log("È stata chiusa la connessione");
});
// 
// Come possiamo vedere, fin qui le API per gestire i WebSocket sono del tutto
// identiche a quelle per gestire i Server-Sent Events.
// I WebSocket però prevedono la possibilità di inviare dati al server tramite il
// metodo send():
ws.send("messaggio dal client");
// 
// L'invio di messaggi al server non è limitato a semplici stringhe.
// È possibile inviare dati binari codificati, ad esempio, in un ArrayBuffer.
// Il seguente esempio mostra come inviare un'immagine al server:
var myCanvas = document.getElementById("myCanvas");
var context = myCanvas.getContext("2d");

var img = context.getImageData(0, 0, 400, 320);
var binaryData = new Uint8Array(img.data.length);

for (var i = 0; i < img.data.length; i++) {
    binaryData[i] = img.data[i];
}

ws.send(binaryData.buffer);
// 
// Anche in ricezione possiamo ricevere dati binari.
// In questo caso è opportuno impostare il tipo di dati binari per interpretare
// correttamente i dati ricevuti.
// Ad esempio, nel seguente codice viene indicato che i dati ricevuti devono
// essere interpretati come ArrayBuffer:
ws.binaryType = "arrayBuffer";
ws.addEventListener("message", function (e) {
    console.log("sono stati ricevuti " + e.data.byteLength + " byte");
});
// 
// Infine, possiamo chiudere una connessione WebSocket tramite il metodo close():
ws.close();
// 
// Come abbiamo accennato, dal punto di vista di JS non ci sono grosse differenze
// nella gestione dei WebSocket.
// L'API prevista per interagire con questo protocollo è abbastanza simile a quella
// vista per i Server-Sent Events.
// 
// Tuttavia lato server il supporto dei WebSocket varia in base alla specifica
// piattaforma.
// Sono ad esempio disponibili librerie come SuperWebSocket e Fleck per ASP.NET,
// o PHP-Websocket e Ratchet per PHP, Java WebSocket per Java o WebSocket-Node
// per Node.js, per citarne qualcuna.
// 
// Uno dei problemi principali dell'adozione dei WebSocket è da un lato il mancato
// supporto dei browser più datati, dall'altro il potenziale blococ di questo 
// protocollo da parte di proxy non adeguatamente configurati.
// 
// Per aggirarne il problema è opportuno utilizzare librerie che supportano i 
// WebSocket ma allo stesso tempo forniscano un meccanismo di callback che possa
// consentire l'utilizzo di tecnologie alternative, come ad esempio Comet, anche se
// meno performanti.
// Esempi di tali librerie sono SignalR per l'ambiente ASP.NET e socket.io per Node.js.
