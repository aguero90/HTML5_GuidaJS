
/******************************************************************************
 onChange e onReadyStateChange
 ******************************************************************************/

// In questa lezione esaminiamo alcuni eventi legati alla modifica dello
// stato di alcuni elementi del DOM.
// A questo gruppo si possono ricondurre fondamentalmente 2 eventi:
//          - onChange ("change" in addEventListener()):
//                  quando il contenuto di un campo form è modificato o non è
//                  più selezionato
//          - onReadyStateChange ("readystatechange" in addEventListener()):
//                  quando lo stato del caricamento di un elemento cambia,
//                  l'evento è utile, ad esempio, per verificare che un
//                  elemento sia stato caricato. Utilissimo quando utilizziamo
//                  AJAX.
//
// ------------------------ onChange ------------------------------------------
//
// Importante è dire qualcosa in più su onChange: l'evento assomiglia molto ad
// "onBlur", ma verifica anche che l'elemento che lo richiama sia stato
// modificato.
// Questo evento, infatti, è attivato quando si modifica un campo di testo,
// per cui oltre all'attivazione, occorre anche operare un'azione.
//
// Ecco un esempio:
//      <select id="test">
//          <option value="primo" selected="selected">primo</option>
//          <option value="secondo">secondo</option>
//          <option value="terzo">terzo</option>
//      </select>
//
var testSelect = document.getElementByID("test");
testSelect.addEventListener("change", function () {

    alert(this.value);
});
//
// ------------------------ onReadyStateChange --------------------------------
//
// Questo evento è diventato molto famoso dopo l'introduzione massiva delle
// tecniche AJAX.
//
// Si può utilizzare anche con l'oggetto document in alternatica a
// DOMContentLoaded o a onload per verificare il caricamento degli elementi
// HTML:
document.addEventListener("readystatechange", function () {

    // alternativo a onDOMContentLoaded
    if (document.readyState == "interactive") {

        console.log("inizializzazione in corso");
        // init();
    }

    // alternatico a "onload"
    if (document.readyState == "complete") {

        console.log("inizializzazione in corso");
        // init();
    }
});
//
// Sia che lo utilizziamo per AJAX, sia che lo utilizziamo per rilevare il
// caricamento delle pagine, questo evento ci permette di verificare le
// modifiche dell'oggetto readyState, che assume valori diversi e
// significati diversi a seconda dell'elemento cui è associato.
//
// In particolare l'oggetto document.readyState assume i seguenti
// valori:
//          - uninitialized: non è in corso alcun caricamento
//          - loading: caricamento in corso
//          - loaded: è terminato solo il caricametno del documento HTML
//          - interactive: caricamento e parsing del documento HTML completo,
//                         sta caricando elementi collegati, immagini, script
//                         ecc.
//          - complete: è stato tutto caricato
//
// Mentre per XMLHttpRequest.readyState i valori sono i seguenti ( ci sono
// anche alcune similitudini con gli stati di document ):
//          - 0 ( UNSET ): la richiesta non è stata inizializzata, cioè
//                         non è stata chiamata ancora la open()
//          - 1 ( OPENED ): stabilita connessione con il server, cioè open()
//                          andata a buon fine ma non c'è ancora stata una
//                          send()
//          - 2 ( HEADERS_RECIVED ): la richiesta è stata ricevuta e sono
//                                   disponibili gli header e lo stato, cioè
//                                   send() andata a buon fine
//          - 3 ( LOADING ): la richiesta è in elaborazione, il trasferimento
//                           dati è in corso e le informazioni vengono
//                           memorizzate nella variabile "responseText"
//          - 4 ( DONE ): richiesta terminata.
//                        Tutti i dati sono stati scaricati
//
// --------------------- EVENTI NON STANDARD ----------------------------------
//
// Per completezza segnaliamo altri 2 eventi che, implementati solo nei vecchi
// browser ( es. IE5, 6 e 7 ), non sono stati inseriti negli standard moderni.
//          - onCellChange: si attiva quando si modifica un elemento in un
//                          database, per questa sua caratteristica ha un uso
//                          non propriamente legato a JS
//          - onPropertyChange: si attiva quando cambia la proprietà di un
//                              elemento





/******************************************************************************
 onFocus, onBlut e onSelect
 ******************************************************************************/

// - onFocus ("focus" in addEventListener()):
//          Questo handler si attiva quando l'utente entra in un campo ed è
//          l'opposto di onBlur
// - onBlur ("blur" in addEventListener()):
//          Attivato quando il puntatore del mouse o il cursore esce dalla
//          finestra corrente.
//          Applicato alle form, invece, si attiva quando si esce dal campo
//          della form
// - onSelect ("select" in addEventListener()):
//          Si attiva quando si effettua una selezione all'interno di una
//          casella di testo sia con il mouse, sia tenendo premuto SHIFT e
//          selezionando con le frecce della tastiera.
//
// -------------------------- onFocus e onBlur --------------------------------
//
// per capire come funziona vediamo un esempio:
//      <textarea id="focusArea"> ... testo ... </textarea>
var txtArea = document.getElementByID("focusArea");

txtArea.addEventListener("focus", function () {
    console.log("focus");
});
txtArea.addEventListener("blur", function () {
    console.log("blur");
});
//
// Tramite questo codice ogni volta che selezioneremo la textarea sarà stampato
// su console "focus". Mentre ogni volta che deselezioniamo la textarea, cioè
// usciamo da essa, verrà stampato su console "blur".
//
// ----------------------------- onSelect -------------------------------------
//
// per capire come funziona vediamo un esempio:
//      <textarea id="selectArea"> ... testo ... </textarea>
var txtArea = document.getElementByID("selectArea");

txtArea.addEventListener("select", function () {
    console.log(window.getSelection().toString());
});
//
// Tramite questo codice ogni volta che selezioniamo del testo sulla textarea,
// questo sarà stampato sulla console.
// Otteniamo il testo selezionato tramite il metodo window.getSelection().
// Tuttavia questo metodo non funziona con le versioni di IE <= 8
//
// Se volessimo rendere funzionante il nostro codice anche sulle versioni più
// vecchie di IE potremmo sfruttare il metodo document.selection.createRange():
function getSelectedText() {

    if (window.getSelection) {
        // tutti i browser tranne IE <= 8
        return window.getSelection().toString();
    }
    if (document.selection.createRange) {
        // IE <= 8
        return document.selection.createRange().toString();
    }
}

var txtArea = document.getElementByID("selectArea");

txtArea.addEventListener("select", function () {
    console.log(getSelctedText());
});
//
// --------------------------- TAG SUPPORTATI ----------------------------------
//
// Facciamo un elenco dei tag che accettano questi eventi:
//
// - onFocus e onBlur: - <select>
//                     - <textarea>
//                     - <input type="text">
//                     - <checkbox>
//                     - <fileupload>
//                     - <password>
//                     - <radio>
//                     - <reset>
//                     - <sumbit>
//                     - <button>
//                     - <body>
//                     - <frameset>
// - onSelect: - <textarea>
//             - <input type="text">
//
//