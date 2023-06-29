const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true})); // verifica che i valori conetnuti nel form non siano solo stringhe, ma valori
app.use(express.json()); // le info vengono inviate come array json e quindi devono essere deserializzate

app.post('/submit', (req, res) => // /submit è la rotta alla quale viene inviato il moudulo
{
    const { email, Password, City, State, Check, zip, UserName } = req.body;

    console.log(`Email: ${email}, Password: ${Password} , City: ${City}, State: ${State}, Check:${Check}`);

    res.send(`Dati ricevuti! <br> Email: ${email},<br> Password: ${Password}, <br> City: ${City},<br> State: ${State},<br> zip: ${zip}, <br> Check: ${Check}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

