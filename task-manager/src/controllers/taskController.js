// filepath: src/controllers/taskController.js
const Task = require('../models/taskModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.userId = decoded.userId;
    next();
  });
};

const createTask = async (req, res) => {
  const { title, description, priority, dueDate, category, status } = req.body;
  try {
    const task = await Task.create({ title, description, priority, dueDate, category, status, UserId: req.userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { UserId: req.userId } });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, dueDate, category, status } = req.body;
  try {
    const task = await Task.findOne({ where: { id, UserId: req.userId } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    task.title = title;
    task.description = description;
    task.priority = priority;
    task.dueDate = dueDate;
    task.category = category;
    task.status = status;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, UserId: req.userId } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { authenticate, createTask, getTasks, updateTask, deleteTask };