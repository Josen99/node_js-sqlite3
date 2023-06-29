
document.getElementById('register').addEventListener('submit' ,async(e) =>{
    e.preventDefault();

    const username=document.getElementById('username').value;
    const password=document.getElementById('password').value;
    const role=document.getElementById('role').value;

    try{
        const response =await fetch('/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({username ,password, role}),
        });
        if(response.status===201){
              document.getElementById('register-message').innerHTML='user registred sucessfully';
        }
        else{
            document.getElementById('register-message').innerText='registraion failed';
        }
    }catch(error){
        console.error('Error:',error);
    }

})