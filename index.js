const express = require('express');
require('dotenv').config()
const { register, login } = require('./controllers/authController');
const { addTask, getTasks, deleteTask } = require('./controllers/taskController');
const { authMiddleware } = require('./middlewares/authMiddleware');
require('dotenv').config()

const app = express();
app.use(express.json());

// Auth routes
app.post('/api/register', register);
app.post('/api/login', login);

// Task routes
app.post('/api/addtasks', authMiddleware, addTask);
app.get('/api/getTasks', authMiddleware, getTasks);
app.delete('/api/deleteTask/:id', authMiddleware, deleteTask);

const PORT = process.env.Port || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get("/", (req, res) => {
    res.send(`<h1> welcome to House Of Marker </h1>`)
})
