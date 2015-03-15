
// In JS il costruttore non è altro che una funzione che,
// quando invocata tramite l'operatore "new", crea un oggetto in memoria
// ed inserisce all'interno di questo oggetto tutti i "this.XXX = YYY"
// presenti all'interno della funzione invocata
//
// NOTA: per convenzione i nomi delle funzioni costruttori iniziano con la
//       maiuscola e poi seguono la classica convenzione JS
//       ( Camel-Case: questaStringaRispettaLaConvenzioneCamelCase )

function MyClass() { // Funzione Costruttore

    var privateVariable = "privateVariable";  // variabile privata

    this.publicVariable = "publicVariable";  // variabile pubblica

    function privateMethod() {
        return "privateMethod";
    }

    this.privilegedMethod = function () {  // metodo pubblico
        // i metodi pubblici possono ovviamente accedere a variabili e metodi
        // privati del costruttore poichè questi "vivono" nello scope
        // della funzione costruttore e quindi sono visibili ed accessibili
        // a questo livello
        console.log(privateVariable);
        console.log(privateMethod());
    };
}

// i metodi d'istanza saranno accessibili a tutte le istanze, in modo diverso
// ma sono caricati una sola volta in memoria
// questo grazie al fatto che lo stiamo definendo il metodo pubblico all'interno
// del "prototipo" della nostra "classe" ( funzione costruttore )
// quindi il metodo creato andrà ad aggiungersi a questo oggetto che sarà poi
// agganciato tramite riferimento ad ogni istanza della "classe"
MyClass.prototype.publicMethod = function () {
    console.log(this.publicVariable);
    // la seguente riga di codice darebbe errore, poichè nel prototipo di un oggetto
    // lo scope è diverso da quello della funzione costruttore
    // quindi tutte le variabili e i metodi definiti privati non esistono nello scope
    // del prototipo.
    // console.log(privateVariable); // ERROR: privateVariable is not defined
};


// Variabile statica condivisa tra tutte le istanze
//
// Poichè le funzioni sono trattate come "Oggetti-di-prima-classe", quindi
// come degli oggetti, possiamo aggiungerci proprietà come un qualsiasi
// altro oggetto di JS
//
// Perciò sarà la funzione costruttore ad avere questa nuova "proprietà" !!
// e non la singola istanza!
MyClass.staticProperty = "staticVariable";

// ovviamente per creare metodi statici dobbiamo semplicemente assegnare ad
// una proprietà una funzione:
MyClass.staticMethod = function () {

    return "staticMethod";
};



// Facciamo dei piccoli test
var myInstance = new MyClass();

console.log(myInstance.publicVariable); // publicVariable
console.log(myInstance.privateVariable);
// undefined
// in questo scope non esiste privateVariable
console.log(myInstance.privilegedMethod());
// privateVariable
// privateMethod
// console.log(myInstance.privateMethod()); // ERROR: privateMethod is not defined
console.log(myInstance.publicMethod()); // publicVariable

// ora testiamo la variabile statica e se
// publicMethod() è effetitvamente una variabile d'istanza
var myInstance2 = new MyClass();
myInstance2.publicVariable = "changed";

console.log(myInstance2.publicVariable); // changed
console.log(myInstance2.publicMethod()); // changed
console.log(myInstance.publicMethod()); // publicVariable

console.log(MyClass.staticProperty); // staticVariable
console.log(myInstance.staticProperty); // undefined
console.log(myInstance2.staticProperty); // undefined

// con questa riga di codice non andiamo a fare quello che ci aspettiamo
// ( cioè modificare la variabile statica ) ma andiamo a creare una nuova variabile ( pubblica )
// ( la variabile staticProperty ) all'interno dell'istanza myInstance2
myInstance2.staticProperty = "staticChanged";

console.log(MyClass.staticProperty); // staticVariable
console.log(myInstance.staticProperty); // undefined
console.log(myInstance2.staticProperty); // staticChanged

// tuttavia possiamo accedere e cambiare le variabili statiche
// ( cioè quelle proprietà assegnate alla funzione costruttore )
// dalle istanze tramite .constructor
myInstance.constructor.staticProperty = "changed with myInstance.constructor.staticProperty";

console.log(MyClass.staticProperty); // changed with myInstance.constructor.staticProperty
console.log(myInstance.staticProperty); // undefined
console.log(myInstance2.staticProperty); // staticChanged
