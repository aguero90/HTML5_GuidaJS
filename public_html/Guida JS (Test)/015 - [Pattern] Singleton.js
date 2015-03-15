
// Questo pattern prevede l'esistenza di un'unica istanza di un oggetto.
// 
// in JS, ovviamente, un oggetto creato letteralmente è un singleton, dato che non abbiamo modo di istanziare
// più oggetti dello stesso "tipo", non c'è un costruttore che definisce un "tipo".
// Quindi il seguente esempio:
var singletonLetterale = {
    proprietà: "",
    metodo: function () {
        // corpo del metodo
    }
};

// genera un oggetto che effettivamente è un singleton
// Tuttavia così facendo potremmo sprecare memoria poichè non è detto che l'oggetto venga realmente utilizzato.
// Inoltre se volessimo creare un singleton che prende dei parametri non possiamo farlo con il metodo letterale.
// 
// Abbiamo quindi bisogno di una programmazione del pattern più Object Oriented
// vediamo come:
var singletonObjectOriented = (function () {
    var instance;
    return{
        getInstance: function () {
            if (!instance) {
                instance = {
                    proprieta: "abc",
                    metodo: function () {
                        // Corpo del metodo
                    }
                };
            }
            return istance;
        }
    };
}
)();

// in questo caso utilizziamo le IIFE ( Immediatly Invoked Function Expression )
// per fare in modo che, grazie al concetto di closure, la variabile "istance" sia sempre accessibile
// dall'oggetto ritornato.
// Quindi nel momento in cui verrà chiamato il metodo getIstance(), questo avrà libero accesso alla proprietà
// e potrà eseguire determinati controlli.
// In questo caso semlicemente verifica che non sia già stato istanziato l'oggetto e lo istanzia, altrimenti non fa nulla
// e ritorna l'oggetto già istanziato
//
// Ovviamente ora lo spreco di memoria è ridotto alla sola variabile "istance" e non a tutta l'oggetto singleton che
// viene infatti caricato solo su richiesta.

