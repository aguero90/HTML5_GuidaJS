
/******************************************************************************
 FILE API
 ******************************************************************************/

// Per ragioni di sicurezza, l'accesso ad un file, anche in sola lettura, ha da
// sempre rappresentato una limitazione di JS all'interno di un Web browser.
// Per consentire anche la semplice visualizzazione del contenuto di un file
// si è costretti a studiare artifici come ad esempio inviare il file verso un
// server e ricaricarlo per visualizzare il suo contenuto o informazioni su di
// esso.
//
// Grazie ad HTML5, oggi possiamo leggere il contenuto di un file direttamente
// da un browser senza coinvolgere il server.
// Naturalmente la questione sicurezza non è stata messa da parte.
// Infatti uno script in esecuzione su un browser non può autonomamente
// accedere ad un file del sistema.
//
// --------------------------- ACCEDERE AI FILE -------------------------------
//
// L'accesso deve essere esplicitamente autorizzato dall'utente tramite
// l'elemento <input> o il drag and drop
//
// Sfruttando l'elemento <input> consentiamo all'utente di indicare un file
// selezionandolo dal file system locale.
// Specificando l'attributo multiple, come mostrato nel seguente esempio,
// consentiamo la selezione di più file:
//      <input type="file" id="fileSelezionati" multiple>
//
//
// Leggermente più complessa è la situazione se si vuole consentire all'utente
// di specificare uno o più file tramite drag and drop.
// In questo caso dobbiamo prima definire un'area all'interno della quale
// consentire il drop dei file, ad esempio un <div>
//
// Quindi gestiamo gli eventi "dragenter","dragover" e "drop" come mostrato
// dal seguente codice:
var area = document.getElementById("area");

area.addEventListener("dragenter", dragenter);
area.addEventListener("dragover", dragover);
area.addEventListener("drop", drop);

function dragenter(event) {
    event.stopPropagation();
    event.preventDefault();
}

function dragover(event) {
    event.stopPropagation();
    event.preventDefault();
}

function drop(event) {
    event.stopPropagation();
    event.preventDefault();

    var files = event.dataTransfer.files;
    console.log(files.length);
}
//
// I gestori "dragenter" e "dragover" apparentemente non fanno nulla di particolare
// tranne che impedire la propagazione dell'evento e il comportamento
// predefinito dell'operazione.
// Senza queste istruzioni tuttavia il trascinamento dei file sulla pagina
// causerebbero il loro caricamento all'interno della finestra del browser.
//
// Il gestore dell'evento "drop", invece, accede all'elenco dei file tramite la
// proprietà "dataTranfer" dell'oggetto event e mostra il numero di file
// trascinati all'interno della nostra area.
//
// ----------------------------- USARE I FILE ---------------------------------
//
// Cosa fare dei file selezionati dall'utente dipende naturalmente dalla nostra
// applicazione.
// È a questo punto che possiamo utilizzare le File API, un'interfaccia per
// l'accesso in lettura ai file selezionati dall'utente ed al loro contenuto.
//
// Le API definiscono essenzialmente 3 tipi di oggetto:
//          - FileList: una lista di file
//          - File: un singolo file
//          - FileReader: l'oggetto che consente l'accesso in lettura al
//                        contenuto del file
//
// Nell'esempio visto prima, in cui gestiamo il trascinamento dei file, abbiamo
// avuto modo di vedere la proprietà "files" dell'oggetto "dataTransfer".
// Questa proprietà è proprio un oggetto di tipo FileList che consente di
// accedere all'elenco dei file selezionati dall'utente.
//
// La stessa cosa avviene per un elemento <input> con l'attributo "multiple".
// Il seguente codice mostra come accedere in questo caso all'elenco dei file
// selezionati dall'utente:
var fileSelezionati = document.getElementById("fileSelezionati").files;
//
// Indipendentemente da come l'utente abbia selezionato i file, una volta avuto
// accesso alla lista possiamo gestirli sfruttando le funzionalità messe a
// disposizione dalle file API.
// Ad esempio, il seguente codice mostra all'interno di un elemento della pagina
// alcune informazioni su ciascun file selezionato:
var info = document.getElementById("infoDiv");
var file;

for (var i = 0; i < fileSelezionati.length; i++) {
    file = fileSelezionati[i];
    info.innerHTML = info.innerHTML + file.name + " (" + file.size + " byte, " + file.type + ")<br/>";
}
//
// -------------------------- OGGETTO FILE ------------------------------------
//
// Le informazioni sui file mostrate fanno capo a 3 proprietà di ciascun oggetto
// file:
//          - name: nome del file
//          - size: dimensione espressa in byte
//          - type: il tipo di MIME del file, se è possibile determinarlo,
//                  altrimenti una stringa vuota
//
// ecco un esempio di output generato dallo script precedente:
//
//      setup.exe (478720 byte, application/x-msdownload)
//      setup.ini (279 byte, )
//      readme_it.txt (11598 byte, text/plain)
//      readme_it.html (12031 byte, text/html)





/******************************************************************************
 L'OGGETTO FILE READER
 ******************************************************************************/

// Come abbiamo già accennato, per accedere al contenuto di un file dobbiamo
// fare ricorso all'oggetto File Reader.
// Tramite una serie di metodi asincroni possiamo gestire il contenuto in
// maniera abbastanza immediata.
//
// ---------------------------- readAsText ------------------------------------
//
// Ad esempio, se vogliamo visualizzare il contenuto di un file di testo
// possiamo procedere come nel seguente esempio:
var reader = new FileReader();

reader.onload = function (event) {

    var testo = event.target.result;
    documento.getElementById("contenuto").innerHTML = testo;
};

reader.readAsText(file);
//
// Abbiamo creato un'istanza dell'oggetto FileReader, quindi abbiamo
// assegnato un gestore all'evento "load" dell'oggetto ed abbiamo invocato il
// metodo readAsText() passandogli l'oggetto file da leggere.
// Al termine del caricamento del file viene generato l'evento "load", in
// corrispondenza del quale accediamo al contenuto del file tramite la
// proprietà "result" di "target" messo a disposizione dall'oggetto event.
// Questo contenuto lo visualizziamo quindi all'interno di un elemento
// della pagina.
//
// Il metodo readAsText(), quindi, ci consente di accedere al contenuto di un
// file interpretandolo come testo.
//
// ------------------------- readAsDataURL ------------------------------------
//
// Per gestire file di tipo binario come ad esempio le immagini non possiamo
// naturalmente utilizzare il metodo readAsText().
// Un possibilie approccio consisre nel generare un data URL a partire dal
// file tramite il metodo readAsDataURL(), come nel seguente esempio:
var reader = new FileReader();

reader.onload = function (event) {

    var dataURL = event.target.result;
    document.getElementById("immagine").src = dataURL;
};

reader.readAsDataURL(file);
//
// In questo caso, il contenuto del file viene interpretato come data URL,
// cioè una rappresentazione in base64 del contenuto del file come
// quello mostrato di seguito:
//     data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7
//
// Possiamo quindi assegnare il data URL direttamente alla proprietà src
// di un elemento <img>.
//
// ----------------------- readAsArrayBuffer ----------------------------------
//
// Un approccio più generale che ci consente di accedere al contenuto di
// qualsiasi tipo di file è fornito da readAsArrayBuffer().
// Questo metodo ci fornisce la rappresentazione binaria del contenuto del
// file, ma naturalmente la sua gestione è un po' più complessa e
// richiede la conoscenza della struttura del file.
// Il seguente esempio mostra come riconoscere il formato di un file di
// immagine sfruttando il cosiddetto magic number
// (http://en.wikipedia.org/wiki/List_of_file_signatures), il numero
// rappresentato dai primi quattro byte:
var reader = new FileReader();

reader.onload = function (event) {

    var buffer = event.target.result;
    var int32View = new Int32Array(buffer);

    switch (int32View[0]) {

        case 1196314761:
            tipoImmagine = "png";
            break;
        case 944130375:
            tipoImmagine = "gif";
            break;
        case 544099650:
            tipoImmagine = "bmp";
            break;
        case -520103681:
            tipoImmagine = "jpg";
            brak;
        default:
            tipoImmagine = "sconosciuto";
    }

    console.log(tipoImmagine);
};

reader.readAsArrayBuffer(file);
//
// La possibilità di accedere a basso livello al contenuto di un file offre
// enormi opportunità di eseguire elaborazioni prima impensabili con JS.
// Ad esempio, è possibile comprimere un file prima di inviarlo al server o
// modificarlo prima di visualizzare il suo contenuto ed altre attività
// analoghe.





/******************************************************************************
 I BLOB
 ******************************************************************************/

// Oltre all'oggetto File, le File API definiscono l'oggetto Blob che
// rappresenta un insieme di dati non strutturati il cui significato dipende dal
// modo in cui questi vengono interpretati.
// Un oggetto di tipo File è derivato da un Blob con il supporto di
// funzionalità con il file system dell'utente.
//
// Il modo più semplice di creare un Blob è tramite l'omonimo costruttore:
var myBlob = new Blob(['<a href="http://html.it">HTML.it</a>'], {type: "text/html"});
//
// In questo esempio abbiamo creato un Blob il cui contenuto è un blocco di
// codice HTML:
//          - Il primo argomento del costruttore può essere un array di
//            stringhe, di ArrayBuffer, di ArrayBufferView o di altri Blob
//          - Il secondo argomento è opzionale ed è un oggetto che
//            rappresenta il tipo di contenuto secondo lo standard MIME
//
// ---------------------------- SLICE -----------------------------------------
//
// Un oggetto Blob dispone del metodo slice() che consente di creare un
// nuovo Blob a partire da un blocco di dati del Blob corrente.
// Ad esempio, il seguente codice genera un nuovo Blob costituito dai byte che
// vanno dalla posizione 9 alla posizione 27.
var nuovoBlob = myBlob.slice(9, 27);
//
// Per la gestione del contenuto di un Blob possiamo utilizzare lo stesso
// approccio che abbiamo visto per i file tramite FileReader.
// Ad esempio, il segunte codice visualizza l'URL di HTML.it estratto dal
// Blob definito nell'esempio precedente:
var reader = new FileReader();

reader.onload = function (event) {

    var URL = event.target.result;
    console.log(URL);
};

reader.readAsText(nuovoBlob);
//
// -------------------- CREARE FILE DA SCARICARE ------------------------------
//
// Un Blob ci consente di creare file indipendentemente dal file system
// dell'utente.
//
// Abbiamo detto che l'accesso ai file da un browser è consentito in sola
// lettura e su esplicità autorizzazione dall'utente.
// Per ovvie ragioni di sicurezza, anche la scrittura di un file dal browser
// sul file system dell'utente non è consentita.
// Possiamo tuttavia consentire il download di un file generato o manipolato
// via JS sfruttando le funzionalità viste per gestire file e blob.
//
// Consideriamo il seguente codice HTML:
//      <a href="" id="linkDownload">download</a>
//
// Esso rappresenta il link per consentire all'utente il download del file
// generato o elaborato da JS.
// Per abilitare il download di un file eseguiremo il seguente codice:
function abilitaDownload(file) {

    var myBlob = new Blob([file], {type: "application/octet-stream"});
    var reader = new FileReader();

    reader.onload = function (event) {

        var URL = event.target.result;
        document.getElementByID("linkDownload").href = URL;
    };

    reader.readAsDataURL(myBlob);
}
//
// La funzione prende un oggetto di tipo FIle o un Blob e genera un nuovo
// Blob a partire da esso impostando il MIME su "application/octet-stream".
// L'impostazione del tipo MIME è effettivamente quella che indica al browser
// che il file non deve essere interpretato ma deve essere scaricato sul
// file system dell'utente.
//
// A questo punto il nuovo Blob viene letto come data URL ed il risultato
// assegnato all'attributo href del nostro link.
// Quando l'utente cliccherà sul link verrà aperta la finestra di dialogo per
// salvare il file sul disco locale.
//
// Un inconveniente di questa soluzione è che non viene definito il nome da
// assegnare al file da scaricare.
// Possiamo aggirare il problema impostando l'attributo "download" per
// l'elemento <a>:
//      <a href="" id="linkDownload" download="myFile.zip">download</a>
//
// Il nome e l'estensione del file possono naturalmente essere generati
// dinamicamente in base al contenuto stesso del file.
