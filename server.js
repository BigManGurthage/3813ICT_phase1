// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const http = require('http');
const socketIO = require('socket.io');
const { PeerServer } = require('peer');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: '*' }
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/chatSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Mongoose Schemas
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  avatar: String,
  groups: [String],
});
const User = mongoose.model('User', userSchema);

const groupSchema = new mongoose.Schema({
  groupName: String,
  members: [String],
  channels: [String],
});
const Group = mongoose.model('Group', groupSchema);

const chatSchema = new mongoose.Schema({
  channelId: String,
  messages: [{ username: String, message: String, avatar: String, timestamp: Date }]
});
const Chat = mongoose.model('Chat', chatSchema);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Improved Multer configuration for image uploads (saving with original name)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));  // Save with original extension
  }
});
const upload = multer({ storage: storage });

// API Routes

// User Registration (example)
app.post('/api/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Chat Message API
app.post('/api/send-message', async (req, res) => {
  const { channelId, username, message, avatar } = req.body;
  try {
    let chat = await Chat.findOne({ channelId });
    if (!chat) {
      chat = new Chat({ channelId, messages: [] });
    }
    chat.messages.push({ username, message, avatar, timestamp: new Date() });
    await chat.save();
    io.to(channelId).emit('newMessage', { username, message, avatar });
    res.status(200).send('Message sent and saved.');
  } catch (error) {
    res.status(500).send(error);
  }
});

// Upload Profile Image
app.post('/api/upload-avatar', upload.single('avatar'), async (req, res) => {
  const { userId } = req.body;
  const avatarPath = `/uploads/${req.file.filename}`;
  try {
    await User.findByIdAndUpdate(userId, { avatar: avatarPath });
    res.status(200).send({ avatarPath });
  } catch (error) {
    res.status(500).send(error);
  }
});

// WebSockets for Real-Time Communication
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinChannel', (channelId) => {
    socket.join(channelId);
    io.to(channelId).emit('userJoined', socket.id);
  });

  socket.on('leaveChannel', (channelId) => {
    socket.leave(channelId);
    io.to(channelId).emit('userLeft', socket.id);
  });

  socket.on('sendMessage', (data) => {
    io.to(data.channelId).emit('newMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// PeerJS Server for Video Chat (integrated into same server)
const peerServer = PeerServer({
  server: server,  // Use the same HTTP server
  path: '/peerjs'
});

peerServer.on('connection', (client) => {
  console.log('PeerJS client connected:', client.id);
});

peerServer.on('disconnect', (client) => {
  console.log('PeerJS client disconnected:', client.id);
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
