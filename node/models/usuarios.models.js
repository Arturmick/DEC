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
    console.log("GET request received for all users"); // Add this line
    sql.query("SELECT * FROM usuarios", (err, res) => {
        if (err) {
            console.error("Error fetching users: ", err); // Add this line
            result.status(500).send({
                message: err.message || "Ocurrió un error al obtener los usuarios."
            });
            return;
        }
        console.log("Usuarios: ", res); // Información que mostramos en la consola donde estamos ejecutando NodeJS (Servidor)
        result.json(res); // Información que enviamos al cliente.
    });
};

// Donde en la función anterior teníamos una petición (request) sin datos de entrada, ahora tenemos un usuarioID definido en la ruta.
Usuario.buscarPorID = (request, result) => {
    console.log(request.params.idUsuario2);
    sql.query("SELECT * FROM usuarios WHERE idUsuario = ?", [request.params.idUsuario2], (err, res) => {
        if (err) {
            console.error("Error fetching user by ID: ", err);
            result.status(500).send({
                message: err.message || "Ocurrió un error al obtener el usuario."
            });
            return;
        }
        console.log(res);
        if (res.length) {
            console.log("Usuario encontrado: ", res[0]);
            result.json(res[0]);
        } else {
            console.log("Usuario no encontrado");
            result.status(404).json({ kind: "not_found" });
        }
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
            result.status(500).send({
                message: err.message || "Ocurrió un error al insertar el usuario."
            });
            return;
        }
        console.log("Usuario creado: ", { id: res.insertId, ...nuevoUsuario }); // Información que mostramos en la consola donde estamos ejecutando NodeJS (Servidor)
        result.status(201).send({ id: result.insertId, ...nuevoUsuario });
    });
};

/*************************** PUT *******************************/

Usuario.actualizar = (request, result) => {

    // Creamos un nuevo usuario
    const usuarioID =request.params.usuarioId;

    sql.query('UPDATE usuarios SET email="kk" WHERE idUsuario = ?', [usuarioID], (err, res) => {
        if (err) {
            console.error("Error al actualizar el usuario: ", err); // Información que mostramos en la consola donde estamos ejecutando NodeJS (Servidor)
            result.status(500).send({
                message: err.message || "Ocurrió un error al actualizar el usuario."
            });
            return;
        }
        if (res.affectedRows > 0) {
            console.log("Usuario actualizado: ", { id: usuarioID }); // Información que mostramos en la consola donde estamos ejecutando NodeJS (Servidor)
            result.json({ message: "Usuario actualizado correctamente." });
            return;
        }else {
            console.log("Usuario no encontrado: ", { id: usuarioID }); // Información que mostramos en la consola donde estamos ejecutando NodeJS (Servidor)
            result.status(404).json({ message: "Usuario no encontrado." });
            return;
        }

    });
}

/*************************** DELETE *******************************/

module.exports = Usuario;