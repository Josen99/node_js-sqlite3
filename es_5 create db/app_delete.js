const sqlite3=require('sqlite3').verbose();// verbose() per messaggi di debug 

const db=new sqlite3.Database('mydb.db');
const id=1;


db.run(`DELETE FROM mytable  WHERE rowid =${id}`,err=>{
    if(err){
        console.error(err.message);
    }
    console.log(`Dato con id ${id} eliminato correttamente!`);
});

db.close();

