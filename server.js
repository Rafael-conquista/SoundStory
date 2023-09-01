import app from './app.js';
const port = 3005 //modificar para uso de DOTENV

app.listen(port, () => {
    console.log(`escutando na porta ${port}`);
    console.log(`CTRL + clique em http://localhost:${port}`);
});