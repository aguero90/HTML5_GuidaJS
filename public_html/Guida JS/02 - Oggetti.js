
/******************************************************************************
 OBJECT LITERAL
 ******************************************************************************/

// Un modo per creare l'oggetto è  la rappresentazione letterale:
var objVuoto = {}; // ho dichiarato un oggetto vuoto
var objPersona = {"nome": "Alessandro", "cognome": "Napoli"}; // oggetto con 2 attributi
// ( nome e cognome )
// per quanto riguarda i nomi degli attributi, se seguiamo le restrizioni
// che abbiamo nello scegliere i nomi delle variabili possiamo omettere le
// virgolette, altrimenti inseriamo le virgolette e possiamo chiamare gli
// attributi come vogliamo
// esempio:
var objPersona1 = {nome: "Alessandro", cognome: "Napoli"}; // rispettano le restrizioni
var objPersona2 = {"primo-nome": "Alessandro", "secondo-nome": "Napoli"}; // non rispettano le restrizioni
//
// un attributo può assumere un qualsiasi valore derivante da un'espressione JS,
// anche un altro oggetto.
// Esempio:
var objConObj = {nome: "Alessandro",
    cognome: "Napoli",
    indirizzo: {via: "Contrada la cona", // indirizzo è anch'esso
        numero: 9, // un oggetto
        città: "Sulmona"
    }
};
//
// Per accedere ad un attributo di un oggetto abiamo 2 notazioni:
// La più comoda ed usata è quella con il punto:
objConObj.nome;
//
// l'altra è quella "stile array associativo"
objConObj["nome"];
//
// questa è obbligatoria quando il nome dell'attributo non rispetta le
// restrizioni per i nomi delle variabili
//
// Se proviamo ad accedere ad un attributo che non esiste in quell'oggetto
// JS non darà errore, ma restituirà undefined
var attributoCheNonCe = objConObj.eta; // attributoCheNonCe vale undefined
//
// Se invece assegnamo un valore ad un attributo che non è presente in
// quell'oggetto, questa verrà inserito (creata) all'interno dell'oggetto
objConObj.eta = 23; // ora l'oggetto objConObj ha anche l'attributo eta
//
// questo vuol dire che gli oggetti sono tipi di dati dinamici dato che la
// loro struttura può essere modificata durante l'esecuzione dello script
//
// Vediamo ora come si definiscono i metodi di un oggetto
// facciamo un esempio:
function visualizzaCognome() {
    return "Napoli";
}
objConObj.vediCognome = visualizzaCognome;
// quindi ho definito il metodo getCognome. Quando andrò a richiamarlo
// questo eseguirà la funzione visualizzaCognome()
var cognome = objConObj.vediCognome(); // cognome conterrà "Napoli"
//
// Ovviamente un metodo può richiedere parametri così come una normale funzione
// Vediamo ora un altro modo per definire n metodo:
objConObj.vediNome = function() {
    return "Alessandro";
};
// qui abbiamo assegnato la funzione direttamente al metodo dell'oggetto
// senza definirla prima.
// Da notare che la funzione non ha un nome. In questi casi si parla di
// funzione anonima.
//
// I metodi definiti fino ad ora sono piuttosto inutili xD
// come avviene in java vorremmo spesso ottenere informazioni su
// attributi dell'oggetto stesso, come fare? Tramite il this!
// andiamo a vedere come fare:
objConObj.getNome = function() {
    return this.nome;
};
objConObj.getCognome = function() {
    return this.cognome;
};




/******************************************************************************
 PASSAGGIO PER VALORE O PER RIFERIMENTO
 ******************************************************************************/

// - Tipi di dato primitivi: passaggio per valore
// - oggetti: passaggio per riferimento





/******************************************************************************
 L'OGGETTO OBJECT
 ******************************************************************************/

// esattamente come in JAVA, Object in JS è un oggetto predefinito su cui si
// basano tutti gli altri oggetti e grazie all'operatore NEW può creare 
// un'istanza di un oggetto vuoto.
// Vediamo in quanti modi è possibile creare lo stesso oggetto:
// Metodo 1:
var personaMetodo1 = {nome: "nome", cognome: "cognome"};
// Metodo 2:
var personaMetodo2 = {};
personaMetodo2.nome = "nome";
personaMetodo2.cognome = "cognome";
// Metodo 3:
var personaMetodo3 = new Object();
personaMetodo2.nome = "nome";
personaMetodo2.cognome = "cognome";
// 
// i metodi di Object sono metodi che possono usare tutti gli oggetti.
// Andiamo ad analizzare i metodi toString() e valueOf()
// - toString(): restituisce una versione in stringa dell'oggetto
// - valueOf(): restituisce il valore del tipo di dato primitivo associato 
//              all'oggetto. Se a quell'oggetto non è associato un tipo di
//              dato primitivo, verrà restituito l'oggetto stesso
var x1 = new Object(5);
x1.toString(); // restituisce "5"
x1.valueOf(); // restituisce 5
// 
// NOTA: JS nelle espressioni per le conversioni imlicite chiama automaticamente
//       questi metodi.





/******************************************************************************
 L'OGGETTO NUMBER
 ******************************************************************************/

// Fornisce metodi e proprietà per manipolare valori numerici
// Vediamo come creare un oggetto Number:
var objNumber1 = new Number(12);
var objNumber2 = new Number(3.333);
// 
// Le proprietà dell'oggetto Number:
// - EPSILON: la più piccola differenza tra la rappresentazione di 2 numeri
//            (A partire dalla versione 6 delle specifiche)
// - MAX_VALUE: il più grande numero positivo rappresentabile
// - MIN_VALUE: il più piccolo numero positivo rappresentabile diverso da 0
//              utile per i numeri decimali
// - NaN: un valore non numerico
// - NEGATIVE_INFINITY: rappresenta il valore infinito negativo
// - POSITIVE_INFINITY: rappresente il valore infinito positivo
// 
//  questi valori sono propri dell'oggetto Number e non della sua singola
//  istanza (è statico in JAVA xD)
//  Infatti per accederci dobbiamo fare così: 
Number.MAX_VALUE;
Number.MIN_VALUE;
Number.NEGATIVE_INFINITY;
Number.NaN;
Number.POSITIVE_INFINITY;
//
// I metodi dell'oggetto Number:
// - isFinite(x): true se x è un valore finito
//                false altrimenti
//                (A partire dalla versione 6 delle specifiche)
// - isInteger(x): true se x è un intero
//                 false altrimenti
//                 (A partire dalla versione 6 delle specifiche)
// - isNaN(x): true se x non è un valore numerico
//             false altrimenti
//             (A partire dalla versione 6 delle specifiche) 
// 
// A differenza dei metodi globali che hanno lo stesso nome,
// questi non effettuano una conversione di tipo e quindi potremmo avere
// risultati diversi dai due metodi
// Esempio:
var x = isFinite("123"); // ritorna TRUE perché converte la stringa
var y = Number.isFinite("123"); // ritorna FALSE
// 
// Un oggetto Number può essere usato all'interno di qualsiasi espressione
// in cui può essere utilizzato un valore numerico e sarà convertito
// implicitamente in un valore numerico appunto xD
// 
// Ogni istanza di Number può essere rappresentata in 3 modi rispetto
// alla base grazie a 3 metodi:
// - toExponential(): restituisce la rappresentazione esponenziale
// - toFixed(parametro_opzionale): restituisce una stringa che rappresenta
//                                 il valore numerico.
//                                 Il parametro opzionale indica quante cifre
//                                 dopo la virgola vanno inserite nella stringa
// - toPrecision(parametro_opzionale): restituisce una stringa che rappresenta
//                                     il numero con la precisione 
//                                     specificata tramite il parametro
//                                     opzionale  
// Facciamo degli esempi:
var x = new Number(123);
x.toExponential(); // restituisce 1.23e+2
var x = new Number(123.4);
x.toFixed(); // restituisce 123
x.toFixed(2); // restituisce 123.40
x.toPrecision(); // restituisce 123.4
x.toPrecision(1); // restituisce 1e+2
x.toPrecision(2); // restituisce 1.2e+2
x.toPrecision(3); // restituisce 123
x.toPrecision(4); // restituisce 123.4
x.toPrecision(5); // restituisce 123.40
x.toPrecision(6); // restituisce 123.400





/******************************************************************************
 L'OGGETTO MATH
 ******************************************************************************/

// A differenza di altri oggetti Math non permette la creazione
// di istanze.
// È un oggetto statico che mette a disposizioni attributi e metodi
// accessibili da ogni parte dello scrit
// 
// Proprietà dell'oggetto Math:
//      - E: la costante di eulero ( 2.718 )
//      - LN2: logaritmo di 2 ( 0.693 )
//      - LN10: logaritmo di 10 ( 2.303 )
//      - LOG2E: logaritmo in base 2 di e ( 1.443 )
//      - LOG10E: logaritmo in base 10 di e ( 0.434 )
//      - PI: il valore di pi greco ( 3.14 )
//      - SQRT1_2: la radice quadrata di 1/2 ( 0.707 )
//      - SQRT2: la radice quadrata di 2 ( 1.414 )
// 
// I metodi dell'oggetto Math:
//      - max(valori): restituisce il massimo tra i valori
//      - min(valori): restituisce il minimo tra i valori
//      - pow(base, esponente): eleva un numero ad una data potenza
//      - sqrt(numero): restituisce la radice quadrata del numero
//      - ceil(x): retituisce il più piccolo intero maggiore o uguale a x 
//      - floor(): restituisce il più grande intero minore o uguale a x
//      - round(): arrotonda x all'intero più vicino
//      - random(): genera un numero casuale tra 0 e 1 (es: 0.812971982719)
//      - abs(x): restituisce il valore assoluto di x
//      - log(x): restituisce il logaritmo in base e di x
//      - sin(x): restituisce il seno di x
//      - cos(x): restituisce il coseno di x
//      - tan(x): restituisce la tangente di x
//      - atan(x): restituisce l'arcotangente di x
//      - atan2(coordinata_y, coordinata_x): ritorna l'arcotangente di coordinata_y/coordinata_x. 
//                                           In altre parole fornisce il coefficiente angolare,
//                                           l'angolo o l'orientamento rispetto all'origine di
//                                           un vettore (coordinata_y, coordinata_y). 
//                                           Molto utile quando si lavora con la grafica.





/******************************************************************************
 L'OGGETTO STRING
 ******************************************************************************/

// Come per i numeri, JS si occupa di convertire automaticamente l'oggetto 
// String quando si utilizzano nella stessa espressioni valori di tipo stringa
// e oggetti String. Per la precisione, la conversione da oggetto a tipo di
// dato primitivo stringa avviene tramite la chiamata del metodo valueOf 
// sull'oggetto String.
// Per quanto riguarda fgli oggetti String avviene anche la conversione opposta
// cioè se porovo ad applicare un metodo dell'oggetto string sul tipo di dato
// primitivo stringa, questo verrà convertito in oggetto di tipo string prima
// di applicare quel metodo.
// - la proprietà lenght: restituisce la lunghezza della stringa
// - il metodo charAt(x): estrae il carattere alla posizione x all'interno
//                       della stringa, la stessa cosa la potremmo ottenere
//                       così: string[x], cioè mi baso sulla rappresentazione 
//                       della stringa come array (però questo modo è in
//                       sola lettura)
// - il metodo replace(sottostringa_da_rimpiazzare, 
//                     sottotstringa_che_rimpiazza): rimpiazza una sottostringa con un'altra sottostringa.
//                                                   Rimpiazza però solo la prima occorrenza
//                                                   della sottostringa da rimpiazzare
// - il metodo indexOf(stringa): restituisce la posizione della prima occorenza
//                               della stringa passata come argomento.
//                               Se non viene individuata nessuna occorenza 
//                               restituisce -1
// - il metodo lastIndexOf(stringa): come indexOf() solo che restituisce
//                                   la posizione dell'ultima occorenza al posto
//                                   della prima
// - il metodo match(): individua l'occorenza di una sottostringa ma lo vedremo
//                      quando parleremo delle espressioni regolari
// - il metodo substr(y, x): ci consente di estrarre una sottostringa di un certo
//                           numero di caratteri x a partire da una posizione y
// - il metodo substring(x, y): estrae la sottostringa compresa tra la posizione x
//                              e la posizione y (esclusa).
//                              se y viene omessa allora verrà presa tutta la
//                              sottostringa a partire dalla posizione x
// - il metodo slice(x, y): come substring().
//                          Vediamo le differenze tra substring() e slice():
//                          - Se il primo parametro di substring() è maggiore del
//                            secondo parametro, JS li scambia. Questo non avviene
//                            per slice() ma viene restituita la stringa vuota
//                          - Se uno degli argomenti è negativo in substring()
//                            viene trattato come zero. Mentre slice() lo
//                            considera come un valore relativo alla fine della
//                            stringa
// - il metodo split(divisore): permette di creare un array partendo da una 
//                              stringa.
//                              divisore indica come deve essere divisa la
//                              stringa.
//                              Se passiamo la stringa vuota ("") otteniamo un
//                              array di caratteri.
//                              Se non passiamo alcun argomento alla funzione
//                              allora otteniamo un array con un unico
//                              elemento che è la stringa intera.
//                              Un secondo parametro opzionale indica quanti
//                              elementi deve contenere l'array
//                              elementi in più verranno ignorati
var array1 = "Una stringa".split(); // x = ["Una stringa"] un array con 1 elemento
var array2 = "Una stringa".split(""); // x = ["U","n","a"," ","s","t","r","i","n","g","a"]
var array3 = "Una stringa".split("", 5); // x = ["U","n","a"," ","s"]
var array4 = "Una stringa".split(" "); // x = ["Una","stringa"]
//
// - il metodo toLowerCase(stringa): restituisce la stringa in cui tutti i 
//                                   caratteri sono minuscoli
// - il metodo toUpperCase(stringa): restituisce la stringa in cui tutti i
//                                   caratteri sono maiuscoli
// - il metodo trim(stringa): elimina tutti gli spazi prima e dopo la stringa
// - il metodo startsWith(str): restituisce true se una stringa inizia con str
//                              introdotta nella versione 6 della specifica
// - il metodo endsWith(str): restituisce true se una stringa finisce con str
//                            introdotta nella versione 6 della specifica
// - HTML wrapper methods: hanno un uso limitato anche perché coprono un 
//                         numero limitato di elementi ed attributi html
//                         - italics()
//                         - bold()
//                         - anchor(nome)
var html1 = "Una stringa".italics(); // x = <i>Una stringa</i>
var html2 = "Una stringa".bold(); // x = <b>Una stringa</b>
var html3 = "Una stringa".anchor("nome"); // x = <a name="nome">Una stringa</a>





/******************************************************************************
 L'OGGETTO REGEXP
 ******************************************************************************/

// JavaScript ha un supporto nativo per le espressioni regolari basato 
// sull’oggetto RegExp. 
// Un’espressione regolare in JavaScript quindi è un oggetto, 
// con delle proprietà e metodi che consentono di gestire testi, 
// individuare ed eventualmente sostituire stringhe all’interno di altre stringhe.
// 
// È possibile creare un'espressione regolare in 2 modi:
//      - attraverso un esplicito riferimento all'oggetto RegExp
var espressione1 = new regExp("ciao");
//
//      - utilizzando una speciale notazione letteraria
var espressione2 = /ciao/;
//
// entrame le istruzioni ottengono lo stesso risultato:
// un’espressione regolare per la ricerca di istanze delle stringa “ciao” 
// all’interno di altre stringhe.
// 
// una espressione regolare è uno schema di stringa (pattern) composto da 
// una sequenza di caratteri alfanumerici e di eventuali caratteri speciali.
// Un'espressione di soli caratteri alfanumerici indica la stringa da
// ricercare all'interno di un'altra stringa
// Ad esempio l'espressione regolare /ciao/ può essere usata per cercare o
// sostituire la sottostringa "ciao" all'interno di una stringa.
// Normalmente la ricerca di pattern avviene tenendo conto della distinzione
// tra maiuscole e minuscole. Ma è possibile modificarne il comportamento
// tramite dei modificatori:
//      - i: ignora la distinzione tra maiuscole e minuscole
//      - g: esegue una ricerca golbale
//           cioè individua tutte le occorrenze di un pattern
//      - m: esegue una ricerca su stringhe multilinea
//      
// I modificatori vanno inseriti in modi diversi a seconda di come creiamo
// l'espressione regolare:
//      - con l'oggetto:
var espressione3 = new RegExp("ciao", "i");
var espressione4 = new RegExp("ciao", "ig");
//
//      - con notazione letteraria 
var espressione5 = /ciao/i;
var espressione6 = /ciao/ig;
// 
// I caratteri speciali in una espressione regolare permettono di creare 
// pattern che individuano un insieme di stringhe.
// I caratteri speciali sono: 
//      - []: permettono di specificare un insieme di caratteri alfanumerici
var espressione7 = /[aeiou]ab/i; // individua le stringhe che iniziano con una
// vocale e finiscono con "ab"
//
//            oppure un intervallo di caratteri alfanumerici
//            es: [a-z] oppure [0-9]
// 
// I metacaratteri sono:
//      - .: il punto indica un qualsiasi carattere
//      - \w: indica un carattere alfanumerico
//      - \d; indica una cifra numerica
var espressione8 = /\d\daa.\w\w/i; // individua le stringhe che iniziano con
// un numero a due cifre (\d\d)
// seguite dalla stringa "aa"
// seguite da un carattere qualsiasi (.)
// e che termina con due caratteri alfanumerici (\w\w)
// 
// I quantificatori sono:
//      - +: messo dopo un carattere indica che ci si aspetta l'esistenza di
//           1 o più occorrenze di quel carattere/metacarattere
//      - *: indica l'esistenza di 0 o più occorenze
//      - ?: indica l'esistenza di 0 o 1 occorrenza
//      - {n}: indica l'esistenza di esattamente n occorenze
//      
// La lista di caratteri speciali non è completa! ce ne sono molti altri
// che rendono le espressioni regolari strumenti molto potenti
// 
// Proprietà dell'oggetto RegExp:
//      - golbal: booleano. Indica se è definito il modificatore g
//                          per quel RegExp
//      - ignorecase: booleano. Indica se è definito il modificatore i
//                              per quel RegExp
//      - multiline: booleano. Indica se è definito il modificatore m
//                             per quel RegExp
// 
// Metodi dell'oggetto RegExp:
//      - test(stringa): restituisce true se una stringa individuata dall'espressione
//                       regolare è contenuta nella stringa passata come argomento
var exp1 = /\d/;
exp1.test("Stringa1"); // true
exp1.test("Stringa"); // false
// 
//      - exec(stringa): come test(), ma anzichè restituire un booleano
//                       restituisce un array contenente la sottostringa
//                       individuata o null se questa non c'è
//      
//      NOTA: È importante notare che l’esecuzione dei metodi test() ed exec() 
//            su un’espressione regolare con modificatore global attivo aggiorna 
//            la proprietà lastIndex dell’oggetto RegExp. Tale proprietà contiene 
//            l’indice all’interno della stringa da cui partire per la ricerca. 
//            Dopo l’eventuale individuazione di una sottostringa questa proprietà 
//            viene aggiornata con l’indice che punta al resto della stringa. 
//            Questo comporta che l’eventuale riesecuzione di test() o exec() 
//            sulla stessa espressione regolare permette di individuare eventuali 
//            successive occorrenze di sottostringhe.
//            Ma facciamo un esempio per chiarire la questione:
var exp2 = /\d/i;
exp2.exec("str1ng4");  // ["1"]
exp2.exec("str1ng4");  // ["4"]
exp2.exec("str1ng4");  // null
//
// TORNIAMO UN ATTIMO A PARLARE DELL'OGGETTO STRING:
// alcuni metodi dell'oggetto String accettano come parametri delle espressioni
// regolari.
// Questi metodi sono:
//      - search(RegExp): restituisce l'indice della prima occorenza di una
//                        stringa individuata tramite l'espressione regolare
//                        passata come parametro.
//                        Se non viene trovata alcuna corrispondenza restituisce
//                        -1
"Str1nga".search(/\d/); // restituisce 3
//
//      -  split(RegExp): genera array a partire da una stringa, dividendola
//                        appena incontra una sottostringa individuata
//                        dall'espressione regolare passata come argomento
"Str1nga".split(/\d/); // restituisce ["Str", "nga"]
//                      
//      - replace(RegExp, stringa): sostituisce una o più occorenze di una
//                                  stringa individuata da un'espressione
//                                  regolare con un'altra stringa 
"Str1nga2".replace(/\d/, "NUMERO"); // restituisce "StrNUMEROngaNUMERO"
//
//      - match(RegExp): restituisce un array contenente le sottostringhe trovate
"Str1nga2".match(/\d/); // restituisce ["1", "2"]
// 
// Il classico utilizzo delle espressioni regolari è quello della
// validazione dell'input dell'utente.
// Vediamo un paio di esempi comuni:
var codice_fiscale = /[a-z]{6}\d{2}[abcdehlmprst]\d{2}[a-z]\d{3}[a-z]/i;
var mail = /\w+@\w+\.\w{2,4}/i;
var indirizzo_IP = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
var HTML_div = /<div\b[^>]*>(.*?)<\/div>/i;
var valore_esadecimale = /[a-f0-9]+/i;
// var URL = (https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?;





/******************************************************************************
 L'OGGETTO DATE
 ******************************************************************************/

// Possiamo usare l'oggetto Date per creare istanze di date in 4 modi
// differenti:
//             1) non specifichiamo alcun parametro ed otteniamo un oggetto
//                Date con data e ora corrente
var data1 = new Date();
// 
//             2) passiamo un valore numerico che rappresenta il numero di 
//                millisecondi trascorsi dal 1 Gennaio 1970. 
//                È possibile passare anche un valore negativo che indica il
//                numero di millisecondi prima di quella data
var data2 = new Date(12345678987654321);
// 
//             3) passiamo una stringa che rappresenta una data
var data3 = new Date("21/03/2014 21:10");
//
//             4) indichiamo come argomenti rispettivamente: - anno (obbligatorio)
//                                                           - mese (obbligatorio)
//                                                             [0 = gennaio, 1 = febbraio, ..., 11 = dicembre]
//                                                           - giorno (opzionale)
//                                                           - ora (opzionale)
//                                                           - minuti (opzionale)
//                                                           - secondi (opzionale)
//                                                           - millisecondi (opzionale)
var data4 = new Date(2014, 02, 21, 21, 12, 00, 00);
// 
// L'oggeto Date prevede una serie di metodi per scomporre la data nei vari
// componenti: anno, mese, giorno, ora, minuti, secondi e millisecondi.
// Questi sono: - getFullYear(): restituisce l'anno rappresentato con 4 cifre
//              - getMonth(): restituisce il mese (da 0 a 11)
//              - getDate(): restituisce il giorno del mese (da 1 a 31)
//              - getDay(): restituisce il giorno della settimana (da 0 a 6)
//              - getHours(): restituisce l'ora
//              - getMinutes(): restituisce i minuti
//              - getSeconds(): restituisce i secondi
//              - getMilliseconds(): restituisce i millisecondi
//              
// Vediamo ora i metodi per modificare le date:
//              - setFullYear(annno): imposta l'anno rappresentato con 4 cifre
//              - setMonth(mese): imposta il mese (da 0 a 11)
//              - setDate(giorno_mese): imposta il giorno del mese (da 1 a 31)
//              - setDay(giorno_settimana): imposta il giorno della settimana (da 0 a 6)
//              - setHours(ora): imposta l'ora
//              - setMinutes(minuti): imposta i minuti
//              - setSeconds(secondi): imposta i secondi
//              - setMilliseconds(millisecondi): imposta i millisecondi
//              - setTime(millisecondi_trascorsi): imposta data e ora.
//                                                 millisecondi_trascorsi indica
//                                                 i millisecondi trascorsi dal
//                                                 1 Gennaio 1970
// 
// ES: impostare il giorno del prossimo anno corrispondente ad oggi:
var data5 = new Data();
data5.setFullYear(data5.getFullYear() + 1);
//
// Da notare che le componenti vengono aggiornate automaticamente. Cioè
// se oggi è 31 Gennaio ed imposto la data un giorno avanti, non diventa il 32
// Gennaio, ma il 1° Febbraio. Gennaio viene automaticamente cambiato a Febbraio.
// 
// In JS è possibile confrontare le date tramite i normali operatori di confronto
// Ma facciamo un esempio:
var scadenza = new Date(2013, 11, 10);
var oggi = new Date();

if (oggi < scadenza)
    messaggio = "Non ancora scaduto!";
else if (oggi > scadenza)
    messaggio = "Scaduto!";
//
// Di solito le date sono indicate in base alle impostazioni della macchina
// su cui sta gisrando lo script.
// Quindi se stampiamo a video una data possiamo ottenere una cosa del genere:
//
//  Tue Oct 22 2013 07:20:20 GMT+0200 (ora legale Europa occidentale)
// 
// Però internamente la rappresentazione delle date è relativa all'ora di
// Greenwich (Greenwich Mean Time o GMT) conosciuta anche come 
// Universal Time Coordinate (UTC).
// JS mette a disposizioni dei metodi per lavorare con la rappresentazione
// UTC delle date
// In pratica, per ciascuno dei metodi per ottenere e per impostare
// i componenti di una data esiste il corrispondente metodo UTC:
//      - getUTCDate()
//      - setUTCDate()
//      - ecc.
//      
// Inoltre abbiamo il metodo getTimezoneOffset(): restituisce la differenza in 
//                                                minuti tra l’ora UTC e 
//                                                l’ora locale
// 
// Infine esistono una serie di metodi per rappresentare una data tramite
// una stringa: - toDateString(): converte la componente data in stringa escludendo l'ora
//              - toISOString(): converte una data in una stringa in formato ISO
//              - toLocaleDataString(): converte la componente data in stringa,
//                                      escludendo l'ora, secondo le impostazioni
//                                      locali
//              - toLocaleTimeString(): converte la componente ora in stringa,
//                                      escludendo la data, secondo le 
//                                      impostazioni locali
//              - toLocaleString(): converte una data in stringa secondo le 
//                                  impostazioni locali
//              - toString(): converte una data in stringa
//              - toTimeString(): converte la componente ora in stringa
//                                escludendo la data
//              - toUTCString(): converte una data UTC in stringa





/******************************************************************************
 L'OGGETTO ARRAY
 ******************************************************************************/

// Oltre alla notazione letterale possiamo creare un array grazie all'oggetto
// Array.
var array1 = new Array();
// 
// È possibile creare un array di un numero predefinito di elementi
// specificandolo al momento della creazione
var array2 = new Array(3);
// 
// Gli elementi dell'array creato in questo modo saranno di tipo undefined
// Mentre, era possibile specificare quali elementi inserire all'interno
// dell'array
var array3 = new Array(3, "stringa", true, 2);
// 
// La proprietà length dell'oggetto Array:
//      indica quanti elementi contiene l'array. Poichè l'array in JS è
//      dinamico, questa proprietà può cambiare nel tempo in base alle
//      operazioni che effttuiamo sull'array, ad esempio aggiunta e/o rimozione
//      di un elemento.
//      Tuttavia è possibile fare l'inverso, cioè modifcando la proprietà
//      length di un array, modifichiamo la struttura (dimensione) dell'array
array2.length = 5; // ora array 2 non contiene più 3 elementi ma 5
// 
// Metodi di politica FIFO:
//      - push(elemento_da_inserire): aggiunge un elemento alla fine di un array 
//                                    e restituisce la nuova lunghezza
//      - pop(): rimuove l'ultimo elemento di un array e restituisce
//               l'elemento eliminato
var stack = new Array("uno", "due", "tre");
stack.push("quattro"); // restituisce 4 e stack = ["uno","due","tre","quattro"]
stack.pop(); // restituisce "quattro" e stack = ["uno","due","tre"]
//                                    
// Altri metodi dell'oggetto Array:
//      - shift(): elimina il primo elemento di un array e restituisce questo
//                 elemento
//      - unshift(elemento_da_aggiungere): aggiunge un elemento in cima
//                                         all'array e restituisce la nuova
//                                         lunghezza
var kcats = new Array("uno", "due", "tre");
kcats.unshift("zero"); // restituisce 4 e kcats = ["zero","uno","due","tre"]
kcats.shift(); // restituisce "zero" e kcats = ["uno","due","tre"]
// 
//      - splice(): aggiunge e rimuove elementi in qualsiasi posizione
//                  all'interno di un array.
//                  Prende 2 argomenti obbligatori:
//                      1°: la posizione dell'array da cui eliminare o
//                          aggiungere elementi
//                      2°: il numero di elementi da eliminare
//                  Poi è possibile specificare quali sono gli elementi da
//                  aggiungere.
//                  In pratica splice() individua una posizione nell'array
//                  a partire dalla quale elimina il numero di elementi
//                  specificati come secondo argomento ed aggiunge gli
//                  eventuali elementi passati dal terzo argomento in poi.
//                  restituisce l'array contenente gli elementi
//                  eliminati
var array4 = new Array("uno", "due", "tre");
var array5 = array4.splice(1, 1, "quattro"); // array4 = ["uno", "quattro". "tre"]
// array5 = ["quattro"]
var array6 = array4.splice(2, 0, "cinque", "sei", "sette"); // array4 = ["uno", "quattro", "cinque", "sei", "sette", "tre"]
// array6 = []
//                  
// Tramite il metodo slice() abbiamo la possibilità di estrarre una porzione
// di array fornendo l’indice iniziale e quello finale:
var array7 = new Array("uno", "due", "tre", "quattro");
var array8 = array7.splice(1, 3); // array8 = ["due", "tre"]
// 
//      - concat(array): permette di concatenare due array: quello su cui viene
//                       chiamato il metodo con quello passato come argomento
var array9 = new Array("uno", "due");
var array10 = new Array("tre");
var array11 = array9.concat(array10);
// 
//      - sort(): ordina gli elementi di un array
//      - reverse(): inverte l'ordine degli elementi
var array12 = new Array("uno", "due", "tre");
array12.sort(); // ["due", "tre", "uno"]
array12.reverse(); // ["uno", "tre", "due"]
// 
//      - indexOf(elemento): restituisce l'indice dell'elemento passato
//                           come argomento all'interno dell'array.
//                           Più precisamente restituisce l'indice della
//                           prima occorenza dell'elemento all'interno
//                           dell'array.
//                           Se l'elemento non è presente all'interno
//                           dell'array, allora il metodo restituisce
//                           -1
var array13 = new Array("uno", "due", "tre");
array13.indexOf("due"); // restituisce 1
// 
//      - lastIndexOf(elemento): restituisce l'indice dell'ultima
//                               occorrenza dell'elemento all'interno
//                               dell'array.
//                               Se l'elemento non c'è restituisce -1
// 
//      - join(): trasforma l'array in stringa separando ogni elemento
//                con una virgola.
var array14 = new Array("uno", "due", "tre");
array14.join(); // restituisce "uno,due,tre"
//
//                Possiamo indicare quale stringa utilizzare come separatore
//                specificando un argomento:
array14.join(" "); // restituisce "uno due tre"





/******************************************************************************
 TYPED ARRAY
 ******************************************************************************/

// Introdotti con la versione 6 della specifica.
// 
// Strutture dati che consentono la manipolazione efficiente di dati binari.
// Si dividono in 2 tipi di oggetto:
//      - ArrayBuffer: un oggetto che rappresenta un blocco di dati senza alcun
//                     formato specifico nè meccanismi per accedere al suo
//                     contenuto.
//                     Può essere pensato come una struttura dati per contenere
//                     una generica sequenza di byte.
//      - ArrayBufferView: un oggetto che fornisce un tipo di dati e una
//                         struttura per interpretare i dati binari
//                         dell'ArrayBuffer trasformandolo così in un vero
//                         Typed Array
// ArrayBufferView in realtà non è un vero e proprio oggetto JS, ma un nome
// per indicare diversi tipi di oggetto in base al modo in cui vogliamo
// interpretare i dati di un buffer binario.
// Vediamone alcuni:
//      - Int8Array: per accedere ai dati come interi a 8 bit
//      - Uint8Array: per accedere ai dati come interi a 8 bit senza segno
//      - Int32Array: per accedere ai dati come interi a 32 bit
// Ma facciamo un esempio, vediamo come accedere ad un blocco di dati binari
// ed interpretarli come un array di interi a 32 bit:
//      
//      var buffer = new ArrayBuffer(256);
//      var bufferView = new Int32Array(buffer);
//      buffer = fillBuffer();
//      for(var i = 0; i < bufferView.length; i++){
//              bufferView[i];
//      }
// 
// NOTA: nell'esempio supponiamo che esista una funzione fillBuffer()
//       che si occupa di caricare dati binari nel buffer.
//       
// I typed Array permettono a JS di manipolare a basso livello dati binari come
// immagini, suoni ed altre risorse multimediali.





/******************************************************************************
 SET
 ******************************************************************************/

// Introdotti con la versione 6 della specifica.
// 
// Di solito in JS per gestire insiemi di dati si usano gli array.
// Ma non sempre questa struttura dati è comoda o sufficiente.
// Per questo motivo è stata introdotta la struttura dati Set.
// 
// Un Set può contenere dati di qualsiasi tipo ma senza duplicati.
// 
// Set ha la proprietà size che indica quanti elementi contiene il Set
// 
// I metodi di Set sono: - add(elemento): aggiunge un elemento al Set
//                       - has(elemento): verifica se un elemento è presente
//                                        nel Set
//                       - delete(elemento): elimina un elemento dal Set
//                       - clear(): elimina tutti gli elementi del Set
//      
var set = new Set(); // crea l'insieme
set.add(1); // aggiunge 1 all'insieme
set.add(2); // aggiunge 2 all'insieme
set.add("tre"); // aggiunge "tre" all'insieme
set.size; // restituisce 3
set.has(2); // restituisce true
set.delete(1); // elimina 1 dall'insieme
set.clear(); // elimina tutti gli elementi dall'insieme





/******************************************************************************
 MAP
 ******************************************************************************/

// Introdotti con la versione 6 della specifica
// 
// sostanzialmente sono delle mappe associative che consentono di abbinare
// un valore ad una chiave.
// 
// NOTA: in realtà questo meccanismo è in qualche modo già presente in JS.
//       Infatti come vedremo più in là, gli oggetti in JS non sono altro che
//       coppie di chiavi e valori che ne rappresentano le proprietà.
//       
// L'oggetto Map consente quindi di creare associazioni tra chiavi e valori di
// qualsiasi tipo.
// 
// La proprietà size di Map permette di ottenere il numero degli elementi
// della mappa.
// 
// I metodi di Map sono: - set(chiave, valore): aggiunge questa associazione
//                                              alla mappa
//                       - has(chiave): verifica se la chiave esiste nella
//                                      mappa
//                       - delete(chiave): permette di eliminare
//                                         un'associazione della mappa
//                       - get(chiave): permette di accedere al valore
//                                      legato alla chiave che passiamo come
//                                      argomento.
var map = new Map(); // creo una mappa
map.set("nome", "Alessandro"); // aggiungo un'associazione alla mappa
map.set(3.14, "Pi greco"); // aggiungo un'associazione alla mappa
var obj = {id: 123, data: "test"};
map.set(obj, "Oggetto"); // aggiungo un'associazione alla mappa
map.delete(3.14); // elimino l'associazione (3.14, "Pi greco")
map.has(3.14); // ritorna false
map.size; // ritorna 2
map.get("nome"); // ritorna "Alessandro"
map.get(obj); // ritorna "Oggetto"
// 
// Una versione particolare di mappa associativa è la WeakMap.
// Simile a Map ma gli elementi di questo oggetto "sono gestiti tramite
// un riferimento debole che non impedisce al garbage collector di
// eliminarli dalla memoria".
// 
// Cioè, è possibile che un elemento di una WeakMap non sia più presente
// non perché lo abbiamo eliminato noi con un'apposita istruzione ma perché
// è staso il garbage collector ad eliminarlo.
// 
// È evidente che questo tipo di mappa ha applicazioni del tutto particolari.
// Ad esempio può essere utilizzata mettendo in corrispondenza elementi del DOM, 
// cioè della rappresentazione ad oggetti della struttura di una pagina HTML,
// con dei valori.
// Se in seguito a manipolazioni del DOM un elemento viene eliminato,
// la corrispondente associazione nella WeakMap scompare di conseguenza.
// 
// È da sottolineare che le WeakMap non ammettono chiavi di tipo semplice,
// come stringhe o numeri, ma soltanto oggetti.
