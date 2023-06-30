# - Backend App webcon registrazione degli utenti tramite file json **(senza interfaccia web con comandi curl)**
    - creo un progetto node.js tramite il comando >npm init -y
    - proseguo installando le dipendenze >npm install express  +  >npm install body-parser
    - creo i file users.json , che contiene i nomi e username di tutti gli utenti
    - creo il file server.js
             - require() aggiunge le dipendenze(express ,body-parser, ./users.json)
             - app.post() prende username e password dalla pagina ./login
             - cerco lo user con username e password inseriti all interno del file users.json users.users.find()
             - app.listen() apre una connsessione sulla porta 3000

# testing        
    - dal terminale avvio il server con il comando >node server.js
    - dal terminale bash > curl -X POST -H "Content-Type: application/json" -d '{"username": "user1", "password": "password1"}' http://localhost:3000/login
                    - curl contiene una username e password più l'indirizzo della pagina login
                    - se l'autenticazione va a buon fine (le credenziali nel curl sono stati trovati nel file users.json), viene stampatp "message":"Authentication successful" 
                      altrimenti "message":"Invalid credentials".