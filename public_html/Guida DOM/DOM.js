/******************************************************************************
                            INTRODUZIONE
******************************************************************************/

// Il DOM è un API (Application Programming Interface), ovvero nu insieme
// di funzioni, metodi e proprietà che i programmi possono richiamare per
// delegare il lavoro al sistema sottostante.
// 
// Il DOM (Document Object Model) è un'API. indipendende dalla piattaforma, che
// descrive la struttura di un documento HTML (e XML).
// 
// Il DOM non è una parte di JS!
// JS mette solo a disposizione un modo per accedere al DOM.
// 
// Consideriamo la seguente pagina HTML:
//      
//      <html>
//          <head>
//              <title>Il DOM</title>
//          </head>
//          <body>
//              <a href="pagina.html">Ciao</a>
//          </body>
//      </html>
// 
// Questa pagina come ogni altra pagina HTML (e XML) è costituita da nodi.
// Ogni tag e ogni testo è un nodo.
// Alcuni nodi (es <a>) possono avere attributi (es href="") e proprietà.
// Inoltre un nodo (es <body>) può contenere altri nodi. In questo caso si
// parla di "elemento" della pagina.
// 
// Tramite il DOM non solo è possibile accedere e manipolare ogni nodo, ma è
// anche possibile aggiugerne di nuovi ed eliminarne altri già presenti.
// 
// Specifichiamo un attimo la differenza tra ELEMENTO e NODO:
//      - Un elemento (element) è contraddistinto da un tag. È facile quindi
//                              capire che può contenere altri elementi
//      - Un nodo (node) ha un significato semantico più ampio. Oltre ad
//                       includere nella sua definizione tutti gli elementi
//                       Un nodo può essere anche un testo o un attributo
//                       che a differenz di tutti gli altri nodi non possono 
//                       avere altri attributi e non possono contenere altri
//                       nodi.
//                       
// Il DOM è costituito fondamentalmente da document (l'elemento principale),
// element e node





/******************************************************************************
                            L'OGGETTO DOCUMENT
******************************************************************************/

// document è molto importante poichè è l'elemento che contiene tutti gli
// altri elementi del DOM.
// 
// Quindi anche document corrisponde ad un tag, quello che contiene tutti 
// gli altri e che identifica una pagina per il Web: il tag <html>
// ( tecnicamente parlando corrisponde a tutti il codice della pagina
//   anche esterno al tag <html>, come ad esempio la definizione del
//   DOCTYPE )





/******************************************************************************
                METODI PER RECUPERARE ELEMENTI NELLA PAGINA
******************************************************************************/

// - getElementById("id"): permette di recuperare un elemento grazie al valore
//                         del suo attributo id.
//                         Restituisce un riferimento all'elemento in questione
document.getElementById("id"); 
// 
// - getElementByTagName("nome_tag"): permette di recuperare l'insieme degli
//                                    elementi caratterizzati dallo stesso tag
//                                    considerato.
//                                    Questi elementi vengono restituiti
//                                    nell'ordine in cui compaiono
//                                    all'interno della pagina all'interno
//                                    di un array.
document.getElementsByTagName("nome_tag");
// 
// possiamo accedere all'array restituito con la solita sintassi:
// array[indice]
// Oppure con un metodo che il W3C mette a disposizione:
// array.item(indice)
// La differenza tra i due metodi sta nell'obiettivo: recuperare o un
// elemento particolare o una famiglia di elementi con le stesse
// caratteristiche.





/******************************************************************************
             METODI PER CREARE NODI ED ELEMENTI NELLA PAGINA
******************************************************************************/

// - createElement("nome_tag"): permette di creare un nuovo elemento di
//                              qualunque tipo.
//                              Ritorna un riferimento al nuovo
//                              elemento creato
var nuovo_elemento = document.createElement("nome_tag");
// 
// - createTextNode("testo"): permette di creare un nuovo nodo di testo.
//                            I testi sono nodi particolari che non
//                            possono avere attributi e non possono
//                            contenere altri nodi. Quindi corrispondono
//                            all'ultimo anello della catena del DOM.
//                            Restituisce un riferimento al nodo di testo
//                            creato.
var nuovo_testo = document.createTextNode("testo");
//                              
// Supponiamo di voler inserire un nuovo nodo di testo, il codice da
// utilizzare sarà:
testo = document.createTextNode("Questo testo lo aggiungo dinamicamente");
// 
// Ma dove compare il nuovo nodo di testo all'interno della pagina?
// In realtà il nodo non viene visualizzato, almeno per il momento.
// Quindi c'è differenza tra creare un nuovo nodo ed inserirlo nella pagina
// Infatti esiste un set di metodi che permette di sistemare i nuovi nodi
// esattamente dove desideriamo.





/******************************************************************************
                        METODI RIFERITI AD ELEMENT
******************************************************************************/

// Per element si intende qualunque elemento della pagina caratterizzato
// da un tag.
// 
// I metodi per element consentono di gestire e manipolare le caratteristiche
// di ogni singolo elmento, come recuperare, impostare e rimuovere gli
// attributi dell'elemento stesso.
// 
//      - getElementByTagName("tag"): Ha la stessa sintassi e la stessa
//                                    semantica del metodo visto prima.
//                                    In questo caso ritorna la lista degli
//                                    elementi contenunti all'interno di un
//                                    certo elemento con un dato
//                                    tag.
//                                    Prima lo applicavamo all'elemnto document
//                                    e quindi restituiva TUTTI gli elementi
//                                    con quel tag dato che element contiene
//                                    TUTTI gli elementi della pagina.
//     - setAttribute(nome, valore): permette di creare un nuovo attributo
//                                   all'elemento su cui si applica il metodo.
//                                   Se l'attributo è già presente, allora il
//                                   metodo sovrascrive il valore.
element.setAttribute(nome, valore);
//      
//     - getAttribute(nome): restituisce il valore di un attributo
//                           dell'elemento.
element.getAttribute(nome);
// 
//     - removeAttribute(nome): rimuove l'attributo specificato dall'elemento.
//                              Se quell'attributo ha un valore di default,
//                              gli verrà assegnato quello.
element.removeAttribute(nome);
// 
// Una proprietà utile di element è:
//     - tagName: contiene il nome del tag all'elemento associato
element.tagName;





/******************************************************************************
                        METODI RIFERITI AI NODI
******************************************************************************/

// Vediamo prima le proprietà legate ai nodi:
//      - childNodes: contiene la lista dei nodi figli.
//                    Se il nodo non ha figli allora l'array sarà vuoto.
node.childNodes;
node.childNodes.lenght; // per vedere quanti figli ha (la lunghezza dell'array)
node.childNodes[2]; // per accedere al terzo figlio
//
//      - firstChild: restituisce il primo figlio del nodo.
//                    se il nodo non ha figli restituisce null
node.firstChild; // coincide con node.childNodes[0]
// 
//      - lastChild: restituisce l'ultimo figlio del nodo.
//                   Se il nodo non ha figli restituisce null
node.lastChild; // coincide con node.childNodes[lenght-1];
//
//      - nextSibling: restituisce il nodo che segue a quello al quale è
//                     applicato. restituisce il "fratello minore" cioè
//                     quello successivo, quello destro.
//                     Se non ha fratelli restituisce null.
node.nexSibling;
// 
//      - previousSibling: restituisce il nodo precedente.
//                         Cioè il "fratello maggiore", quello precedente,
//                         quello sinistro.
//                         Se non ha fratelli restituisce null.
node.previousSibling;
// 
//      - parentNode: restituisce il nodo che contiene quello al quale è
//                    applicato.
//                    Cioè restituisce il "padre" del nodo in questione.
//                    Se il padre non esiste (il caso di document) restituisce
//                    null.
node.parentNode;
// 
// document non è l'unico nodo a non avere il padre. Si pensi al nodo di testo
// creato in precedenza, fincheè non sarà inserito nella struttura della pagina
// non avrà alcun nodo padre.
// 
//      - nodeValue: restituisce il valore del nodo.
//                   Il valore di ritorno dipende dal tipo di nodo in questione,
//                   in particolare, per i tag il valore ritornato è null,
//                   mentre è il testo per i nodi di testo.
// 
// Passiamo ora ai METODI applicabili ai nodi:
// 
//      - hasChildNodes(): verifica se un nodo ha figli o meno.
//                         true se ha figli, false altrimenti.
node.hasChildNodes();
// 
//      - appendChild(nodo): inserisce un nuovo nodo alla fine della
//                           lista dei figli del nodo al quale è 
//                           applicato
node.appendChild(nodo);
// 
//      - insertBefore(nodo_inserito,
//                     nodo_esistente): consente di inserire un nuovo nodo
//                                      nella lista dei figli del nodo al
//                                      quale è applicato il metodo, appena
//                                      prima di un nodo specificato
node.insertBefore(nodo_inserito, nodo_esistende);
//      
//      - replaceChild(nodo_nuovo,
//                     nodo_vecchio): consente di inserire un nuovo
//                                    nodo al posto di un altro nella
//                                    pagina.
node.replaceChild(nodo_nuovo, nodo_vecchio);
//      
//      - removeChild(nodo): elimina il nodo specificato dalla lista dei
//                           figli del nodo a cui è applicato il metodo.
node.removeChild(nodo_da_rimuovere);
//      
//      - cloneNode(boolean): permette di duplicare un nodo già esistente
//                            Offre inoltre la possibilità di decidere se
//                            duplicare il singolo nodo (boolean = false)
//                            oppure duplicare anche tutti i suoi figli
//                            (boolean = true)
node.cloneNode(boolean);