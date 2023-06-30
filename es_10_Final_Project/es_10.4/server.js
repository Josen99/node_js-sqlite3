const express = require('express');
const bodyParser = require('body-parser');
const jwt =require ('jsonwebtoken')
const serverStatic=require('serve-static');
const sqlite3=require('sqlite3').verbose();

const app = express();

app.use(bodyParser.json());
app.use(serverStatic('public'));

const db=new sqlite3.Database('./myDatabase.db',(err)=>{
    if(err){
        console.error(err.message);
    }
    console.log('Conected to db');
});

const SECRET_KEY = 'your-secret-key'; //Replace this with a more secure key in a production environment

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Internal server error' });
        }
        
        if (user && user.password === password ) {
            // generate and sign the jwt
            const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, {
                expiresIn: '1h',
            });
            
            res.json({ message: 'Authentication successful', token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// register route
app.post('/register', (req, res) => {
    const { username, password,  role,  } = req.body;
    db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ? )', [username, password,  role], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Internal server error' });
        }
        res.status(201).json({message: 'User created successfully' });
    });
    
});

// middleware to check authentication
function isAuthenticated(req, res, next) {
    const token = req.headers['authorization'];
    
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized access' });
            }
            req.decoded = decoded;
            next();
        })
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
}

// middleware to check fo admin role
function isAdmin(req, res, next) {
    if (req.decoded && req.decoded.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access forbidden: not an administrator '});
    }
}

// authenticated route
app.get('/protected', isAuthenticated, (req, res) => {
    res.json({ message: 'You have accessed protected content'});
});

// admin route
app.get('/admin', isAuthenticated, isAdmin, (req, res) => {
    res.json({ message: 'Welcome to the admin area' });
});

// logout route
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login.html');
});



process.on('SIGINT',()=>{//SIGINT verifica che la connessione sia aperta
    db.close((err)=>{
        if(err){
            console.error(err.message);
        }
        console.log('closed the db connection');
    });
    process.exit(0);
});


// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`))


