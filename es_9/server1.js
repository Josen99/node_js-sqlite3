const express = require('express');
const bodyParser = require('body-parser');
const jwt =require ('jsonwebtoken')
const users = require('./users.json');

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = 'your-secret-key'; //Replace this with a more secure key in a production environment

//Login route
app.post ('/login', (req, res) =>{
    const {username, password} = req.body;
    const user = users.users.find(
        (user) => user.username === username && user.password ===password
    );

    if (user) {
        //Generate and sign the JWT
        const token = jwt.sign({username:user.username}, SECRET_KEY,{
            expiresIn:'1h',
        });

        res.json({message:'Authentication successful', token});
    } else {
        res.status(401).json ({message:'Invalid credentials'});
    }
});

//MiddLeware to check authentication
function isAuthenticated (req, res, next) {
    const token =req.headers['authorization'];
    if(token) {
        jwt.verify(token, SECRET_KEY,(err, decoded) =>{
            if (err) {
                return res.status(401).json({message:'Unauthorized access'});
            }
            req.decoded = decoded;
            next();
        });
    } else {
        res.status(401).json({message:'No token provided'});
    }
}
/*
function isAdmin(req, res, next){
    if(req.decoded && req.decoded.role==='admin'){
        next()
    }else{
        res.status(403).json({message:'Access forbidden :not admin'});
    }
}
*/
//Authenticated route
app.get('/protected', isAuthenticated, (req, res) => {
    res.json({ message: 'You have accessed protected content'});
});

app.get('/admin', isAuthenticated, (req, res) => {
    res.json({ message: 'wlcome to the admin area'});
});


// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`))