
// Il modo più corretto per registrare un handler è farlo tramite il metodo "addEventListener"

elemento.addEventListener(evento, callback, [useCapture]);
//      
//      - elemento: è l'elemento su cui attaccare l'handler
//      
//      - evento: è una stringa che definisce l'evento che vogliamo gestire.
//                  Per informazioni su tutti i tipi di evento: https://developer.mozilla.org/en-US/docs/Web/Events
//      - callback: la funzione che sarà chiamata per gestire l'evento
//      - useCapture: Opzionale.
//                       Serve per forzare la priorità di gestione di un certo evento.
//                       Questo nei casi in cui:
//                          1) abbiamo associato diversi handler allo stesso evento
//                              (allora il primo diventa quello con useCapture = true)
//                           2) serve per dare priorità all'handler posizionato su un certo
//                               livello dell'albero
//                               (normalmente gli handler sono eseguiti e propagati dalle
//                               foglie verso la radice del DOM)
//                        Per default è impostato a false
//
//                        Vista in un altro modo: Se impostato a true, usaCapture indica che l'utente vuole iniziare la cattura. 
//                                                     Quando la cattura inizia, tutti gli eventi del tipo specificato verranno propagati ai 
//                                                     listener registrati prima di essere mandati a qualunque EventTarget sotto di essi 
//                                                     nell'albero DOM. 
//                                                     Gli eventi sopra di esso nell'albero DOM non innescheranno un EventListener che usa capture.


