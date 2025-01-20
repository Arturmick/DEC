const { request, response } = require("express");
const sql = require("./db.js");

// Construimos una función llamada Usuario (a modo de objeto)
function Usuario(usuario) {
    this.idUsuario = usuario.idUsuario;
    this.correo = usuario.correo;
    this.nombre = usuario.nombre;
    this.pass = usuario.pass;
}

// Definimios las funciones que forman parte de Usuario, a las que accederemos desde la ruta correspondiente en función de la acción que queramos realizar: INSERT, SELECT, UPDATE o DELETE.

/*************************** GET *******************************/

Usuario.buscarTodos = (request, result) => {
    sql.query("SELECT * FROM usuarios", (err, res) => {
        console.log("Usuarios: ", res); // Información que mostramos en la consola donde estamos ejecutando NodeJS (Servidor)
        result.json(res); // Información que enviamos al cliente.
    });
};

// Donde en la función anterior teníamos una petición (request) sin datos de entrada, ahora tenemos un usuarioID definido en la ruta.
Usuario.buscarPorID = (request, result) => {
    sql.query(`SELECT * FROM usuarios WHERE idUsuario = ${request.params.usuarioId}`, (err, res) => {
        // Si la respuesta de la query devuelve una longitud de 1 o más valores, mostramos el usuario encontrado.
        console.log(res);
        if (res.length) {
            console.log("Usuario encontrado: ", res[0]); // Información que mostramos en la consola donde estamos ejecutando NodeJS (Servidor)
            result.json(res[0]); // Información que enviamos al cliente.
        } else result({ kind: "not_found" }, null); // No existe un usuario con ese ID
    });
};

/*************************** POST *******************************/
Usuario.crear = (request, result) => {
    // Creamos un nuevo usuario
    const nuevoUsuario = new Usuario({
        idUsuario: request.body.idUsuario,
        correo: request.body.correo,
        nombre: request.body.nombre,
        pass: request.body.pass
    });

    // Insertamos el nuevo usuario en la tabla usuarios
    sql.query("INSERT INTO usuarios SET ?", nuevoUsuario, (err, res) => {
        if (err) {
            console.log("Error al insertar un nuevo usuario: ", err); // Información que mostramos en la consola donde estamos ejecutando NodeJS (Servidor)
            result(err, null); // Información que enviamos al cliente.
            return;
        }
        console.log("Usuario creado: ", { id: res.insertId, ...nuevoUsuario }); // Información que mostramos en la consola donde estamos ejecutando NodeJS (Servidor)
        result(null, { id: res.insertId, ...nuevoUsuario }); // Información que enviamos al cliente.
    });
};

/*************************** PUT *******************************/

/*************************** DELETE *******************************/

module.exports = Usuario;