
// l'oggetto window offre la proprietà navigator per ottenere informazioni sullo user agent
// alcuni restituiscono valori costanti:
window.navigator.appCodeName; // "Mozilla"
window.navigator.product; // "Gecko"

// altre restituiscono valori non sempre coerenti:
window.navigator.appName; // dovrebbe restituire il nome dello user agent
// restituirà:
//      - Firefox, Chrome e Safari: "Netscape"
//      - Internet Explorer: "Microsoft Internet Explorer"
//      - Opera: "Opera".

window.navigator.appVersion; // dovrebbe restituire la versione
// restituirà:
//      - Firefox: "5.0 (Windows)"
//      - Chrome: "5.0 (Windows NT 6.0) AppleWebkit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.116 Safari/537.36"

// ----------------------------------------------------------------------------------------------
// come sviluppatori web vorremmo che le nostre applicazioni siano cross-browser, per farlo dobbiamo in qualche modo
// identificare se possiamo o meno fare una determinata cosa.
// abbiamo 2 modi per saperlo:
//      
// USER AGENT DETECTION
//
// per identificare il browser possiamo andare ad analizzare l'intestazione della richiesta HTTP
// possiamo recuperare l'intestazione sotto forma di stringa tramite la proprietà userAgent dell'oggetto navigator
window.navigator.userAgent;

// ad esempio per identificare il browser possiamo creare una funzione simile
function getBrowserName() {

    // tutti gli user agent possibili
    var browserNames = ["Chrome", "Firefox", "MSIE", "Opera", "Safari"];

    // cicliamo su tutti i browser
    for (var i in browserNames) {

        // se nell'intestazione HTTP compare come sottostringa il nome del browser corrente
        // allora sarà questo lo user agent su cui la nostra applicazione sta girando
        if (window.navigator.userAgent.indexOf(browserNames[i]) > -1)
            break;
    }

    return browserNames[i];
}
// ma non sempre abbiamo il risultato sperato

// FEATURE DETECTION
//
// È l'approccio migliore e ci consente di stabilire se una determinata funzionalità ( metodo o altro )
// è supportata dallo user agent.
// Lo facciamo semplicemente verificando se la funzionalità è undefined o no
if (String.contains == undefined) {
    // lo user agent non supporta il metodo contains sulle stringhe
}

// -----------------------------------------------------------------------------------------------
// tramite la proprietà navigator dell'oggetto window possiamo ottenere altre informazioni 
window.navigator.cookieEnabled; // se i cookie sono abilitati o meno 
window.navigator.onLine; // se lo user agent è in modalità online o offline
window.navigator.language; // qual è la lingua preferita dall'utente





