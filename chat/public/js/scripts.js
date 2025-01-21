//Establecemos la conexión con el servidor
const socket = io();

window.onload = () => {

    //Envio de mensjaes al servidor
    boton.addEventListener('click', function(e) {

      if (input.value) {

          //Enviamos el mensaje al servidor
          socket.emit('chat', input.value);

          //Mensaje que envia el cliente
          const item = document.createElement('li');
          item.textContent = input.value;
          item.classList.add("enviado");
          mensajes.appendChild(item);


          //Vaciamos la caja de texto
          input.value = '';
      }
    });

    //Recepción de mensajes.
    socket.on('chat', function(msg) {
      const item = document.createElement('li');
      item.textContent = msg;
      mensajes.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });
}