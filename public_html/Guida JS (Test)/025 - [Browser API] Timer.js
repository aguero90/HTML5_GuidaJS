
// L'oggetto window offre la possibilità di creare timer
// possiamo creare un timer singolo: da eseguire una sola volta
var timerSingolo = window.setTimeout(function () {
    // ...
}, 1000);  // dopo 1 secondo (  1000ms ) eseguirò una funzione di callback

// oppure creare timer infiniti: una volta arrivato a 0 riavvia il timer
var timerInfinito = window.setInterval(function () {
    // ...
}, 1000);  // OGNI secondo (  1000ms ) eseguirò una funzione di callback

// possiamo poi eliminare i timer settati
window.clearTimeout(timerSingolo);
window.clearInterval(timerInfinito);


