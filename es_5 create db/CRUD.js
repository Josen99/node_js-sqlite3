

const sqlite3=require('sqlite3').verbose();// verbose() per messaggi di debug 

const db=new sqlite3.Database('mydb.db');

const { log } = require('console');
const { create } = require('domain');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
readline.question('selziona :\n 1 Create \n 2 Read \n 3 Update \n 4 Destroy \n', name => {
    
    switch (name) {
        case "1":
            
            break;
        case "2":
            
            break;
        case "3":
              readline.question('Seleziona id della tabella che vuoi eliminare ',id=>{
              db.run(`UPDATE mytable SET age = ${newAge} WHERE rowid =${id}`,err=>{
                if(err){
                   console.error(err.message);
               }
               console.log(`Dato con id ${id} aggiornato correttamente!`);
              });
              db.close(); 
              readline.close()
            });
            break;
            case "4":
            readline.question('Seleziona id della tabella che vuoi eliminare ',id=>{
                         destroy(id); 
                readline.close();
            });          
            break;
    }
    
  });


  function destroy(id){
    const sqlite3=require('sqlite3').verbose();// verbose() per messaggi di debug 

const db=new sqlite3.Database('mydb.db');

db.run(`DELETE FROM mytable  WHERE rowid =${id}`,err=>{
    if(err){
        console.error(err.message);
    }
    console.log(`Dato con id ${id} eliminato correttamente!`);
});

db.close();



  }