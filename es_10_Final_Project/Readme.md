# Analisi requisiti applicazione
- questa applicazione web verra realizzata in 4 versioni di complessità carescente.(eseguire ogni versione con **node server.js**)
   
   1 - Backend App webcon registrazione degli utenti tramite file json **(senza interfaccia web con comandi curl)**
   
   2 - Backend web app con utilizzo **JWT**(json web token) assegnati ad ogni utente tramite comandi curl
   
   3 - Web  App completa di frontend con gestione competa degli utenti (con admin) tramite file json ed autenticazione tramite jwt
   
   4 - web app completa con **JWT** e **sqlite3** 

      # DIPENDENZE  

      ## 1 - Backen Web App gestione requisiti
            -express
            -bodyparser

      ## 2 - Backend web app con utilizzo **JWT**

            -express
            -bobyparser
            -jsonwebtoken
      # 3 - Web  App completa di frontend con gestione competa degli utenti

            -express
            -bobyparser
            -jsonwebtoken
            -serve-static
      # 4 - web app completa      

            -express
            -bobyparser
            -jsonwebtoken
            -serve-static
            -sqlite3

     # FILES NECESSARI    
      ## 1 - BackenD Web App gestione requisiti
            -users.json   contiene i dati degli utenti(username,password)
            -file server.js gestisce la connessione  sulla porta es.3000 ,tra browser e console vsc, inoltre gestisce i percorsi delle pagine
            -comando curl da eseguire : 
                > curl -X POST -H "Content-Type: application/json" -d '{"username": "user1", "password": "password1"}' http://localhost:3000/protected


      ## 2 - Backend web app con utilizzo **JWT**
            -users.json   contiene i dati degli utenti(username,password)
            -file server.js :
                       -gestisce la connessione  sulla porta es.3000 ,tra browser e console vsc, inoltre gestisce i percorsi delle pagine
                       -genera un jason toke
                       -reindirizza l'utente verso alla pagina protected(se il token è attivo)   
      # 3 - Web  App completa di frontend con gestione competa degli utenti
            -users.json   contiene i dati degli utenti(username,password)
            -file server.js :
                       -gestisce la connessione  sulla porta es.3000 ,tra browser e console vsc, inoltre gestisce i percorsi delle pagine
                       -genera un jason toke
                       -reindirizza l'utente verso alla pagina protected(se il token è attivo)   
            -Cartella pulic con all'interno i file htmle e css per il front end che aquisiranno le informazioni utente tramite form         
      # 4 - web app completa      
            -users.json   contiene i dati degli utenti(username,password)
            -file server.js :
                       -gestisce la connessione  sulla porta es.3000 ,tra browser e console vsc, inoltre gestisce i percorsi delle pagine
                       -genera un jason toke
                       -reindirizza l'utente verso alla pagina protected(se il token è attivo)   
            -Cartella pulic con all'interno i file htmle e css per il front end che aquisiranno le informazioni utente tramite form.   
            -createDb.js per create un file database.
            -myDatabase.db che serve per memorizzare i dati degli utenti.