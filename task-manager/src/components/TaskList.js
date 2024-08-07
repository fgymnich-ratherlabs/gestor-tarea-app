import React, { useState } from 'react';


const TaskList = ({ tasks, onEditClick, deleteTask }) => {
    const [editingTaskId, setEditingTaskId] = useState(null);

    const handleEditClick = (task) => {
      setEditingTaskId(task.id);
      onEditClick(task);
    };    

    return (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.name}
              <button
                onClick={() => handleEditClick(task)}
                className={editingTaskId === task.id ? 'button-edit-active' : 'button-edit'}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className='button-delete'
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      );
};

export default TaskList;
