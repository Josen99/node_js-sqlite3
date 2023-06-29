const sqlite3=require('sqlite3').verbose();// verbose() per messaggi di debug 

const db=new sqlite3.Database('mydb.db');

db.serialize(()=>{
   // db.run('CREATE TABLE mytable (name TEXT, age INTEGER, city TEXT)');
    const stmt= db.prepare('INSERT INTO mytable VALUES (?, ?, ?)');
    stmt.run('Mario' , 30, 'omodossola');
    stmt.run('Pino' , 34, 'Milano');
    stmt.run('Gino' , 39, 'Parma');
    stmt.run('Luca' , 34, 'Domodossola');
    stmt.finalize();
    
    console.log("Dati inseriti correttamente ! ");
});

db.close();