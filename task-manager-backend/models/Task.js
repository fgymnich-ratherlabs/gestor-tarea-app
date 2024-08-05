const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define model Task
const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, 
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
}, {
  timestamps: false, 
});

// Exportar el modelo
module.exports = Task;
