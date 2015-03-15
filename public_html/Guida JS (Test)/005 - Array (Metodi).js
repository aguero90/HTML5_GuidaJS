
var array = new Array();
array.push(1); // La classica push (inserisce un elemento alla fine dell'array)
console.log(array); // [1]
array.pop(); // rimuove l'ultimo elemento dell'array
console.log(array); // []

array.push(1);
array.push(2);
array.push(3);

var s = array.shift(); // elimina il primo elemento di un array e lo restituisce
console.log(s);     // 1
console.log(array); // [2, 3]

var l = array.unshift(1); // aggiunge il parametro all'inizio dell'array e 
                          // restituisce la nuova lunghezza dell'array
console.log(l);     // 3
console.log(array); // [1, 2, 3]

var inizia_a_cancellare_da = 1;
var cancellane = 2;
var aggiungi1 = 99;
var aggiungi2 = 98;
var aggiungi3 = 97;
var aggiungi4 = 96;
var array_splice = array.splice(inizia_a_cancellare_da, cancellane,             // inizia a cancellare nell'array
                                aggiungi1, aggiungi2, aggiungi3, aggiungi4);    // partendo da una certa posizione
                                                                                // (inizia_a_cancellare_da),
                                                                                // cancella un certo numero di elementi
                                                                                // (cancellane)
                                                                                // e poi aggiunge gli altri elementi (opzionale)
                                                                                // (aggiungi1 ... aggiungi4)
                                                                                // restituisce l'array contenente gli elementi
                                                                                // eliminati
console.log(array_splice); // [2, 3]
console.log(array);        // [1, 99, 98, 97. 96]

array_concat = array.concat(array_splice); // concatena ad array array_splice e
                                           // restituisce l'array risultante
console.log(array_concat); // [1, 99, 98, 97. 96, 2, 3]

array.sort(); // ordina l'array in ordine crescente se si tratta di numeri
              // alfabetico crescente se si tratta di stringhe
console.log(array); // [1, 96, 97, 98, 99]

array.reverse(); // inverte l'ordine degli elementi all'interno dell'array
console.log(array); // [99, 98, 97, 96, 1]

var i97 = array.indexOf(97); // restituisce l'indice della prima occorrenza dell'argomento
                             // passato all'interno dell'array.
var i0 = array.indexOf(0);   // se l'argomento passato non è presente nell'array ritorna -1
console.log(i97);   // 2
console.log(i0);    // -1

var li97 = array.indexOf(97); // restituisce l'indice dell'ultima occorrenza dell'argomento
                              // passato all'interno dell'array.
var li0 = array.indexOf(0);   // se l'argomento passato non è presente nell'array ritorna -1
console.log(li97);   // 2
console.log(li0);    // -1

var array_string = array.join();              // restituisce l'array come stringa separando
                                              // ogni elemento con una virgola (se non passiamo alcun argomento)
var array_string_separetor = array.join(" "); // altrimenti possiamo scegliere noi il separatore
                                              // con cui dividere gli elementi
console.log(array_string);            // 99,98,97,96,1
console.log(array_string_separetor);  // 99 98 97 96 1




