
console.log("Contesto di Esecuzione: Globale");
console.log(this); // Window
console.log("=================================================================");

function Persona() {

    var nome = "nome";
    var cognome = "cognome";

    // in questo momento persona è ancora un oggetto vuoto per il contesto di esecuzione
    console.log("Contesto di Esecuzione: Persona() [ INIZIO ESECUZIONE ]");
    console.log(this); // Persona{ }
    console.log("nome: " + nome); // nome
    console.log("this.nome: " + this.nome); // undefined
    console.log("=================================================================");

    this.getNome = function () {

        console.log("Contesto di Esecuzione: Persona.getNome()");
        console.log(this); // Persona { getNome=function(), setNome=function(), getCognome=function(), setNome=function(), toString=function() }
        console.log("nome: " + nome); // nome
        console.log("this.nome: " + this.nome); // undefined
        // console.log("getNome: " + getNome); // ERROR: getNome is not defined
        console.log("this.getNome: " + this.getNome); // function(){ ... }
        // console.log("setNome: " + setNome); // ERROR: getNome is not defined
        console.log("this.setNome: " + this.setNome); // function(n){ ... }
        console.log("privateToString: " + privateToString); // function privateToString(){ ... }
        console.log("this.privateToString: " + this.privateToString); // this.privateToString: undefined
        console.log("=================================================================");

        return nome;
    };

    this.setNome = function (n) {

        console.log("Contesto di Esecuzione: Persona.setNome()");
        console.log(this); // Persona { getNome=function(), setNome=function(), getCognome=function(), setNome=function(), toString=function() }
        console.log("=================================================================");

        nome = n;
    };

    this.getCognome = function () {

        console.log("Contesto di Esecuzione: Persona.getCognome()");
        console.log(this); // Persona { getNome=function(), setNome=function(), getCognome=function(), setNome=function(), toString=function() }
        console.log("=================================================================");

        return cognome;
    };

    this.setCognome = function (c) {

        console.log("Contesto di Esecuzione: Persona.setCognome()");
        console.log(this); // Persona { getNome=function(), setNome=function(), getCognome=function(), setNome=function(), toString=function() }
        console.log("=================================================================");

        cognome = c;
    };

    function privateToString() {

        console.log("Contesto di Esecuzione: Persona.privateToString()");
        console.log(this); // Window
        console.log("nome: " + nome); // nome
        console.log("this.nome: " + this.nome); // undefined
        // console.log("getNome: " + getNome); // ERROR: getNome is not defined
        console.log("this.getNome: " + this.getNome); // undefined
        // console.log("setNome: " + setNome); // ERROR: setNome is not defined
        console.log("this.setNome: " + this.setNome); // undefined
        console.log("privateToString: " + privateToString); // function privateToString(){ ... }
        console.log("this.privateToString: " + this.privateToString); // undefined
        console.log("=================================================================");

        return nome + " " + cognome;
    }

    this.toString = function () {

        console.log("Contesto di Esecuzione: Persona.toString()");
        console.log(this); // Persona { getNome=function(), setNome=function(), getCognome=function(), setNome=function(), toString=function() }
        console.log("=================================================================");

        return privateToString();

    };

    // in questo momento persona è ancora un oggetto vuoto per il contesto di esecuzione
    console.log("Contesto di Esecuzione: Persona() [ FINE ESECUZIONE ]");
    console.log(this); // Persona{ }
    console.log("nome: " + nome); // nome
    console.log("this.nome: " + this.nome); // undefined
    console.log("=================================================================");
}

var p = new Persona();

p.getNome();
p.setNome("Alessandro");
p.getCognome();
p.setCognome("Napoli");
p.toString();

// =============================================================================
// =============================================================================
// Ora vediamo come funziona il contesto di esecuzione in caso di eventi
// nel DOM

var button = document.createElement("button");
button.setAttribute("id", "mioBottone");
button.innerHTML = "addEventListener";
document.body.appendChild(button);

button.addEventListener("click", function () {

    console.log("Contesto di Esecuzione: button.addEventListener('click', function)");
    console.log(this); // <button id="mioBottone">
    console.log("=================================================================");
});

// come si può facilmente notare il contesto di esecuzione della callback non è
// il contesto in cui abbiamo aggiunto l'handler ( in questo caso quello globale )
// ma gira nel contesto dell'elemento a cui abbiamo aggiunto l'handler
// ( in questo caso <button id="mioBottone"> )