
// possiamo selezionare i vari elementi del DOM in diversi modi:
document.getElementById("ID_elemento"); // otteniamo un singolo nodo del DOM
document.getElementsByTagName("tag_elemento"); // otteniamo un array contenente tutti i nodi del DOM corrispondenti a quel tag
document.getElementsByName("name_elemento");  // otteniamo un array contenente tutti i nodi del DOM corrispondenti a quei tag che hanno come attributo "name" il valore passato
document.getElementsByClassName("class_elemento"); // otteniamo un array contenente tutti i nodi del DOM corrispondenti a quei tag che hanno come attributo "class" il valore passato

// una novità è quella di poter selezionare gli elementi in stile CSS
document.querySelector("selettore CSS"); // restituisce il primo elemento trovato dal selettore 
document.querySelectorAll()("selettore CSS");  // restituisce una array contenente tutti gli elementi trovatii dal selettore