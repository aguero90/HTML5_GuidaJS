
// ------------------- PERCHÈ LE CLOSURE SONO LENTE ----------------------------
//
// Le closure sono una strumento molto potente e flessibile di JS
// tuttavia sono:
//      1) la causa principale di Memory Leak.
//      2) la causa principale dei rallentamenti.
//         Infatti, la creazione delle closure è più lenta rispetto alla creazione
//         di una funzione inner senza closure che a sua volta è molto più lenta
//         rispetto alla possibilità di riutilizzare funzioni statiche:
//
// Ad esempio, la seguente funzione che usa l'effetto closure
function setupAlertTimeout() {
    var msg = 'Message to alert';
    window.setTimeout(function () {
        alert(msg); // effetto closure: cerco un dato presente in una funzione superiore
    }, 100);
}
//
// è più lenta rispetto alla seguente:
function setupAlertTimeout() {
    window.setTimeout(function () {
        var msg = 'Message to alert';
        alert(msg); // no effetto closure: il dato è presente nella funzione stessa
    }, 100);
}
//
// inoltre la funzione appena descritta è più lenta della seguente:
function alertMsg() {
    var msg = 'Message to alert';
    alert(msg);
}

function setupAlertTimeout() {
    window.setTimeout(alertMsg, 100);
}
//
// Infatti in questo ultimo esempio non genero ogni volta una nuova funzione
// ma ne riuso una creata in precedenza
//
//         3) Aggiungono livelli alla Scope chain e, quando il browser deve
//            "risolvere" delle proprietà, deve controllare ogni livello della
//            Scope Chain
//
// Nel seguente esempio:
var a = 'a';

function createFunctionWithClosure() {
    var b = 'b';

    return function () {
        var c = 'c';
        a;
        b;
        c;
    };
}

var f = createFunctionWithClosure();
f();
//
// quando viene invocata la funzione f(),
//  referenziare ed accedere ad "a" è più lento rispetto a referenziare "b" che
//  a sua volta è più lento rispetto a referenziare "c"
//
// ----------- COME DEFINIRE I METODI DI UNA CLASSE ---------------------------
//
// Abbiamo visto perchè le closure sono lente.
// Quindi, il seguente modo di definire le classi è sconsiglito poichè ogni
// volta che viene creata un'istanza, una nuova funzione viene creata in
// memoria e salvata grazie all'effetto closure:
var myClass = function () {

    // Corpo Costruttore

    this.method = function () {
        // ...
    };
};
//
// Sarebbe meglio definire una classe nel modo seguente:
var myClass = function () {

    // Corpo Costruttore

};

myClass.prototype.method = function () {
    // ...
};
//
// In questo modo, non importa quante istanze di "MyClass" vengano create,
// il metodo "method" verrà creato una sola volta e non saranno salvate
// closure in memoria
//
// ----------- COME DEFINIRE LE VARIABILI DI ISTANZA ---------------------------
//
// L'approccio migliore consiste nell'inserie tutte quelle variabili che
// sono dei riferimenti ( es: array, oggetti ecc )
// all'interno del costruttore.
// Invece tutte quelle variabili che hanno un valore (es: number, Boolean, null, undefined, o string)
// andrebbero messe nel prototipo
//
// In questo modo evitiamo di eseguire il codice di inizializzazione ogni volta che
// viene invocato il costruttore.
//
// NOTA: questo non può essere fatto per quelle variabili che dipendono
// dagli argomenti del costruttore ( anche quelle che hanno un valore )
// o da qualche altra cosa che accade all'interno del costruttore
//
// Quindi, al posto di dichiarare le variabili così:
var MyClass = function () {

    this.prop1 = 4;
    this.prop2 = true;
    this.prop3 = [];
    this.prop4 = 'blah';
};
//
// Sarebbe meglio dichiararle nel seguente modo:
var MyClass = function (number) {
    // definire nel costruttore tutte quelle variabili che
    //      1) sono un riferimento (Array, oggetti ecc)
    this.prop3 = [];
    //      2) dipendono dagli argomenti del costruttore (anche quelle che hanno un valore)
    this.prop5 = number;
    //      3) dipendono da qualcosa che accade nel costruttore
};

// definire nel prototipo tutte quelle variabili che non dipendono dal
// costruttore e non sono dei riferimenti, cioè hanno un valore
// (es: number, Boolean, null, undefined, o string)
MyClass.prototype.prop1 = 4;
MyClass.prototype.prop2 = true;
MyClass.prototype.prop4 = 'blah';
//
// Quindi ricapitolando, un miglior approccio per dichiarare le classi in JS
// è il seguente:
var MyClass = function (number) {

    this.prop1 = number;
    this.prop2 = [];
};

MyClass.prototype.prop3 = 0;
MyClass.prototype.prop4 = false;
MyClass.prototype.prop5 = null;
MyClass.prototype.prop6 = undefined;
MyClass.prototype.prop7 = "";

MyClass.prototype.method = function () {
    // ...
};




