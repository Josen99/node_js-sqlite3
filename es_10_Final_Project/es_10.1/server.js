const express = require('express');
const bodyParser = require('body-parser');
const users = require('./users.json');

const app = express();
app.use(bodyParser.json())

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.users.find(
        (user) => user.username === username && user.password ===password
    );
    if (user) {
        res.json({message:'Authentication successful'});
    } else {
        res.status(401).json ({message:'Invalid credentials'});
    }
});

// Avvia il server
app.listen(3000, () => {
    console.log('Server avviato sulla porta 3000');
});