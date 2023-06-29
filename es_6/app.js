const exprss=require('express');
const sqlite3=require('sqlite3').verbose();

const app =exprss();
const db=new sqlite3.Database('mydb.db');

db.serialize(() =>{
       db.run('CREATE TABLE IF NOT EXSTS mytable(name TEXT , age INTEGER , city TEXT)');
});

app.use(exprss.urlencoded({extended: true}));
app.use(exprss.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index/html')
})

app.post('/submit',(req,res) =>{
      const{name , age ,city}=req.body;
      const stmt=db.prepare('INSERT INTO mytable VALUES (?,?,?)');
      stmt.run(name,age,city);
      stmt.finalize();
      res.send('Dati inseriti correttamnte!');
});

app.listen(3000,()=>{
    console.log('il server avviato sula porta 3000');
})