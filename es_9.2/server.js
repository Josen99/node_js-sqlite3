const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const ejs = require('ejs');



const app = express();
const db=new sqlite3.Database('./myDatabase',(err)=>{
    if(err){
        console.error(err.message);
    }
    console.log('Conected to db');
});




app.post('/login',(req,res)=>{
    db.get('SELECT *FROM usersWHERE username =?',[username],(err,user)=>{
        if(err){
            console.err(err.message);
            return res.status(500).json({message:'Internal server error'
            });
        }

        if (user&&user.password===password){
            const token =jwt.sing({
                username:user.username,role:user.role},SECURITY_KEY,{
                    exprires:'1h',
            });
            res.json({message:'Autentcation successful',token});
        }else{
            res.status(401).json({message:'Invalid credentials'});
        }
    });
});


app.post('/register',(req,res)=>{
    const{username,password,role}=req.body;

    db.run('INSERT INTO users(username,password,role) VALUES (?,?,?)',[username,password,role,(err)=>{
        if(err) {
            console.error(err.message);
            return res.status(500).json({message:'Internal err'})
        }
    }])
})



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




