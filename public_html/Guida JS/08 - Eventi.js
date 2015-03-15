
/******************************************************************************
 EVENTI DEL BROWSER ( ... E DEI DEVICE ) 
 ******************************************************************************/

// Una delle parti più importanti delle API che riguarda il Browser ed il DOM
// è quella riguardante la gestione degli eventi.
// 
// Gli eventi ci permettono di gestire il comportamento delle nostre applicazioni
// al verificarsi di una certa interazione dell'utente.
// Oppure di rispondere alle sollecitazioni che vengono da altre applicazioni o dal
// sistema stesso.
// 
// Per intercettare gli eventi che vengono scatenati, utilizziamo il meccanismo
// degli handler (o dei listener).
// Possiamo definire come handeler una funzione di callback che viene associata
// ad un certo evento.
// 
// I meccanismi per associare eventi e handler sono sostanzialmente 3:
//      - Via codice, sfruttando addEventListener()
//      - All'interno del markup HTML, sfruttando speciali attributi dei tag
//      - Nel codice JS, associando specifiche proprietà degli elementi del DOM





/******************************************************************************
 addEventListener()  ( associare callback agli eventi )
 ******************************************************************************/

// La funzione addEventListener() è un metodo esposto dagli elementi del DOM e
// rappresenta la più comune tra le modalità usate per associare un evento
// al rispettivo handeler.
// La sua sintassi è molto semplice:
elemento.addEventListener(evento, callback, [useCapture]);
// 
//      - evento: è una stringa che definisce l'evento che vogliamo gestire
//      - callback: la funzione che sarà chiamata per gestire l'evento
//      - useCapture: Opzionale.
//                       Serve per forzare la priorità di gestione di un certo evento.
//                       Questo nei casi in cui:
//                          1) abbiamo associato diversi handler allo stesso evento
//                              (allora il primo diventa quello con useCapture = true)
//                           2) serve per dare priorità all'handler posizionato su un certo
//                               livello dell'albero
//                               (normalmente gli handler sono eseguiti e propagati dalle
//                               foglie verso la radice del DOM)
//                        Per default è impostato a false
//                        
// Facciamo un esempio molto semplice.
// Supponiamo di avere il classico link:
//      <a href="#" id="test">test</a>
// 
// Nella fase di descrizione dell'elemento (detto "strato di presentazione") non facciamo
// nessuna ipotesi sul comportamento associato a questo link.
// Possiamo invece definire una funzione di callback che gestisce l'evento click sul
// link e associarla all'evento direttamente da codice (a livello di logica applicativa):
function clickOnTest(event) {

    console.log("Click su test");
}

var test = document.getElementById("test");

test.addEventListener("click", clickOnTest);
// 
// Naturalmente avremmo ottenuto lo stesso risultato utilizzando una funzione
// anonima:

test.addEventListener("click", function(event) {

    console.log("Click su test");
});
// 
// Ma non sempre è conveniente
// 
// Come si vede negli esempi, la nostra funzione di callback prende sempe un 
// parametro che abbiamo chiamato (non a caso) event.
// Si tratta di un oggetto che contiene alcune informazioni circa l'evento che
// è stato scatenato: cose come il bottone del mouse che è stato premuto o il
// tasto della tastiera che abbiamo schiacciato.
// 
// Rispetto alle altre modalità addEventListener() permette una gestione più
// raffinata degli handeler, consente di definirne e gestirne più di uno per lo
// stesso evento e funziona con qualunque elemento del DOM (non solo con gli
// elementi HTML)
// 
// Altro vantaggio sta nel fatto che possiamo rimuovere l'associazione tra
// evento e handler utilizzando la funzione removeEventListener() che prende
// gli stessi parametri di addEventListener() ma ha la funzione opposta.
// Ad esempio, per smettere di gestire il click sull'elemento test, che avevamo
// inserito prima, scriveremo:
test.removeEventListener("click", ClickOnTest);





/******************************************************************************
 HANDLER ASSOCIATI NELL'HTML
 ******************************************************************************/

// Possiamo anche inserire la chiamata alla nostra funzione di callback direttamente
// nella definizione di un tag HTML, utilizzando alcuni speciali attributi.
// Ecco un esempio:
//      <a href="#" onclick="alert("ciao")">Link</a>
// 
// In questo caso l'evento onclick è un attributo che prende come valore la
// chiamata alla relativa callback.
// 
// Questa modalità è sempre meno utilizzata e poco consigliabile perché favorisce
// troppo l'accoppiamento tra layout della pagina (HTML) e logica
// applicativa (JS).
// In un'ottica di buona manutenzione del software è sempre meglio tentare
// di tenere separate le due cose.
// 
// In questa modalità, quando la funzione di allback viene chiamata, questa 
// acquisisce lo scope dell'elemento del DOM a cui è associata.
// Il risultato è che l'oggetto this assume il valore dell'elemento.
// Ecco un esempio:
//      <a href="#" onclick="alert(this.innerHTML)">Ciao</a>
// 
// Cliccando sul link otterremo una finestra che riporterà "Ciao",
// cioè il contenuto dell'elemento!





/******************************************************************************
 HAHNDLER ASSOCIATI TRAMITE PROPRIETA' DEGLI ELEMENTI
 ******************************************************************************/

// Possiamo associare gli handler degli eventi direttamente alle relative
// proprietà degli oggetti del DOM, con una sintassi simile a questa:
Oggetto.evento = handler;
// 
// Per esempio:
document.images[0].onload = alert("immagine caricata");
// 
// Anche questa modalità è sempre meno utilizzata poichè risulta scomoda.


/******************************************************************************
 EVENTI DI "INTERFACCIA": load, scroll e resize
 ******************************************************************************/

// Iniziamo dicendo che alcuni eventi sono originati non dall'interazione diretta
// dell'utente con una pagina HTML ma dal browser stesso.
// GLi eventi di questo tipo, detti anche eventi di interfaccia, segnalano il
// verificarsi di una situazione derivante dalla gestione interna della pagina
// HTML e dell'interfaccia grafica da parte del browser.
// 
// Spesso questi eventi sono l'effetto di un evento originato dall'utente.
// Un classico esempio è il click su un link che causa lo scaricamento della
// pagina corrente e il caricamento di una nuova pagina.
// 
// Anche questi eventi per così dire "indiretti" sono intercettabili e gestibili
// via JS





/******************************************************************************
 LOAD ( avvenuto caricamento )
 ******************************************************************************/

//  L'evento load si verifica quando un oggetto viene caricato dal browser.
//  L'oggetto in questione può essere la pagina stessa o uno dei vari componenti
//  che prevedono una richiesta al server, come ad esempio un'immagine,
//  uno script, un foglio di stile, un frame ecc.
//  
//  In generale, per gestire l'evento faremo riferimento all'attributo onload del
//  corrispondente elemento HTML o alla proprietà onload dell'oggetto del DOM
//  oppure sruttiamo il metodo addEventListener() specificando il nome di
//  evento load.
//  Il seguente è un esempio di gestione dell'evento su un'immagine:
//          <img id="img" src="miaImmagine.jpg" onload="avvisa" />
function avvisa() {
    alert("Immagine caricata!");
}
// 
// In alternativa possiamo gestirlo con gli altri 2 approcci come mostrato dal
// seguente codice:
var img = document.getElementById("img");
img.onload = avvisa;
// 
// oppure
img.addEventListener("load", avvisa);
// 
// L'utilizzo più comune che si fa di questo evento riguarda però il
// caricamento della pagina.
// Questa circostanza si verifica quando tutti gli elementi che la compongono
// (testo, immagini, stili e quant'altro) sono stati caricati ed è stato generato 
// il corrispondente albero del DOM.
// Questo è l'evento ideale per effettuare inizializzazioni ed impostazioni prima
// di visualizzare il tutto all'utente.
// 
// Per intercettare e gestire l'evento di caricamento della pagina possiamo
// ricorrere all'attributo onload del <body>:
//      <body onload="inizialiazza()">
// 
// Oppure alla proprietà onload dell'oggetto window:
window.onload = inizializza;
// 
// Una domanda che può sorgere a questo punto riguarda il motivo per cui
// abbiamo messo in corrispondenza l'attributo onload dell'elemento <body>
// con l'omonima proprietà dell'oggetto window.
// Potrebbe sembrare più corretto metterlo in corrispondenza con la
// proprietà onload dell'oggetto document.
// 
// In realtà l'evento load associato alla proprietà onload dell'oggetto document
// evidenzia una situazione diversa da quella del caricamento dell'intera
// pagina.
// La proprietà document.onload consente di gestire l'evento load del
// documento, cioè la generazione del DOM, a prescindere dal caricamento
// delle altre risorse che compongono la pagina come immagini, script ecc.
// 
// L'evento associato a document.load, quindi, si verifica prima dell'evento
// associato a window.load, ma gestire un evento o l'altro per effettuare
// le nostre inizializzazioni dipende da cosa vogliamo inizializzare.
// 
// Ad esempio, se tra le notre inizializzazioni prevediamo di accedere ad un elemento
// contenuto in un frame, non possiamo sfruttare document.onload, poichè al
// verificarsi del corridpondente evento non è garantito che la pagina
// associata al frame sia stata caricata.
// In questo caso dobbiamo ricorrere a window.onload.
// 
// L'evento load della pagina è un punto ideale per l'inizializzazione e perciò è
// molto utilizzato da diverse librerie per rendere disponibili le loro funzionalità.
// Se quindi nella nostra pagina facciamo uso di altre librerie, usando direttamente
// la proprietà o l'attributo onload per effettuare le nostre inizializzazioni rischiamo
// di sovrascrivere eventuali inizializzazioni di queste librerie.
// 
// Questo è probabilmente il caso più emblematico in cui si rivela utile il metodo
// addEventListener(), che aggiunge le nostre inizializzazioni a quelle delle altre
// librerie senza sovrascriverle:
window.addEventListener("load", inizializza);





/******************************************************************************
 UNLOAD
 ******************************************************************************/

// Diametralmente opposto all'evento load è l'evento unload, che indica 
// quando la pagina viene scaricata perchè l'utente sta navigando verso
// un'altra pagina o sta chiudendo la finestra corrente.
// A differenza dell'evento load, però, questo evento si verifica soltanto sulla
// pagina e va quindi intercettato tramite l'attributo onunload dell'elemtno
// <body> o la proprietà window.onunload.





/******************************************************************************
 SCROLL e RESIZE
 ******************************************************************************/

// Altri eventi che possiamo classificare come eventi legati al browser sono
// l'evento scroll e l'evento resize.
// Il primo si verifica quando il contenuto di un elemento scorre per consentirne
// la visualizzazione, mentre il secondo si verifica quando cambiano le dimensioni
// di un elemento.
// 
// In entrambi i casi l'elemento in questione può essere la pagina o un qualsiasi
// elemento del DOM.
// 
// Ad esempio, il seguente codice visualizza sulla console del browser lo
// spostamento orizzontale e verticale in pixel del contenuto della pagina
// corrente:
window.onscroll = function() {
    console.log(window.pageXOffset + "," + window.pageYOffset);
};
// 
// Il seguente codica, invece, cattura il ridimensionamento della finestra del browser:
window.onresize = function() {
    console.log(window.innerWidth + "," + window.innerHeight);
};





/******************************************************************************
 MouseEvent ( L'INTERAZIONE CON IL MOUSE )
 ******************************************************************************/

// Tra gli eventi maggiormente utilizzati nello sviluppo di un'interfaccia Web
// ci sono quelli relativi al mouse.
// Oltre al click, che abbiamo già visto, possiamo intercettare l'evento
// doppio click, come mostrato nel seguente esempio:
// 
//          <p id="paragrafo">Clicca su questo paragrafo</p> 
//
var myParagrafo = document.getElementById("paragrafo");

myParagrafo.ondblclick = function(e) {
    e.target.innerHTML = "Hai fatto doppio click sul paragrafo!";
};
// 
// L'esempio mostra un paragrafo in cui il testo cambia quando l'utente fa un
// doppio click su di esso.
// 
// Oltre al click abbiamo la possibilità di intercettare eventi più specifici delle
// diverse fasi di interazione con il mouse.
// Possiamo ad esempio individuare il momento in cui l'utente preme sul
// pulsante del mouse ( mousedown ) e quando lo lascia ( mouseup ),
// quando il cursore viene spostato ( mousemove ) e quando entra ( mouseover )
// o esce ( mouseout ) dall'area occupata da un elemento HTML.





/******************************************************************************
 MOUSEOVER & MOUSEOUT
 ******************************************************************************/

// Questo ci offre la possibilità di creare effetti grafici interessanti.
// Ad esempio, il seguente codice mostra come cambiare l'aspetto grafico
// di un paragrafo quando si passa su di esso con il cursore del mouse:
// 
//          <style>
//              .overClass {font-weight: bold; color: red;}
//              .outClass {font-weight: normal; color: black;}
//          </style>
// 
//          <p id="paragrafo">Passa il mouse su questo paragrafo</p>
//
var myParagrafo = document.getElementById("paragrafo");

myParagrafo.onmouseover = function(e) {
    e.target.className = "overClass";
};
myParagrafo.onmouseout = function(e) {
    e.target.className = "outClass";
};
// 
// Gli eventi mouseover e mouseout possono presentare qualche effetto
// indesiderato quando vengono gestiti su elementi che al loro interno hanno
// altri elementi.
// Consideriamo infatti la seguente gerarchia di elementi:
// 
//          <div id="mainDiv">
//              <img id="img" src="miaImmagine.jpg" />
//              <div id="otherDiv">
//                  <p>Questo è un paragarafo</p>
//              </div>
//          </div>
// 
// GLi eventi mouseover e mouseout si verificano ogni volta che entriamo ed
// usciamo su ciascuno degli elementi discendenti del <div> mainDiv.
// Anche se gli elementi discendenti non hanno un loro gestore di evento,
// nella fase di bubbling l'evento viene passato al gestore dell'elemento genitore.
// Questo vuol dire che il gestore di questi eventi associato a mainDiv verrà
// eseguito diverse volte al muoversi del mouse anche se il cursore del mouse
// non è uscito dall'area di mainDiv.
// Ciò potrebbe non corrispondere al comportamento desiderato.





/******************************************************************************
 MOUSEENTER & MOUSELEAVE
 ******************************************************************************/

// Se vogliamo concentrarci soltanto sugli eventi di entrata ed uscita 
// sull'area occupata dall'elemento padre dobbiamo utilizzare due eventi
// alternativi: mouseenter e mouseleave.
// 
// Il loro utilizzo è sostanzialmente analogo a mouseover e mouseout, ma a 
// differenza di questi ultimi non vengono coinvolti gli elementi discendenti.
// In termini più strettamente tecnici, questi sue eventi non prevedono la
// fase di bubbling e pertanto l'evento non si propaga verso gli elementi
// genitori.





/******************************************************************************
 L'OGGETTO MouseEvent
 ******************************************************************************/

// Nella gestione degli eventi del mouse il browser crea un oggetto 
// MouseEvent specifico che fornisce informazioni aggiuntive rispetto all'oggetto
// Event standard.
// 
// Ad esempio, possiamo individuare quale pulsante è stato premuto sfruttando
// la proprietà button, che può assumere uno dei seguenti valori:
//      - 0: pulsante sinistro
//      - 1: pulsante centrale
//      - 2 pulsante destro
//      
// Il seguente è un esempio di script che intercetta il pulsante premuto:
var myParagrafo = document.getElementById("paragrafo");

myParagrafo.onmousedown = function(e) {
    switch (e.button) {
        case 0:
            console.log("Hai cliccato con il pulsante sinistro");
            break;
        case 1:
            console.log("Hai cliccato con il pulsante centrale");
            break;
        case 2:
            console.log("Hai cliccato con il pulsante destro");
            break;
    }
};
// 
// Se abbiamo bisogno di intercettare la pressione di più pulsanti
// contemporaneamente dobbiamo allora ricorrere alla proprietà buttons,
// i cui valori sono di seguito riepilogati:
//      - 1 ( 001 in binario ): pulsante sinistro
//      - 2 ( 010 in binario ): pulsante centrale
//      - 4 ( 100 in binario ): pulsante destro
//      
// La combinazione di più pulsanti genera un valore corrispondente
// all'operazione binaria OR ( | ) dei valori dei singoli pulsanti.
// Se vengono, ad esempio, premuti contemporaneamente il pulsante sinistro
// e quello destro otterremmo come valore il risultato dell'operazione
// 1 | 4, cioè 5.
// La scelta dei valori di base è stata fatta in modo da semplificare il calcolo
// del valore risultante corrispondente in pratica alla somma dei valori
// dei singoli pulsanti.





/******************************************************************************
 POSIZIONE DEL CURSORE
 ******************************************************************************/

// Una delle informazioni più interessanti è la posizione del cursore.
// Anche in questo caso abbiamo a disposizione delle proprietà dell'oggetto
// MouseEvent che ci consentono di individuare le coordinate del cursore del
// mouse:
//      - clientX e clientY: coordinate rispetto alla finestra
//      - pageX e pageY: coordinate rispetto alla pagina
//      
// Mentre la prima coppia di coordinate identifica la posizione del cursore
// all'interno della finestra, quindi indipendentemente dall'eventuale scrolling
// della pagina, la seconda coppia individua la posizione del cursore
// all'interno della pagina.
// 
// per fare un esempio, il seguente codice fornisce entrambi i tipi di
// coordinate del cursore man mano che lo spostiamo sulla pagina:
document.onmousemove = function(e) {
    console.log("Posizione rispetto alla fnestra: " + e.clientX + "," + e.clientY);
    console.log("Posizione rispetto alla paina: " + e.pageX + "," + e.pageY);
};




/******************************************************************************
 relatedTarget
 ******************************************************************************/

// Un'altra proprietà che può risultare utile soprattutto nella gestione degli
// eventi mouseover, mouseenter e mouseleave è relatedTarget.
// Mentre, come già sappiamo, la proprietà target individua l'oggetto 
// destinatario dell'evento, relatedTarget individua l'oggetto da cui proviene
// o versi cui va il cursore del mouse nel suo spostamento.
// Ad esempio, nel caso di mouseleave questa proprietà indica su quale elemento
// si è spostato il cursore del mouse dopo aver lasciato l'area dell'elemento
// corrente:
myParagrafo.onmouseleave = function(e) {
    console.log("Il cursore si trova ora sull'elemento " + e.relatedtarget.id);
};




/******************************************************************************
 CONTEXTMENU
 ******************************************************************************/

// Un evento che può risultare utile per personalizzare il comportamento
// standard del browser è contextmenu.
// Questo evento si verifica quando l'utente clicca con il tasto destro del
// mouse sulla pagina o su un elemento.
// Normalmente il browser visualizza il menù contestuale predefinito, 
// ma sfruttando contextmenu abbiamo la possibilità di visualizzare un nostro
// menù o di effettuare altre azioni.
// 
// Il seguente esempio mostra come associare un menù presonalizzato da
// visualizzare in corrispondenza del punto in cui è stato premuto il tasto
// destro del mouse:
myParagrafo.oncontextmenu = function(e) {
    var myMenu = document.getElementById("menu");

    myMenu.style.position = "absolute";
    myMenu.style.left = e.pageX + "px";
    myMenu.style.top = e.pageY + "px";
    myMenu.style.visibility = "visible";

    e.preventDefault();
};
// 
// Dal codice dell'esempio vediamo come impostare le coordinate del punto in
// cui verrà visualizzato il menu e come inibire il comportamento
// predefinito del browser.





/******************************************************************************
 DRAG & DROP
 ******************************************************************************/

// L'attività di trascinamento di elementi grafici, più comunemente nota come
// drag & drop, genera una serie di eventi legati al mouse che è possibile
// gestire e personalizzare.
// 
// Prima di analizzare questi eventi definiamo alcuni termini per gli oggetti
// coinvolti in questa operazione:
//      - source: è l'elemento che dà origine al trascinamento
//      - data payload: si tratta dell'oggetto o i dati che intendiamo spostare
//      - target: è l'elemento che può accettare l'oggetto o i dati che stiamo
//                  trascinando
//                  
// È importante sottolineare che lo spostamento di un oggetto grafico può
// non essere fine a se stesso, ma che può sottintendere lo spostamento di
// dati o l'attivazione di elaborazioni che dipendono dalla nostra specifica
// applicazione.
// Da ciò l'importanza della definizione di un data payload rilevante per
// l'operazione che vogliammo associare al drag & drop





/******************************************************************************
 RENDERE UN ELEMENTO TRASCINABILE ( DRAGGABLE )
 ******************************************************************************/

// Per consentire il trascinamento di un elemento, l'elemento source, è
// necessario innanzitutto renderlo draggable.
// Ciò ouò essere fatto impostando l'attributo o la corrispondente proprietà
// draggable a true:
//          
//          <img id="miaImmagine" src="images/img.jpg" draggable="true" />
//          
// Qualsiasi elemento può essere reso trascinabile e addirittura diversi browser
// prevedono che alcuni elementi, come ad esempio immagini e link, siano
// trascinabili di default.
// A questo punto occorre intercettare e gestire gli eventi propri del drag & drop





/******************************************************************************
 dragstart, L'EVENTO DI INIZIO DEL DRAG & DROP
 ******************************************************************************/

// L'evento dragstart indica il verificarsi di un'azione di trascinamento.
// In corrispondenza di questo evento possiamo definire quale informazione
// associare al trascinamento:
var img = document.getElementById("miaImmagine");

img.ondragstart = function(e) {
    e.dataTransfer.setData("text", e.target.id);
};
// 
// come possiamo vedere dall'esempio, abbiamo utilizzato la proprietà
// dataTransfer dell'evento per creare il data payload da affidare al
// trascinamento.
// 
// Il metodo setData() consente di specificare l'informazione da trasportare
// verso l'elemento target del drag & drop.
// Questo metodo prevede due parametri: il primo indica il tipo di dato mentre
// il secondo indica l'informazione vera e propria.
// Nel nostro caso abbiamo specificato ce vogliamo trasferire un'informazione di
// tipo testo e che l'informazione trasferita è l'identificatore dell'elemento che
// stiamo trascinando.





/******************************************************************************
 IMPOSTARE UN ELEMENTO TARGET
 ******************************************************************************/

// L'abilitazione di un elemento a fungere da elemento target dell'operazione
// di drag & drop viene effettuata assegnando un gestore all'evento dragover,
// come mostrato nel seguente esempio:
var divTarget = document.getElementById("divTarget");

divTarget.ondragover = function(e) {
    e.target.className = "overClass";
    e.preventDefault;
};
// 
// In questo caso evidenziamo l'elemento target associandogli una classe CSS
// e disabilitiamo il comportamento predefinito del browser.
// Quest'ultima operazione è fondamentale per l'abilitazione dell'elemento target,
// altrimenti il browser non consentirebbe il rilascio ( drop ) dell'elemento
// trascinato





/******************************************************************************
 DROP, L'EVENTO PER IL RILASCIO
 ******************************************************************************/

// Infine gestiamo l'ultima fase dell'operazione gestendo l'evento drop:
divtarget.ondrop = function(e) {
    var data = e.dataTransfer.getData("text");
    e.targer.appendChild(document.getElementById(data));
};
// 
// In questa fase recuperiamo il data payload tramite il metodo getData()
// della proprietà dataTransfer dell'evento ed appendiamo l'elemento
// corrispondente all'interno del nostro <div> target.





/******************************************************************************
 EVENTI AVANZATI PER IL DRAG & DROP
 ******************************************************************************/

// In certi casi il browser ha dei comportamenti predefiniti in corrispondenza
// dell'evento drop.
// Ad esempio, quando l'elemento target è un link, il comportamento predefinito
// è l'apertura della pagina corrispondente.
// In qeusti casi è opportuno inibire il comportamento predefinito eseguendo il
// metodo preventDefault() dell'evento.
// 
// Quelle cha abbiamo illustrato sono le operazioni di base per gestire il
// drag & drop di un elemento.
// È possibile personalizzare maggiormente l'operazione creando ad esempio
// effetti grafici sfruttando altre funzionalità che abbiamo a disposizione.
// Ad esempio, sono previsti i seguenti 3 eventi che ci consentono di avere
// una granularità maggiore nel controllo dell'operazione:
//          - dragenter: si verifica quando l'elemento trascinato entra nell'area
//                          occupata dall'elemento target
//          - dragleave: si verifica quando l'elemento trascinato lascia l'area
//                         occupata dall'elemento target
//          - dragend: si verifica quando l'elemento trascinato è stato rilasciato
//          
// In corrispondenza di questi eventi possiamo modificare l'aspetto grafico degli
// elementi coinvolti nell'operazione per dare un riscontro visivo all'utente.
// Ad esempio possiamo evidenziare l'elemento su cui è possibile fare il drop
// quando entriamo nell'area occupata dall'elemento target e ristabilire il suo
// aspetto originale quando ne usciamo.
// 
// Possiamo ulteriormente personalizzare il feedback grafico da dare
// all'utente durante il drag & drop sfruttando anche la proprietà
// dataTransfer dell'evento.
// Ad esempio, possiamo fornire indicazioni al browser sul tipo di operazione
// associata al drag & drop tramite la proprietà dataTransfer.dropEffect, 
// in modo tale che venga visualizzata un'icona adeguata durante il
// trascinamento.
// Oppure possiamo specificare noi un'icona personalizzata tramite il metodo
// dataTransfer.setDragImage().





/******************************************************************************
 EVENTI DELLA TASTIERA
 ******************************************************************************/

// L'inserimento di caratteri tramite la tastiera genera alcuni eventi che può
// essere utile gestire in diversi contesti applicativi: dalla validazione dell'input
// alla sua trasformazione o all'intercettazione di combinazione di tasti.
// 
// Gli eventi associati alla tastiera sono soltanto 3:
//          - keydown: si verifica quando inizia la pressione su un tasto
//          - keypress: si verifica al completamento della pressione sul tasto
//          - keyup si verifica quando il tasto viene rilasciato
//          
// Una distinzione fondamentale tra gli eventi keydown e keypress sta nel fatto
// che mentre il primo si verifica in corrispondenza della pressione su qualsiasi
// tasto, il secondo si verifica soltanto in corrispondenza della pressione su tasti
// alfanumerici.
// In altre parole, quando premiamo, ad esempio, sui tasti CTRL o SHIFT si
// verifica l'evento keydown ma non l'evento keypress.





/******************************************************************************
 L'OGGETTO EVENTO
 ******************************************************************************/

// Nella gestione degli eventi di tastiera giocano un ruolo fondamentale alcune
// proprietà dell'oggetto evento.
// In particolare, le seguenti proprietà ci consentono di individuare il valore
// dell'input ricevuto dalla tastiera:
//          - keyCode: indica il codice di scansione del tasto, cioè il codice
//                        associato al tasto di una tastiera indipendentemente
//                        dall'eventuale carattere associato
//          - charCode: indica il codice ASCII associato al tasto;
//                         questa proprietà viene valorizzata soltanto in
//                         corrispondenza dell'evento keypress
//          - which: restituisce un valore numerico che identifica il tasto
//                     premuto sia che si tratti di un tasto alfanumerico o no;
//                     il valore restituito è una combinazione delle proprietà
//                     keyCode e charCode
//          - shiftKey: valore booleano che indica se è stato premuto il tasto
//                        SHIFT
//          - ctrlKey: valore booleano che indica se è stato premuto il tasto
//                       CTRL
//          - altKey: valore booleano che indica se è stato premuto il tasto
//                       ALT
//          - metaKey: valore booleano che indica se è stato premuto il tasto
//                        meta ( tasto Windows sui sistemi operativi Microsoft o
//                        tasto Command su Mac )
//
// Vediamo qualche esempio di utilizzo di questi eventi per gestire l'input da
// tastiera.
// 
// Il seguente codice limita a dieci il numero di caratteri ammessi in una
// casella di testo:
var txtInput = document.getElementById("txtInput");

txtInput.onkeypress = function(e) {
    if (e.target.value.length >= 10)
        e.preventDefault();
};
// 
// Abbiamo utilizzato il metodo preventDefault() per inibire il comportamento
// predefinito del browser dopo il decimo carattere, cioè l'aggiunta del nuovo
// carattere alla stringa già visualizzata sulla casella di testo.
// 
// Il seguente esempio fa in modo da consentire esclusivamente l'immissione
// di caratteri numerici:
txtInput.onkeypress = function(e) {
    var charCode = e.which;
    if (charCode < 48 || charCode > 57)
        e.preventDefault();
};
// 
// In questo caso abbiamo individuato il codice del carattere tramite la proprietà
// which dell'evento ed inibito l'immissione di caratteri non numerici.
// 
// Possiamo anche modificare il valore dell'input, ad esempio convertirlo
// in maiuscolo, come mostrato nel seguente esempio:
txtInput.onkeypress = function(e) {
    var charCode = e.which;
    var char;
    if (charCode != 0) {
        char = String.fromCharCode(charCode);
        e.target.value = e.target.value + char.toUpperCase();
        e.preventDefault();
    }
};
// 
// Nell'esempio convertiamo il codice del carattere nella corrispondente stringa
// tramite il metodo fromCharCode() e appendiamo la sua versione in
// maiuscolo al valore della casella di testo.
// L'immancabile chiamata a preventDefault() evita la visualizzazione del
// carattere minuscolo sulla casella.





/******************************************************************************
 COMBINAZIONE DI TASTI
 ******************************************************************************/

// Possiamo associare ad un elemento combinazioni di tasti che hanno un
// comportamento speciale.
// Ad esempio, possiamo fare in modo che alla combinazione di tasti CTRL+D
// corrisponda la rimozione del testo inserito in una casella di testo, come
// mostrato dal seguente esempio:
txtInput.onkeydown = function(e) {
    if (e.keyCode == 68 && e.ctrlKey) {
        e.target.value = "";
        e.preventDefault();
    }
};
// 
// In questo caso sfruttiamo l'evento keydown, dal momento che la combinazione
// di tasti non produce un carattere.
// Se il tasto premuto è quello corrispondente alla lettera D e
// contemporaneamente è stato premuto CTRL, allora eliminiamo il contenuto
// della casella di testo.
// Ancora una volta è importante inibire l'eventuale comportamento 
// predefinito del browser, dal momento che diversi browser associano alla
// combinazione di tasti CTRL+D l'inserimento della paggina corrente nei 
// bookmark.





/******************************************************************************
 MUTATION OBSERVER E Object.observe()
 ******************************************************************************/

// Gli eventi del DOM ci consentono di scrivere codice che reagisce all'interazione
// con le pagine HTML.
// Abbiamo visto come alcuni eventi non sono generati direttamente dall'utente
// ma sono una conseguenza di altri eventi.
// Un tipico esempio è il caricamento di una nuova pagina che segnala il fatto
// che il browser ha comletato la generazione della struttura del DOM.
// 
// Nello sviluppo di un'applicazione può essere interessante effettuare elaborazioni
// o personalizzazioni in base alle variazioni della struttura del DOM.
// Potremmo ad esempio voler sapere se è stato aggiunto o eliminato un
// elemento o un suo attributo o se ne è stato modificato il contenuto.
// 
// La soluzione proposta dal W3C è quella dei Mutation observer.
// 
// A differenza dei Mutation Event ( di cui parleremo tra breve ), gli observer
// non sono eventi, ma degli oggetti che monitorano elementi del DOM ed
// eseguono una funzione di callback in corripondenza di una o più modifiche
// della loro struttura o dei contenuti.
// Con questo approccio la gestione delle variazioni del DOM non è sincrona e 
// le variazioni vengono riportate in blocco al gestore JS e non man mano
// che si verificano, evitando quindi un ingolfamento della coda degli eventi
// ed una paralisi del browser.
// 
// Esaminiamo in concreto come utilizzare i Mutation observer.
// Nelle sue linee essenziali, per gestire le variazioni degli elementi del DOM
// dobbiamo innanzitutto creare un Mutation observer ed assegnargli
// la funzione di callback da eseguire:
/** <mutationManager è una funzione di callback che utilizzeremo per>
 *   <sfruttare i dati acquisiti dall'observer> */
var mutationManager = function(mutationRecords) {
    // ...
};

var observer = new MutationObserver(mutationManager);
// 
// nella signature della funzione di callback dovrà necessariamente esserci
// come argomento un array di oggetti MutuationRecords che servirà a 
// contenere le informazioni sulle variazioni avvenute all'elemento
// in osservazione.
// Prima di analizzare in dettaglio come interpretare queste informazioni,
// vediamo come indicare al Mutation observer l'elemento da monitorare ( target )
// e a quali variazioni siamo interessati
var div = document.getElementById("myDiv");

observer.observe(div, {childList: true, attributes: true});
// 
// Il tutto viene effettuato tramite il metodo observe() che prevede
// due parametri:
//          - il primo è il target: l'elemento da tenere sotto osservazione
//          - il secondo è un oggetto che descrive le variazioni a cui siamo
//             interessati
// 
// Nell'esempio abbiamo indicato di voler osservare le variazioni degli attributi
// del div myDuv e di eventuali modifiche dei suoi figli.
// Le possibili variazioni del DOM che possiamo osservare sono riassunte dalle
// seguenti proprietà:
//          - attributes: valore booleano per l'osservazione di variazioni degli
//                          attributi dell'elemento
//          - attributeOldValue: valore booleano che consente di inserire nei
//                                   Mutuation record il vecchio valore di un
//                                   attributo 
//                                   ( solo se attributes = true )
//          - characterData: valore booleano per l'osservazione di variazioni
//                               del contenuto dell'elemento
//          - characterDataOldValue: valore booleano che consente di inserire
//                                         nei Mutuation record il vecchio valore 
//                                         del contenuto dell'elemento
//                                         ( solo se characterData = true )
//          - childList: valore booleano che consente l'osservazione di variazioni
//                                dei figli dell'elemento
//          - subtree: valore booleano che prevede l'osservazione di variazioni di
//                       tutti i discendenti dell'elemento
//          - attributeFilter: array di nomi di attributi da tenere sotto
//                               osservazione
//                               ( es; ["class", "src"] )
//                               
// Una volta impostato il Mutuation observer, la nostra funzione di callback
// verrà invocata quando verranno rilevate le variazioni a cui siamo interessati.
// Come accennato prima, la funzione riceverà un array di Mutuation record
// con i dettagli sulle variazioni avvenute.
// 
// NOTA: È importante comprendere che la funzione di callback non sarà
//          invocata dall'observer nel momento in cui si verifica la variazione
//          di un elemento, ma al termine dell'esecuzione della funzione o 
//          comunque del blocco di codice che modifica il DOM.
//          Questo fa in modo che possano verificarsi più variazioni al DOM,
//          ciascuna delle quali viene rappresentata da un singolo
//          Mutuation record.





/******************************************************************************
 MUTATION RECORD
 ******************************************************************************/

// Un Mutuation record è un oggetto che prevede le seguenti proprietà:
//          - type: il tipo di variazione rilevata.
//                   I possibili valori sono: - attribute
//                                             - characterData
//                                             - childList
//          - target: l'elemento su cui è stata rilevata la variazione
//          - addedNodes: un array di nodi aggiunti al DOM
//          - removedNodes: un array di nodi rimossi dal DOM
//          - nextSibling: l'eventuale elemento successivo all'elemento che è
//                           stato aggiunto o rimosso
//          - previousSibling: l'eventuale elemento precedente all'elemento che è
//                                stato aggiunto o rimosso
//          - attributeName: il nome dell'attributo modificato
//          - oldValue: il valore dell'attributo o del contenuto precedente alla
//                        variazione
//                        
// Sfruttando le informazioni fornite dal Mutuation record possiamo definire
// il comportamento della funzione di callback.
// Ad esempio, il seguente codice visualizza un messaggio sulla console che
// indica il numero di elementi aggiunti come figli dell'elemento osservato:
var mutationManager = function(mutationRecords) {
    var i;
    for (i = 0; i < mutationRecords.length; i++) {
        if (mutationRecords[i].type == "childList") {
            console.log("Sono stati aggiunti " + addedNodes.lenght + " elementi.")
        }
    }
};
//          
// Se decidiamo di non osservare più le variazioni legate ad un elemento del DOM
// possiamo utilizzare il metodo disconnect() dell'observer
observer.disconnect();
// 
// Un'ultima importante considerazione riguarda cio che un Mutuation observer
// è in grado di osservare.
// Come da definizione, esso può tenere sotto controllo le variazioni della
// struttura di un sottoalbero, la modifica del contenuto o degli attributi
// di un elemento.
// Esso non è però in grado di rilevare lo stato interno di un elemento, come
// ad esempio l'attributo value o checked di un elemento <input>.
// Quindi, in sostanza, non possiamo usare un Mutuation observer per monitorare
// le variazioni degli elementi di una form determinati dall'input dell'utente.





/******************************************************************************
 MUTATION EVENT, l'alternativa deprecata
 ******************************************************************************/

// Esiste un altro approccio per intercettare le variazioni di struttura e 
// contenuto del DOM e consiste nello sfruttare i Mutation event, una 
// serie di eventi generati dal browser proprio al verificarsi di questo tipo di
// variazioni.
// 
// Purtroppo questo approccio presenta alcuni problemi che possono
// pregiudicare sensibilmente le prestazioni del browser, tanto da portare il
// W3C a deprecarli.
// Ne parliamo in questa guida solo per dare maggior completezza.
// 
// Possiamo riassumere i principali difetti dei Mutuation event nei seguenti
// punti:
//          - sono eventi sincroni, quindi in presenza di numerose variazioni del
//             DOM la coda degli eventi può riempirsi ad un punto tale da
//             rendere il browser non responsivo
//          - nella gestione di un Mutuation event può essere necessario
//             modificare il DOM generando quindi altri Mutuation event
//             in una reazione a catena che può sfociare in un vero e proprio
//             blocco del browser.