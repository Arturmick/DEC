const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

// Verifica si el directorio 'uploads' existe, si no, créalo
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.use(express.static('public'));
app.use('/uploads', express.static(uploadDir)); // Servir archivos estáticos desde el directorio 'uploads'

// Endpoint to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    const fileData = { filename: req.file.filename, originalname: req.file.originalname };
    io.emit('chat message', { type: 'file', data: fileData });
    res.status(200).send('File uploaded successfully');
  } else {
    res.status(400).send('No file uploaded');
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', { type: 'text', data: msg });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// filepath: /c:/Proyectes_DEC_DIN/DEC/chat/public/js/scripts.js
document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  const form = document.getElementById('form');
  const input = document.getElementById('input');
  const messages = document.getElementById('messages');
  const fileInput = document.getElementById('fileInput');
  const fileForm = document.getElementById('fileForm');

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value) {
          const message = input.value;
          socket.emit('chat message', message);
          addMessage({ type: 'text', data: message }, 'user-message');
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

  function addMessage(message, className) {
      const item = document.createElement('li');
      if (message.type === 'text') {
          item.textContent = message.data;
      } else if (message.type === 'file') {
          const link = document.createElement('a');
          link.href = `/uploads/${message.data.filename}`;
          link.textContent = `Download ${message.data.originalname}`;
          link.download = message.data.originalname;
          item.appendChild(link);
      }
      item.classList.add(className);
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
  }
});