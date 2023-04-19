const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // middleware to parse incoming requests as JSON

let users = []; // a simple in-memory array to store user data

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET a specific user by ID
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST a new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT (update) an existing user by ID
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  users[index] = { ...users[index], ...updatedUser }; // merge old and new user data
  res.json(users[index]);
});

// DELETE a user by ID
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const deletedUser = users.splice(index, 1)[0];
  res.json(deletedUser);
});

app.listen(port, () => {
  console.log(`REST API listening at http://localhost:${port}`);
});
