
// è possibile navigare nel DOM tramite svariati metodi.
// supponiamo di aver selezionato un certo elemento e vediamo come navigare
var div = document.querySelector()("#mainDiv");

div.childNodes; // è un array contenente la lista di nodi figli del nodo scelto
div.firstChild(); // restituisce il primo nodo figlio del nodo scelto e corrisponde a div.childNodes[0]
div.lastChild(); // restituisce l'ultimo nodo figlio del nodo scelto e corrisponde a div.childNodes[div.childNodes.lenght]
div.parentNode(); // restituisce il nodo genitore 
div.nextSibling(); // restituisce il nodo che rappresenta il fratello successivo ( fratello minore )
div.previousSibling(); // restituisce il nodo che rappresenta il fratello precedente ( fratello maggiore )
div.parentNode().childNodes; // piccolo trucco per ottenere tutti i fratelli di un nodo ( incluso il nodo stesso )

