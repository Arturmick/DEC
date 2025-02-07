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

// List of random names
const names = ['Alberto', 'Jordi', 'Vicent', 'Jesus', 'Ricardo', 'Hugo', 'Pablo', 'Arturo', 'Javi', 'Pili','Melisa','Victor'];

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
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const messageType = imageExtensions.includes(fileExtension) ? 'image' : 'file';
    io.emit('chat message', { type: messageType, data: fileData });
    res.status(200).send('File uploaded successfully');
  } else {
    res.status(400).send('No file uploaded');
  }
});

io.on('connection', (socket) => {
  socket.on('set user name', (userName) => {
    console.log(`${userName} connected`);

    socket.on('disconnect', () => {
      console.log(`${userName} disconnected`);
    });

    socket.on('chat message', (msg) => {
      io.emit('chat message', { type: 'text', data: msg, user: userName });
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});