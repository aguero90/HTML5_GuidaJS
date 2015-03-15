
// ovviamente nel DOM possiamo creare nuovi elementi ed eliminare quelli esistenti
var newEl = document.createElement("nome_tag"); // crea un nuovo nodo che è ancora separato dal resto del DOM

body.appendChild(newEl); // aggiunge il nuovo elemento creato al DOM come ULTIMO figlio dell'elemento body
body.insertBefore("elemento_da_inserire", "elemento_prima_del_quale_inserirlo");
body.insertAfter("elemento_da_inserire", "elemento_dopo_il_quale_inserirlo");
body.replaceChild("elemento_da_inserire", "elemento_da_rimpiazzare");

body.removeChild("elemento_da_rimuovere");


