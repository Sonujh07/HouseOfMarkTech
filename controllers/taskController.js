const { readData, writeData } = require('../utils/fileHandler');
const tasksFile = './data/tasks.json';

exports.addTask = (req, res) => {
    try {
        const { title, description } = req.body;
        const username = req.user;

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        const tasks = readData(tasksFile);
        const newTask = {
            id: Date.now(),
            username,
            title,
            description,
            createdAt: new Date().toISOString(),
        };

        tasks.push(newTask);
        writeData(tasksFile, tasks);

        res.status(201).json({
             message: 'Task added successfully',
             task: newTask });
    } catch (error) {
        res.status(500).json({
             message: 'Server error',
             error: error.message });
    }
};

exports.getTasks = (req, res) => {
    try {
        const username = req.user;
        const tasks = readData(tasksFile).filter(task => task.username === username);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ 
            message: 'Server error',
            error: error.message });
    }
};

exports.deleteTask = (req, res) => {
    try {
        const { id } = req.params;
        const username = req.user;
        let tasks = readData(tasksFile);

        const task = tasks.find(t => t.id == id && t.username === username);
        if (!task) {
            return res.status(404).json({ 
                message: 'Task not found' });
        }

        tasks = tasks.filter(t => !(t.id == id && t.username === username));
        writeData(tasksFile, tasks);

        res.status(200).json({ 
            message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({
             message: 'Server error',
             error: error.message });
    }
};
