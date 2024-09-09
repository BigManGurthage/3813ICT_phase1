const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage (for simplicity, replace with a database in production)
let users = [];
let groups = [];
let channels = [];
let messages = [];

// Route to check if the server is working
app.get('/', (req, res) => {
  res.send('Chat System Backend');
});

// User Routes
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  console.log('POST /api/users body:', req.body);
  const { username, email, role } = req.body;
  if (!username || !email || !role) {
    return res.status(400).json({ error: 'Username, email, and role are required' });
  }
  const newUser = { username, email, role };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.delete('/api/users/:username', (req, res) => {
  const { username } = req.params;
  users = users.filter(user => user.username !== username);
  res.status(200).json({ message: 'User deleted' });
});

// Group Routes
app.get('/api/groups', (req, res) => {
  res.json(groups);
});

app.post('/api/groups', (req, res) => {
  const { name, admin } = req.body;
  if (!name || !admin) {
    return res.status(400).json({ error: 'Name and admin are required' });
  }
  const newGroup = { name, admin, channels: [] };
  groups.push(newGroup);
  res.status(201).json(newGroup);
});

app.post('/api/groups/:groupName/users', (req, res) => {
  const { groupName } = req.params;
  const { username } = req.body;
  const group = groups.find(g => g.name === groupName);
  if (!group) {
    return res.status(404).json({ error: 'Group not found' });
  }
  if (!group.users) {
    group.users = [];
  }
  group.users.push(username);
  res.status(200).json(group);
});

// Channel Routes
app.get('/api/groups/:groupName/channels', (req, res) => {
  const { groupName } = req.params;
  const group = groups.find(g => g.name === groupName);
  if (!group) {
    return res.status(404).json({ error: 'Group not found' });
  }
  res.json(group.channels);
});

app.post('/api/groups/:groupName/channels', (req, res) => {
  const { groupName } = req.params;
  const { name } = req.body;
  const group = groups.find(g => g.name === groupName);
  if (!group) {
    return res.status(404).json({ error: 'Group not found' });
  }
  const newChannel = { name, messages: [] };
  group.channels.push(newChannel);
  res.status(201).json(newChannel);
});

app.post('/api/groups/:groupName/channels/:channelName/messages', (req, res) => {
  const { groupName, channelName } = req.params;
  const { username, text } = req.body;
  const group = groups.find(g => g.name === groupName);
  if (!group) {
    return res.status(404).json({ error: 'Group not found' });
  }
  const channel = group.channels.find(c => c.name === channelName);
  if (!channel) {
    return res.status(404).json({ error: 'Channel not found' });
  }
  const newMessage = { username, text, timestamp: new Date() };
  channel.messages.push(newMessage);
  res.status(201).json(newMessage);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
