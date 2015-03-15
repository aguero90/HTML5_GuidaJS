
// rappresenta una pagina html
// ad esso è associato il this ( globale ), quindi, qualsiasi variabile
// definita all'interno del contesto globale diventa una proprietà dell'oggetto Window

var proprietà = "window"; // sarà una proprietà dell'oggetto window
this.prop = "window"; // sarà una proprietà dell'oggetto window

// possiamo accedere alle proprietà/metodi dell'oggetto window in 3 modi
window.prop; // da qualsiasi parte
prop; // ovunque non sia stata sovrascritta
this.prop; // nel contesto globale;

// ----------------------------------------------------------------------------------------------
// tramite l'oggetto window possiamo ottenere informazioni sul device:

// ad esempio l'area interna occupata dalla finestra del browser
window.innerWidth;
window.innerHeight;

// oppure informazioni sullo schermo del device
window.screen.width; // larghezza totale dello schermo
window.screen.height; // altezza totale dello schermo

window.screen.availWidth; // larghezza disponibile dello schermo
window.screen.availHeight; // altezza disponibile dello schermo ( escludendo, ad esempio, l'altezza della taskbar )

// ----------------------------------------------------------------------------------------------
// tramite l'oggetto window possiamo aprire nuove finestre all'interno dello user agent
window.alert("apre una finestra pop-up");
var risposta = window.confirm("domanda"); // apre un pop-up con 2 bottoni: sì ( la cui pressione ritorna true ), no (la cui pressione ritorna false)
var input = window.prompt("richiesta"); // apre un pop-up con una casella di testo ed un bottone OK ( la cui pressione restituisce la stringa immessa nella casella di testo )

// possiamo indirizzare l'utente verso un'altra URL
// window.open(URL, nome_finestra_aperta, opzioni);
//          nome_finestra_aperta: - personalizzato 
//                                     - _blank: apre una nuova finestra
//                                     - _parent: sostituisce la finestra o il frame genitore della finestra corrente
//                                     - _self: sostituisce il contenuto della finestra o frame corrente
//                                     - _top: sostituisce il contenuto della radice della gerarchia di oggetti window
window.open(
        "http://www.html.it",
        "myWindow",
        "menubar = no, toolbar = no, status = no, height = 400, width = 600, top = 150, left = 150");

// posso anche chiudere le finestre
window.close();

// ----------------------------------------------------------------------------------------------
// possiamo poi tenere traccia della navigazione tramite la proprietà history dell'oggetto window
window.history.back(); // torniamo alla pagina precedente ( freccetta del browser dietro )
window.history.forward(); // la pagina successiva ( freccetta del browser avanti )
window.history.go(-3); // possiamo skippare più pagine sia avanti che dietro

// ----------------------------------------------------------------------------------------------
// possiamo poi gestire l'URL della pagina
// ad esempio, data la seguente URL: http://www.html.it:8080/articoli/articolo.php?id=123#paragrafo 
window.location.href; // http://www.html.it:8080/articoli/articolo.php?id=123#paragrafo
window.location.protocol; // http:
window.location.hostname; // www.html.it
window.location.host; // www.html.it:8080
window.location.origin; // http://www.html.it:8080
windiw.location.port; // 8080
window.location.pathname; // /articoli/articolo.php
window.location.search; // ?id=123
window.location.hash; // #paragrafo

// possiamo anche scrivere su alcune di queste proprietà
window.location.href = "http://www.html.it"; // redirige al nuovo indirizzo
window.location.assign("http://www.html.it"); // redirige al nuovo indirizzo

// abbiamo poi metodi da poter usare
window.location.replace("http://www.html.it"); // rimpiazza il documento con la nuova pagina ( non è navigazione, questo cambio di pagina non viene salvato nella history )
window.location.reload(true); // per forzare il caricamento dal server al posto di far caricare dalla cache 
