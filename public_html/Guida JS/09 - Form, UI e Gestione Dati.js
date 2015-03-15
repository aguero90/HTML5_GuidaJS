
/******************************************************************************
 FORM E DATI DELLA UI
 ******************************************************************************/

// Un form è un componente di una pagina Web che, tramite elementi speciali
// detti controlli, consente all'utente di inserire dati da inviare al server per
// l'elaborazione.
// Senza entrare nel dettaglio delle specifiche HTML, i controlli sono l'insieme degli
// elementi che consentono l'immisione di dati, la selezioni di valori o l'avvio di
// funzionalità da parte dell'utente, come ad esempio caselle di testo, checkbox,
// radio button, pulsanti e simili.
// 
// In realtà l'invio al server dei dati raccolti da una form dipende dal tipo di
// elaborazione: in certi casi è possibile eseguire l'elaborazione dei dati direttamente
// sul client tramite JS.
// 
// Per form estremamente semplici, il processo di raccolta ed invio dei dati al
// server può essere effettuato senza la necessita di coinvolgere JS, soprattutto
// con l'introduzione delle nuove funzionalità di HTML5 che prevedono una
// prima validazione dei dati inseriti dall'utente.
// 
// Tuttavia, se vogliamo avere un certo controllo sui dati e soprattutto se la loro
// elaborazione deve avvenire sul client non possiamo fare a meno di ricorrere a JS.
// Vediamo in questa sezione come manipolare gli elementi di un form ed intervenire
// nelle diverse fasi dell'acquisizione dei dati.





/******************************************************************************
 ACCESSO A UN FORM
 ******************************************************************************/

// Durante la generazione del DOM viene popolato un array contenente l'elenco
// degli oggetti che rappresentano i form presenti nella pagina.
// Questo array è accessibile tramite la proprietà forms dell'oggetto document.
// Ad esempio, il seguente codice determina quanti form sono presenti nella
// pagina corrente:
console.log(document.forms.length);
// 
// per accedere ad un form specifico possiamo utilizzare il relativo indice dell'array:
var myForm = document.forms[0];
// 
// Questo metodo risulta chiaramente poco affidabile dal momento che l'indice
// dipende dalla posizione del form nella pagina: una modifica al markup ci
// costringerebbe a verificare e/o modificare di conseguenza il codice JS.
// 
// L'approccio migliore è quello di assegnare al form un identificatore tramite
// l'attributo id oppure un nome tramite l'attributo name.
// Nel primo caso possiamo accedere al form come a qualsiasi elemento del DOM:
//
//      <form id="myForm">
//          <!-- ... -->
//      </form>
var myForm = document.getElementById("myForm");
// 
// Se invece facciamo ricorso all'attributo name possiamo accedere nel seguente
// modo:
// 
//      <form name="myForm">
//          <!-- ... -->
//      </form>
var myForm = document.forms.myForm;
// 
// Il nome assegnato al form aggiunge di fatto una proprietà all'array forms
// con lo stesso nome del valore dell'attributo name.
// 
// Un altro modo per accedere a un form a cui è stato assegnato un nome
// consiste nell'utilizzare il metodo getElementsByName():
var myForm = document.getElementsByName("myForm")[0];
// 
// Questo metodo consente di accedere a qualsiasi elemento a cui è stato
// assegnato un nome tramite l'attributo name.
// Da notare che, mentre l'attributo id è utilizzato per identificare un elemento
// del DOM e pertanto non dovrebbero esistere più elementi con lo stesso id, è
// possibile avere più elementi con lo stesso valore per l'attributo name, come
// vedremo più avanti.
// Per questo motivo il metodo getElementsByName() restituisce un array di
// oggetti.





/******************************************************************************
 ACCESSO AI CONTROLLI DI UN FORM
 ******************************************************************************/

// Ciascun oggetto form contiene un array in cui sono contenuti i suoi controlli.
// È possibile accedere a questi controlli tramite indice utilizzando direttamente
// l'oggetto form:
var primoControllo = document.forms.myForm[0];
// 
// oppure, sempre tramite indice, sfruttando la proprietà elements
// dell'oggetto form:
var primoControllo = document.forms.myForm.elements[0];
// 
// Anche per i controlli è possibile sfruttare l'attributo name ed accedere
// direttamente ad essi come abbiamo visto per le form.
// Ad esempio, se abbiamo la seguente form:
// 
//      <form name="myForm">
//          <p><label>Nome:     <input type="text" name="txtNome"    /></label></p>
//          <p><label>Cognome: <input type="text" name="txtCognome"/></label></p>
//      </form>
// 
// possiamo accedere ai suoi controlli nel seguente modo:
var myForm = document.forms.myForm;
var txtNome = myForm.txtNome;
var txtCognome = myForm.txtCognome;
// 
// Rimane naturalmente sempre valida la possibilità di accedere ai controlli
// assegnando loro un id ed utilizzando il metodo getElementById() come per
// qualsiasi elemento del DOM.




/******************************************************************************
 ATTRIBUTI ID E NAME
 ******************************************************************************/

// È naturale chiedersi il perché form e controlli abbiano questa doppia modalità
// di identificazione tramire l'attributi id, come per qualsiasi elemento del DOM,
// e tramite l'attributo name.
// Le motivazioni sono in parte storiche e legate alla funzione di comunicazione
// con il server dei form.
// 
// L'attributo name viene utilizzato dal browser per costruire il contenuto da
// inviare al server.
// In altre parole, se in un form abbiamo una casella di testo definita come
// nell'esempio seguente:
// 
//      <input type="text" id="nome" name="txtNome"/>
// 
// in fase di invio il browser invierà al servere la coppia <nome_controllo, valore>:
//      
//      txtNome = Mario
//      
// Per sottolineare la differenza tra i due possiamo dire che:
//      - id:  ● è utilizzato per identificare un qualsiasi elemento del DOM
//             ● deve essere univoco all'interno di una pagina
//             ● può essere utilizzato nei fogli di stile CSS e consente di recuperare
//               l'elemento con JS tramite il metodo getElementById()
//      
//      - name: ● è utilizzato per l'invio dei dati di un form al server;
//                   può essere utilizzato soltanto per un sottoinsieme degli
//                   elementi del DOM
//                 ● può non essere univoco nella pagina
//                 ● non può essere utilizzato nei fogli di sitle CSS e può essere 
//                    utilizzato con JS tramite il metodo getElementsByName()        





/******************************************************************************
 CONTROLLI E VALORI
 ******************************************************************************/

// Nella maggior parte dei casi la gestione di un form tramite JS richiede
// l'accesso ai suoi controlli e ai valori inseriti dall'utente.
// 
// A controlli diversi corrispondono modalità diverse di interazione con
// l'utente e di gestione dell'input: pensiamo ad esempio alla differenza tra
// l'inserimento di un valore in una casella di testo e la selezione di una voce
// da un elenco in un menù a discesa, oppure le scelte da fare spuntando
// un insieme di checkbox.
// 
// Nonostante queste differenze i controlli mantengono sostanzialmente lo stesso
// approccio per il recupero dei valori in input: attraverso il DOM e con 
// l'accesso alla proprietà value.
// 
// La proprietà value di qualsiasi controllo contiene il suo valore corrente
// indipendentemente dallo specifico tipo di controllo.
// Per esempio prendiamo una casella di testo descritta in questo modo:
//      <input name="nome" value="Andera">
// 
// Ottentiamo il valore della casella piuttosto semplicemente:
var nome = document.forms.myForm.nome.value;
// 
// Ci sono però dei casi particolari che vale la pena di esaminare
// 
// -------------- DROPDOWN MENU' o MENU' "A DISCESA"-----------------
// 
// Iniziamo considerando un controllo piuttosto interessante: esaminiamo il seguente
// menù a discesa:
//      <select name="selProvincia">
//          <option value="RM">Roma</option>
//          <option value="NA">Napoli</option>
//          <option value="TO">Torino</option>
//          <option value="MI">Milano</option>
//      </select>
//      
// possiamo orrenere il valore selezionato dall'utente tramite il seguente codice:
var selectedProvincia = document.forms.myForm.selProvincia.value;
// 
// occorre prestare attenzione alla differenza tra valore del controllo e testo
// visualizzato.
// Ad esempio, nel caso dell'elenco delle province abbiamo visualizzato il nome
// esteso delle città ma abbiamo associato all'attibuto value la relativa sigla.
// Il valore riportato dall'omonima proprietà sarà quindi la sigla della provincia.
// 
// Se cogliamo accedere al valore testuale della voce selezionata dobbiamo adottare
// un approccio diverso:
var selIndex = document.forms.myForm.selProvincia.selectedIndex;
var selItem;
if (selIndex > -1) {
    selItem = document.forms.myForm.selProvincia.options[selIndex];
    console.log(selItem.text);
}
// 
// come possiamo vedere dal codice, abbiamo prima di tutto recuperato l'indice
// dell'elemento selezionato tramite la proprietà selectedIndex.
// Nel caso in cui l'utente non ha effettuato alcuna selezione il valore di questa
// proprietà è -1.
// In caso contrario possiamo sfruttare il suo valore per individuare l'elemento
// option all'interno dell'array options del menù a discesa.
// Il testo della voce selezionata è rappresentato dalla proprietà text della option.
// 
// ----------------------- SELEZIONI MULTIPLE ----------------------
// 
// Purtroppo l'utilizzo della proprietà value non è più sufficiente quando il menù
// a discesa è impostato per consentire la selezione multipla:
//     <select name="selProvincia" multiple="multiple">
//          <option value="RM">Roma</option>
//          <option value="NA">Napoli</option>
//          <option value="TO">Torino</option>
//          <option value="MI">Milano</option>
//      </select>    
// 
// In questo caso la proprietà value restituisce il primo elemento selezionato.
// Per ottenere l'elenco degli elementi selezionati dall'utente occorre eseguire un
// ciclo analogo a quello mostrato di seguito:
var options = document.forms.myForm.selProvincia.options;
var selectedOptions = [];

for (var i = 0; i < options.length; i++) {
    if (options[i].selected)
        selectedOptions.push(options[i].value);
}
// 
// In pratica scorriamo l'elenco delle opzioni associate al controllo alla ricerca di
// quelle con la proprietà selected impostata a true.
// Nel nostro esempio abbiamo inserito i valori delle opzioni selezionate in un array
// selectedOptions.
// 
// --------------------- RADIO BUTTONS ------------------------------
// 
// Nel caso di controlli di tipo radio button occorre fare alcune osservazioni.
// Innanzitutto richiamiamo il fatto che un gruppo di elementi di tipo radio button
// consentono la selezione di un solo elemento del gruppo.
// Il raggruppamento di valori è determinato dal nome associato ai radio button,
// quindi se ad esempio in un form vogliamo consentire la selezione del sesso
// dobbiamo assegnare lo stesso valore all'attributo name di entrambi i radio
// button:
//      <label><input type="radio" name="sesso" value="M">Maschio</label>
//      <label><input type="radio" name="sesso" value="F">Femmina</label>
//      
// In questo caso il riferimento a document.myForm.sesso restituisce un array
// di 2 elementi.
// Tuttavia possiamo stabilire quale dei due elementi è stato selezionato
// semplicemente accedendo alla proprietà value dell'array:
var sesso = document.forms.myForm.sesso.value;
// 
// La proprietà value dei controlli restituisce il loro valore corrente rappresentandolo
// come stringa.
// Pertanto, quando dobbiamo elaborare il valore di un controllo dovremmo
// convertirlo nel tipo di dato previsto.
// Ad esempio, se in una casella di testo ci aspettiamo un valore
// numerico, prima di effettuare dei calcoli su di esso dovremmo convertirlo
// tramite parseInt() o parseFloat().
// 
// Possiamo tuttavia ricorrere alla proprietà valueAsNumber o valueAsDate per
// ottenere il controllo già convertito.





/******************************************************************************
 INIZIALIZZARE UNA FORM, DEFAULT E RESET
 ******************************************************************************/

// Possiamo individuare alcune fasi nel processo di acquisizione dei dati
// tramite un form in corrispondenza delle quali è possibile intervenire
// con JS con lo scopo di rendere semplice ed efficace l'inserimento dei dati
// da parte dell'utente.
// Le fasi fondamentali sono:
//          - Inizializzazione: è la fase di preparazione del form, prima di essere
//                               visualizzato dall'utente
//          - Validazione: è la fase di verifica di validità e consistenza dei dati
//                           inseriti dall'utente prima dell'invio al server o
//                           comunque prima di una elaborazione
//          - Invio: in questa fase i dati raccolti vengono inviati al server
//          - Annullamento: questa è la fase in cui eventualmente l'utente decide di
//                               annullare i dati inseriti nella form evitando quindi di
//                               inviarli al server o sottoporli a elaborazione.
//           - Elaborazione: in questa fase i dati inseriti dall'utente vengono 
//                              elaborati sul client per fornire una risposta all'utente
//                              oppure vendono preparati in qualche modo prima di
//                              inviarli al server
//                             
// Per ciascuna di queste fasi vedremo come JS può sfruttare le API previste
// dal DOM per gestire meglio i dati inseriti dall'utente offrendogli la migliore
// user experience.
// 
// ------------- INIZIALIZZARE UN FORM IN JS --------------------------
// 
// La fase di inizializzazione di un form consiste nell'impostare i valori iniziali dei
// suoi controlli.
// L'inizializzazione dei valori è in realtà un processo che il browser esegue
// automaticamente in base al markup degli elementi del form.
// Quindi, se ad esempio il form contiene il seguente markup:
//          <input type="text" name="txtNome" value="Mario"/>
// 
// appare a video una casella di testo già inizializzata con il valore Mario.
// Anche la proprietà value del corrispondente elemento DOM sarà inizializzata
// allo stesso valore.
// 
// Potremmo però voler inizializzare i controlli di un form dinamicamente in base
// a determinate condizioni.
// Ad esempio, potremmo voler inizializzare una casella di testo con il nome
// dell'utente fornitoci dal server o comunque presente in una variabile JS.
// In questo caso dobbiamo impostare la proprietà value del controllo al valore
// iniziale non appena è stato caricato il DOM:
var userName = "Giuseppe";
window.addEventListener("load", function () {
    var txtNome = document.forms.myForm.txtNome;
    txtNome.value = userName;
});
// 
// Analogamente, potremmo voler visualizzare o meno alcuni controlli in base
// a condizioni che dipendono dalla logica applicativa.
// Ad esempio, in un form che richiede l'inserimento di dati personali potremmo
// visualizzare un controllo per specificare la nazionalità solo se l'utente
// ha dichiarato di non essere cittadino italiano:
if (!utente.cittadinanzaItaliana) {
    document.forms.myForm.txtNazionalità.style.visibility = "visible";
} else {
    document.forms.myForm.txtNazionalità.style.visibility = "hidden";
}
// 
// Potremmo inoltre voler impostare dinamicamente elementi preselezionati come
// ad esempio in un menù a discesa o in un gruppo di radio button.
// Nel primo caso possiamo procedere impostando opportunamente la
// proprietà selectedIndex con il valore dell'indice dell'elemento desiderato:
document.forms.myForm.selProvincia.selectedIndex = 2;
// 
// Nel caso di impostazione di un elemento in un gruppo di radio button occorre
// preventivamente associare a ciascun elemento un identificatore:
//      <label><input type="radio" id="radioMaschio" name="sesso" value="M">Maschio</label>
//      <label><input type="radio" id="radioFemmina" name="sesso" value="F">Femmina</label>
// 
// A questo punto, per impostare ad esempio la scelta predefinita sulla voce
// maschio scriviamo il seguente codice:
document.getElementById("radioMaschio").checked = true;
// 
// Questo esempio dovrebbe rendere evidente la differenza tra gli attributi id e
// name di cui abbiamo già discusso.
// 
// ----- VALORE INIZIALE E VALORE CORRENTE, GESTIRE IL RESET ---------
// 
// Particolare attenzione va posta sulla differenza tra il valore iniziale di un
// controllo ed il suo valore corrente.
// Intuitivamente il valore iniziale di un controllo è quello predefinito in fase
// di creazione o eventualmente quello specificato tramite l'attriubuto value.
// Il valore corrente è il valore che un certo controllo ha in un determinato
// momento: esso può coincidere con il valore iniziale o con il valore inserito o
// modificato dall'utente o da uno script.
// 
// Quando il contenuto del form viene annullato tramite il pulsante di tipo reset,
// il valore corrente di ciascun controllo del form viene ripostato al suo valore iniziale.
// 
// Se intendiamo gestire la fase di inzializzazione del form tramite JS dobbiamo tener
// presente che i valori impostati dinamicamente dal nostro codice non rappresentano
// i valori iniziali, ma valori correnti.
// Quindi, in presenza di un reset del form perderemmo le nostre inizializzazioni dal
// momento che tutti i controlli verrebbero portati ai valori iniziali e non a
// quelli dinamicamente impostati dal nostro script di inizializzazione.




/******************************************************************************
 VALIDARE UN FORM IN JS
 ******************************************************************************/

// Uno degli usi classici di JS è la validazione dei dati inseriti dall'utente in un
// form prima dell'invio al server o comunque prima della loro elaborazione.
// Verificare che un valore obbligatorio sia stato effettivamente fornito dall'utente
// e che il valore inserito in una casella di testo sia un numero eventualmente
// compreso tra i valori ammessi, o che la lunghezza di una stringa non superi una
// dimensione massima prefissata consente di evitare errori talvolra critici in
// fase di elaborazione dei dati.
// 
// L'introduzione di constraint validation API in HTML5 ha notevolmente
// semplificato il compito di JS rendendo in diversi casi quasi non necessario
// il ricorso ad uno script per validare i dati.
// 
// In sintesi, i constraint validation consentono di impostare dei vincoli sulla
// validità dei dati con un approccio dichiarativo, sfruttando una serie di
// attributi come ad esempio required, per indicare che l'inserimento di un
// valore è obbligatorio, o mi e max, per indicare il valore minimo e massimo
// che può essere inserito nel controllo.
// Il seguente è un esempio di casella di testo che richiede l'inserimento obbligatorio
// di un valore:
//      <input type="text" required />
//      
// Sarà compito del browser analizzare tali vincoli in fase di invio e mostrare un
// messaggio all'utente nel caso in cui non vengano rispettati.
// 
// Tuttavia, utilizzando JS, abbiamo la possibilità di intervenire sul meccanismo
// automatico di validazione e di estenderlo con criteri personalizzati.
// 
// ------------- EVENTI LEGATI AI CONTROLLI UTENTE -------------------
// 
// Un primo aspetto che possiamo decidere è quando deve avvenire la validazione.
// Il comportamento predefinito del browser prevede che la validazione
// automatica dei dati venga effettuata in corrispondenza dell'invio al server,
// ma potremmo decidere di validare i dati quando l'utente passa da un controllo
// all'altro o quando il valore di un controllo cambia.
// Decidere quando validare i dati inseriti dall'utente corrisponde
// alla decisione di quale dei seguenti 3 eventi gestire:
//          - submit: l'evento di un form che si verifica quando si stanno per inviare i
//                      dati al server; per annullare l'invio dei dati nel caso in cui essi
//                      non siano validi è sufficiente che il gestore dell'evento restituisca
//                      il valore booleano false
//          - blur: questo evento si verifica quando un controllo perde il focus 
//                   perché l'utente si sta spostando verso un altro controllo
//          - change: evento di un controllo che indica che il suo valore è stato
//                      modificato
//                      
// Considerata la disponibilità di questi eventi, vediamo come possiamo
// intervenire per personalizzare la validazione predefinita.
// 
// Le constraint validation API aggiungono alcune proprietà sia ai form che ai
// controlli che ci consentono di verificare ed interagire con i vincoli di
// validazione.
// Ad esempio, la proprietà willValidate ci consente di stabilire se un controllo
// è sottoposto ad un vincolo di validità o meno.
// 
// La proprietà ha un valore booleano che vale true se per il controllo sono stati
// specificati uno o più attributi di validazione ed il controllo di validità su di
// esso non è stato inibito; la proprietà ha valore false se il controllo di validità
// è stato inibito, ad esempio quando il controllo è disabilitato; ha infine un valore
// undefined quando non è stato specificato alcun attributo di validità.
// 
// Altra proprietà, sicuramente molto più utile della precedente è validity.
// Essa è un oggetto che ci consente di verificare se un controllo è valido
// e di risalire al vincolo eventualmente non rispettato.
// Consideriamo, ad esempio, il seguente codice:
var txtNome = document.forms.myForm.txtNome;
txtNome.addEventListener("blur", function (e) {

    var messaggio = "";
    if (!e.target.validity.falid) {
        if (e.target.validity.tooLong) {
            messaggio = messaggio + "Superato il numero massimo di caratteri consentito! ";
        }
        if (e.target.validity.valueMissing) {
            messaggio = messaggio + "L'inserimento di un valore è obbligatorio! ";
        }
        e.target.setCustomValidity(messaggio);
    }
});
// 
// ---------------- L'OGGETTO VALIDITY -------------------------------
// 
// Come possiamo vedere, abbiamo deciso di intervenire nella validazione predefinita
// del browser gestendo l'evento blur.
// Abbiamo sfruttato la proprietà valid dell'oggetto validity per stabilire se il controllo
// è valido.
// Nel caso in cui non sia valido, abbiamo verificato le proprietà tooLong e valueMissing
// per stabilire quale vincolo non è stato rispettato.
// Abbiamo quindi composto un messaggio relativo ai vincoli non rispettati e lo
// abbiamo impostato tramite setCustomValidity() come messaggio da visualizzare
// al posto di quello predefinito del browser.
// 
// Di seguito l'elenco delle proprietà dell'oggetto validity, tutte di tipo booleano,
// che ci consentono di verificare i vincoli eventualmente imposti ad un controllo:
//         - patternMismatch: è true se il valore inserito dall'utente non rispetta
//                                 l'espressione regolare indicata tramite l'attributo
//                                 pattern
//         - rangeOverflow: vale true se il valore del controllo supera quello specificato
//                              nell'attributo max
//         - rangeUnderflow: è true se il valore del controllo è inferiore a quello
//                               specificato nell'attributo min
//         - stepMismatch: è true se il valore del controllo non rispetta l'incremento
//                             stabilito dall'attributo step
//         - tooLong: vale true se la lunghezza della stringa associata al controllo
//                      supera il valore previsto dall'attributo maxlength
//         - typeMismatch: è true se il valore del controllo è di tipo diverso da quello
//                             previsto dall'attributo type
//         - value missing: value true se l'utente non ha inserito un valore come
//                             richiesto dall'attributo required
// 
// Nell'esempio precedente abbiamo utilizzato il metodo setCustomValidity() per
// personalizzare il messaggio d'errore predefinito del browser. 
// Lo stesso metodo può essere utilizzato per impostare un proprio criterio di 
// validazione, non basato quindi sui vincoli previsti dai constraint validation.
// 
// Consideriamo ad esempio il caso in cui vogliamo consentire all'utente la modifica di
// una password e presentiamo su un form due campi password il cui valore deve
// coincidere per poter procedere con la modifica.
// Possiamo integrare il nostro criterio di validazione nel sistema di validazione 
// predefinito gestendo, ad esempio, l'evento change come mostrato di seguito:
var txtPassword1 = document.forms.myForm.txtPassword1;
var txtPassword2 = document.forms.myForm.txtPassword2;

var checkPassword = function () {
    if (txtPassword1.value != txtPassword2.value) {
        txtPassword1.setCustomValidity("Le password non corrispondono");
    } else {
        txtPassword1.setCustomValidity("");
    }
};

txtPassword1.addEventListener("change", checkPassword);
txtPassword2.addEventListener("change", checkPassword);
// 
// Questo è il classico cado di una "modifica password".
// Tramite setCustomValidity() impostiamo un messaggio in caso di non validità
// oppure lasciamo la stringa vuota, ad indicare una validazione implicita, nel caso in
// cui i valori sono validi.
// 
// In aggiunta alla proprietà validity, ciascun controllo e ciascun form prevede il
// metodo checkValidity() il cui scopo è analogo a quello previsto dalla proprietà
// validity.valid, ma con alcune caratteristiche interessanti.
// 
// Nel caso di un singolo controllo, esso verifica la sua validità e restituisce true o
// false se il controllo è valido o meno.
// Nel caso di form, invece, il metodo checkValidity() verifica la validità di tutti i
// controlli contenuti in esso su cui sono impostati dei vincoli di validazione, 
// restituendo true se sono tutti validi, false se almeno un controllo non è valido.
// 
// Sia per i form che per i singoli controlli, il metodo genera un evento invalid
// sul controllo non valid mettendo a disposizione quindi un'ulteriore modalità di 
// presonalizzazare la validazione dei controlli.
// 
// In particolare l'accoppiata checkValidity() e invalid può risultare utile quando non
// intendiamo utilizzare un pulsante di tipo submit per inviare i dati raccolti
// dal form, ad esempio nel caso di elaborazione dei dati sul client tramite JS,
// o quando abbiamo disabilitato la validazione automatica del form tramite
// l'attributo novalidate:
//      <form novalidate>
//          ...
//      </form>




/******************************************************************************
 INVIO ED ELABORAZIONE DEI DATI DI UN FORM
 ******************************************************************************/

// Quando l'utente clicca su un pulsante di tipo submit, il browser crea un elenco
// di coppie composte dal nome del controllo e dal valore corrente e lo
// invia al server codificandolo in base alla modalità specificata nell'attributo enctype
// del form.
// 
// Come abbiamo visto, in questa fase viene generato l'evento submit che ci consente
// do intercettare il momento dell'invio ed eventualmente annullarlo facendo
// in modo che il gestore restituisca il valore false.
// Naturalmente è possibile annullare l'inviao dei dati al server anche tramite
// l'invocazione del metodo preventDefault() dell'oggetto evento:
document.forms.myForm.addEventListener("submit", function (e) {
    // ...
    e.preventDefault();
});
// 
// È utile sottolineare che, in presenza di vincoli di validazione automatica, l'evento
// submit non sarà scatenato fino a quando tutti i vincoli non verranno soddisfatti.
// Quindi, in questo caso, se vogliamo effettuare delle elaborazioni prima dell'invio
// dei dati al server dobbiamo attendere che siano validi prima tutti i controlli.
// 
// È possibile che, in determinate situazioni, non si intenda utilizzare un pulsante di
// tipo submit, ad esempio perché si vuole utilizzare un link o un altro elemento
// grafico.
// In questi casi è possibile inviare al server i dati tramite il metodo submit() del form:
var lnkSubmit = document.getElementById("lnkSubmit");

lnkSubmit.addEventListener("click", function (e) {
    document.forms.myForm.submit();
    e.preventDefault();
});
// 
// Il link si comportetà nello stesso modo di un classico pulsante di tipo submit.
// 
// -------------------- ANNULLAMENTO ------------------------------ 
// 
// Quando l'utente clicca su un pulsante di tipo reset, i controlli della form corrente
// acquisiscono il loro valore iniziale.
// Come abbiamo puntializzato a suo tempo, se abbiamo effettuato una inizializzazione
// personalizzata dei controlli di un form, il ripristino del loro valore iniziale
// comporta la perdita dell'effetto della nostra inizializzazione.
// 
// Tuttavia, anche in questo caso abbiamo la possibilità di intercettare la richiesta
// di annullamento del form tramite l'evento reset.
// In corrispondenza di questo evento possiamo invocare la nodtra funzione di
// inizializzazione ed inibire il reset predefinito del form:
document.forms.myForm.addEventListener("reset", function (e) {
    inizializzaForm();
    e.preventDefault();
});
// 
// Come per l'invio dei date della form, anche per l'annullamento abbiamo a
// disposizione un metodo che ci consente di trasformare un qualsiasi elemento in un
// pulsante di tipo reset:
var lnkReset = document.getElementById("lnkReset");

lnkReset.addEventListener("click", function (e) {
    document.forms.myForm.reset();
    e.preventDefault();
});
// 
// ------------------- ELABORAZIONE --------------------------------
// 
// L'elaborazione dei dati raccolti tramite un form è in genera affidata al server che
// risponde fornendo al browser una pagina con il risultato, salvo diverse
// modalità di interazione che vederemo ins eguito.
// 
// In alcuni casi, tuttavia, è opportuno effettuare le elaborazioni direttamente sul
// browser sfruttando JS.
// Si pensi ad esempio al caso in cui l'elaborazione sia soltanto un calcolo sui valori
// inseriti dall'utente.
// 
// Il calcolo n questione può benissimo essere eseguito con un'espressione in JS.
// In pratica, in corrispondenza al seguente markup:
//          <form name="myForm">
//              <p><label>Quantità: <input type="number" id="txtQta" value="0" min="0" required /></label></p>
//              <p><label>Prezzo:   <input type="number" id="txtPrezzo" value="0" min="0" required /></label></p> 
//              <p><label>IVA:      <input type="number" id="txtIVA" value="0" min="4" required /></label>%</p>
//              <p><button id="btnCalcola">Calcola</button> Totale: <span id="spnTotale"></span></p>
//          </form>
// 
// avremo questo codice che effettua il calcolo senza necessità di inviare dati al server:
var myForm = document.forms.myForm;

myForm.addEventListener("submit", function (e) {
    var spnTotale = document.getElementById("spnTotale");
    var txtQta = document.getElementById("txtQta");
    var txtPrezzo = document.getElementById("txtPrezzo");
    var txtIVA = document.getElementById("txtIVA");

    spnTotale.innerHTML = (txtQta.valueAsNumber * txtPrezzo.valueAsNumber) + (txtQta.valueAsNumber * txtPrezzo.valueAsNumber * txtIVA.valuesAsNumber) / 100;
    e.preventDefault();
});
// 
// Come possiamo vedere, abbiamo inibito il submit della form calcolando il risultato
// tramite un'espressione JS il cui valore viene visualizzato all'interno dello <span>
// spnTotale.
