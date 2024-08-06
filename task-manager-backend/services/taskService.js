const Task = require('../models/Task');

//Task is a sequelize model object
// Obtener todas las tareas
const getAllTasks = async () => {
  return await Task.findAll();
};

// Crear una nueva tarea
const createTask = async (name) => {
  return await Task.create({ name });
};

// Eliminar una tarea por ID
const deleteTaskById = async (id) => {
  const task = await Task.destroy({ where: { id } });
  return task > 0; // Devuelve true si se eliminó al menos una tarea
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTaskById,
};
