const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Ruta para obtener todas las tareas
router.get('/', taskController.getAllTasks);

// Ruta para añadir una nueva tarea
router.post('/', taskController.createTask);

// Ruta para eliminar una tarea
router.delete('/:id', taskController.deleteTask);

module.exports = router;
