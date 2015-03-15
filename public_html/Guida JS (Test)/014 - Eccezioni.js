
// le eccezioni sono errori che si verificano a runtime in seguito ad un'operazione non consentita
// come l'invocazione di un metodo che non esiste o l'accesso ad una variabile undefined
//
// per gestire le eccezioni JS mette a disposizione il costrutto try..catch
try {
    // blocco di codice che potrebbe generare eccezioni
} catch (e) {
    // gestione dell'eccezione a runtime
}

// se nel try su verifica un qualche problema viene eseguito il blocco di catch, mentre se nel try non si verifica
// alcun errore il blocco catch viene ignorato

// vediamo in cosa consiste la variabile "e" che viene passata al blocco catch
// nel momento in cui si verifica un eccezione JS genera appunto questo oggetto "e"
// contenente le informazioni sull'errore che ha scatenato l'eccezione.
// Questo oggetto conterrà sempre le proprietà "name" che identifica il tipo di eccezione e
// message che contiene un messaggio che spiega l'eccezione.

// il costrutto try...catch mette a disposizione anche la clausola finally
// il codice inserito nella clausola finally verrà eseguito in qualsiasi situazione, sia che venga generata
// un'eccezzione e quindi si entri nel catch, sia nel caso in cui nessuna eccezione viene generata
// e quindi si ignora il blocco catch
try {
    // blocco di codice che potrebbe generare eccezioni
} catch (e) {
    // gestione dell'eccezione a runtime
} finally {
    // blocco di codice da eseguire sempre 
}

// infine abbiamo la possibilità di generare le eccezioni tramite l'istruzione throw
function checkAge(age) {
    if (age < 0 || age > 150) {
        throw new Error("È stata inserita un'età non consentita!");
    } else {
        // l'età è corretta
    }
}

try {
    checkAge(222);
} catch (e) {
    console.log(e);
} finally {
    // codice da eseguire sempre
}


