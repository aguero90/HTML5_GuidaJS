
// Questo pattern ha l'obiettivo di semplificare la creazione di oggetti nei casi in cui c'è
// un'alta varietà di impostazioni iniziali

// vediamo un esempio:
var veicoloFactory = {
    creaVeicolo: function (opzioni) {
        var veicolo;
        if (opzioni && opzioni.length) {
            switch (opzioni.tipo) {
                case "auto":
                    veicolo = new Automobile(opzioni);
                    break;
                case "moto":
                    veicolo = new Moto(opzioni);
                    break;
                case "camion":
                    veicolo = new Camion(opzioni);
                    break;
            }
        }
    }
};

var myAuto = veicoloFactory.creaVeicolo({tipo: "auto", colore: "rosso", numPosti: 4});

// in questo modo possiamo raggruppare la creazione di entità simili in un unico oggetto
// e così facendo possiamo aggiungere successivamente altre "implementazioni" cioè altri tipi di veicoli come
// autobus, treno e così via senza che all'esterno cambi nulla


