 document.addEventListener('DHMContentLoaded',async()=>{
    const token=localStorage.getItem('token');
    if(!token){
        window.location.href='/index.html';
        return;
    }
    try{
        const response=await fetch('/protected',{
            method:'GET',
            headers:{
                'Authorization': token,
            },
        });

        if(response.status!==200){
            localStorage.removeItem('token');
            window.location.href='/index.html';
            return;
        }

        const decoded=atob(data.token.split('.')[1]);
        const payload=JSON.parse(decoded);
        if(payload.role==='admin'&&window.location.pathname !=='/admin.html'){
            window.location.href='/admin.html';
        }else if(payload.role=='user'&&window.location.pathname!=='/user.html'){
            window.location.href='/user.html';
        }
    }catch(error){
        console.error('Error:',error);
    }
 })