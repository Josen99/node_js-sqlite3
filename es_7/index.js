const exprss=require('express');
const sqlite3=require('sqlite3').verbose();
const app =exprss();
const ejs=require('ejs');
const db=new sqlite3.Database('mydb.db');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS mytable(name TEXT, age INTEGER, email TEXT, password TEXT)');
});

app.use(exprss.urlencoded({extended: true}));
app.use(exprss.static('public'));
app.set('view engine',('ejs'));

//sigin
app.get('/singin',(req,res)=>{
    res.sendFile(__dirname +'/public/singin.html');
});
app.post('/singin',(req,res)=>{
    const { name,BirthDate,email ,password}=req.body;
    const stmt=db.prepare('INSERT INTO mytable VALUES (?,?,?,?)');
    stmt.run(name,BirthDate,email,password);
    stmt.finalize();
    res.send('Dati inseriti correttamete nel db')
});


app.get('/data',(req,res)=>{
    db.all(`SELECT *FROM mytable`,(err , rows) => {
        if(err){
            res.status(500).send('Errore nel recupero dei dati dal database');
        }else{
            res.render('data',{rows});
        }
    });
});

//login
app.get('/login',(req,res)=>{
    res.sendFile(__dirname +'/public/login.html');
});

app.post('/login',(req,res)=>{
    const { email,password}=req.body;
    const stmt=db.prepare(`SELECT COUNT (*) AS count FROM mytable WHERE email=? AND password=?`);
    stmt.get(email,password ,(err,row) =>{
        if(err){
            res.status(500).send('Errore nella modifica dei dati');
        }
        else{
            if(row.count>0){
                res.send(`Accesso effettuato`);
            }else{
                res.send('Creadenziali non valide');
            }
        }
    });
    stmt.finalize();
});


//edit
app.get('/edit',(req,res)=>{
    res.sendFile(__dirname +'/public/edit.html');
});
app.post('/edit',(req,res)=>{
    const { id,newAge}=req.body;
    const stmt=db.prepare(`UPDATE mytable SET age= ? WHERE rowid = ?`);
    stmt.run(newAge,id,err=>{
        if(err){
            res.status(500).send('Errore nella modifica dei dati');
        }
        else{
            res.send(`Dato con id ${id} aggiornato correttamente !`);
        }
    })
});

//delete

app.get('/delite',(req,res)=>{
    res.sendFile(__dirname +'/public/delete.html');
});
app.post('/delete',(req,res)=>{
    const { id }=req.body;
    const stmt=db.prepare(`DELETE FROM mytable WHERE rowIid = ?`);
    stmt.run(id,err=>{
        if(err){
            res.status(500).send('Errore nella modifica dei dati');
        }
        else{
            res.send(`Dato con id ${id} aggiornato correttamente !○`);
        }
    });
    stmt.finalize();
});




//db.close();
app.listen(3000,()=>{
    console.log('il server avviato sula porta 3000');
})




