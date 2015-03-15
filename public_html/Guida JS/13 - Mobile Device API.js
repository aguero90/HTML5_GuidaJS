
/******************************************************************************
 DEVICE ORIENTATION API
 ******************************************************************************/

// L'accesso al Web da parte dei dispositivi mobili ha fatto emergere l'esigenza
// di dover gestire nelle pagine HTML situazioni prima non contemplate,
// come la rotazione dello schermo, l'interazione touch, la geolocalizzazione,
// ecc.
// Queste nuove esigenze hanno indotto il W3C a definire una serie di specifiche
// per consentire la gestione tramite JS di funzionalità tipiche del mondo
// mobile.
//
// Esploriamo in questa sezione le modalità di gestione di queste funzionalità
// con JS
//
// Una delle prime problematiche che si presentano nel mondo mobile è la
// gestione dell'orientamento del dispositivo.
// Mentre per un classico PC possiamo assumere che una pagina Web venga vista
// con un orientamento stabile dello schermo, un dispositivo mobile può
// trovarsi in posizione verticale (portrait) o orizzontale (landscape) e può
// ruotare liberamente nello spazio anche durante la navigazione.
// Questo comporta da un lato la necessità di adeguare dinamicamente i
// contenuto di una pagina all'orientamento corrente dello schermo, dall'altro
// l'ideazione di nuove funzionalità prima non concepibili, come ad esempio
// giochi di abilità basati sull'equilibrio o modalità di interazione basate
// sul movimento del dispositivo.
//
// Possiamo sfruttare le Device Orientation API
// (http://www.html.it/articoli/html5-device-orientation-api-e-websocket-2/)
// di JS con cui intercettare non solo il cambiio di orientamento, ma anche
// il movimento e l'accelerazione di un dispositivo.




/******************************************************************************
 DeviceOrientationEvent
 ******************************************************************************/

// Per individuare i cambi di orientamento del dispositivo possiamo sfruttare
// l'evento DeviceOrientationEvent generato dall'accelerometro.
// La prima cosa da fare è verificare se l'evento è supportato e in caso
// affermativo assegnare un gestore d'evento:
if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", handleOrientation);
}
//
// La funzione handleOrientation() sarà invocata tutte le volte che viene
// intercettata una variazione dell'orientamento del dispositivo.
// Ad essa viene passato l'oggetto event contenente informazioni sull'orientamento
// corrente rappresentante da quattro proprietà:
//      - absolute: un valore booleano che indica il sistema di coordinate da
//                  prendere in considerazione:
//                      - true: il sistema è quello terrestre, cioè quello che
//                              considera il centro della terra come origine,
//                              l'asse X parallelo alla superficie terrestre
//                              e orientato verso est, l'asse Y parallelo alla
//                              superficie terrestre e orientato verso nord e
//                              l'asse Z perpendicolare alla superficie terrestre
//                              e orientato verso l'alto
//                     - false: il sistema è basato sul dispositivo stesso, con
//                              l'origine coincidente con il centro del dispositivo,
//                              l'asse X parallelo allo schermo e orientato verso
//                              destra, l'asse Y parallelo allo schermo e orientato
//                              verso l'altoe l'asse Z perpendicolare allo schermo
//                              e orientato fuori dal dispositivo
//      - alpha: indica la rotazione del dispositivo intorno all'asse Z con un
//               valore che va da 0° a 360° ( rispetto al sistema di coordinate
//               adottato )
//      - beta: lo spostamento intorno all'asse X con un valore che va da -180°
//              a 180° ( rispetto al sistema di coordinate adottato )
//      - gamma: la rotazione del dispositivo intorno all'asse Y con un valore
//               che va da -90° a 90° ( rispetto al sistema di coordinate adottato )
//
// Ad esempio, considerando il sistema di coordinate relativo al dispositivo,
// i seguenti valori indicano la ritazione di 45° verso destra del lato destro,
// cioè il lato destro che si abbassa di 45° e il lato sinistro che si alza di
// 45°:
// {alpha: 0, beta: 0, gamma: 0}
//
// Il seguente esempio mostra i valori relativi all'orientamento del dispositivo
// e ruota un'immagine in funzione di questi parametri applicando la proprietà
// CSS transform:
function handleOrientation(event) {

    document.getElementById("absolute").innerHTML = event.absolute;
    document.getElementById("alpha").innerHTML = event.alpha;
    document.getElementById("beta").innerHTML = event.beta;
    document.getElementById("gamme").innerHTML = event.beta;

    document.getElementById("image").style.transform = "rotate(" + event.gamma + "deg) rotate3d(1, 0, 0," + (event.beta * -1) + "deg)";
}





/******************************************************************************
 DeviceMotionEvent
 ******************************************************************************/

// In modo analogo all'orientamento del dispositivo possiamo intercettare e
// gestire alcuni dettagli sul movimento.
// Ci viene in aiuto in questo caso l'evento DeviceMotionEvent
if (window.DeviceMotionEvent) {

    window.addEventListener("devicemotion", handleMotion);
}
// Come possiamo vedere, la modalità di intercettazione dell'evento è quella
// solita.
// Al verificarsi di un movimento del dispositivo verrà generato l'evento
// devicemotion ed invocata la funzione di callback handleMotion a cui
// sarà passato l'oggetto event con le seguenti informazioni:
//      - acceleration: l'accelerazione registrata dal dispositivo espressa in
//                      metri per secondo quadrato (m/s^2); essa è rappresentata
//                      da un oggetto con le proprietà x, y e z rappresentanti
//                      rispettivamente l'asse da ovest verso est, l'asse da
//                      sud a nord e l'asse perpendicolare alla terra
//      - accelerationIncludingGravity: come la precedente ma include
//                                      nell'accelerazione del dispositivo
//                                      anche l'accelerazione di gravità
//      - rotationRate: la velocità di rotazione intorno a ciascun asse
//                      espresso in gradi al secondo; le sue proprietà alpha,
//                      beta e gamma corrispondono a quanto visto a proposito
//                      dell'orientamento del dispositivo
//      - interval: indica l'intervallo di tempo in millisecondi di rilevazione
//                  del movimento da parte dell'hardware del dispositivo
//
// Per comprendere la differenza tra la proprietà acceleration e la proprietà
// accelerationIncludingGravity, consideriamo un dispositivo non in movimento
// posato su un tavolo.
// La proprietà acceleration sarà rappresentata dal seguente oggetto:
// {x: 0, y: 0, z: 0}
//
// Non c'è nessun movimento, quindi nessuna accelerazione.
//
// La proprietà accelerationIncludingGravity sarà invece rappresentata dal
// seguente oggetto:
// {x: 0, y: 0, z: 9.81}
//
// Pur essendo fermo, il dispositivo è soggetto alla forza di gravità
// sull'asse Z.
//
// Nel seguente esempio sfruttiamo le informazioni sul movimento del
// dispositivo per scorrere una sequenza di immagini:
function handleMotion(event) {

    var img = document.getElementById("immagine");

    if (event.accelerationIncludingGravity.x < -10) {

        currentImageIndex = (currentImageIndex + 1) % imageList.length;
        img.src = imageList[currentImageIndex];
    }

    if (event.accelerationIncludingGravity.x > 10) {

        currentImageIndex = (currentImageIndex - 1 + imageList.length) % imageList.length;
        img.src = imageList[currentImageIndex];
    }
}
//
// Nell'esempio supponiamo che l'array imageList contenga l'elenco degli URL
// delle immagini e che la variabile currentImageIndex rappresenti l'indice
// dell'immagine corrente.
// Quando il dispositivo viene scosso verso destra con un'accelerazione
// superiore all'accelerazione di gravità viene visualizzata l'immagine
// successiva, se invece viene scosso verso sinistra con analoga intensità
// viene visualizzata l'immagine precedente.




/******************************************************************************
 Geolocation API
 ******************************************************************************/

// La possibilità di individuare la posizione corrente di un dispositivo apre
// la strada a inummerevoli applicazioni: dalla ricerca di esercizi pubblici
// intorno alla località in cui si trova l'utente al suggerimento di itinerari,
// dalla pubblicità locale alle previsioni meteo geolocalizzate.
// Da un punto di vista tecnico, il rilevamento della posizione di un dispositivo
// è basato su diversi approcci: sfruttando la presenza di hardware GPS
// dedicato, utilizzando dati dedotti dalla rete wireless e/o cellulare,
// analizzando l'indirizzo IP.
//
// Indipendentemente dall'approccio utilizzato, possiamo gestire con JS le
// informazioni fornite dal sistema con un'approccio uniforme grazie alle
// API di geolocalizzazione definiete dal W3C.
//
// Occorre tener presente che, indipendentemente dal supportodel rivelamento
// della posizione corrente, l'utente deve esplicitamente autorizzare il
// browser o l'applicazione mobile a fornire informazioni sulla propria
// posizione.
//
// La prima cosa da fare per accedere alla posizione corrente dell'utente è
// verificare il supporto della specifica funzionalità.
// Analogamente a come abbiamo visto anche per le altre funzionalità, ciò può
// essere fatto molto semplicemente verificando l'esistenza dell'oggetto
// geolocation:
if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(mostraPosizione);
}
//
// Dall'esempio vediamo come, nel caso in cui il supporto alla geolocalizzazione
// sia presente, invochiamo il metodo getCurrentPosition() dell'oggetto
// geolocation.
// Nella sua forma più semplice, il metodo prevede un argomento che rappresenta
// la funzione di callback da invocare non appena sono disponibili le
// informazioni sulla posizione corrente.
//
// Nel nostro caso la funzione mostraPosizione() potrebbe essere definita come
// nel seguente esempio:
function mostraPosizione(posizione) {

    console.log("Latitudine: " + posizione.coords.latitude);
    console.log("Longitudine: " + posizione.coords.longitude);
}
//
// La funzione prevede l'argomento posizione che rappresenta le informazioni
// passate dal sistema sulla posizione dell'utente.
// Nel nostro caso utilizziamo la latitudine e la longitudine, ma l'oggtto
// prevede anche altre proprietà:
//      - coords.latitude: la latitudine espressa come valore decimale
//      - coords.longitude: la longitudine espressa come valore decimale
//      - coords.accurancy: il livello di accuratezza nel calcolo della
//                          posizione espressa in metri
//      - coords.altitudeAccurancy: il livello di accuratezza nel calcolo
//                                  dell'altitudine espressa in metri
//      - coords.heading: la direzione del movimenti del dispositivo espressa
//                        in gradi di discostamento in senso orario dal nord
//      - coords.speed: la velocità del movimento del dispositivo espressa
//                      in metri al secondo
//      - timestamp: la data e ora del rilevamento della posizione
//
// Come possiamo vedere, le specifiche prvedono un'ampia gamma di informazioni
// relative alla posizione dell'utente e al suo movimento.
// Tuttavia non è detto che tutte queste informazioni siano disponibili dal
// momento che dipendono dall'hardware adottato dal dispositivo.
// Le uniche proprietà che devono essere garantite sono coords.latitude,
// coorde.longitude, coords.accurancy e timestamp
//
// Si possono verificare situazioni in cui, pur essendo supportato il rilevamento
// della posizione, il dispositivo non è in grado di fornirci le relative
// informazioni.
// Situazioni del genere possono verificarsi ad esempio se l'utente non ha
// autorizzato il browser o l'applicazione all'utiliazzo della funzionalità,
// se l'utente è offline o non ha attivato il rilevatore GPS o è in una posizione
// fuori campo di rilevazione ecc.
//
// In questi casi sarebbe opportuno gestire la situazione ed eventualmente
// segnalare all'utente l'impossibilità di effettuare il rilevamento della
// posizione.
// A questo scopo il metodo getCurrentPosition() prevede la possibilità di
// passare come secondo parametro la funzione di callback da eseguire quando si
// verifica un errore:
if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(mostraPosizione, gestisciErrore);
}
//
// La funzione gestisciErrore() riceve un oggetto error il cui campo code
// indica la causa dell'errore:
function gestisciErrore(error) {

    switch (error.code) {

        case error.PERMISSION_DENIED:
            console.log("Permesso negato dall'utente");
            break;
        case error.POSITION_UNAVIABLE:
            console.log("Impossibile determinare la posizione corrente");
            break;
        case error.TIMEOUT:
            console.log("Il rilevamento della posizione impiega troppo tempo");
            break;
        case error.UNKNOWN_ERROR:
            console.log("si è verificato un errore sconosciuto");
            break;
    }
}
//
// Tra le varie cause di errore vediamo la situazione in cui il rilevamento della
// posizione corrente impiega troppo tempo tanto da superare un timeout.
// In base alle specifiche del W3C non è previsto un timeout predefinito per il
// rilevamento della posizione.
// Per impostarlo occorre passare al metodo getCurrentPosition() un terzo
// parametro:
if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(mostraPosizione, gestisciErrore, opzioni);
}
//
// Il parametro opzioni è un oggetto che può prevedere le seguenti proprietà:
//      - enableHighAccurancy: booleano che abilita o meno un'alta accuratezza
//                             nel rilevamento della precisione
//      - timeout: quantità massima di millisecondi entro cui ottenere
//                 informazioni sulla posizione corrente
//      - maximumAge: il tempo espresso in millisecondi per cui è possibile
//                    riutilizzare una posizione precedentemente rilevata
//
// Mentre il significato della proprietà timeout dovrebbe essere abbastanza
// autoesplicativo, per le proprietà enableHighAccurancy e maximumAge
// proviamo a dare qualche informazione in più.
//
// ----------------- ACCURATEZZA ED ERRORE DEL RILEVAMENTO ---------------------
//
// Abbiamo detto che le informazioni sulla posizione dell'utente vengono
// calcolate sfruttando diversi approcci: informazione di rete, rilevatori GPS,
// ecc.
// Ciascuno di questi approcci ha un proprio livello di accuratezza.
//
//      - con l'indirizzo IP l'accuratezza è scarsa: in genere si riesce ad
//        identificare un territorio come una città se non una provincia.
//      - con la rete cellulare molto dipende dalla densità di celle presenti
//        intorno all'utente: l'accuratezza potrebbe andare dall'ordine di
//        centinaia di metri fino ad alcuni chilometri
//      - il sistema GPS offre invece una precisione dell'ordine di qualche metro.
//
// Un dispositivo cerca di sfruttare tutte le opzioni disponibili fornendo
// l'informazione ottenuta più velocemente, non necessariamente quindi quella
// più precisa.
// Impostando la proprietà enableHighAccurancy a true chiediamo di ottenere la
// posizione più precisa possibile, anche a costo di attendere un po' di più.
//
// Per cercare di ottimizzare la velocità di recupero delle informazioni sulla
// posizione corrente da un lato e di preservare il consumo di batteria per i
// dispositivi mobili dall'altro, è possibile fare in modo di memorizzare in
// una sorta di cache dedicata l'ultimo rilevamento effettuato ed indicare
// tramite la proprietà maximumAge per quanto tempo riutilizzare l'informazione
// per le successive richieste.
//
// Questo vuol dire, ad esempio, che le seguenti impostazioni richiedono
// un'elevata accuratezza del rilevamento, che una posizione può essere
// considerata valida per un minuto e che un rilevamento deve essere completato
// entro 5 secondi:
if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(
            mostraPosizione,
            gestisciErrore,
            {enableHigAccurancy: true, maximumAge: 60000, timeout: 5000});
}
//
// Naturalmente le diverse impostazioni dipendono dal tipo di applicazione che
// sviluppiamo.
//
// Se ad esempio la nostra applicazione fornisce informazioni meteo, non è
// necessario utilizzare un'elevata accuratezza nel rilevamento della
// posizione e possiamoriutilizzare l'ultimo rilevamento per diversi minuti o
// anche per qualche ora.
//
// Se invece dobbiamo fornire informazioni per guidare l'utente su un percorso,
// allora abbiamo bisogno di avere la sua posizione precisa e di rilevarla
// continuamente.
// In questo caso può aiutarci il metodo watchPosition() in alternativa a
// getCurrentPosition().
//
// Infattim mente getCurrentPosition() richiede attivamente la posizione
// corrente, watchPosition() ottiene automaticamente la posizione corrente
// ogni volta che c'è una variazione.
// Entrabi i metodi prevedono gli stessi prametri, tuttavia watchPosition()
// retituisce un valore numerico che indica la watch associata:
var watch;
if (navigator.geolocation) {

    watch = navigator.geolocation.watchPosition(
            mostraPosizione,
            gestisciErrore,
            {enableHigAccurancy: true, maximumAge: 10000, timeout: 2000});
}
//
// Il metodo watchPosition() funziona in maniera del tutto analoga al metodo
// setInterval() per la gestione dei timer.
// In maniera altrettanto analoga, se vogliamo interrompere il rilevamento
// continuo della posizione utilizzeremo clearWatch() passandogli l'identificatore
// della watch da eliminare:
navigator.geolocation.clearWatch(watch);




/******************************************************************************
 TOUCH API
 ******************************************************************************/

// Uno dei tratti distintivi del mondo mobile è la modalità di interazione
// pasata sul tocco delle dita.
// Nella maggior parte dei casi, il contatto delle dita con un punto dello schermo
// di un dispositivo mobile può essere assimilato al click del mouse della classica
// interazione tramite PC.
// Infatti la maggior parte dei browser mappa in modo automatico il tocco delle
// dita ad eventi del mouse.
//
// Tuttavia il modello di interazione touch è più variegato e prevede diverse
// modalità di tocco dello schermo come anche l'utilizzo di più dita
// contemporaneamente.
// Basti pensare alle oramai comuni gesture di swipe, zoom e pinch o alla
// rotazione di elementi
//
// Limitarsi a gestire l'interazione mobile con un sito o un'applicazione tramite
// i classici eventi del mouse è un approccio troppo semplicistico che penalizza
// l'esperienza utente
//
// Allo stato attuale sono previste due API standardizzate per la gestione
// dell'interazione touch:
//          - Touch Event: nata da una proposta Apple, prevede la gestione di
//                         una serie di eventi specifici per l'interazione
//          - Pointer Events: proposta da Microsoft, tende ad unificare le
//                            modalità di interazione proponendo un'API unica
//                            per mouse, dita, penne ed eventuali altri
//                            dispositivi di puntamento che potranno apparire
//                            sul mercato in futuro.
//
// Purtroppo il supporto diretto di entrambe le API da parte dei browser più
// diffusi non è attualmente uniforme, anche se esistono diverse librerie che le
// emulano consentendone di fatto l'utilizzo anche se non in maniera nativa.
//
// ------------------------------- TOUCH EVENTS --------------------------------
//
// L'API TOuch events, come abbiamo accennato prima, si concentra sull'interazione
// tramite il tocco delle dita su un touch screen.
// Essa introduce quattro eventi specifici:
//          - touchstart: si verifica al primo contatto del dito con un elemento
//                        del DOM
//          - touchend: si verifica quando il dito non è più in contattto con
//                      l'elemento del DOM
//          - touchmove: si verifica quando il dito si sposta sullo schermo
//                       mantenendo il contatto
//          - touchcancel: si verifica in presenza di una condizione per cui è
//                         necessario annullare l'evento touch, ad esempio
//                         quando sullo schermo sono presenti più punti di
//                         contatto di quanti il dispositivo è in grado di
//                         supportare
//
// La gestione di ciascun evento viene fatto nel solito modo.
// Ad esempio, il seguente codice colora di rosso lo sfondo di un <div>
// presente su una pagina Web non appena viene toccato e ripristina il suo
// colore originario quando termina il contatto:
var coloreOriginario;
var myDiv = Document.getElementByID("myDiv");

myDiv.addEventListener("touchstart", function () {

    coloreOriginario = myDiv.style.backgroundColor;
    myDiv.style.backgroundColor = "red";
});

myDiv.addEventListener("touchend", function () {

    myDiv.style.backgroundColor = coloreOriginario;
});
//
// Al verificarsi dell'evento, il gestore riceve alcune informazioni supplementari
// tramite l'oggetto event che consentono di definire il contesto
// dell'interazione.
// Ad esempio, il seguente codice consente di spostare l'elemento selezionato con
// il tocco di un solo dito:
var myDiv = Document.getElementByID("myDiv");

myDiv.addEventListener("touchmove", function (event) {

    var touch;

    if (event.targetTouches.lenght == 1) {

        touch = event.targetTouches[0];
        myDiv.style.top = touch.page.Y + "px";
        myDiv.style.left = touch.page.X + "px";
    }
});
//
// Analizzando il codice nell'esempio notiamo che viene controllata la
// lunghezza dell'array targetTouches.
// Questo array contiene le informazioni relative a tutti i punti di contatto
// con la superficie dello schermo occupata dall'elemento in cui si è verificato
// l'evento.
// Nel caso specufuco viene controllato che ci sia un solo punto di contatto.
// Se ci fossero più dita sul nostro <div> lo spostamento non verrebbe abilitato.
// Quindi, dopo aver fatto questa verifica preliminare, estraiamo le
// informazioni sul punto di contatto dall'array targetTouches ed utilizziamo le
// sue coordinate per modificare la posizione del nostro elemento.
//
// Oltre alla proprietà targetTouches, l'oggetto event relativo ad eventi touch
// mette a disposizione altre due proprietà:
//          - touches: l'insieme dei punti di contatto presenti sullo schermo
//                     ( quindi non solo relativi all'elemento corrente )
//          - changedTouches: l'insieme dei punti di contatto cambiati, ad esempio
//                            l'insieme dei punti di contatto rimossi in
//                            corrispondenza dell'evento touchend
//
// Ciascun elemento di questi array è un oggetto TOuch che rappresenta le
// informazioni relative a ciascun punto di contatto, tra cui un identificatore
// ( identifier ) e le coordinate del punto di contatto rispetto alla
// finestra ( clientX, clientY ), rispetto alla pagina ( pageX, pageY ) o allo
// schermo ( screenX, screenY )
//
// Il seguente è un esempio di gestione multi-touch.
// Su un elemento di tipo <canvas> individuiamo tutti i punti di contatto
// evidenziandoli con dei cerchi rossi.
var myCanvas = document.getElementByID("myCanvas");
var context = myCanvas.getContext("2d");

context.strokeStyle = "rgb(255, 0, 0)";

myCanvas.addEventListener("touchstart", function (event) {

    var touch;

    for (var i = 0; i < event.targetTouches.lenght; i++) {

        touch = event.targetTouches[i];
        context.beginPath();
        context.arc(touch.pageX, touch.pageY, 20, 0, 2 * Math.PI, true);
        context.fill();
        context.stroke();
    }
});
//
// Naturalmente, se non gestiamo opportunamente l'evento touchend i cerchi
// rimangono sullo schermo.
//
// ----------------------------- POINTER EVENTS --------------------------------
//
// L'approccio proposto dai Pointer Events mette a disposizione una serie di
// eventi che possono essere generati indifferentemente da qualsiasi dispositivo
// di puntamento: mouse, dita, penna.
// In pratica, lo sviluppatore dovrà gestire sempre lo stesso evento
// indipendentemente dal dispositivo che lo ha generato.
// Abbiamo quindi a disposizione i seguenti eventi:
//          - pointerdown: quando viene avviata l'interazione e può essere
//                         avviato da diverse situazione in base al tipo di
//                         dispositivo: viene premuto almeno un pulsante del
//                         mouse, avviene il primo contatto tra lo schermo e un
//                         dito o una penna
//          - pointerenter: quando un dispositivo di puntamento entra nell'area
//                          occupata da un elemento della pagina;
//                          l'evento non prevede la fase di bubbling
//          - pointerleave: quanto un dispositivo di puntamento lascia l'area
//                          occupata da un elemento della pagina;
//                          l'evento non prevede la fase di bubbling
//          - pointermove: quando un dispositivo di puntamento si sposta
//          - pointerover: come pointerenter ma prevede la fase di bubbling
//          - pointerout: come pointerleave ma prevede la fase di bubbling
//          - pointerup: quando viene interrotta l'interazione, cioè quando viene
//                       rilasciato il pulsante del mouse o quando non c'è più
//                       contatto tra schermo e dispositivo di puntamento
//
// Gli eventi richiamano praticamente gli stessi eventi previsti per il mouse
// ( mousedown, mouseenter, ecc ) ed in effetti essi coincidono con questi nel
// caso in cui il dispositivo di puntamento utilizzato sia proprio il mouse.
// In particolare, valgono per gli eventi pointerenter e pointerleave le
// considerazioni sulla propagazione dell'evento viste a suo tempo per gli eventi
// mouseenter e mouseleave.
//
// Possiamo a questo punto ridefinire il primo esempio visto per i TOuch events
// in termini di Pointer evenets nel seguente modo:
var coloreOriginario;
var myDiv = document.getElementByID("myDiv");

myDiv.addEventListener("pointerdown", function () {

    coloreOriginario = myDiv.style.backgroundColor;
    myDiv.style.backgroundColor = "red";
});

myDiv.addEventListener("pointerup", function () {

    myDiv.style.backgroundColor = coloreOrigniario;
});
//
// Il codice sarà valido indipendentemente dal dispositivo di puntamento
// utilizzato per l'interazione con lo schermo.
//
// L'oggetto event passato al gestore dell'evento prevede, oltre alle proprietà
// che ci consentono di individuare le coordinare del punto di contatto
// ( clientX, clientY, ecc ), le seguenti proprietà che consentono di avere
// maggiori informazioni sul dispositivo di puntamento e sul punto di contatto:
//          - height: altezza in pixel del punto di contatto
//          - width: larghezza in pixel del punto di contatto
//          - isPrimary: consente di individuare un punto di contatto come
//                       primario in un contesto multi-touch
//          - pointerId: l'identificatore univoco del punto di contatto
//          - pointerType: indica se il punto di contatto è stato generato da
//                         un mouse ("mouse"), una penna ("pen") o un
//                         dito ("touch")
//          - pressure: esprime il grado di pressione del punto di contatto sullo
//                      schermo tramite un valore decimale che va da
//                      0 (pressione minima) a 1 (pressione massima)
//
// Proviamo ad adeguare ai Pointer events l'esempio di gestione multi-touch
// visato per i Touch events.
// Ricordiamo che si tratta di evidenziare su un elemento di tipo <canvas>
// tutti i punti di contatto tramite dei cerchi rossi.
//
// A differenza dei Touch events, dove più punti di contatto contribuiscono a
// generare un unico evento touchstart, nel contesto dei Pointer events
// ciascun punto di contatto genera un proprio evento pointerdown.
// Il codice che genera i cerchi rossi in corrispondenza di ciascun punto di
// contatto sarà quindi quello mostrato di seguito:
var myCanvas = document.getElementByID("myCanvas");
var context = myCanvas.getContext("2d");

context.strokeStyle = "rgb(255, 0, 0)";

myCanvas.addEventListener("pointerdown", function (event) {

    context.beginPath();
    context.arc(event.pageX, event.pageY, 20, 0, 2 * Math.PI, true);
    context.fill();
    context.stroke();
});
//
// A differenza del caso dei Touch events, non abbiamo bisogno di iterare
// sull'elenco dei punti di contatto associati all'evento dal momento che
// ciascun punto di contatto è indipendente dall'altro nella generazione degli
// eventi.
// Vediamo inoltre come l'oggetto event passato come argomento al gestore di
// evento contiene direttamente le informazioni sul punto di contatto, nel caso
// specifico le coordinate di contatto.
//
// In un contesto multi-touch potremmo avere la necessità di prendere in
// considerazione un solo punto di contatto e di ignorare gli altri.
// Supponiamo ad esempio di non voler considerare tutti i punti di contatto
// nell'esempio precedente ma di voler disegnare un solo cerchio rosso.
// Dal momento che tutti i punti di contatto genereranno un evento
// pointerdown, come facciamo a prenderne in considerazione uno soltanto ed
// ignorare gli eventi generati dagli altri punti di contatto?
//
// Possiamo ottenere questo risultato sfruttando la proprietà isPrimary che
// ci consente di rilevare quale punto di contatto è considerato primario.
// Per il mouse è considerato primario l'unico puntatore mentre per penne e
// touch è considerato primario il primo contatto con lo schermo.
//
// Sara sufficiente quindi effettuare un semplice controllo su questa proprietà
// come mostrato di seguito:
myCanvas.addEventListener("pointerdown", function (event) {

    if (event.isPrimary) {

        context.beginPath();
        context.arc(event.pageX, event.pageY, 20, 0, 2 * Math.PI, true);
        context.fill();
        context.stroke();
    }
});
//
// Sottolineiamo ancora una volta che il codice di gestione dei Pointer events
// è valido indipendentemente dalla sorgente del punto di contatto
//
// 
//
//
//
//
//
//
//
