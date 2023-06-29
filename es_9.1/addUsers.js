const sqlite3=require('sqlite3').verbose();

const db=new sqlite3.Database('./myDatabase',(err)=>{
    if(err){
        console.error(err.message);
    }
    console.log('Conected to db');
});

const addUsers=()=>{
    const users= [
        {
            "username": "user1",
            "password": "password1",
            "role":"user"
        },
        {
            "username": "user2",
            "password": "password2",
            "role":"user"
        },
        {
            "username": "admin",
            "password": "adminpassword",
            "role":"admin"
        }
        ];
        const insertUser=db.prepare(`INSERT INTO users(username , password , role)VALUES(?,?,?)`);
        users.forEach((user)=>{
                   insertUser.run(user.username,user.password,user.role,(err)=>{
                    if(err){
                        console.error(err.message);
                    }else{
                        console.log(`User ${user.username} added.sucsessfully`);
                    }
                   })
        });
        insertUser.finalize();
}

addUsers();