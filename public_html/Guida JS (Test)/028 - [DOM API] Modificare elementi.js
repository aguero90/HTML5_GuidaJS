
// una volta che abbiamo selezionato un nodo del DOM, possiamo accederci per modificarlo
var p = document.querySelector()("#mioParagrafo");

p.innerHTML = "testo"; // modifichiamo l'html all'interno di quel nodo
p.hasAttribute("nome_attributo"); // per vedere se un dato elemento ha un dato attributo
p.hasAttributes(); // per vedere se un dato elemento ha degli attributi
p.getAttribute("nome_attributo"); // per ottenere un dato attributo da un dato elemento
p.setAttribute("nome_attributo", "valore"); // per settare il valore di un dato attributo di un dato valore
p.removeAttribute("nome_attributo"); // per rimuovere un attributo da un nodo

var newAttr = p.createAttribute("nome_attributo"); // per creare un attributo da dare ad un nodo
p.setAttributeNode(newAttr); // aggiungiamo effettivamente al nodo l'attributo


// alcuni attributi hanno delle proprietà corrispondenti ( ad esempio id, name, src, href )
//
// la differenza tra attributo e proprietà sono:
//              - attributi case-insensitive, proprietà case-sensitive
//              - attributi possono essere solo stringhe, proprietà possono essere qualsiasi tipo di dato
//              - attributi rispecchiano esattamente cioè che è scritto nella pagina HTML, proprietà no ( ad esempio un attributo src di un tag <img> ha valore "myImg.png", mentre la proprietà vale "http://NOMEHOST/PATH/myImg.png" )
//              - attributi accessibili tramite .getAttribute(), proprietà accessibili tramite .NOME_PROPRIETA'
//              - nelle interazioni utente, gli attributi hanno sempre il valore iniziale, le proprietà hanno il valore corrente ( quello modificato dall'utente )
