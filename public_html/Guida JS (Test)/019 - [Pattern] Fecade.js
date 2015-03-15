
// Il compito di questo patter è quello di semplificare le cose al chiamante
// nascondendo la complessità sottostante
// vediamo un esempio:
var cilindro = function () {

    this.calcolaArea = function (raggio, altezza) {
        var areaBase = cerchio.calcolaArea(raggio);
        var circonferenzaBase = cerchio.calcolaCirconferenza(raggio);
        var areaLaterale = rettangolo.calcolaArea(circonferenzaBase, altezza);
        return (areaBase * 2) + areaLaterale;
    };
};

// il metodo calcolaArea() può essere considerata come un'interfaccia di alto livello
// infatti è l'implementazione del metodo che si occupa della gestione di diversi oggetti, delle interazioni
// tra questi e dell'elaborazione dei risultati.


