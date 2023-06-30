# 2 - Backend web app con utilizzo **JWT**(json web token) assegnati ad ogni utente tramite comandi curl
                - creo un progetto node.js tramite il comando >npm init -y
                - proseguo installando le dipendenze >npm install express  +  >npm install body-parser + > npm install jsonwebtoken
                - creo i file users.json , che contiene i nomi e username di tutti gli utenti
                - creo il file server.js
                            - require() aggiunge le dipendenze(express ,body-parser, ./users.json , jsonwebtoken)
                            - una variabile globale SECRET_KEY
                            - app.post() tramite metodo post aquisisce username  e  password dalla pagina ./login 
                                     - users.users.find() cerca all' interno del file users.json lo user con le credenziali inserite ,se lo user viene     trovato viene generato un token jwt.sign() con validità 1h
                            - app.get() chiama la funzione isAuthenticated() che verifica la validità del token con  jwt.verify() , se questa funzione no  restituisce errori viene chiamato next(), se isAuthenticated() va a buon file si può fare login alla pagina ./protected
                            - app.listen() apre una connessione sulla porta 3000
# testing        
    - dal terminale avvio il server con il comando >node server.js
    -per accedere alla pagina /login :
             - dal terminale bash >  curl -X POST -H "Content-Type: application/json" -d '{"username": "admin", "password": "adminpassword"}' http://localhost:3000/login        

             -se lo user viene trovato viene stampato il messaggio :   Authentication successful + token generato ;
                  altrimenti : Invalid credentials;  
    -per accedere alla pagina /protected :
             - dat terminale bash > curl -X GET  -H "Authorization: Bearer {token generato prima}" http://localhost:3000/protected      
             - se lo user viene trovato viene stampato il messaggio : 'You have accessed protected content';
             altrimenti :  'Unauthorized access'  oppure   'No token provided';                 
                                   