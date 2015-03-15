
// L'oggetto si può creare "letteralmente", cioè tramite la rappresentazione
// letterale:

var obj_vuoto = {};
var obj_me = { nome: "Alessandro", cognome: "Napoli"};

// un oggetto può tranquillamente contenere altri oggetti

var obj_annidato = { nome: "Pizza",
                     colore: "bianca",
                     ingredienti: {
                         primo: "patatine",
                         secondo: "wurstel"
                     }
                   };
                   
// possiamo accedere agli oggetti in 2 modi:

console.log(obj_annidato.nome);                     // pizza
console.log(obj_annidato["colore"]);                // bianca
console.log(obj_annidato.ingredienti.primo);        // patatine
console.log(obj_annidato.ingredienti["primo"]);     // patatine
console.log(obj_annidato["ingredienti"]["primo"]);  // patatine
console.log(obj_annidato["ingredienti"].primo);     // patatine

console.log(obj_annidato.prezzo); // undefined (non esiste questa proprietà all'interno dell'oggetto)
obj_annidato.prezzo = 2; // abbiamo appena creato la proprietà prezzo
console.log(obj_annidato.prezzo); // 2

// Ma un oggetto può contenere anche metodi oltre aglle proprietà

var persona = {
    nome: "Mario",
    cognome: "Rossi"
};

function ciao(){ return "Ciao!"; }

persona.saluta = ciao; // ora l'oggetto persona ha il metodo ciao()
console.log(persona.saluta()); // Ciao!

persona.conta = function() { return "1, 2, 3 ...."; }; // qui ho usato una funzione anonima
                                                       // per dare un altro metodo all'oggetto
                                                       // persona
console.log(persona.conta()); // 1, 2, 3 ....

// Ma vediamo come fare dei metodi stile JAVA
// ad esempio getter e setter

persona.getNome = function(){ return this.nome; }; // Anche qui uso una funzione anonima per
                                                   // creare il metodo
                                                   // e tramite la parola chiave this
                                                   // posso accedere ai campi 
                                                   // dell'oggetto in questione.
persona.getCognome = function(){ return this.cognome; };
persona.setNome = function(n){ this.nome = n; }; // dovrei controllare prima se
                                                 // n è stato effettivamente passato
                                                 // ed in tal caso controllare
                                                 // se è una stringa
                                                 // ma facciamo finta che lo sia xD
persona.setCognome = function(c){ this.cognome = c; };

console.log(persona.getNome());     // Mario
console.log(persona.getCognome());  // Rossi
persona.setNome("Giorgio");         
persona.setCognome("Armani");
console.log(persona.getNome());     // Giorgio
console.log(persona.getCognome());  // Armani




