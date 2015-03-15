
// Questo pattern è essenziale per costruire applicazioni robuste
// Infatti permette di organizzare l'applicazione in "moduli" separati ed indipendenti dagli altri
// che possono essere esportati ed importati, quindi di rendere accessibile del codice a chi importa
// il modulo e di poter accedere a del codice di moduli importati
// 
// Da questo si nota che è necessario l'incapsulamento e l'information hiding per implementare questo
// pattern. 
// Abbiamo visto che con JS è possibile implementare l'incapsulamento e l'information hiding grazie alle
// closure.
// 
// Vediamo quindi come implementare il Module Pattern in JS:
var modulo = (function () {

    var proprietàPrivata = "privata";

    function metodoPrivato() {
        // corpo metodo privato
    }

    return{
        proprietàPubblica: "pubblica",
        metodoPubblico: function () {
            metodoPrivato();
        }
    };
})();

// anche qui utilizziamo in combinazione le IIFE e il meccanismo di closure
// ottenendo una differenza netta tra proprietà e metodi pubblici e proprietà e metodi privati
//
// infatti, abbiamo implementato un modulo che esporta metodoPubblico() che può essere usato all'esterno così:
modulo.metodoPubblico();

// da notare come metodo pubblico al suo interno chiami metodo privato.
// in un certo senso, facendo così potremmo implementare in JS le interfacce
// separando così implementazione da interfacce.

// per ora abbiamo visto solo come esportare, ma se un modulo volesse importare e quindi dipendere da un altro modulo?

var altroModulo = (function () {
    // corpo del modulo
})();

var moduloCheImporta = (function (modulo) {
    // corpo del modulo
})(altroModulo);

// in questo modo "moduloCheImporta" dipende da "altroModulo" e può utilizzare tutto ciò che lui espone
// pubblicamente

// così facendo la nostra applicazione sarà un insieme di moduli ben separati che collaborano tra di loro tramite
// esportazioni ed importazioni ( dipendenze )


