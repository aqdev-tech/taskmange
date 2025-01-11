// filepath: src/routes/taskRoutes.js
const express = require('express');
const { authenticate, createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();

router.post('/tasks', authenticate, createTask);
router.get('/tasks', authenticate, getTasks);
router.put('/tasks/:id', authenticate, updateTask);
router.delete('/tasks/:id', authenticate, deleteTask);

module.exports = router;