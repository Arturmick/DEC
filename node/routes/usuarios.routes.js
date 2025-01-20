module.exports = app => {

    //Importamos el mídulo donde se encuentran las Queries que nos devolverán los datos de la BBDD
    const usuarios = require("../models/usuarios.models.js");

    // Creamos las diferentes rutas y métodos para poder realizar las diferentes acciones.

    /*************************** GET *******************************/

    //Devuelve todos los usuarios
    app.get("/usuarios", usuarios.buscarTodos);

    //Devuelve un usuario por ID
    app.get("/usuarios/:usuarioId", usuarios.buscarPorID);

    /*************************** POST *******************************/
    app.post("/usuarios", usuarios.crear);

    /*************************** PUT *******************************/

    /*************************** DELETE *******************************/

}
