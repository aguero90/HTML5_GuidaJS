
/******************************************************************************
 BROWSER API
 ******************************************************************************/
// Abbiamo analizzato le caratteristiche essenziali di JS come linguaggio di
// programmazione, senza tener conto degli ambiti in cui lo utilizziamo.
// Tipicamente i nostri progetti sono eseguiti all'intento di sistemi ospite
// con i quali interagire grazie a insiemi di oggetti che espongono
// interfacce standard, meglio note come API.
// 
// Se l'ambito principale e più noto è quello Web, in cui il sistema ospite
// è il browser, è vero che possiamo utilizzare JS anche in ambiti
// diversi e che possiamo interfacciarci con ciascuno grazie alle 
// relative API.
// Per farci un'idea basta riflettere sul ruolo che ha questo linguaggio
// nel mobile e nei servizi lato server.
// 
// In questa sezione esploreremo le principali API che consentono a
// JS di interagire con l'ambiente che lo ospita,
// iniziando dal Web.




/******************************************************************************
 LE BROWSER API
 ******************************************************************************/

// Come abbiamo già accennato, possiamo inserire i nostri script all'interno
// delle pagine HTML, per gestirne elementi e modificarli anche in base
// a sollecitazioni che vengono fatte dall'utente.
// Tutto ciò all'interno del browser.
// 
// L'interazione con il browser viene realizzata tramite un'API che, grazie
// ad alcuni oggetti, consente di acquisire informazioni sull'ambiente di
// esecuzione, di usufruire di funzionalità e di effettuare specifiche
// impostazioni.
// 
// Anche se non esiste uno standard ufficiale (solo con HTML5 si stanno
// definendo delle specifiche comuni), la maggior parte dei browser
// espone un'interfaccia comune gestibile via JS.
// Esaminiamone gli oggetti principali.





/******************************************************************************
 L'OGGETTO WINDOW
 ******************************************************************************/

// L'oggetto principale per l'interazione con il browser è window:
// esso rappresenta una finestra che contiene un documento HTML.
// Quindi ciascuna finestra o tab ha associato un proprio oggetto
// window e, allo stesso modo, a ciascun frame definito in una
// pagina HTML corrisponde un oggetto window.
// 
// Questo oggetto, oltre ad identificare l'elemento visivo del browser,
// rappresenta anche il contesto di esecuzione globale per JS, cioè
// l'oggetto associato alla parola chiave this quando non esiste un
// contesto specifico.
// 
// Qualsiasi variabile o funzione definita nel contesto globale diventa di
// fatto proprietà o metodo dell'oggetto window.
// Quindi, ad esempio, date le seguenti definizioni:
var x = 123;

function somma(a, b) {
    return a + b;
}
// possiamo accedere ad esse, nell'esecuzione del codice all'interno di un
// browser, sia direttamente che come proprietà dell'oggetto window
// o dell'oggetto this.
console.log(x);
console.log(somma(3, 5));

console.log(window.x);
console.log(window.somma(3, 5));

console.log(this.x);
console.log(this.somma(3, 5));
// 
// per lo stesso principio, qualsiasi proprietà o metodo dell'oggetto
// window è accessibile anche senza fare un riferimento esplicito
// all'oggetto.
// Quindi window.metodo() è equivalente alla semplice chiamata
// metodo().
// 
// ------------ GESTIRE LO SCHERMO DEL DEVICE -------------
// 
// Alcune proprietà dell'oggetto window ci consentono di ottenere
// informazioni su diversi aspetti della configurazione corrente del
// browser.
// 
// DIMENSIONI DELLA FINESTRA
// 
// Ad esempio, le proprietà innerHeight e innerWidth ci consentono di
// ottenere le dimensioni interne dell'area occupata dalla finestra
// espresse in pixel
console.log(innerWidth + "x" + innerHeight);
// 
// INFORMAZIONI SULLO SCHERMO DEL DEVICE
// 
// La proprietà screen dell'oggetto window ci fornisce informazioni su
// alcune caratteristiche dello schermo del dispositivo corrente.
// Possiamo ad esempio conoscere le dimensioni in pixel utilizzando le
// proprietà width e height
console.log(window.screen.width + "x" + window.screen.height);
// 
// Il risultato di questa istruzione saranno le dimensioni dello schermo.
// Se invece vogliamo sapere le dimensioni effettiveamente disponibili per
// la visualizzazione di una finestra a tutto schermo, cioè escludendo 
// l'eventuale taskbar fissa, possiamo far ricorso a availWidth e
// availHeight:
console.log(window.screen.availWidth + "x" + window.screen.availHeight);
// 
// Altra informazione che possiamo ottenere dall'oggetto screen è la
// profondità del colore.
// Essa è accessibile tramite le proprietà colorDepth e pixelDepth.
// Entrambe le proprietà restituiscono in genere lo stesso valore che
// rappresenta il numero di bit utilizzati per rappresentare il colore
// di un pixel.
// La distinzione tra le due proprietà è legata a problematiche di
// compatibilità con vecchi sistemi Unix.
// 
// -------------------- FRAMES ---------------------------
// 
// La proprietà frames è un array di oggetti che rappresentano i
// frame contenuti nella pagina corrente.
// Il seguente codice visualizza gli indirizzi dei frame contenuti
// nella pagina corrente:
for (var i = 0; i < frames.length; i++) {
    console.log(frames[i].location.href);
}
// 
// Dal momento che con la presenza dei frame si viene a creare una
// gerarchia di oggetti window, abbiamo la possibilità di navigare in
// questa gerarchia tramite le proprietà
//              - parent: rappresenta l'oggetto genitore della finstra o
//                          frame corrente
//              - top: indica la finestra radice della gerarchia
//              
// 
// ------ CREARE FINESTRE POP-UP E FINESTRE DI DIALOGO -----
// 
// Alcuni metodi dell'oggetto window sono talmente noti da essere
// erroneamente considerati funzioni predefinite di JS da parte di diversi
// sviluppatori.
// 
// Tra questi c'è alert(), un metodo che visualizza una finestra modale
// con un messaggio ed un pulsante OK:
window.alert("Questo è un messaggio");
// 
// La grafica e la posizione della finestra di dialogo dipendono dal
// browser.
// 
// Il metodo confirm(), invece, visualizza una finestra modale con un
// messaggio e due pulsanti: uno per la conferma e uno per 
// l'annullamento.
// Il metodo restituisce un valore booleano che rappresenta la
// conferma da parte dell'utente (true) o l'annullamento (false):
if (window.confirm("Confermi l'eliminazione?")) {
    // ...
}
// 
// Altro metodo di window relativo all'interazione con l'utente è
// prompt().
// Esso richiede l'inserimento di un valore che viene catturato e
// restituito dal metodo:
var nome = window.prompt("Inserisci il tuo nome");

if (nome !== null) {
    // ...
}
// 
// APRIRE TAB O FINESTRE POP-UP
// 
// Il metodo open() apre una nuova finestra o tab.
// Tramite i parametri, tutti opzionali, previsti dal metodo è
// possibile indicare l'URL della pagina da caricare ed eventuali
// impostazioni di visualizzazione della finestra.
// Ad esempio, il seguente codice apre una finestra con l'home page di
// HTML.it:
window.open("http://www.html.it", "myWindow");
// 
// Il secondo parametro indica il nome della finestra, cioè il nome che
// viene assegnato all'oggetto window creato.
// È prevista la possibilità di specificare come nome i seguenti valori 
// predefinit che determinano la modalità di visualizzazione della finestra
// rispetto alla gerarchia di oggetti window eventualmente esistente:
//      - _blank: apre una nuova finestra
//      - _parent: sostituisce la finestra o il frame genitore della
//                   finestra corrente
//      - _self: sostituisce il contenuto della finestra o frame corrente
//      - _top: sostituisce il contenuto della radice della gerarchia di
//               oggetti window
//               
// È anche possibile specificare un terzo parametro del metodo open()
// che contiene una stringa di opzioni separate da virgola, come quella
// mostrata nel seguente esempio:
window.open("http://www.html.it", "myWindow", "menubar = no, toolbar = no, status = no, height = 400, width = 600, top = 150, left = 150");
// 
// Le opzioni specificate indicano che la nuova finestra non deve avere la
// barra dei menù (menubar = no), nè la barra degli strumenti 
// (toolbar = no), nè la barra di stato (status = no); vengono poi indicate
// le dimensioni in pixel (height = 400, width = 600) e la
// posizione (top = 150, left = 150) sullo schermo.
// 
// Per chiudere una finestra, l'oggetto window mette a disposizione il
// metodo close().
// 
// -------------- GESTIRE DEI TIMER -------------------------
// ------------- setInterval e setTimeout -----------------------
// 
// Un gruppo di metodi dell'oggetto Window che ci permettono di gestire
// attività nel tempo sfruttando i timer del client sono:
//      - setInterval(): esegue una funzione periodicamente in base ad un
//                        intervallo di tempo specificato
//      - setTimeout(): esegue una funzione dopo un certo numero di
//                         millisecondi
//      - clearInterval(): Azzera un timer creato con setInterval()
//      - clearTimeout(): Azzera un timer creato con setTimeout()
// 
// Facciamo qualche esempio per chiarire l'esempio di questi metodi:
var myTimer = setTimeout(function () {
    console.log("test");
}, 5000);
// 
// Il metodo setTimeout crea un timer che eseguirà la funzione
// specificata come primo parametro dopo 5000 millisecondi.
// Il valore restituito dalla funzione è l'identificatore del timer
// appena creato.
// 
// Quello che otterremo è la visualizzazione della stringa "test" sulla
// console dopo 5 secondi.
// 
// Se intendiamo fermare l'esecuzione della funzione prima che venga
// eseguita dobbiamo utilizzare il metodo clearTimeout():
clearTimeout(myTimer);
// 
// L'esecuzione programmata di una funzione con setTimeout() avviene
// una sola volta.
// 
// per eseguire una funzione ad intervalli regolari facciamo ricorso a
// setInterval():
var x = 0;
var myTimer = setInterval(function () {
    x++;
    console.log(x);
}, 1000);
// 
// Queste istruzioni visualizzeranno in sequenza i numeri interi ad
// intervalli di un secondo uno dall'altro.
// Per fermare il timer utilizzeremo clearInterval():
clearInterval(myTimer);
// 
// -------------- CONTROLLO DELLA NAVIGAZIONE ------------
// 
// L'oggetto window del browser ci fornisce anche alcuni meccanismi per
// gestire e controllare la navigazione dell'utente:
//      - history: per tenere traccia della navigazione
//      - location: per gestire l'URL corrente
//      
// HISTORY
// 
// La proprietà history è un oggetto che tiene traccia delle pagine
// visitate dall'utente all'interno di una finestra durante una sessione
// di navigazione.
// Grazie a questo oggetto possiamo conoscere il numero di pagine
// visitate dall'utente accedendo alla proprietà length e possiamo andare
// avanti e indietro nell'elenco delle pagine visitate sfruttando
// rispettivamente i metodi forward() e back().
// 
// Ad esempio, la seguente istruzione carica la pagina precedentemente
// visitata dall'utente:
window.history.back();
// 
// Per posizionarci direttamente su una specifica pagina nella storia
// delle pagine visitate dall'utente possiamo utilizzare il metodo go().
// Nel seguente esempio carichiamo la terzultima pagina visitata
// dall'utente:
window.history.go(-3);
// 
// ne consegue che le seguenti istruzioni sono equivalenti
window.history.back();
window.history.go(-1);
// 
// LOCATION
// 
// Per controllare l'URL del documento caricato nella finestra corrente
// utilizziamo la proprietà location.
// Questa proprietà è un oggetto che ci permette di selezionare gli
// elementi che compongono l'URL del documento, consentendoci di
// ricavare:
//      - il nome del server
//      - la porta HTTP eventualmente utilizzata
//      - i parametri eventualmente passati e altre informazioni
//      
// Per spiegare le varie informazioni che possiamo recuperare tramite le
// proprietà dell'oggetto location, prendiamo in considerazione il seguente
// URL:
// http://www.html.it:8080/articoli/articolo.php?id=123#paragrafo
// 
// Ed ecco i risultati ottenuti accedendo alle diverse proprietà dell'oggetto
// location quando la pagina caricata è quella corrispondente all'URL
// specificato:
// 
window.location.href; // http://www.html.it:8080/articoli/articolo.php?id=123#paragrafo
window.location.protocol; // http:
window.location.hostname; // www.html.it
window.location.host; // www.html.it:8080
window.location.origin; // http://www.html.it:8080
windiw.location.port; // 8080
window.location.pathname; // /articoli/articolo.php
window.location.search; // ?id=123
window.location.hash; // #paragrafo
// 
// Esaminiamo ora un esempio di utilizzo pratico dell'oggetto location:
function getParameters() {

    var paramData = [];
    var parameters = {};
    var param;

    if (window.location.search.length > 0) {

        paramData = window.location.search.split("?")[1].split("&");

        for (var i = 0; i < paramData.length; i++) {

            param = paramData[i].split("=");
            parameters[param[0]] = param[1];
        }
    }

    return parameters;
}
// 
// In questo esempio abbiamo definito una funzione che restituisce i
// parametri presenti nell'URL della pagina corrente.
// La funzione accede alla proprietà search dell'oggetto location e
// genera un oggetto con proprietà corrispondenti ai nomi dei
// parametri.
// In corrispondenza di un URL analogo al seguente:
// http://www.html.it/articoli/articolo.php?id=123&x=567
// 
// otterremo quindi un oggetto come questo:
// {id: 123, x: 567}
// 
// L'accesso alle proprietà dell'ggetto location non è però in sola lettura.
// Possiamo impostare dinamicamente le varie parti dell'URL ed ottenere
// di conseguenza la navigazione ad un altro URL.
// Ad sempio, la seguente istruzione cambia la pagina corrente:
window.location.href = "http://www.html.it";
// 
// Possiamo ottenere lo stesso effetto dell'istruzione precedente
// utilizzando il metodo assign() dell'oggetto location:
window.location.assign("http://www.html.it");
// 
// L'oggetto location prevede anche il metodo reload() per ricaricare 
// òa pagina corrente.
// Normalmente la pagina viene caricata dalla cache, anche se ciò
// dipende dalle impostazioni del browser.
// Se vogliamo forzare il caricamento dal server possiamo passare
// il valore true come parametro:
window.location.reload(true);
// 
// Il metodo replace(), infine, consente di caricare un nuovo documento
// al posto di quello attualmente presente nella finestra corrente:
window.location.replace("http://www.html.it");
// 
// A differenza di assign(), però, questo metodo sostituisce anche il
// vecchio documento predente nella history.
// In altre parole, utilizzando replace() non avremo più traccia del
// vecchio documento nella history del browser.
// 
// -------------- INFORMAZIONI SUL BROWSER --------------
// ------------------ L'oggetto navigator --------------------
// 
// Per ottenere informazioni sul browser corrente e su alcune sue
// impostazioni possiamo utilizzare la proprietà navigator di window.
// Questa proprietà fornisce informazioni che dovrebbero consentirci
// di identificare il browser ed il sistema operativo su cui è in esecuzione,
// ma non sempre le informazioni sono così utili ed accurate.
// Ad sempio, alcune proprietà dell'oggetto navigator, come
// appCodeName e product, restituiscono dei valori costanti 
// indipendentementa dal browser: Mozilla nel primo caso e Gecko nel
// secondo.
// Il motivo è legato a storiche questioni di compatibilità.
// 
// Anche la proprietà appName, che dovrebbe restituire il nome del
// browser, restituisce valori non sempre attinenti.
// Ad esempio, Firefox, Chrome e Safari restituiscono la stringa
// "Netscape", mentre Internet Explorer restituisce la stringa
// "Microsoft Internet Explorer" e Opera restituisce la stringa
// "Opera".
// 
// La proprietà appVersion restituisce una stringa che identifica la
// versione del browser, ma anche in questo caso non c'è uniformità 
// nella risposta fornita dai vari browser.
// Ad esempio Firefox restituisce "5.0 (Windows)"
// Chrome restituisce "5.0 (Windows NT 6.0) AppleWebkit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.116 Safari/537.36"
// 
// Quindi anche in questo caso il risultato non è standardizzato.
// 
// IDENTIFICARE IL BROWSER:
//      USER AGENT Vs FEATURE DETECTION
//      
// Utilizzare queste informazioni per identificare il browser corrente
// richiede una serie di accorgimenti che però non sempre
// garantiscono il risultato atteso.
// 
// Un approccio molto utilizzato per identificare il browser corrente
// è basato sull'analisi della user agent string, cioè del contenuto
// dell'intestazione HTTP inviata dal browser al server.
// Questa stringa è recuperabile tramite la proprietà userAgent 
// dell'oggetto navigator.
// 
// Ecco un esempio di codice che individua il browser corrente in base
// all'analisi della proprietà userAgent:
function getBrowserName() {

    var browserNames = ["Chrome", "Firefox", "MSIE", "Opera", "Safari"];

    for (var i in browserNames) {

        if (window.navigator.userAgent.indexOf(browserNames[i]) > -1)
            break;
    }

    return browserNames[i];
}
// 
// L'identificazione del browser corrente spesso viene utilizzata per
// stabilire se una data funzionalità viene supportata o meno.
// Considerato il numero crescente di browser, a cui contribuiscono
// anche le versioni mobile, ed il loro frequente aggiornamento, questa
// tecnica non è più affidabile.
// 
// FEATURE DETECTION
// 
// L'approccio migliore consiste nell'assicurarsi direttamente se una
// caratteristica è supportata o meno, ad sempio verificando se
// l'oggetto o il metodo che implementa la funzionalità è diverso da
// undefined.
// 
// L'uso dell'oggetto navigator può comunque risultare utile per
// stabilire se l'utilizzo dei cookie è abilitato, se il browser è 
// online e qual è la lingua preferita dall'utente.
// A ciascuna caratteristica corrisponde una proprietà:
console.log(window.navigator.cookieEnabled);
console.log(window.navigator.onLine);
console.log(window.navigator.language);
// 
// Mentre le proprietà coockieEnabled e online restituiscono un valore
// booleano, la proprietà language restituisce il codice della lingua
// impostata dall'utente come preferita.
// 

