const form = document.querySelector('form'); // selezioniamo il tag "form" all'interno del dom
const result = document.getElementById('result'); // cerchiamo le informazioni con id "result"

form.addEventListener('submit', (event) =>
{
    event.preventDefault(); // dovrebbe evitare che il browser metta un valore di default invisibile nel campo in modo che venga inviato soltanto se quel campo è valorizzato

    const email = document.getElementById('validationCustom01').value; // prende l'elemento con id email dal dom
    const Password =  document.getElementById('validationCustom02').value;
    const UserName = document.getElementById('validationCustomUsername').value;
    const City = document.getElementById('validationCustom03').value;
    const State = document.getElementById('validationCustom0').value;
    const zip = document.getElementById("validationCustom05").value;
    const Check = document.getElementById('invalidCheck').checked;

    const xhr = new XMLHttpRequest(); // istanzio un oggetto "xhr" dalla classe "XMLHttpRequest" che verifica lo stato della richiesta http

    xhr.onreadystatechange = () => 
    {
        if (xhr.readyState === XMLHttpRequest.DONE) // ricarica la pagina dinamicamente senza interruzione del flusso dell'utente
        {
            if (xhr.status === 200)
            {
                result.innerHTML = xhr.responseText;
            }
            else
            {
                console.error('Errore nella richiesta AJAX!') ;
            }
        }
    };  

    xhr.open('POST', '/submit'); // viene inviato il modulo via post
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(`email=${email}&Password=${Password}&Username=${UserName}&zip=${zip}&City=${City}&State=${State}&Check=${Check}`);

});

/*
I form hanno due metodi, il GET e il POST.
La differenza tra i due è che il primo passa i dati come parametri all'interno dlel'indirizzo della pagina che li riceverà.
mentre il secondo (per certi versi più sicuro,
specie in presenza di dati sensibili come passwords o codici segreti)
mantiene intatto l'indirizzo della pagina di ricezione
*/