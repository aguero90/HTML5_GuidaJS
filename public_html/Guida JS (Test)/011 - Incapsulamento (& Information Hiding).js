
// l'incapsulamento è la capacità di racchiudere proprietà e funzionalità all'interno di una entità.
// In JS questo è fattibile con un oggetto.
// Ma in un oggetto JS, tutte le proprietà sono accessibili sempre e comunque dall'esterno e questo va contro
// un principio abbastanza importante della programmazione ad oggetti: l'information hiding.
// come fare per implementare l'information hiding?
// vediamolo con dei semplici esempi:

// tutte le proprietà pubbliche:
var PersonaPubblica = function () {

    this.nome = "";
    this.cognome = "";
};

var p1 = new PersonaPubblica();
p1.nome = "nome";
p1.cognome = "cognome";

// in questo caso tutti i campi dell'oggetto creato tramite il costruttore PersonaPubblica() sono visibili ed accessibili dall'esterno,
// infatti è possibile modificarli semplicemente sovrascrivendoli
// non possiamo impostare quindi nessuna protezione e non possiamo decidere se questi campi sono in lettura, scrittura,
// entrambi o nessuno dei due.

// tutte le proprietà private:
var PersonaPrivata = function () {

    var nome = "";
    var cognome = "";
};

var p2 = new PersonaPrivata();
p2.nome; // undefined
p2.cognome; // undefined
p2.nome = "nome"; // crea una NUOVA proprietà PUBBLICA nome! NON modifica la variabile locale al costruttore
p2.cognome = "cognome"; // crea una NUOVA proprietà PUBBLICA cognome! NON modifica la variabile locale al costruttore

// in questo caso entrambe le proprietà sono private poichè sono variabili locali del costruttore e quindi non vengono inserite
// in memoria come parte dell'oggetto costruito.
// allora perchè è possibile considerarle variabili private?
// grazie al meccanismo di closure, definendo dei getter e/o setter questi vedranno e potranno accedere sempre alle
// variabili definite localmente al costruttore!
// Quindi quelle variabili si comportano esattamente come le variabili private nei linguaggi di programmazione ad oggetti!
// Vediamo come inserire questi getter e/o setter.
var PersonaPrivata = function () {

    var nome = "";
    var cognome = "";

    PersonaPrivata.prototype.getNome = function () {
        return this.nome;
    };
    PersonaPrivata.prototype.setNome = function (nome) {
        this.nome = nome;
    };

    PersonaPrivata.prototype.getCognome = function () {
        return this.cognome;
    };
    PersonaPrivata.prototype.setCognome = function (cognome) {
        this.cognome = cognome;
    };
};


// ora vediamo come implementare la visibiltà protected, cioè fare in modo che una data proprietà sia accessibile
// anche da tutte le classi che estendono la classe che contiene quella proprietà

// variabili protected
var Persona = function (proprietàProtected) {

    var nome = ""; // privata
    this.cognome = ""; // pubblica

    proprietàProtected = proprietàProtected || {};
    proprietàProtected.protected = "protected";

    PersonaPrivata.prototype.getNome = function () {
        return this.nome;
    };
    PersonaPrivata.prototype.setNome = function (nome) {
        this.nome = nome;
    };
};

var PersonaStrana = function () {

    var proprietàProtected = {}; // privata

    Persona.call(this, proprietàProtected);

    var protected = proprietàProtected.protected;

};

// praticamente abbiamo fatto scrivere alla classe padre delle proprietà in un repository ( l'oggetto proprietàProtected )
// dopodichè la classe figlia ha preso queste proprietà dal repository lasciatogli dalla classe padre.
// è facile vedere che all'interno del repositori possiamo scrivere qualsiasi tipo di proprietà, che sia questa pubblica o privata.




