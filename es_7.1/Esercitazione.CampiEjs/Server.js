const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const ejs = require('ejs');



const app = express();
const db = new sqlite3.Database('mydb.db');



//crea la tabella se non esiste
db.serialize(() => {

    db.run('CREATE TABLE IF NOT EXISTS mytable (name TEXT, password TEXT, email EMAIL, premium BOOLEAN)');
});


app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

//Route per la pagina principale
app.get('/siging', (req, res) => {

    res.sendFile(__dirname + '/public/siging.html');
});


//Siging
//Route per gestire il submit del form
app.post('/siging', (req, res) => {
    const { name, password, email, premium } = req.body;
    const stmt = db.prepare('INSERT INTO mytable VALUES (?, ?, ?, ?)');
    stmt.run(name, password, email, premium);
    stmt.finalize();
    res.send('Dati inseriti correttamente!');
});


//LOGIN
app.get('/login', (req, res) => {

    res.sendFile(__dirname + '/public/login.html');
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const stmt = db.prepare('SELECT COUNT(*) AS count FROM mytable WHERE email = ? AND password = ?');
    stmt.get(email, password, (err, row) => {
        if (err) {s
            res.status(500).send('Errore nel login');
        } else {
            if (row.count > 0) {
                res.send('Accesso riuscito!')
            } else {
                res.send('Credenziali non valide');
            }
        }
    });
    stmt.finalize();
});

//EDIT
app.get('/edit', (req, res) => {
    res.sendFile(__dirname + '/public/edit.html');
});
app.post('/edit', (req, res) => {
    const { id, email, name, password } = req.body;    
    const stmt = db.prepare('UPDATE mytable SET  email = ?, name=?, password=? WHERE rowid = ?');
    stmt.run( id, email, name, password, err => {
        if (err) {
            res.status(500).send('Errore nella modifica dei dati');
          } else {
            res.send(`Dato con id ${id} aggiornato correttamente` );
          }
      });
      stmt.finalize();
  });

  //DELETE
  app.get('/edit1', (req, res) => {
    res.sendFile(__dirname + '/public/edit.html');
});
app.post('/edit1', (req, res) => {
    const { id } = req.body;    
    const stmt = db.prepare('DELETE FROM mytable WHERE rowid = ?');
    stmt.run( id, err => {

        if (err) {
          res.status(500).send('Errore nell eliminazione del dato');
        } else {
            res.send(`Dato con id ${id} eliminato correttamente!`);
        }
    });
    stmt.finalize();
});



// Avvia il server
app.listen(3000, () => {
    console.log('Server avviato sulla porta 3000');
});

