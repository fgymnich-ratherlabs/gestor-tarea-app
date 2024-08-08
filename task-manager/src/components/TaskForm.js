import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const TaskForm = ({ addTask, updateTask, currentTask }) => {
    const [name, setName] = useState('');

    //Efecto para cargar el name en el form al editar tarea si es necesario
    useEffect(() => {
        if (currentTask) {
          setName(currentTask.name);
        } else {
          setName('');
        }
      }, [currentTask]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) return;

        if (currentTask) {
            updateTask({ ...currentTask, name });
        } else {
            const newTask = { name };
            addTask(newTask);
        }

        setName('');
    };

    return (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter task name"
          />
          <button 
            type="submit"
            className={currentTask ? 'button-update-active' : 'button-update'}
            >
                {currentTask ? 'Update Task' : 'Add Task'}
            </button>
        </form>
      );
};

// Define PropTypes for the component
TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  currentTask: PropTypes.func.isRequired,
};

export default TaskForm;
