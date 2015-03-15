
// Questo è uno dei più noti pattern architetturali.
// L'obiettivo di questo pattern è quello di separare l'interfaccia
// utente dal modello dei dati e si basa su 3 componenti:
//          - Model: i dati da gestire
//          - View: gli elementi dell'intefaccia grafica
//          - Controller: collega il Model alla View e gestisce le interazioni dell'utente con i dati
//          
// Ad esmpio consideriamo un'applicazione web per la gestione di dati anagrafici:
//          - Model: l'oggetto che rappresenta una persona
//          - View: l'html/css della pagina
//          - Controller: codice JS che gestisce i dati inseriti dall'utente e di fornire i dati da mostrare alla view
//          
//  View: 
//  <label for="txtNome"><input id="txtNome" type="text" value="" /><br />
//  <label for="txtCognome"><input id="txtCognome" type="text" value="" /><br />
//  <button id="btnSalva">Salva</button><br/>
var view = {
    txtNome: document.getElementById("txtNome"),
    txtCognome: document.getElementById("txtCognome"),
    btnSalva: document.getElementById("btnSalva")
};

// prendiamo un riferimento a tutti i campi con cui l'utente può interagire

// Model:
var model = {nome: "Mario", cognome: "Rossi"};

// rappresenta l'entità persona per noi

// Controller:
var controller = {
    init: function () {
        view.txtNome.value = model.nome;
        view.txtCognome.value = model.cognome;
        view.btnSalva.onclick = controller.salva;
    },
    salva: function () {
        model.nome = view.txtNome.value;
        model.cognome = view.txtCognome.value;
        // Invia il model al server
        invia(model);
    }
};

// al momento della init, fornisce alla view i dati presi dal modello
// al momento del salva() prende i dati dalla view e li salva nel modello
// Insomma, unisce model e view e gestisce la logica dell'applicazione

// Utilizzando questo pattern, model e view sono indipendenti.
// quindi possiamo cambiare la view come e quando vogliamo senza alcuna ripercussione sui dati


