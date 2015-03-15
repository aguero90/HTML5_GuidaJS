
// possiamo creare un array oltre che con la notazione letterlale anche tramite
// l'oggetto Array

var array = new Array();
var array1 = new Array(3); // array con 3 elementi (all'inizio valgono tutti undefined)

// un array può avere al suo interno oggetti di tipo diverso

array1[0] = 5;
array1[1] = "ciao";
array1[2] = true;

for(var i in array1){
    console.log(i + ": " + array1[i]);      // 0: 5
}                                           // 1: ciao
                                            // 2: true
     
// Ma anche gli array, come tutto il resto in JS è flessibile e dinamico
// infatti possiamo aggiungere un quarto elemento all'array che inizialmente
// avevamo dichiarato come un arrey di 3 elementi
// e questa volta ci assegnamo un oggetto.
     
array1[3] = { marca: "Realforno", tipo: "Frollini" };
console.log(array1[3]); // Object{ marca: "Realforno", tipo: "Frollini" }

// Ogni oggetto Array ha la proprietà length che contiene il numero di elementi
// che ha l'array

console.log(array1.length); // 4;

// Poichè è una proprietà, possiamo modificarla a nostro piacimento:

array1.length = 7;
console.log(array1.length); // 7

