
/******************************************************************************
 FUNZIONI (AVANZATE)
 ******************************************************************************/

// A prima vista le funzioni JS sembrano molto simili alle funzioni di altri
// linguaggi di programmazione come il C, Java o il C#. Ma non è così!
// 
// Una funzione nella maggior parte dei linguaggi di programmazione è
// intesa come un insieme di istruzioni da eseguire su richiesta.
// In JS, una funzione è qualcosa di più: in JS, una funzione è un oggetto!!!
// 
// Più precisamente quello che tecnicamente è detto "Oggetto di prima classe"
// (first class object), cioè un entità che può essere dinamicamente creata,
// distrutta, passata ad una funzione, assegnata ad una variabile e restituita
// come valore.
// 
// A differenza degli altri oggetti JS basati su Object, una funzione ha
// come oggetto base Function.
// In quanto oggetto, una funzione ha proprietà, metodi e può essere usata
// come un qualsiasi altro oggetto.
// 
// Ad esempio possiamo assegnare una funzione ad una variabile:
var somma = function (x, y) {
    return x + y;
};




/******************************************************************************
 FUNZIONI ANONIME O LAMBDA
 ******************************************************************************/

// Una definizione di funzione che non specifica il nome è detta funzione
// anonima o funzione letterale o ancora funzione lambda.
// 
// Di solito si specifica il nome di una variabile per poterla richiamare,
// Nel caso in cui una funzione viene assegnata ad una variabile, invece,
// l'utilità del nome viene meno dato che possiamo accedere alla funzione
// tramite la variabile.
// Tuttavia, nessuno ci vieta di dare un nome ad una funzione anche quando 
// questa viene assegnata ad una variabile.
// 
// Possiamo invocare una funzione associata ad una variabile semplicemente
// facendo seguire al nome della variabile una coppia di parentesi tonde
// con eventuali parametri. Come nell'esempio:
var z = somma(5, 7); // z = 12
//
// Possiamo anche invocare una funzione utilizzando direttamente la sua versione
// anonima o letterale:
(function (x, y) {
    return x + y;
}(5, 7));
// 
// Questo tipo di espressione è chiamata immediatly-invoked function 
// expression (IIFE) oppure self-executing function ed offre una significativa
// capacità espressiva quando è utilizzata insieme ad altre caratteristiche 
// delle funzioni JS come vedremo più in là.
// 
// Abbiamo detto che, essendo un oggetto, le funzioni hanno proprietà e 
// metodi. 
// Tra le proprietà delle funzioni abbiamo:
//      - name: il nome della funzione.
//              Se è una funzione anonima allora il valore di questa 
//              proprità sarà la stringa vuota ( "" )
//      - length: indica il numero di argomenti previsti
//      
// I metodi li vedremo più avanti. 





/******************************************************************************
 CALLBACK
 ******************************************************************************/

// Poichè le funzioni in JS sono degli oggetti di prima classe, possono essere
// passate come parametri ad un'altra funzione.
// La funzione passata come parametro è detta generalmente funzione di
// callback o semplicemente callback.
// 
// Consideriamo il seguente esempio:
function Calcola(func, arg1, arg2) {
    return func(arg1, arg2);
}
// 
// La funzione Calcola() prevede 3 argomenti. Il primo è una funzione di 
// callback che viene invocata sul secondo e sul terzo argomento.
// In questo caso il valore restituito dalla funzione Calcola() è il valore
// restituito dalla funzione di callback sui 2 argomenti.
// 
// Possiamo sfruttare la funzione Calcola() per eseguire la funzione somma()
// definita negli esempi precedenti.
Calcola(somma(), 5, 7); // ritorna 12
// 
// Bisogna però sempre controllare che venga effettivamente passata una
// funzione prima di invocarla.
// Quindi andiamo a modificare la defnizione di Calcola() per evitare questo
// errore:
function Calcola(func, arg1, arg2) {

    if (func && typeof fung === "function") {

        return func(arg1, arg2);
    }
}
// 
// L'if controlla che l'argomento func sia stato effettivamente passato, 
// cioè che non sia null e che il suo tipo sia "finction", cioè che si tratti
// effettivamente di una funzione.
// 
// L'uso delle funzioni callback è molto diffuso in JS!!!
// Ad esse si ricorre ad esempio, nelle azioni asincrone come nelle chiamate
// HTTP o nella gestione di eventi.
// 
// Consideriamo ad esempio il metodo forEach() degli array:
var numeri = [11, 3, 24];
numeri.forEach(function (valore, indice) {
    console.log(valore);// visualizza l'elenco degli elementi dell'array
});
// 
// La funzione passata come argomento del forEach() viene eseguita per ciascun
// elemento dell'array.
// 
// Da notare che in questo esempio abbiamo passato una funzione anonima
// direttamente come parametro del metodo forEach() invece che una variabile
// a cui è assegnata una funzione.
// Un'alternativa è la deinizione di una classica funzione con nome ed il 
// passaggio del nome come funzione callback al metodo forEach().
function mostraValore(valore, indice) {
    console.log(valore);
}
numeri.forEach(mostraValore);
//
// vediamo un altro esempio sempre con gli array: il metodo sort();
// Come abbiamo visto questo metodo permette di ordinare gli elementi
// di un array. Però permette di ordinare solo elementi di tipo di dato
// primitivo, cioè numeri e stringhe.
// 
// Per ordinare un array di oggetti potremmo ricorrere ad una callback da 
// passare al metdodo sort() che verrà utilizzata internamente per
// stabilire il criterio di confronto tra gli elementi dell'array.
// Ecco l'esempio:
var persone = [{nome: "Mario", cognome: "Rossi", professione: "impiegato"},
    {nome: "Giuseppe", cognome: "Verdi", professione: "operaio"},
    {nome: "Marco", cognome: "Neri", professione: "insegnante"}];

persone.sort(function (a, b) {
    if (a.cognome < b.cognome)
        return -1;
    if (a.cognome > b.cognome)
        return 1;
    return 0;
});
// 
// Quindi stiamo ordinando gli oggetti in base alla proprietà cognome.
// La funzione di callback restituirà 0 se i due parametri sono uguali,
// 1 se il primo parametro viene prima del secondo parametro e -1 se avviene il
// contrario.





/******************************************************************************
 FUNZIONI CHE RESTITUISCONO FUNZIONI
 ******************************************************************************/

// Dato che una funzione è un oggetto, è possibile restituirla come valore
// di ritorno dell'esecuzione di un'altra funzione:
var incrementatore = function (incremento) {

    return function (valore) {

        return incremento + valore;
    };
};
// 
// Alla variabile incrementatore viene assegnata una funzione che
// restituisce un'altra funzione.
// La funzione restituita incrementa il suo agomento con l'argomento
// della funzione che la restituisce.
// In altre parole, la funzione incrementatore genera una funzione che 
// incrementa un valore numerico di un numero predefinito.
// Ad esempio, se vogliamo creare una funzione che incrementa di 5 il valore
// passato come parametro, possiamo fare in questo modo:
var incrementaDiCinque = incrementatore(5);
// 
// A questo punto possiamo usare la funzione incrementaDiCinque() per 
// aumentare di 5 unità il valore passato come parametro:
console.log(incrementaDiCinque(7)); // restituisce 12
console.log(incrementaDiCinque(16)); // restituisce 21





/******************************************************************************
 THIS ed il CONTESTO DI ESECUZIONE
 ******************************************************************************/

// L'interpretazione del codice JS avviene in uno specifico CONTESTO DI ESECUZIONE
// Questo è composto dall'insieme delle variabili accessibili in un dato momento
// dell'esecuzione di un'istruzione (compresi gli argomenti di una funzione e
// l'oggetto this)
// L'oggetto this rappresenta l'oggetto a cui è associata una proprietà
// o un metodo.
// Vediamo un esempio:
var persona = {
    nome: "Mario",
    cognome: "Rossi",
    nomeCognome: function () {
        return this.nome + " " + this.cognome;
    }
};
// 
// Il metodo nomeCognome() restituisce semplicemente la concatenazione
// delle due proprietà nome e cognome sfruttando l'oggetto this.
function saluta(nomePersona) {
    console.log("Buongiorno " + nomePersona());
}
// 
// Invocando questa funzione nel seguente modo:
saluta(persona.nomeCognome);
// 
// non otterremmo purtroppo ciò che ci aspettiamo, cioè la stringa
// "Buongiorno Mario Rossi", ma al suo posto otterremmo la stringa
// "Buongiorno undefined undefined"
// 
// Il problema nasce dal fatto che la funzione di callback nomePersona()
// viene eseguita nel contesto di esecuzione della funzione saluta().
// In questo contesto di esecuzione, l'oggetto this non rappresenta l'oggetto
// persona ma indica l'oggetto globale che ad esempio in un browser
// corrisponde alla finestra corrente (window)
// 
// Come facciamo quindi ad ottenere il nome e cognome dell'oggetto persona?





/******************************************************************************
 CALL e APPLY
 ******************************************************************************/

// Avevamo detto che una funzione è un oggetto con proprietà e metodi.
// Per risolvere il nostro problema possiamo fare ricorso a due metodi
// dell'oggetto funzione che ci consentono di specificare il significato che
// intendiamo associare alla parola chiave this:
//      - call(): permette di invocare una funzione impostando il primo
//                parametro come oggetto di riferimento per this ed i
//                parametri successivi come valori da passare alla funzione
fun.call(thisArg, argomentiFunzioneOpzionali);
// 
//      - apply(): simile a call() ma con la differenza che prevede
//                 due soli parametri. Il primo è l'oggetto da associare
//                 a this, mentre il secondo è un array dei valori da passare
//                 alla funzione da invocare
fun.apply(thisArg, arrayArgomentiOpzionale);
// 
// Quindi nel nostro caso possiamo riscrivere la funzione saluta()
// così:
function saluta(nomePersona) {
    console.log("Buongiorno " + nomePersona.call(persona));
}





/******************************************************************************
 BIND
 ******************************************************************************/

// Un approccio alternativo all'utilizzo di call() e apply() per impostare
// correttemente l'oggetto this è l'uso del metodo bind(), introdotto nella
// versione 5 della specifica.
// 
// A differenza di call() e apply() che impestano l'oggetto this e gli
// eventuali parametri al momento della chiamata della funzione.
// bind() consente di creare una nuova funzione con l'oggetto this
// preimpostato.
// La nuova funzione creata da bind() può essere invocata quindi in un secondo
// momento.
// Vediamo come sfruttare bind() nel nostro caso:
function saluta(nomePersona) {
    console.log("Buongiorno " + nomePersona());
}

saluta(persona.nomeCognome.bind(persona));
// 
// In questo caso, invece di intervenire direttamente sul codice
// della funzione saluta(), abbiamo passato ad essa come parametro
// una versione del metodo nomeCognome() con this preimpostato
// su persona.
// 
// Il metodo bind() consente di specificare oltre al parametro una
// serie di parametri aggiuntivi che verranno automaticamente passati
// alla funzione al momento dell'invocazione.





/******************************************************************************
 SCOPE
 ******************************************************************************/

// Fino ad ora quando abbiamo perlato della visibilità o scope delle
// variabili abbiamo distinto tra:
//          - scope globale: accessibilità estesa all'intero script.
//          - scope locale: accessibilità ristretta al solo codice di una
//                          funzione
// 
// Ma questa distinzione è un po' troppo semplicistica. Infatti, nella
// determinazione degli scope intervengono altri fattori dipendenti
// dalla possibilità di definire funzioni all'interno di funzioni,
// di associare funzioni a variabili e
// di passarle o ottenerele da altre funzioni.
// 
// Vediamo questi problemi tramite degli esempi:
var saluto = "buongiorno";

function saluta(persona) {
    var nomeCognome = persona.nome + " " + persona.cognome;

    function visualizzaSaluto() {
        console.log(saluto + " " + nomeCognome);
    }

    visulizzaSaluto();
}

saluta({nome: "Mario", cognome: "Rossi"});
// 
// Abbiamo definito una funzione saluta() che prende un oggetto
// persona e visualizza la stringa con un saluto rivolto
// al nome e cognome della persona.
// La visualizzazione della stringa è affidata ad una funzione 
// definita all'interno del corpo della funzione saluta().
// 
// Nella definizione del codice abbiamo sfruttato alcune
// caratteristiche dello scope delle variabili che già conoscevamo,
// come ad esempio il fatto che all'interno di una funzione è 
// possibile fare riferimento ad una variabile globale.
// Nel nostro caso la funzione visualizzaSaluto() accede alla variabile
// saluto definita globalmente.





/******************************************************************************
 SCOPE CHAIN
 ******************************************************************************/

// Un aspetto evidenziato dal codice è il fatto che la funzione
// visualizzaSaluto(), definita all'interno della funzione
// saluta(), possa accedere ad una variabile locale di quest'ultima,
// cioè nomeCognome.
// 
// Non si ha più una semplice distinzione tra scope locale e globale
// ma è possibile avere una vera e propria gerarchia di scope o
// SCOPE CHAIN.
// 
// Una funzione, infatti, può accedere allo scope globale ed allo scope
// accessibile della funzione in cui è stata definita (funzione esterna).
// il quale può essere a sua volta il risultato della combinazione del
// proprio scope locale con lo scope della sua funzione esterna e 
// così via.
// 
// La cosa più interessante è il fatto che in JS l'accesso allo scope della
// sua funzione esterna è consentito anche dopo che quest'ultima ha
// terminato la sua esecuzione.
// Vediamo un esempio:
var saluto = "buongiorno";
var visualizzaSaluto;

function saluta(persona) {

    var nomeCognome = persona.nome + " " + persona.cognome;

    return function () {
        console.log(saluto + nomeCognome);
    };
}

visualizzaSaluto = saluta({nome: "Mario", cognome: "Rossi"});
visualizzaSaluto();
// 
// In questo caso la funzione saluta() non visualizza direttamente
// la stringa ma restituisce una funzione che assume questo
// compito.
// Quindi, quando la funzione restituita viene invocate, la
// funzione saluta() (la sua funzione esterna) ha terminato la sua
// esecuzione e quindi il suo contesto di esecuzione non esiste più.
// Nonostante ciò è ancora possibile accede alla variabile nomeCognome
// presente nel suo scope locale.





/******************************************************************************
 CLOSURE
 ******************************************************************************/

// Il principio base su cui si fonda questo meccanismo stabilisce
// che ogni variabile che era accessibile quando una funzione
// è stata definita rimane "racchiusa" nello scope accessibile
// dalla funzione.
// Questo meccanismo è detto CLOSURE.
// 
// La closure di una funzione ha un enorme potere espressivo e
// può essere sfruttata in maniera creativa per definire pattern
// di programmazione evoluta, come vedremo più avanti nella
// guida.
// 
// Tuttavia in certe situazioni può rappresentare una trappola
// insidiosa la cui identificazione richiede un'attenta analisi.
// 
// Consideriamo questo esempio che è un'evoluzione dell'esempio
// precedente:
var saluto = "Buongiorno";
var visualizzaSaluti;

function saluta(persone) {

    var nomeCognome;
    var saluti = [];

    for (var i in persone) {
        nomeCognome = persone[i].nome + " " + persone[i].cognome;

        saluti.push(function () {
            console.log(saluto + " " + nomeCognome);
        });
    }
    return saluti;
}

visualizzaSaluti = saluta([{nome: "Mario", cognome: "Rossi"},
    {nome: "Marco", cognome: "Neri"}]);

for (var i in visualizzaSaluti) {
    visualizzaSaluti[i]();
}
// 
// In questo caso, in corrispondenza di un array di persone,
// intendiamo generare un array di funzioni che visualizzano i
// rispettivi saluti.
// 
// Nel caso specifico ci aspetteremmo che vengano visualizzate 2
// stringhe personalizzate per i 2 oggetti presenti nell'array.
// Invece il risultato che otteniamo è la stessa stringa ripetuta
// 2 volte per la stessa persona: l'ultimo elemento dell'array.
// 
// Il perché di questo comportamento inatteso è leato alla closure
// delle funzioni definito all'interno del ciclo. Ciascuna delle due
// funzioni fa riferimento alla variabile globale nomeCognome della
// funzione saluta() ed il valore di questa variabile nel momento in
// cui viene restituito l'array di funzioni è proprio la concatenazione
// del nome e cognome dell'ultimo elemento dell'array.
// Questo spiega il perché della visualizzazione della stessa stringa.
// 
// Per aggirare l'ostaolo possiamo fare ricorso ad una 
// immediately-invoced function expression (IIFD) che ci consente di
// fissare il valore corrente della variabile:
var saluto = "Buongiorno";
var visualizzaSaluti;

function saluta(persone) {

    var nomeCognome;
    var saluti = [];

    for (var i in persone) {

        nomeCognome = persone[i].nome + " " + persone[i].cognome;

        // immediately-invoked function expression
        saluti.push((function (nc) {
            return function () {
                console.log(saluto + " " + nc);
            };
        })(nomeCognome));
    }
    return saluti;
}

visualizzaSaluti = saluta([{nome: "Mario", cognome: "Rossi"},
    {nome: "Marco", cognome: "Neri"}]);

for (var i in visualizzaSaluti) {
    visualizzaSaluti[i]();
}
// 
// Il codice evidenzia come, al posto di aggiungere nell'array
// direttamente la funzione incaricata di visualizzare il
// saluto, definiamo una funzione che restituisce la funzione
// desiderata dopo averla invocata passando la variabile
// nomeCognome come parametro.
// In questo modo fissiamo il valore della variabile eliminando
// di fatto il riferimento diretto alla variabile nomeCognome.