const cors = require('cors');

module.exports = app => {
    app.use(cors());
    // Importamos el módulo donde se encuentran las Queries que nos devolverán los datos de la BBDD
    const usuarios = require("../models/usuarios.models.js");

    // Creamos las diferentes rutas y métodos para poder realizar las diferentes acciones.

    /*************************** GET *******************************/

    app.get("/usuarios", (req, res) => {
        if (req.query.idUsuario2) {
            // Si se proporciona idUsuario, busca por ID
            req.params.idUsuario2 = req.query.idUsuario2; // Add this line

            return usuarios.buscarPorID(req, res);
        }
        // Si no hay idUsuario, devuelve todos los usuarios
        return usuarios.buscarTodos(req, res);
    });
    

    /*************************** POST *******************************/
    app.post("/usuarios", usuarios.crear);

    /*************************** PUT *******************************/

    /*************************** DELETE *******************************/

}
