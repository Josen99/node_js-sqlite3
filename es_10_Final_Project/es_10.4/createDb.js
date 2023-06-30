const sqlite3=require('sqlite3').verbose();
const createDB=()=>{
const db=new sqlite3.Database('./myDatabase.db',(err)=>{
    if(err){
        console.error(err.message);
    }
    console.log("Connected to database");
});

db.serialize(()=>{
    db.run(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY,
        username TEXT NOT NULL ,
        password TEXT NOT NULL,
        role TEXT NOT NULL
    )`,
     (err)=>{
        if (err){
            console.error(err.message);
        }else{
            console.log("Users table conected successfully");
        }
     }
    );
});

db.close((err)=>{
    if(err){
        console.error(err.message);
    }
    console.log("Db connection closed");
});
};

createDB();