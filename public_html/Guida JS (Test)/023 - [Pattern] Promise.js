
// Questo è un pattern molto usato nella programmazione asincrona con
// JS.
// Così importante da far parte di JS nella versione 6 dello standard.

// Per casi semplici, nella programmazione asincrona, possiamo usare le callback.
// supponiamo di fare una richista asincrona verso un server
getDati(
        function () {
            // gestisci dati
        },
        function () {
            // gestisci errore
        });

// in questo modo il server chiamerà la callback succes se tutto va a buon fine
// altrimenti chiamerà la callback di error.

// tuttavia, per casi molto più complessi, il codice potrebbe diventare illegibile
// ad esempio se la callback di successo avvia un altra richiesta asincrona che avrà a sua volta
// 2 callback e così via... potremmo avere una situazione simile:

getDati(
        function () {
            // gestisci dati
            getDati2(
                    function () {
                        // gestisci dati2
                        getDati3(
                                function () {
                                    // gestisci dati3
                                },
                                function () {
                                    // errore dati3
                                });
                    },
                    function () {
                        // errore con dati 2
                    });

            gestisciDati2_1(
                    function () {
                        // gestisci dati2_1
                        getDati3_1(
                                function () {
                                    // gestisci dati3_1
                                },
                                function () {
                                    // errore dati3_1
                                });
                    },
                    function () {
                        // errore con dati 2_1
                    });
        },
        function () {
            // errore dati
        });


// insomma, un vero inferno per quanto riguarda la leggibilità!

// per questi casi complessi esiste il Promise Pattern che aiuta a gestire la complessità
// della programmazione asicrona.

// Cos'è una promise? 
// Una promise è un'oggetto restituito dal metodo appena chiamato
// che rappresenta la richiesta pendente della chiamata che abbiamo appena fatto.
// e quest'oggetto ci offre due metodi:
//      - fulfilled: se la richiesta ha avuto esito positivo
//      - rejected: se la richiesta ha avuto esito negativo
//
// entrambi i metodi restituiranno a loro volta una callback in modo da poterle concatenare
// Quindi non ci resta che passare le varie callback per gestire i relativi casi:

var promise = getDati(); // otteremo una promise in stato pendente

promise.fullfilled(callback1).fullfilled(callback2); // ecc

// stessa cosa per la rejected
