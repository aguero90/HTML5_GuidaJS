
// fino ad ora conosciamo 2 tipi di scope:
//      - scope globale ( variabili accessibili da qualsiasi punto dello script )
//      - scope locale a livello di funzioni ( le variabili sono accessibili solo da una parte dello script )
//
// In realtà il concetto di scope è un po' più complicato, infatti una funzione ha accesso alle variabili 
// accessibili dalla funzione che la contiene più le sue variabili.
// se una funzione non è contenuta da nessun'altra allora questa avrà accesso a tutte le sue variabili più le 
// variabili globali.
// questo concetto è noto come SCOPE CHAIN

// facciamo un rapido esempio

// variabile globale accessibile da qualsiasi punto dello script;
var livello0 = "sono una variabile globale";

var funzione1 = function () {
    // variabile accessibile solo dal contesto di esecuzione di funzione1
    // oppure di funzioni contenute da funzione1 (funzione2, funzione3, .... funzioneN)
    var livello1 = "sono una variabile di livello 1";

    var funzione2 = function () {
        // variabile accessibile solo dal contesto di esecuzione di funzione2
        // oppure di funzioni contenute da funzione1 (funzione3, funzione4, .... funzioneN)
        var livello2 = "sono una variabile di livello 2";

        var funzione3 = function () {
            // variabile accessibile solo dal contesto di esecuzione di funzione3
            // oppure di funzioni contenute da funzione1 (funzione4, funzione5, .... funzioneN)
            var livello3 = "sono una variabile di livello 3";

            //........
            var funzioneN = function () {
                // variabile accessibile solo dal contesto di esecuzione di funzioneN 
                // poichè non contiene altre funzioni
                var livelloN = "sono una variabile di livello N";
            };
        };
    };
};

// come possiamo notare, più è alto il "livello" della variabile meno sarà accessibile
// al contrario, più è alto il "livello" della funzione maggiore darà il numero di variabile a cui può accedere
// infatti funzioneN può accedere a tutte le sue variabili + le variabili a cui può accedere funzioneN-1
// ma funzioneN-1 può accedere a tutte le sue variabili + le variabili a cui può accedere funzioneN-2
// funzioneN-2 può accedere a tutte le sue variabili + le variabili a cui può accedere funzioneN-3
// ...
// funzione1 può accedere a tutte le sue variabili + quelle globali.
//
// quindi per concludere funzioneN ha accesso alle variabili 
// globali + variabili di funzione1 + variabili di funzione2 + ... + variabili funzioneN-1 + variabili sue




// Vediamo ora un altro concetto fondamentale: le closure.
// Le closure si basa su un meccanismo che stabilisce che le variabili accessibili da una data funzione
// f al momento della sua dichiarazione resteranno accessibili per quella funzione per sempre.
// Vediamo un esempio:
function sommaci5() { // livello 1
    var a = 5;

    return function (b) { // livello 2
        return a + b; // a sarà sempre 5 
    };
}

var s5 = sommaci5();

s5(2); // 7

// Nella funzione di livello 2 viene usata la variabile a definita nella funzione di livello 1
// che solitamente sarebbo ovviamente accessibile per via della scope chain
// ma in questo esempio nel momento in cui viene invocata la funzione di livello 2, la funzione di
// livello 1 ha già completato la sua esecuzione!
// 
// nonostante questo la funzione di livello 2 continuerà a vedere e a poter accedere per sempre alla variabile a



