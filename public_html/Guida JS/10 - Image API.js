
/******************************************************************************
 L'OGGETTO IMAGE
 ******************************************************************************/

// All'interno di una pagina HTML, JS è in grado di manipolare immagini a diversi
// livelli di complessità.
// Le recenti tecnologie legate agli sviluppi di HTML5, infatti, consentono non solo
// di gestire immagini già pronte, ma di generare e modificare grafica dinamicamente.
// Vediamo in concreto quali solo le possibilità a nostra disposizione.
// 
// L'approccio più elementare per gestire un'immagine consiste nella
// manipolazione dell'elemento <img> dell'HTML.
// Esso rappresenta un'immagine statica sulla pagina e generalmente non ha
// bisogno di elaborazione da parte di JS:
//      <img src="immagine.jpg" />
//      
// Come per qualsiasi elemento HTML, possiamo comunque creare immagini
// dinamicamente ed aggiungerle al DOM, come possiamo vedere dal seguente
// esempio:
var btnAddImage = document.getElementById("btnAddImage");

btnAddImage.onClick = function () {
    var img = document.createElement("img");
    img.src = "immagine.jpg";
    document.body.appendChild(img);
};
// 
// Gestendo tramite JS l'elemento <img> possiamo realizzare semplici
// funzionalità come ad esempio la navigazione tra un elenco di immagini,
// come mostrato dal seguente codice:
var images = ["img1.jpg", "img2.jpg", "img3.jpg"];
var img = document.getElementById("img");
var btnNextImg = document.getElementById("btnNextImage");
var currentIndex = 0;

btnNextImg.onClick = function () {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    img.src = images[currentImageIndex];
};
// 
//  Nell'esempio abbiamo memorizzato in un array l'elenco dei nomi dei file
//  di immagine da visualizzare e abbiamo assegnato all'evento click del pulsante
//  btnNextImage l'esecuzione della funzione che modifica il valore dell'attributo
//  src dell'elemento <img>.
//  
//  Grazie all'uso del modulo ( operatore % ), dopo l'ultimo elemento dell'array
//  torneremo a visualizzare il primo elemento.
//  Possiamo rendere automatico il passaggio da un'immagine all'altra
//  eseguendo la funzione ad intervalli regolari
//  tramite setInterval():
setInterval(function () {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    img.src = images[currentImageIndex];
}, 10000);
// 
// È possibile creare un elemento immagine da aggiungere al DOM utilizzando
// il costruttore Image():
var btnAddImage = document.getElementById("btnAddImage");

btnAddImage.onClick = function () {
    var img = new Image();
    img.src = "immagine.jpg";
    document.body.appendChild(img);
};
// 
// Questo approccio è del tutto analogo alla creazione di un elemento <img>,
// ma risulta comodo per il precaricamento di immagini.
// 
/* <Il precaricamento delle immagini> */
// 
// Per chiarire questo concetto, prendiamo in esame la navigazione tra imamgini
// che abbiamo realizzato nell'esempio precedente.
// Il caricamento di ogni immagine avviene nel momento in cui gli assegniamo
// il nome del file all'attributo src.
// Ciò può comportare un'attesa da parte dell'utente, specie se le dimensioni
// dell'immagine sono non trascurabili.
// Possiamo allora precaricare nella cache del browser le immagini sfruttando il
// costruttore Image(), come mostrato di seguito:
var images = [];

var img1 = new Image();
img1.src = "img1.jpg";
images.push(img1);

var img2 = new Image();
img2.src = "img2.jpg";
images.push(img2);

var img2 = new Image();
img3.src = "img3.jpg";
images.push(img3);

var img = document.getElementById("img");
var btnNextimg = document.getElementById("btnNextImage");
var currentIndex = 0;

btnNextImg.onClick = function () {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    img.src = images[currentImageIndex].src;
};
// 
// La creazione di un oggetto Image fa sì che l'immagine corrispondente venga
// caricata nella cache del browser senza essere visualizzata sulla pagina.
// Da notare come all'attributo src dell'elemento <img> venga ora associato il
// valore dell'attributo src dell'elemento dell'array, poichè ora il contenuto
// dell'array non è più costituito da semplici nomi dei file.




/******************************************************************************
 LE IMMAGINI SVG
 ******************************************************************************/

// La gestione di immagini basata sulla manipolazione dell'elemento <img> è
// molto semplice ma limitata.
// Con qualche trucco e un po' di CSS possiamo creare degli effetti grafici
// sulle immagini, ma dobbiamo basarci sempre su grafica pre-esistente:
// in altre parole, non possiamo disegnare.
// 
// Un approccio alternativo che ci consente di colmare questa lacuna è l'utilizzo
// di SVG ( Scalar Vector Graphics ), uno standard W3C che definisce un
// linguaggio di markup per la creazione di grafica bidimensionale.
// 
// Iniziamo ad esaminare questo formato con un semplice esempio per inserire
// un'immagine SVG in una pagina HTML:
//      <svg>
//          <circle id="cerchio"
//                  cx="100" cy="100" r="50"
//                  style="stroke: #000000; fill: #00FF00;" />
//      </svg> 
// 
// Questo codice definisce un cerchio il cui centro è posizionato alle cordinate
// specificate tramite gli attributi cx e cy e la dimensione del raggio è indicata
// dall'attributo r.
// Lo stile definisce i dettagli grafici del cerchio come, nel nostro caso, il colore
// del bordo ( stroke ) e dell'area interna ( fill ).
// 
// Oltre al CSS standard, SVG utilizza un'estensione specifica come previsto dalla
// raccomandazione W3C: http://www.w3.org/TR/SVG/styling.html
// 
// Senza pretendere di essere esaustivi su SVG, possiamo sottolineare che
// possiamo gestire gli elementi SVG come facciamo con gli elementi standard del
// DOM di una pagina HTML.
// Ad esempio, tramite il seguente codice JS aumentiamo le dimensioni del
// cerchio e cambiamo il suo colore:
var cerchio = document.getElementById("cerchio");
cerchio.setAttribute("r", 150);
cerchio.style.fill = "#FF0000";
// 
// Possiamo anche spingerci oltre e provare ad animare il nostro cerchio 
// facendolo muovere all'interno della nostra pagina HTML.
// Prevediamo quindi due pulsanti: uno per avviare l'animazione e uno per
// fermarla.
// Il seguente codice JS provvederà a gestire l'animazione:
var timerId;

function startAnimation() {
    if (timerId == null) {
        timerId = setInterval(animate, 20);
    }
}

function stopAnimation() {
    if (timerId != null) {
        clearInterval(timerId);
        timerId = null;
    }
}

function animate() {
    var cerchio = document.getElementById("cerchio");
    var x = cerchio.getAttribute("cx");
    var newX = 2 + parseInt(x);
    if (newX > window.innerWidth) {
        newX = 20;
    }
    cerchio.setAttribute("cx", newX);
}
// 
// Si tratta in pratica di spostare verso destra la coordinata x del centro del
// cerchio ad intervalli di tempo regolari tramite un timer.
// Quando viene raggiunta l'estremità destra della pagina, il cerchio riappare a
// sinistra e continua il suo cammino.




/******************************************************************************
 CANVAS API
 ******************************************************************************/

// Nello standard HTML5, viene introdotto l'elemento canvas per lavorare con la
// grafica raster.
// L'approccio dell'elaborazione grafica tramite JS basato su questo elemento è
// definito dalle specifiche W3C relative al contesto 2D.
// Allo stato attuale, infatti, le specifiche prevedono la possibilità di generare
// soltanto grafica bidimensionale su un elemento <canvas>.
// 
// Lo stesso elemento, tuttavia, viene utilizzato per la generazione di grafica
// 3D sfruttando WebGL, le cui specifiche, pur non essendo standardizzate dal
// W3C, sono oramai largamente supportata dai browser.
// 
// Tramite le API del contesto bidimensionale possiamo disegnare e colorare forme
// geometriche, creare gradienti, copiare immagini e, più in generale, manipolare
// pixel.
// 
// A differenza della grafica vettoriale SVG, infatti, l'approccio basato su canvas
// consente la gestione di grafica bitmap, con tutti i possibili vantaggi e
// svantaggi che questa comporta.
// Ma vediamo come possiamo sfruttare queste API per creare dei semplici elementi
// grafici.
// 
// ---------------- DISEGNARE SU CANVAS ---------------------
// 
// Innanzitutto puntualizziamo il concetti che un canvas è letteralmente una tela
// su cui possiamo disegnare e colorare ed è individuata su una pagina HTML 
// dall'elemento <canvas>:
//      <canvas id="myCanvas"></canvas>
//      
// Se non indichiamo delle dimensioni specifiche tramite gli attributi width e
// height, le dimensioni predefinite sono fissate a 300px per l'ampiezza e
// 150px per l'altezza, indipendentemente dal browser.
// 
// La prima cosa da fare per poter lavorare sulla nostra tela è acquisire il contesto
// di lavoro tramite il metodo getContext dell'oggetto canvas:
var myCanvas = document.getElementById("myCanvas");
var context = myCanvas.getContext("2d");
// 
// Una volta acquisito il contesto, possiamo utilizzare un ampio numero di metodi
// e proprietà per creare i nostri elementi grafici.
// Ad esempio, il seguente codice disegna un cerchio del tutto identico a quello
// che abbiamo creato con SVG:
context.beginPath();
context.arc(100, 100, 50, 0, 2 * Math.PI);
context.fillStyle = "#00FF00";
context.fill();
context.strokeStyle = "#000000";
context.stroke();
// 
// Il metodo beginPath() consente di avviare il disegno di un nuovo elemento.
// Possiamo immaginare che l'invocazione di questo metodo appoggi la punta
// del pennello sulla tela pronto per iniziare il disegno o la colorazione.
// 
// Per disegnare il cerchio sfruttiamo il metodo arc(), il cui compito è quello di
// disegnare un arco, fornendo come parametri le coordinare del centro, la
// dimensione del raggio, l'angolo iniziale e l'angolo finale dell'arco.
// Nel nostro caso abbiamo indicato come arco inziale l'arco di 0 radianti e come
// angolo finale l'angolo giro di 2 pi-greco.
// 
// Abbiamo quindi indicato il colore per il riempimento e l'abbiamo applicato
// tramite il metodo fill() ed il codice del bordo applicandolo tramite il metodo
// stroke()
// 
// ------------------ ANIMAZIONI SU CANVAS -------------------------
// 
// Per creare l'effetto di animazione analogo a quello che abbiamo realizzato
// sfruttando SVG, procediamo con il parametrizzare le coordinate del cerchio
// e creare una funzione che ha il compito di disegnarlo:
var x = 100;
var y = 100;

function drawCircle(x, y) {
    context.beginPath();
    context.arc(100, 100, 50, 0, 2 * Math.PI);
    context.fillStyle = "#00FF00";
    context.fill();
    context.strokeStyle = "#000000";
    context.stroke();
}
// 
// Quindi definiamo una funzione che sposta il cerchio all'intetno del canvas:
function animate() {
    x = x + 2;
    if (x > myCanvas.width) {
        x = 20;
    }

    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
    draeCircle(x, y);
}
// 
// Notiamo come per spostare il cerchio abbiamo cancellato l'intera superficie del
// canvas tramite il metodo clearRect() e ridisegnato la figura geometrica
// cambiando leggermente la coordinata x.
// 
// A questo punto non ci resta che attivare l'animazione tramite un timer:
var timerId;

function startAnimation() {
    if (timerId == null) {
        timerId = setInterval(animate, 20);
    }
}

startAimation();
// 
// L'approccio alla gestione della grafica basato su canvas ci consente non solo
// di disegnare a partire da una tela vuota, ma di modificare immagini
// esistenti, di copiarle ed esportare il risultato delle nostre elaborazioni
// in un formato di tipo bitmap.
// 
// ---------------- CARICARE UN'IMMAGINE IN CANVAS -----------------
// 
// Per importare un'immagine esistente all'interno di un canvas, possiamo
// procedere come mostrato dal seguente codice:
var img = new Image();

img.onload = function () {
    context.drawImage(img, 0, 0);
};
img.src = "immagine.jpg";
// 
// Abbiamo creato un oggetto di tipo immagine inserendolo nel nostro canvas
// tramite il metodo drawImage().
// Questo metodo prevede come parametri l'immagine e le coordinate all'interno
// del canvas in cui visualizzarla.
// 
// È importante inserire l'immagine nel canvas dopo che questa sia stata
// effettivamente caricata nel DOM.
// Per questo motivo il metodo drawImage() viene invocato in corrispondenza
// dell'evento load.
// 
// Una volta nel canvas, possiamo manipolare l'immagine mediante tutte le
// funzionalità previste dalle API.
// Possiamo anche fare una copia in un formato diverso dall'originale sfruttando
// il metodo toDataUrl() dell'elemento <canvas>:
var imgElement = document.createElement("img");
var myCanvas = document.getElementById("myCanvas");

imgElement.src = myCanvas.toDataUrl("image/png");
document.body.appendChild(imgElement);
// 
// Nell'esempio abbiamo creato un elemento <img> ed abbiamo associato al suo
// attributo src l'immagine del canvas myCanvas in formato png.
// 
// È opportuno evidenziare che il metodo toDataUrl() è un metodo dell'elemento
// <canvas> e non del contesto.
// Infatti, in questo caso accediamo all'insieme dei pixel contenuti nel canvas
// senza alcuna intenzione di modificarli.
