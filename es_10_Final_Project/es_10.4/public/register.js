document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
   
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password,role }),
        });

        if (response.status != 200) {
            document.getElementById('register-message').innerText = 'User registered successfully';
        } else {
            document.getElementById('register-message').innerText = 'Registration failed';
        }
    } catch (error) {
        console.error(err.message); 
    }
});