
// Un contesto di esecuzione è l'insieme di tutte le variabili accessibili
// in quel dato momento

// L'oggetto this rapresenta l'oggetto a cui è associata una proprietà o un metodo

var persona = {
    nome: "Giorgio",
    cognome: "Armanio",
    getNome: function () {
        return this.nome; // this si riferisce all'oggetto persona
    },
    getCognome: function () {
        return this.cognome; // this si riferisce all'oggetto persona
    }
};

function saluta(nome) {
    console.log("Ciao " + nome()); // il contesto della funzione saluta() sono
}                                  // tutte le sue proprietà e metodi
// oltre che quelle "globali"
// e l'oggetto this si riferisce appunto al
// contesto di saluta().
// quindi quando farà this.nome, vedrà che la variabile 
// non è accessibile in quanto è definita dentro
// l'oggetto persona 

saluta(persona.getNome); // Ciao undefined

// Risolviamo questo problema:
// Ridefiniamo la funzione saluta()

// Per "risolvere" il contesto di esecuzione possiamo usare le funzioni call()
// e apply()

// tramite la funzione call() possiamo passare come primo parametro il contesto di esecuzione,
// cioè a cosa si riferirà la parola chiave this

function saluta2(nome) {
    console.log("Ciao " + nome.call(persona));
}

// in questo esempio abbiamo detto che la parola chiave "this" si deve riferire all'oggetto
// "persona" ed è proprio in quell'oggetto che la variabile nome è stata definita e di conseguenza
// sarà visibile

saluta2(persona.getNome); // Ciao Giorgio

// la funzione apply() è simile alla funzione call() con la differenza che accetta solo 2 parametri:
//          - il primo: il contesto di esecuzione su cui eseguire la funzione
//          - il secondo: un array di parametri da passare alla funzione


// un metodo alternativo per risolvere il contesto è la funzione bind() che a differenza di call()
// e apply() consente di creare una nuova funzione con l'oggetto this preimpostato, in modo
// da poter chiamare in un secondo momento questa nuova funzione creata e sarà eseguita sul
// contest preimpostato
function saluta3(nome) {
    console.log("Ciao " + nome());
}

saluta3(persona.getNome().bind(persona));

// da notare come in questo caso non abbiamo dovuto modificare il codice della funzione
// saluta3
// infatti abbiamo preimpostato il contesto di esecuzione del metodo getNome() direttamente al
// momento della chiamata della funzione saluta3()
// bind() permette di passare altri parametri oltre al contesto di esecuzione che saranno poi passati
// alla funzione come parametri, ma vediamo un esempio:

var sommaZ = {
    z: 7,
    sommaAZ: function (x) {
        return x + this.z;
    }
};

var somma = function (somma) {
    console.log(somma());
};

somma(sommaZ.sommaAZ.bind(sommaZ, 5)); // 12

// come si può vedere da questo esempio la funzione sommaAZ prende un parametro x in input che
// la funzione (somma) non gli passa, ma tramite il metodo bind, oltre al contesto di esecuzione possiamo passare
// anche il parametro x richiesto



