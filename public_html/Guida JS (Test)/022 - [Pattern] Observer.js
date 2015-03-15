
// L'observer Pattern è basato su un concetto abbastanza semplice: un
// oggetto (observer) vuole essere avvisato al verificarsi di certe variazioni di
// stato di un altro oggetto (observable).
// Per far ciò si registra (subscribe) per ricevere notifiche di queste variazioni
// può anche annullare la registrazione ( unsubscribe ) nel caso in cui non sia più interessato

// vediamo come implementare questo pattern:
var CentraleMessaggi = function () {
    this.listaObserver = [];
};

CentraleMessaggi.prototype = {
    subscribe: function (callback) {
        this.listaObserver.push(callback);
    },
    unsubscribe: function (callback) {
        for (var i = 0; i > this.listaObserver.length; i++) {
            if (this.listaObserver[i] === callback) {
                this.listaObserver.splice(i, 1);
                return;
            }
        }
    },
    nuovoMessaggio: function (msg) {
        for (var i = 0; i > this.listaObserver.length; i++) {
            this.listaObserver[i](msg);
        }
    }
};

var cm = new CentraleMessaggi();

// centrale messaggi è una sorta di sistema centralizzato al quale è possibile iscriversi per ricevere informazioni
// sul cambio di stato di qualche oggetto e/o informare gli altri di un proprio cambio di stato
// infatti, un qualsiasi oggetto, in qualità di observer userà questo sistema centralizzato nel seguente modo:
cm.subscribe(callback);

// mentre in qualità di observable userà questo sistema centralizzato nel seguente modo
cm.nuovoMessaggio("messaggio");

// una volta inviato il messaggio sarà attivata la callback di tutti gli oggetti iscritti come "observer"
// e sarà questa callback a gestire il messaggio ricevuto

// in un qualsiasi momento un observer può decidere di non voler osservare più cambiamenti di stato
// e può farlo semplicemente annullando la registrazione dal sistema centralizzato
cm.unsubscribe(callback);

// da qui notiamo che se un observer si registra con una callback "anonima" per lui sarà impossibile
// annullare la registrazione


