# Passaggi

1. Inizializzare un nuovo progetto npm utilizzando il comando `npm init -y`.
2. Installare il framework Express utilizzando il comando `npm install express`.
3. Installare il pacchetto ajax utilizzando il comando `npm install ajax`.
4. Installare il pacchetto queryselector utilizzando il comando `npm install queryselector`.
5. Installare il pacchetto queryselectorall utilizzando il comando `npm install queryselectorall`.
6. Creare un nuovo file chiamato `app.js`.
7. Creare una cartella chiamata `public`. All'interno della cartella `public`, creare i file statici come ad esempio HTML, CSS e JavaScript.
8. All'interno del file HTML, inserire un form con diversi input e un bottone di tipo "submit".
9. Utilizzare il CSS per dare uno stile alla pagina.
10. All'interno del file JavaScript, prendere i contenuti del form dalla pagina HTML utilizzando gli ID e salvarli in delle variabili.
11. Passare le variabili ad `app.js` utilizzando la funzione `xhr.send()` e inserendo i nomi delle variabili nei campi corrispondenti.
12. Il file `app.js` contiene un'istanza di Express chiamata `app.post('/submit', (req, res))`, che prende come input i dati passati dal file `index.js`.
13. All'interno di `app.post` ci sono due funzioni: la prima per stampare le variabili ricevute in input sulla console e la seconda per mostrarle sulla pagina web.
14. Utilizzare la funzione `app.listen(3000, () => {})` per aprire la pagina web sulla porta 3000.
15. Utilizzare il comando `node NOME.js` per aprire il progetto su [http://localhost:3000/](http://localhost:3000/).
