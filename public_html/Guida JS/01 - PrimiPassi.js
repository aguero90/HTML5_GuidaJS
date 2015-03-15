
alert('JS esterno');

// commento a singola riga JS

/* commento
 * multiriga
 * di JS 
 */

/*
 * JS ha 5 tipi di dato primitivo: - numeri
 *                                 - stringhe
 *                                 - booleani
 *                                 - null
 *                                 - undefined
 *                                 
 *    e un tipo di dato complesso: - oggetto
 */





/******************************************************************************
 TIPI DI DATO PRIMITIVO
 ******************************************************************************/

// Stringhe
var stringaVirgolette = "questa è una stringa tra virgolette";
var stringaApiciSingoli = 'questa è una stringa tra apici singoli';
var stringaMista1 = "posso scrivere anche 'così'";
var stringaMista2 = 'oppure "così"';
var stringaMista3 = "basta che il dlimitatore finale sia uguale all'iniziale";

// Numeri
// non c'è distinzione tra interi e decimali
// vengono tutti interpretati come virgola mobile
// ma se la parte decimale non è specificata viene trattato come un intero
var zero = 0;
var interoPositivo = 5;
var interoNegativo = -5;
var decimale = 0.5;
var decimalePositivo = 5.55;
var decimaleNegativo = -5.55;
var decimaleConZero = 1.0;
var numeroOttale = 0123; // inizia con lo 0
var numeroEsadecimale = 0x123; // inizia con 0x
// ogni valore oltre l'intervallo massimo di rappresentazione viene interpretrato con
// Infinity (infinito positivo)
// -Infinity (infinito negativo)
var x = x + 1; // restituisce NaN (Not a Number)

// Null
var n = null;

// Undefined (valore di una variabile non inizializzata)
var u; // vale undefined

// Booleano
var bool = true;

// JS è un linguaggio con tipizzazione debole o dinamica
// (cioè non bisogna specificare il tipo di dato quando dichiariamo una variabile
//  e il tipo di questa può variare durante lo script)
var tipizzazione;       // undefined
tipizzazione = 1;       // intero
tipizzazione = 5.55;    // decimale
tipizzazione = true;    // boolean
tipizzazione = null;    // null
tipizzazione = "ciao";  // stringa





/******************************************************************************
 STRICT MODE JS
 ******************************************************************************/

// In JS è possibile non concludere le istruzioni con ; ma non è buona pratica
// e potrebbe causare errori
// In JS è possibile dichiarare variabili implicitamente (cioè senza indicare var)
// ma non è buona pratica e può portare ad errori
// JS è ovviamente un linguaggio interpretrato, però esiste un "compilatore"
// JIT (just in time compiler) se incontra uno dei precedenti errori non li segnala
// per far si che vengano segnalati, dovremmo usare la strict mode di JS
// così da abituarci a scrivere del codice migliore
// per abilitare la strict mode bisogna inserire il seguente comando
// in cima al nostro script:
"use strict";




/******************************************************************************
 LE COSTANTI
 ******************************************************************************/

// Fino alla versione 5 dello standard non è possibile inserire delle costanti
// perciò viene usata la convenzione di scrivere il nome della variabile
// in maiuscolo pr far capire che si tratta di una costante
var COST5 = "costante standard 5";
// ma non è assicurato che questa non venga modificata
// Con la versione 6 dello standard sarà messo a disposizione il
// modificatore const per definire una costante:
// const COST6 = "costante standard 6";





/******************************************************************************
 CONVERSIONI IMPLICITE
 ******************************************************************************/

// Come abbiamo detto in JS non è necessario definire un tipo per le variabili
// quindi lo sviluppatore ha più libertà ma il motore JS dovrà provvedere con
// delle conversioni implicite in alcuni casi
var stringaNumerica1 = "12";
var stringaNumerica2 = "5";
var risultatoSommaStringheNumeriche = stringaNumerica1 * stringaNumerica2;
// quale sarà il risultato? 
// in questo caso sarà la moltiplicazione dei valori numerici: 12 * 5
// ma in quest'altro caso?
var stringaNumerica3 = "7";
var stringaNumerica4 = stringaNumerica3 + 77;
// il risultato sarà 7 + 77 oppure la stringa "777"?
// Andiamo a capire quando e come avvengono le conversioni implicite in JS.
// In JS ogni tipo di dato primitivo può essere convertito
// in un altro tipo di dato primitivo
//
// valore -> Booleano: - undefined -> false
//                     - null -> false
//                     - numero: se 0 o Nan -> false
//                               altrimenti -> true
//                     - stringa: se stringa vuota -> false
//                                altrimenti -> true
x % 2 ? "true" : "false"; // restituirà la stringa "false" se x%2 sarà 0 o NaN
// altrimenti restituirà la stringa "true"
//
// valore -> Numero: - undefined -> NaN
//                   - null -> 0
//                   - bool: se false -> 0
//                           se true -> 1
//                   - stringa: se stringa vuota -> 0
//                              se stringa non rappresenta un numero -> NaN
//                              se stringa rappresenta un numero -> numero rappresentato (intero o decimale che sia)
"uno" * 2; // la srtinga "uno" viene convertira in NaN poichè non rappresenta un numero
//
// valore -> Stringa: - undefined -> "undefined"
//                    - null -> "null"
//                    - bool: se false -> "false"
//                            se true -> "true"
//                    - numero: se NaN -> "NaN"
//                              se Infinity -> "Infinity"
//                              se numero -> stringa che rappresenta il numero
var stringaNumero = 12.7; // stringaNumero sarà "12.7"
// queste conversioni sono facili da applicare quando si parla di operatori
// binari che operano con un unico tipo di dato (es: *)
// ma con operatori polimorfi? cioè quegli operatori che prevedono
// operandi di tipo diverso come il + (somma e concatenazione di stringhe) ?
// In questi casi la situazione si complica un po'!
// riprendiamo l'esempio iniziale:
var stringaNumerica3 = "7";
var stringaNumerica4 = stringaNumerica3 + 77;
// Il motore di JS segue regole diverse a seconda dell'operatore:
// 
// - operatore +: se almeno uno dei due operandi è una stringa viene effettuata
//                la concatenazione tra stringhe, altrimenti la somma
//  quindi il valore di stringaNumerica4 nell'esempio precedente
//  sarà la stringa "777"
true + null; // sarà uguale a 1. Dato che non ci sono stringhe coinvolte
// true -> 1, nulle -> 0 e quindi 0+1=1
//
// - operatori <, <=, >=, >: se almeno uno dei due operandi è un numero
//                           allora viene eseguito un confronto tra numeri
//                           altrimenti tra stringhe
"12" > 10; // sarà come fare 12 > 10
true > null; // sarà come fare "true" > "null"
//
// - operatori ==, !=: se almeno uno dei due oprandi è un numero
//                     allore viene eseguito un confronto tra numeri
//                     altrimenti tra stringhe
//                     ECCEZIONE: null == undefined che è vera per definizione
// 
// - operatori ===, !==: confrontano gli operandi senza effettuare conversioni.
//                       quindi i due operandi vengono considerati uguali solo
//                       se hanno lo stesso tipo e rappresentano effettivamente
//                       lo stesso valore
//                       
// Le conversioni implicite di JS sono spesso fonte di bug.
// Quindi bisognnerebbe evitarle. inoltre è preferibile usare gli operatori
// === e !== piuttosto che == e != per essere sicuri di quello che si sta
// confrontando.
// 
// Se proprio non si possono evitare confronti tra tipi diversi
// è bene esplicitare la conversazione con delle funzioni predefinite:
// - parseInt(): converte una stringa in un valore intero.
//               prevede 2 parametri: 1° la stringa da convertire
//                                    2° (opzionale) indica con quale base rappresentarlo
parseInt("12");  // 12
parseInt("12abc");   // 12
parseInt("a12bc");   // NaN
parseInt("12.5");   // 12
parseInt("12", 8);   // il valore di 12 nel sistema di numerazione ottale (base 8), cioè 10
//
// - parseFloat(): restituisce un valore numerico considerando l'eventuale virgola.
parseFloat("12");        //12
parseFloat("12.5");  //12.5
// è possibile fare conversione esplicite fra gli altri tipi di dato
// ricorrendo agli oggetti (ma lo vederemo più avanti)
//
// verificare il tipo di una variabile:
// typeof: può restituire: - "number"
//                         - "string"
//                         - "boolean"
//                         - "function"
//                         - "undefined"
//                         - "object"
//                         - "xml"
var funzione = new Function();
typeof funzione; // ritorna "function"
var numero = 1;
typeof numero; // ritorna "number"
var stringa = "Salve";
typeof stringa; // ritorna "string"





/******************************************************************************
 ARRAY
 ******************************************************************************/

var arryVuoto = []; // array definito vuoto
var arrayUndefined = [, "elemento"]; // l'array ha 2 elementi
arrayUndefined[0]; // sarà undefined
arrayUndefined[1]; // sarà "elemento"
var arrayIgnoraUltimaVirgola = ["elemento1", "elemento2", ]; // l'array ha 2 elementi e non 3
// l'ultima virgola viene ignorata
var arrayMisto = [1, true, "ciao", null]; // nell'array possiamo inserire tipi di dato diversi
var arrayMultidimensionale = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]; // dichiarazione array multidimensionale
arrayMultidimensionale[0][2]; // sarà 3
arrayMultidimensionale[2][0]; // sarà 7
//
// dalla versione 6 delle specifiche sarà possibile assegnare contemporaneamente
// a più variabili i valori di un array. 
// Es: var[elemento1, elemento2, elemento3, elemento4] = arrayMisto;





/******************************************************************************
 FOR
 ******************************************************************************/

// Nel for è possibile inserire più inzializzazioni e più modifiche
// for(iniazializzazioni; condizioni, modifiche)
var i;
var j;
for (i = 0, j = 0; i < 5; i++, j += 2) { // ci sono 2 inizializzazioni (1=0, j=0) e 2 modifiche (i++, j+=2)
    // istruzioni da eseguire
}
// nel for nessuna sezione è obbligatoria: possiamo omettere l'inizializzazione
// le modifiche o le condizioni
for (; i < 5; i++) {
}
for (i = 0; i < 5; ) {
}
for (; i < 5; ) {
}
// 
// Per lavorare comodamente con gli array in JS esistono il for-in e il for-of.
// for-in: non abbiamo bisogno di specificare la lunghezza dell'array nè
//         l'istruzione di modifica. JS scorre tutto l'array incrementando di
//         uno di volta in volta l'indice.
for (i in arrayMisto) {
} // scorre tutto arrayMisto
//
// A partire dalla versione 6 delle specifiche è disponibile il for-of
// for-of: JS anziché assegnare l'indice assegna direttamente il valore 
//         dell'elemento corrente dell'array
// for(i of arrayMisto){} // i conterrà di volta in volta il valore degli elementi di arrayMisto





/******************************************************************************
 FUNZIONI
 ******************************************************************************/

// Le funzioni in JS possono essere: - Normali
//                                   - Anonime (le vedremo in seguito)
//
// Per le funzioni normali distinguiamo 2 fasi: - dichiarazione
//                                              - invocazione
//                                              
// Dichiarazione di una funzione:
function nomeFunzione(parametriFunzione) {
    //corpofunzione
}
// NOTA: dato che JS è debolmente tipato, non c'è bisogno di dire che tipo di
//       ritorno ha la funzione.   
//
// Invocare una funzione:
nomeFunzione(argomentiDaPassareAllaFunzione);
// 
// JS è un linguaggio molto flessibile e permette di inserire più o meno argomenti
// di quelli richiesti al momento della chiamata alla funzione.
// facciamo un esempio:
function somma(x, y) {
    var z = x + y;
    return z;
}
var risultato1 = somma(11); // coretto! il secondo paramatro sarà undefined e 
// quindi la funzione restituirà NaN
var risultato2 = somma(); // corretto! stessa cosa di prima
var risultato3 = somma(1, 2, 3, 4, 5); // corretto! semplicemente ignora gli
// ultimi 3 parametri (cioè 3, 4 e 5)
//
// Abbiamo anche una certa flessibilità nel momento della dichiarazione
// della funzione.
// se ad esempio per una funzione non definiamo alcun parametro in input,
// possiamo comunque accedere ad eventuali argomenti passat in fase di
// chiamata tramite un array speciale predefinito: arguments
// facciamo un esempio:
function testSommaArguments() {

    var z = arguments[0] + arguments[1]; // eventuali argomenti passati alla funzione
    // al momento della chiamata della funzione
    return 0;
}
//
// questo ci permette di creare funzioni con un numero di parametri non definito
// ad esempio possiamo sommare un numero indefinito di valori:
function testSommaIndefinita() {

    var z = 0;
    var i;

    for (i in arguments) {
        z += arguments[i];
    }

    return z;
}
//
// in questo modo la funzione farà quello che deve fare con un qualsiasi numero
// di argomenti passati come funzione
testSommaIndefinita();
testSommaIndefinita(5, 7);
testSommaIndefinita(1, 4, 7, 23, 45, 76, 2, 9, 15);
//
// dalla versione 6 della specifica sarà introdotta la possibilità di stabilire
// un valore di default per i parametri:
// function somma(x = 0, y = 0){ ...corpo della funzione... }
// così, invece di assegnare undefined se non vengono passati almeno 2 argomenti
// alla funzione somma in fase di chiamata, verrà assegato loro il valore
// di default (in questo caso 0) così la funzione non restituirà NaN
//
// un'altra novità della versione 6 della specifica è la possibilità di
// specificare il "rest parameter": una notazione per indicare un elenco
//                                  indefinito di parametri aggiuntivi
// Esempio: creare una funzione per fare più operazioni aritmetiche
//          dove il primo parametro è il nome dell'operazione da eseguire
//          e gli altri sono quelli su cui dovrà fare quella data operazione
//          
// function eseguiOperazione (x, ...y){
//     
//      var z = 0;
//      var i;
//      
//      switch(x){
//          
//          case "somma": for(i in y){
//                              z += y[i];          
//                        }
//                        break;
//          
//          case "mltiplica": for(i in y){
//                                  z *= y[i];          
//                            }
//                            break;
//                            
//          case "dividi": for(i in y){
//                               z = y[0]/y[i];          
//                         }
//                         break;
//                         
//          default: z = NaN;
//                   break;
//      }    
//      
//      return z;
// }
//
// In questo caso dopo il primo parametro (x) tutti gli altri argomenti che
// verranno passati saranno salvati in un array definito con la notazione
// ...nomeArray (nel nostro esempio ...y)
// La funzionalità è simile all'aray speciale "arguments" ma questo cattura TUTTI
// i parametri, mentre con "rest parameter" cattura solo gli argomenti in più
// rispetto a quelli specificati
// 
// Possiamo quindi invocare la nostra funzione nei seguenti modi:
// eseguiOperazione("somma", 7, 8, 9, 17) // x xonterrà "somma"
//                                        // y conterrà [7, 8, 9, 17]
// eseguiOperazione ("moltiplica", 1, 5, 7, 9) // x conterrà "moltiplica"
//                                             // y conterrà [1, 5, 7, 9]
// 
// La stessa notazione del "rest parameter" può essere anche usata al momento
// della chiamata delle funzioni che prevedono diversi argomenti.
// In questo caso si parla di "spread operator", cioè di un operatore che
// sparge i valori contenuti in un array sugli argomenti della funzione
// 
// ES: var addendi = [1, 2, 3, 4, 5];
//     eseguiOperazione("somma", ...addendi); // è come se chiamassi la funzione
//                                           // in questo modo:
//                                           // eseguiOperazione("somma", 1, 2, 3, 4, 5);





/******************************************************************************
 SCOPE
 ******************************************************************************/

// NOTA: indipendentemente dal punto in cui viene dichiarata la variabile, essa
//       esiste in tutto lo scope a cui appartiene
// facciamo un esempio
var x = 10; // variabile globale
var y; // variabile globale
function incrementa() {

    var s = x; // s vale undefined poichè l'istruzione successiva dichiara x
    // e quindi considera già la x locale alla funzione che però
    // non è stata ancora inizializzata (non vale 10 come si 
    // potrebbe pensare!)
    var x = 5; // x vale 5
    x += s; // x ora vale NaN poiché ho fatto una somma con undefined

    return x;
}
//
// in JS a differenza del C "dichiarare una variabile all'interno di un blocco
// di codice non crea un nuovo scope per quella variabile"
// facciamo un esempio:
function rendiPari(x) {

    if (x % 2 != 0) {
        var y;
        y = x++;
    }
    else {
        y = x;
    }

    return y;
}
// 
// in questo caso la y è visibile anche nel ramo else
// nel C non sarebbe stata visibile dato che y aveva lo scope nel blocco di
// codice del ramo if e non sarebbe stata visibile nel ramo else
//
// Per evitare ambiguità è opportuno dichiarare le variabili all'inizio
// del proprio scope.
// 
// A partire dalla versione 6 delle specifiche è possibile creare UNO SCOPE 
// SPECIFICO per una o più variabili tramite l'istruzione let
// Questa istruzione consente di dichiarare una o più variabili
// in modo analogo a var ma a differenza di quest'ultima limita lo scope
// della variabile al blocco di codice, istruzione o espressione
// in cui viene utilizzata.
// Vediamo come funziona in un esempio:
// 
// var x = 10;
// var y;
//
// let(x = 5){
//     y = x + 1; // qui y = 5 + 1 = 6  
// }
// y += x; // qui y = y + x = 6 + 10 = 16 
//
// quindi x vale 5 solo all'interno del blocco di codice in cui è definita.
// let è un'istruzione sicuramente utile da usare allinterno dei cicli:
// 
// var x = 0;
// 
// for(let i = 0; i < 20; i++){
//      x++;
// }
// 
// Qui lo scope della variabile i è l'istruzione for, evitando così di avere
// delle collisioni con altre variabili i con uno scope più esterno
// 
// Più avanti vedremo che è possibile definire una gerarchia di scope,
// all'interno della quale definire l'accessibilità della variabile





/******************************************************************************
 FUNZIONI PREDEFINITE
 ******************************************************************************/

// Abbiamo già visto parseInt() e parseFloat().
// Vediamo le altre funzioni: 
// - isNaN(x): prende un argomento e restituisce true se il suo valore 
//          è NaN, false altrimenti
// - isFinite(x): restituisce true se il valore del suo argomento è diverso
//             da Infinity o NaN
// - escape("stringa")[DEPRECATA]: restituisce la codifica di una stringa lasciando
//                                 inalterate lettere, numeri, +, -, *, /, ., _ e @
//                                 mentre rimpiazza tutti gli altri caratteri con la
//                                 codifica esadecimale preceduta dal carattere %
// - unescape("stringa")[DEPRECATA]: esegue il procedimento contrario di escape()
// - encodeURI("stringa"): come escape ma lascia inalterate oltre alle lettere
//                         e numeri, anche i caratteri /, @, +, ?, :, ,& ,= ,$ e #
// - decodeURI("stringa"): esegue il procedimento contrario di encodeURI()
// - encodeURIComponent("stringa"): codifica anche i caratteri speciali esclusi
//                                  da encodeURI(). Pensata per codificare i valori
//                                  di eventuali parametri passati in URI
// - decodeURIComponent("stringa"): esegue il procedimento contrario di encodeURIComponent()
// - eval("stringa"): valuta o esegue la stringa in input come se fosse codice JS.
//                    La stringa può rappresentare una espressione o una
//                    serie di istruzioni.
//                    eval è una funzione molto potente quanto pericolosa
//                    infatti si dice che "eval is evil xD", inoltre
//                    non è disponibile nella strict mode.
//                    
// I nomi delle funzioni predefinite non sono riservati, questo significa
// che volendo è possibile definire delle proprie funzioni con lo stesso nome
// di quelle elencate sopra. In questo modo, quando andremo a chiamare una 
// delle funzioni predefinite che abbiamo sovrascritto, sarà chiamata la nostra
// funzione e non quella di base.
