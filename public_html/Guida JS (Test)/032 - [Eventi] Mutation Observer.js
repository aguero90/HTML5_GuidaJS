
// se vogliamo "osservare" un elemento del DOM possiamo riccorere al Mutation Observer.
//
// i concetti principali sono:
//          - MutationObserver
//          - MutationRecord
//
// instanziamo un MutationObserver che prende in input una callback
var observer = new MutationObserver(callback);

// creiamo ora la callback che prenderà in input un array di MutationRecord
// NOTA: questa callback sarà chiamata solo nel momento in cui il pezzo di codice che sta modificando il nodo che ci interessa
// è terminato, quindi NON ad OGNI SINGOLA MODIFICA
var callback = function (mutationRecords) {
    // ...
};

// ora diciamo all'observer di "osservare" determinate modifiche di un certo elemento tramite il metodo observe();
observer.observe(elemento_da_osservare, oggetto_contenente_informazioni_su_cosa_osservare);
// 
// l'oggetto può contenere le seguenti proprietà:
//          - attributes: valore booleano per l'osservazione di variazioni degli
//                          attributi dell'elemento
//          - attributeOldValue: valore booleano che consente di inserire nei
//                                   Mutuation record il vecchio valore di un
//                                   attributo 
//                                   ( solo se attributes = true )
//          - characterData: valore booleano per l'osservazione di variazioni
//                               del contenuto dell'elemento
//          - characterDataOldValue: valore booleano che consente di inserire
//                                         nei Mutuation record il vecchio valore 
//                                         del contenuto dell'elemento
//                                         ( solo se characterData = true )
//          - childList: valore booleano che consente l'osservazione di variazioni
//                                dei figli dell'elemento
//          - subtree: valore booleano che prevede l'osservazione di variazioni di
//                       tutti i discendenti dell'elemento
//          - attributeFilter: array di nomi di attributi da tenere sotto
//                               osservazione
//                               ( es; ["class", "src"] )

// ora possiamo dire cosa contiene un mutation record:
// Un Mutuation record è un oggetto che prevede le seguenti proprietà:
//          - type: il tipo di variazione rilevata.
//                   I possibili valori sono: - attribute
//                                             - characterData
//                                             - childList
//          - target: l'elemento su cui è stata rilevata la variazione
//          - addedNodes: un array di nodi aggiunti al DOM
//          - removedNodes: un array di nodi rimossi dal DOM
//          - nextSibling: l'eventuale elemento successivo all'elemento che è
//                           stato aggiunto o rimosso
//          - previousSibling: l'eventuale elemento precedente all'elemento che è
//                                stato aggiunto o rimosso
//          - attributeName: il nome dell'attributo modificato
//          - oldValue: il valore dell'attributo o del contenuto precedente alla
//                        variazione

// per non osservare più l'elemento possiamo usare il metodo disconnect()
observer.disconnect();


