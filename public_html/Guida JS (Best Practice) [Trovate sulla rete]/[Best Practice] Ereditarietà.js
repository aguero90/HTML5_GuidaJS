
// NOTA: le dichiarazioni delle seguenti classi usa l'ottimizzazione spiegata nel
//       file "[Ottimizzazione] Definire Classi"
//
// Con le nuove funzionalità (Object.create() su tutti) inserite in ECMAScript 5,
// possiamo migliorare il modo in cui implementiamo l'ereditarietà con JS
//
// Vediamo un esempio in cui una classe B eredità da una classe A
/* classe padre */
function A(a) {

    this.prop1 = a;
}

A.prototype = {
    prop2: null,
    method: function () {
        // ...
    }
};

A.prototype.constructor = A;

/* classe figlia */
function B(a, b) {

    // chiamiamo il costruttore della classe padre
    // impostando il this all'oggetto di tipo B che stiamo costruendo
    A.call(this, a);
    // eseguiamo le specifiche inizializzazioni della classe B
    this.prop3 = b;
}

// Object.create(proto[, propertiesObject])
//
// Object.create() crea un nuovo oggetto il cui prototipo è quello passato
// come primo argomento e le cui proprietà sono quelle definite nell'oggetto
// passato come secondo parametro (opzionale)
B.prototype = Object.create(A.prototype, {
    prop4: {
        // Il valore della proprietà
        // Default: undefined
        value: "",
        // ----------------------- DESCRITTORI --------------------------------
        //
        //      - Descrittore del dato: - value
        //                              - writable
        //
        //      - Descrittori di accesso: - get
        //                                - set
        //
        // Questi descrittori sono esclusivi: se uso value posso usare writable ma non get o set ( e viceversa )
        //
        // Ad entrambi i tipi di descrittori posso aggiungere i seguenti:
        //      - enumerable
        //      - configurable

        // true <=> this property shows up during enumeration of the properties on the corresponding object.
        // Default: false
        enumerable: true,
        // true <=> la proprietà può essere eliminata dall'oggetto
        // false <=> la proprietà non può essere eliminata e configurable non può essere messa a true
        // Default: false
        configurable: true,
        // true <=> il valore della proprietà può essere modificato con l'operatore di assegnamento ("=")
        // Default: false
        writable: true
                // una funzione che funge da getter per la proprietà oppure undefined se non ci sono getter per la proprietà.
                // Il valore di ritorno della funzione dovrebbe essere il valore della proprietà
                // Defaults: undefined
                // get: function () { return _value;}
                //
                // una funzione che funge da setter per la proprietà, oppure undefined se non ci sono setter per la proprietà.
                // La funzione dovrebbe ricevere come unico argomento il nuovo valore da assegnare alla proprietà
                // Default: undefined.
                // setter: function (prop5) { this._prop5 = prop5;}
    },
    method: {
        value: function () { // override
            A.prototype.method.apply(this, arguments); // call super
            // ...
        },
        enumerable: true,
        configurable: true,
        writable: true
    }
});


B.prototype.constructor = B;

var b = new B();
b.method();
//
// NOTA: nel momento in cui effettuiamo una eventuale chiamata var a = new A()
//       JS, dopo aver creato l'oggetto VUOTO in memoria, prima di eseguire la
//       funzione A(), con il this impostato sull'oggetto appena creato, setta
//       la proprietà interna dell'oggetto a1.__proto__ = A.prototype.
//       Quando poi si cerca di accedere ad una proprietà di a1, JS controlla
//       prima se quella proprietà è presente nell'oggetto stesso, altrimenti
//       cerca in a1.__proto__.
//       Quindi tutto ciò che viene definito nel prototipo, viene effettivamente
//       condiviso tra tutte le istanze della classe A.
//       Perciò, un eventuale modifica/aggiunta/rimozione al prototipo di A si
//       ripercuoterà su tutte le istanze di A.
//
// ----------- DIFFERENZE TRA prototype E Object.getPrototypeOf() --------------
//
// per le istanze usare Object.getPrototypeOf()
// per i tipi (le classi) usare prototype
//
// facciamo un esempio:
var a1 = new A();
var a2 = new A();
console.log(Object.getPrototypeOf(a1) === Object.getPrototypeOf(a2)); // true
console.log(Object.getPrototypeOf(a1) === A.prototype); // true
console.log(Object.getPrototypeOf(a2) === A.prototype); // true
//
// questo dimostra che la nota descritta sopra dice la verità e che il prototipo
// è unico tra tutte le istanze
//

