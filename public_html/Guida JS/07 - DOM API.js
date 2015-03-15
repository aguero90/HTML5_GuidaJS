
/******************************************************************************
 DOCUMENT OBJECT MODEL (DOM)
 ******************************************************************************/

// Una delle proprietà che non abbiamo preso in considerazione parlando
// dell'oggetto window è document.
// Questa proprietà rappresenta il documento HTML caricato nella
// finestra corrente e la struttura di questo oggetto, nota con il nome di
// DOM, Document Object Model, è definita eguendo le raccomandazioni
// dello standard del W3C.
// 
// Il DOM fornisce una rappresentazione del documento come una composizione
// gerarchica di oggetti, spesso chiamata DOM tree.
// Questo albero di oggetti è pensato per essere facilmente accessibilie tramite
// JS non soltanto in lettura, ma anche per poter cambiare dinamicamente la
// sua struttura, il contenuto e lo stile.




/******************************************************************************
 LA STRUTTURA DEL DOM
 ******************************************************************************/

// Abbiamo detto che la rappresentazione di un documento è organizzata
// in forma gerarchica con una struttura ad albero.
// La radice di tale albero è l'oggetto document a cui sono collegati i diversi
// nodi corrispondenti agli elementi presenti nella pagina.
// Possiamo visualizzare la struttura ad albero di un documento utilizzando
// uno dei vari strumenti di ispezione integrati o comunque disponibili nei
// browser più recenti.
// 
// Ad esempio, il seguente documento HTML:
// <!DOCTYPE html>
// <html>
//      <head>
//          <title>Pagina d'esempio</title>
//      </head>
//      <body>
//          <div>
//              <h1>Titolo</h1>
//              <p>Questo &egrave; un paragrafo</p>
//              <img src="img.jpg" alt="Immagine"/>
//          </div>
//       </body>
//  </html>
// 
// Viene visualizzato dal DOM Inspector di Firefox in questo modo:
//      #document
//          html
//          HTML
//              HEAD
//                  #text
//                  TITLE
//                      #text
//                  #text
//                  STYLE
//                      #text
//              BODY
//                  #text
//                  DIV
//                      #text
//                      H1
//                          #text
//                      #text
//                      P
//                          #text
//                      #text
//                      IMG
//                      #text
//                  #text
// 




/******************************************************************************
 TIPI DI NODO
 ******************************************************************************/

// Il DOM si presenta come un albero con nodi che hanno diversi tipi, 
// esaminiamo brevemente i tipi di nodo di uso comune:
// 
//      - documento: normalmente esiste un solo nodo di questo tipo nella
//                       rappresentazione di una pagina HTML e costituisce
//                       la radice dell'albero; tuttavia in presenza di pagine
//                       con i frame ci sono più nodi di tipo documento
//       - elemento: un nodo di tipo elemento individua in genere un tag
//                      HTML, come ad esempio <body>, <div>, <p> ecc.
//       - attributo: un nodo di tipo attributo corrisponde ad un attributo
//                      di un tag HTML, come ad esempio l'attributo src del
//                      tag <img>
//       - testo: un nodo di tipo testo corrisponde al contenuto testuale di
//                 un nodo, compresi eventuali spazi e caratteri speciali
//                 
//  Le specifiche del W3C prevedono altri tipi di nodo, come ad esempio i
//  nodi di tipo commento e i nodi di tipo document type, quelli cioè che
//  corrispondono alle dichiarazione come <!DOCTYPE html>.
//  Tuttavia, i quattro tipi di nodo che abbiamo elencato sono i tipi di nodo
//  più comunemente utilizzati 





/******************************************************************************
 SELEZIONARE ELEMENTI
 ******************************************************************************/

// Oltre a fornire un modo per rappresentare mediante oggetti il documento
// corrente, il DOM consente anche di manipolare questi oggetti tramite JS.
// 
// Possiamo ad esempio accedere agli elementi della pagina utilizzando 
// diversi criteri di selezione.
// 
// Se nella pagina corrente abbiamo un elemento con un certo valore per
// l'attributo id, come quello del seguente esempio:
//      <p id="mioParagrafo">Questo &egrave; un paragrafo</p>
//      
// possiamo utilizzare il metodo getElementByID() dell'oggetto document
// come mostrato dal seguente codice:
var p = document.getElementById("mioParagrafo");
// 
// Questo metodo, uno dei puù utilizzati per la gestione del DOM, restituisce
// un oggetto che rappresenta il nodo di tipo elemento che ha l'attributo
// id con il valore specificato.
// Se l'elemento non esiste viene restituito il valore null, mentre se esistono
// più elementi con lo stesso id viene restituito il primo individuato.
// 
// Analogo a getElementById() è il metodo getElementsByName(), che
// restituisce l'elenco dei nodi della pagina il cui valore dell'attributo name
// corrisponde a quello del parametro.
// 
// A differenza del primo, però, questo metodo restituisce un elenco di
// oggetti, più precisamente, un NodeList, cioè una struttura dati simile ad
// un array contenente nodi del DOM.
// 
// È anche possibile individuare gli elementi di una pagina in base al loro
// tag utilizzando il metodo getElementsByTagName(), come nel seguente
// esempio:
var listaParagrafi = document.getElementsByTagName("p");
// 
// In questo caso il metodo restituisce sotto forma di NodeList l'elenco dei
// nodi corrispondenti al tag specificato come parametro.
// Specificando come parametro la stringa "*", getElementByTagName()
// restituisce l'elenco di tutti i nodi della pagina.
// 
// Se utilizziamo il metodo getElementByClassName() possiamo ottenere
// l'elenco dei nodi a cui è stato assegnato un determinato valore come
// attributo class.





/******************************************************************************
 QUERY SELECTOR
 ******************************************************************************/

// Tra le novità introdotte di recente nelle specifiche del DOM c'è la
// possibilità di selezionare gli elementi di una pagina utilizzando i
// selettori CSS.
// Due sono i metodi che consentono questo approccio:
//      - querySelector(): restituisce il primo elemento trovato dal selettore
//      - querySelectorAll(): restituisce tutti gli elementi trovatii dal selettore
//      
var p = document.querySelector("#mioParagrafo"); // restituisce il paragrafo con id "mioParagrafo"
var divList = document.querySelectorAll("div.messaggio"); // restituisce l'elenco dei <div> di classe "messaggio"





/******************************************************************************
 MODIFICARE GLI ELEMENTI DEL DOM
 ******************************************************************************/

// Una volta individuato l'elemento o gli elementi presenti su una pagina,
// possiamo modificarne il contenuto o le altre caratteristiche sfruttando
// proprietà e metodi specifici dei nodi di tipo elemento.
// Ad esempio, la proprietà innerHTML rappresenta il contenuto HTML
// di un elemento ed è accessibile sia in lettura che in scrittura.
// Il seguente codice modifica il contenuto di un paragrafo:
var p = document.getElementById("mioParagrafo");
p.innerHTML = "Testo del <b>paragrafo</b>";
// 
// Altri metodi dei nodi di tipo elemento ci consentono di analizzare e
// modificare i suoi attributi. 
// Vediamone un po:
//      - hasAttribute(attrName): retituisce true se l'elemento ha l'attributo
//                                       specificato come parametro
//      - hasAttributes(): restituisce true se l'elemento ha almeno un
//                            elemento valorizzato
//      - getAttribute(attrName): restituisce il valore dell'attributo
//                                       specificato come parametro
//      - setAttribute(attrName, value): imposta un valore per un attributo
//      
// Facciamo un esempio per vedere come assegnare un immagine di
// default agli elementi <img> di una pagina privi di un immagine associata:
var imgList = document.getElementsByTagName("img");

for (var i = 0; i < imgList.length; i++) {
    if (!imgList[i].hasAttribute("src")) {
        imgList[i].setAttribute("src", "default.png");
    }
}
// 
// Alcuni attributi sono direttamente accessibili via JS come proprietà
// dell'elemento.
// È ad esempio il caso degli attributi id, name, src, href.
// Vediamo allora come riscrivere il codice precedente usando questi attributi:
var imgList = document.getElementsByTagName("img");

for (var i = 0; i < imgList.length; i++) {
    if (!imgList[i].src) {
        imgList[i].src = "default.png";
    }
}
// 
// ---------------- ATTRIBUTI E PRORPIETA' ----------------------
// 
// Dal momento che un elemento del DOM è sostanzialmente un oggetto JS,
// possiamo interagire con esso come un qualsiasi altro oggetto.
// Ad esempio possiamo aggiungere dinamicamente nuove proprietà
// semplicemente assegnandole un valore:
var img = document.getElementById("miaImmagine");
img.miaProprieta = "nuovo valore";
// 
// L'aggiunta di una nuova proprietà all'elemento del DOM non ha alcuna
// ripercussione sull'HTML, ma può risultare utile per fare personalizzazioni
// tramite JS.
// Ad esempio potremmo assegnare ad un'immagine informazioni testuali
// o numeriche per essere poi recuperate in un secondo momento.
// 
// Una distinzione va però fatta tra le proprietà e gli attributi di un
// elemento.
// 
// Innanzitutto, una proprietà aggiunta ad un elemento del DOM non è
// gestibile tramite getAttribute() e setAttribute(), dal momento che non
// diventa un attributo HTML.
// 
// Inoltre, mentre gli attributi non sono case-sensitive, le proprietà di un
// oggetto JS lo sono.
// 
// Infine, mentre i valori assegnabili agli attributi sono soltanto stringhe,
// alle proprietà possiamo assegnare qualsiasi tipo di dato.
// 
// Esiste un altro aspetto molto importante nella distinzione tra attributi e
// proprietà da tenere in considerazione quando si manipola il DOM tramite
// JS.
// 
// Abbiamo detto che per alcuni attributi è prevista una corrispondente
// proprietà dell'elemento del DOM.
// La proprietà riflette generalmente il valore dell'attributo, ma va tenuto
// presente che non sono esattamente la stessa cosa.
// 
// Prendiamo ad esempio le proprietà src di un elemento <img> e href di un
// elemento <a>.
// Mentre il valore dell'attributo restituito da getAttribute() restituisce
// sempre il valore presente nell'HTML, il valore restituito dalle proprietà
// src e href è l'URL completo alla risorsa, salvo errata interpretazione delle
// specifiche W3C da parte di qualche browser.
// Quindi, se abbiamo il seguente codice HTML:
// 
// <img id="miaImmagine" src="default.png" />
// 
// le seguenti istruzioni restituiscono valori diversi:
var img = document.getElementById("miaImmagine");

console.log(img.src);                    // "http://NOMEHOST/default.png"
console.log(img.getAttribute("src")); // "default.png"
// 
// Un altro caso tipico è la proprietà checked di un elemento <input>.
// Mentre la proprietà ha un valore booleano che indica se l'elemento è
// checkato o meno, l'attributo corrispondente restituisce la stringa
// "checked" o una stringa vuota.
// 
// Un aspetto più insidioso è legato all'interazione con l'utente.
// Consideriamo un elemento <input> con un suo valore predefinito:
// 
// <input id="txtNome" type="text" value="Mario" />
// 
// Inizialmente i valori dell'attributo value e della corrispondente proprietà
// coincidono.
// Ma se l'utente cambia il valore della casella di testo avremo valori differenti
// tra proprietà e attributo.
// In particolare avremo che il valore della proprietà value sarà sincronizzata
// con il nuovo valore inserito dall'utente, mentre l'attributo continuerà ad
// avere il valore iniziale.
// 
// In linea di massima, quando è possibile, è sempre preferibile accedere alle
// proprietà dell'elemento invece che all'attributo corrispondente.
// I casi in cui è necessario accedere agli attributi sono:
//      - Quando non è prevista una corrispondente proprietà (ad esempio,
//         in presenza di attributi custom)
//      - Quando vogliamo accedere ai valori originali di quei elementi che
//         prevedono un'interazione con l'utente




/******************************************************************************
 NAVIGARE I NODI DEL DOM
 ******************************************************************************/

// Alcuni elementi del DOM ci consentono di analizzare e muoverci all'interno
// della struttura di un documento.
// Ad esempio, la proprietà childNodes di un elemento contiene l'elenco dei
// nodi figli dell'elemento sotto forma di NodeList.
// Consideriamo ad esempio il seguente codice HTML:
// 
// <div id="mainDiv">
//      <h1>Titolo</h1>
//      <p>Un paragrafo</p>
//      <p>Un altro paragrafo</p>
// </div>
// 
// Possiamo scoprire il contenuto degli elementi figli del <div> principale
// utilizzando il seguente codice JS:
var div = document.getElementById("mainDiv");

for (var i = 0; i < div.childNodes.length; i++) {
    console.log(div.childNodes[i].innerHTML);
}
// 
// Sono previsti dei metodi per semplificare la navigazione.
// Tra questi segnaliamo i metodi:
//      - firstChild(): retiruisce il primo figlio
//      - lastChild(): restituisce l'ultimo figlio
//      - parentNode(): restituisce il nodo genitore dell'elemento corrente
//      - nextSibling(): restituisce il fratello successivo
//      - previousSibling(): restituisce il fratello precedente
//      
// Non è previsto un metodo per ottenere tutti i fratelli del nodo corrente,
// ma è possibile aggirare il problema utilizzando il seguente codice JS:
var me = document.getElementById("mainDiv");
var allSiblings = me.parentNode.childNodes;
var mySiblings = [];

for (var i = 0; i < allSiblings.length; i++) {
    if (allSiblings[i] !== me) {
        mySiblings.push(allSiblings[i]);
    }
}
// 
// Volendo possiamo scorrere gli elementi sfruttando la funzione forEach 
// del prototipo di Array (Array.prototype.forEach.call o più semplicemente
// [].forEach.call), ecco lo stesso esempio riprodotto utilizzando forEach:
var me = document.getElementById("mainDiv");
var allSiblings = me.parentNode.childNodes;
var mySiblings = [];

[].forEach.call(allSiblings, function (el) {
    if (el !== me)
        mySiblings.push(el);
});





/******************************************************************************
 DOM, AGGIUNGERE E RIMUOVERE ELEMENTI
 ******************************************************************************/

// oltre a modificare il contenuto HTML e gli attributi di un elemento, il
// DOM ci consente di modificare la struttura di un documento.
// Possiamo ad esempio creare elementi ed attributi e aggiungerli al DOM
// avendo un effetto immediato sulla pagina HTML.
// 
// Consideriamo il seguente esempio:
var mainDiv = document.getElementById("mainDiv");
var img = document.createElement("img");
var srcAttr = document.createAttribute("src");

srcAttr.value = "default.png";
img.setAttributeNode(srcAttr);

mainDiv.appendChild(img);
// 
// 1) Abbiamo utilizzato il metodo createElement() dell'oggetto document
//     per creare un elemento <img>
// 
// 2) Abbiamo creato l'attributo src con il metodo createAttribute() ed
//     impostato il suo valore
//     
// 3) Abbiamo assocuato l'attributo appena creato all'elemento <img> tramite
//     setAttributeNode()
// 
// 4) Abbiamo aggiunto l'elemento in fondo all'elenco dei nodi figli del div
//     mainDiv utilizzando il metodo appendChild()
//     
// --------------- insertBefore() & insertAfter() --------------------
// 
// Oltre ad appendChild() possiamo utilizzare i metodo insertBefore() e
// insertAfter() per poter in qualche modo decidere in che posizione
// inserire un nodo in un elenco.
// Entrambi i metodi prevedono 2 parametri: il nodo da inserire ed il nodo 
// prima o dopo il quale inserirlo nella lista.
// 
// Ad esempio, se avessimo voluto inserire il nodo <img> creato nell'esempio
// precedente dopo il <div> mainDiv invece che tra i suoi figli avremmo 
// scritto il seguente codice:
mainDiv.insertAfter(img, mainDiv);
// 
// -------------------- replaceChild() --------------------------
// 
// Oltre ad aggiungere un nodo possiamo rimpiazzarlo con un altro tramite
// replaceChild().
// Questo metodo sostituisce uno dei figli di un elemento con un nuovo nodo.
// Facendo riferimento all'esempio di prima, possiamo sostituire il primo
// nodo figlio del div mainDiv con il nodo <img> appena creato:
mainDiv.replaceChild(img, mainDiv.firstChild());
// 
// ---------------- Eliminare nodi e attributi ----------------------
// 
// I metodi removeChild() e removeAttribute() consentono di eliminare
// elementi ed attributi dal DOM.
// Ad esempio, per rimuovere il primo nodo figlio del <div> mainDiv
// eseguiamo la seguente istruzione:
mainDiv.removeChild(mainDiv.firstChild());
// 
// mentre per rimuovere l'attributo class di un elemento facciamo così:
mainDiv.removeAttribute("class");
