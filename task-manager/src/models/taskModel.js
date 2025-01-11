// filepath: src/models/taskModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./userModel');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  priority: {
    type: DataTypes.ENUM('high', 'medium', 'low'),
    defaultValue: 'medium'
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('not started', 'in progress', 'completed'),
    defaultValue: 'not started'
  }
});

Task.belongsTo(User);
User.hasMany(Task);

module.exports = Task;