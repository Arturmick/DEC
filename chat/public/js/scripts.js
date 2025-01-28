document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  const form = document.getElementById('form');
  const input = document.getElementById('input');
  const messages = document.getElementById('messages');
  const fileInput = document.getElementById('fileInput');
  const fileForm = document.getElementById('fileForm');
  const fileLinks = document.getElementById('fileLinks');

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value) {
          const message = input.value;
          socket.emit('chat message', message);
          addMessage(message, 'user-message');
          input.value = '';
      }
  });

  fileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', fileInput.files[0]);

      fetch('/upload', {
          method: 'POST',
          body: formData
      })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  });

  socket.on('chat message', (msg) => {
      addMessage(msg, 'other-message');
  });

  socket.on('file', (data) => {
      const link = document.createElement('a');
      link.href = `/uploads/${data.filename}`;
      link.textContent = `Download ${data.originalname}`;
      link.download = data.originalname;
      fileLinks.appendChild(link);
      fileLinks.appendChild(document.createElement('br'));
  });

  function addMessage(message, className) {
      const item = document.createElement('li');
      item.textContent = message;
      item.classList.add(className);
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
  }
});