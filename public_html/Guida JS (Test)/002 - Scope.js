
var x = 1; // variabile globale allo script
var y = 2; // come sopra
var w = 3; // come sopra

function testScope(a, x){
    
    console.log("y: " + y); // 2 (la variabile globale)
    console.log("a: " + a); // 4 (parametro passato)
    console.log("x: " + x); // 5 (parametro passato)
    var z = 0; // z è una variabile locale alla funzione
    console.log("z: " + z); // 0 (variabile locale alla funzione)
    var s = w; // s vale undefined e non 3 come ci si aspetterebbe
               // poiche w è definita anche all'interno della funzione e 
               // viene quindi considerata quella che non è però ancora stata definita
               // quindi vale undefined
    console.log("s: " + s);  // undefined (prende il valore di w)
    console.log("w: " + w);  // undefined
    var w = 6; // variabile locale che "copre" la variabile globale
    console.log("w: " + w); // 6
    
}


testScope(4, 5);
console.log("x: " + x); // 1 (la variabile globale)
console.log("w: " + w); // 3 (la variabile globale)
console.log("z: " + z); // ReferenceError: z is not defined
                        // infatti la variabile z interna alla funzione non viene
                        // vista al difuori di essa


// Lo scope di una variabile non è a livello di blocco come in C ma a livello di
// funzione.
// Infatti:

if(true){
    var p; // poichè non è contenuta in una funzione ma in un semplice blocco
           // p è praticamente una variabile globale allo script
    p = 99;
}
else{
    p = 0;
}

console.log("p: " + p);
p++;
console.log("p: " + p);

