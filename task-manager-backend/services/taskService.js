const Task = require('../models/Task');

//Task es un sequelize model object
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

// Actualizar una tarea por ID
const updateTaskById = async (id, name) => {
  const [updated] = await Task.update({ name }, { where: { id }, returning: true });
  if (updated) {
    return Task.findByPk(id);
  }
  return null;
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTaskById,
  updateTaskById,
};
