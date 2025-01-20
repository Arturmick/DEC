const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;

// Declaramos la aplicación
const app = express();

// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routes/usuarios.routes.js")(app);

// Arrancamos el servidor
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});