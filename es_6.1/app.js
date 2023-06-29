const exprss=require('express');
const sqlite3=require('sqlite3').verbose();

const app =exprss();
const db=new sqlite3.Database('mydb.db');

db.serialize(() =>{
       db.run('CREATE TABLE IF NOT EXISTS mytable(email TEXT , password TEXT , city TEXT , state TEXT , zip INTEGER, check TEXT , username TEXT)');

});

app.use(exprss.urlencoded({extended: true}));
app.use(exprss.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index/html')
})

app.post('/submit',(req,res) =>{
    const { email, Password, City, State,  zip,Check, UserName } = req.body;
    console.log(`Email: ${email}, Password: ${Password} , City: ${City}, State: ${State}, Check:${Check}`);
      const stmt=db.prepare('INSERT INTO mytable VALUES (?,?,?,?,?,?,?)');
      stmt.run(email,Password,City,State,zip,Check,UserName);
      stmt.finalize();
      res.send('Dati inseriti correttamnte!');
});

app.listen(3000,()=>{
    console.log('il server avviato sula porta 3000');
})