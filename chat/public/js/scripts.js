document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  const form = document.getElementById('form');
  const input = document.getElementById('input');
  const messages = document.getElementById('messages');
  const fileInput = document.getElementById('fileInput');
  const fileLinks = document.getElementById('fileLinks');

  const userName = prompt('Enter your name:');
  socket.emit('set user name', userName);

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value) {
          const message = input.value;
          socket.emit('chat message', message);
          input.value = '';
      } else if (fileInput.files.length > 0) {
          const formData = new FormData();
          formData.append('file', fileInput.files[0]);
          formData.append('user', userName); // Add user name to form data

          fetch('/upload', {
              method: 'POST',
              body: formData
          })
          .then(response => response.text())
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));
      }
  });

  socket.on('chat message', (msg) => {
      const className = msg.user === userName ? 'user-message' : 'other-message';
      addMessage(msg, className);
  });

  function addMessage(message, className) {
      const item = document.createElement('li');
      if (message.type === 'text') {
          item.textContent = `${message.user}: ${message.data}`;
      } else if (message.type === 'file') {
          const link = document.createElement('a');
          link.href = `/uploads/${message.data.filename}`;
          link.textContent = `${message.user}: ${message.data.originalname}`; // Include user name
          link.download = message.data.originalname;
          item.appendChild(link);
      } else if (message.type === 'image' || (message.type === 'file' && /\.(jpg|jpeg|png|gif|webp|jfif)$/i.test(message.data.originalname))) {
          const imgContainer = document.createElement('div');
          imgContainer.classList.add('image-container');
          const img = document.createElement('img');
          img.src = `/uploads/${message.data.filename}`;
          img.alt = message.data.originalname;
          img.style.maxWidth = '200px';
          img.style.maxHeight = '200px';
          imgContainer.appendChild(img);
          const caption = document.createElement('div');
          caption.textContent = `${message.user}`; // Include user name
          imgContainer.appendChild(caption);
          item.appendChild(imgContainer);
      }
      item.classList.add(className);
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
  }
});