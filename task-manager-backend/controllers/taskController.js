const taskService = require('../services/taskService');

// Obtener todas las tareas
const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).send('Error al obtener las tareas');
  }
};

// Crear una nueva tarea
const createTask = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ error: 'El nombre de la tarea es requerido' });
    }
    const newTask = await taskService.createTask(name);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    res.status(500).send('Error al crear la tarea');
  }
};

// Eliminar una tarea
const deleteTask = async (req, res) => {


  const { id } = req.params;

  // Validar que el ID no esté vacío y que sea un número entero positivo
  if (!id || isNaN(parseInt(id)) || parseInt(id) <= 0) {
    return res.status(400).json({ error: 'ID de tarea inválido' });
  }

  try {
    const deleted = await taskService.deleteTaskById(id);
    if (deleted) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: 'Tarea no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    res.status(500).send('Error al eliminar la tarea');
  }
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
};
