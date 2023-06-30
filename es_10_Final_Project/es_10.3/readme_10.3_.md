# 3 - Web  App completa di frontend con gestione competa degli utenti (con admin) tramite file json ed autenticazione tramite jwt
                - creo un progetto node.js tramite il comando >npm init -y
                - proseguo installando le dipendenze >npm install express  +  >npm install body-parser + > npm install jsonwebtoken + > npm install serve-static
                - creo i file users.json , che contiene  username,password e role di tutti gli utenti
#              Backend
                - creo il file server.js
                             -require() aggiunge le dipendenze(express ,body-parser, ./users.json , jsonwebtoken,serve-static)
                             -una costante globale SECRET_KEY
                             - app.post() tramite metodo post aquisisce username  e password dalla pagina ./login 
                                     - users.users.find() cerca all' interno del file users.json lo user con le credenziali inserite ,se lo user viene trovato viene generato un token usando lo username e role jwt.sign() con validità 1h
                            - app.get() chiama la funzione isAuthenticated() che verifica la validità del token con  jwt.verify() , se questa funzione no  restituisce errori viene chiamato next(), se isAuthenticated() va a buon file si può fare login alla pagina ./protected
                            - app.get() /logout quando viene chiamato cancaella il token dal cookie e reindirizza verso la pagina '/login.html' 
                            - app.listen() apre una connessione sulla porta 3000


#              Frontend
                -Nell cartella public:
                        -login.html che contiene un form con 2 campi username e password l' id del form è login.form, dopo il form viene chiamato /login.js
                              -login.js recupera password e username dal form e invia al server tramite metodo POST ad app.post(./login) , se la risposta del server è 200 , l'utente viene indirizzato alla pagina 'admin.html' se il suo role è admin,
                              'user.html' se è user, se la risposta del server è 200 si viene indirizzati alla pagina 'login.html'.(per capire il role dell' utente si fa JSON.parse() del token salvato nel payload del lockal storage).

                        -una volta fatto il login e si è stati reindirizzati alla pagina 'user.html' o 'admin.html' viene chiamato lo script /auth.js 
                             - verifica che nel payload del localstorage sia presente un token , se non è presenti rinirizza verso '/login.html'. se il token è presente tramite metodo GET invia il token a server.js  app.get('/protected') , se la srisposta dal server è diversa da 200 allora il token è scaduto o non validao e il token viene rimosso dalla localstorage e si viene reindirizzati alla pagina '/login.html'. se la risposta del server è 200 (token valido), viene fatto il parsing del token con JSON.parse() , se il role è ugale ad admini e l'utente non si dovesse trovare nella pagina '/admin.html' viene rindirizzato verso '/admin.html'; analogamente se il role fosse user e l'utente non fosse nella pagina '/user.html' viene reindirizzato verso '/user.html'.
                        - la pagine '/admin.html' e '/user.html' hanno un pulsante logout che cancella il token e reindirizza verso '/login.html'.   
                            