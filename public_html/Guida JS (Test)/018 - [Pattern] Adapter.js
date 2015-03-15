
// Questo pattern permette di sostituire un oggetto con un altro senza andare a modificare
// tutte le chiamate fatte a quell'oggetto.

// vediamo subito come fare:
var VecchioObj = function () {
    this.metodo = function (x) {
        // ...
    };
};

var obj = new VecchioObj();
obj.metodo(123);

// ma ora abbiamo intenzione di cambiare l'oggetto con un altro che preferiamo
// senza però dover cambiare  le chiamate ( new VecchioObj )
//
// Prima di tutto definiamo il nuovo oggetto:
var NuovoObj = function () {
    this.nuovoMetodo = function (x) {
        // ...
    };
};

// dopodichè andiamo a ridefinire il vecchio oggetto in modo che rediriga tutte le chiamate verso il
// nuovo oggetto
var VecchioObj = function () {
    var myObj = new NuovoObj();
    this.metodo = myObj.nuovoMetodo;
};


