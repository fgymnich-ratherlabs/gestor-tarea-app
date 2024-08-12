import PropTypes from 'prop-types';
import React from 'react';

const TaskList = ({ tasks, onEditClick, deleteTask }) => { 

    return (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.name}
              <button
                onClick={() => onEditClick(task)}
                className={'button-edit'}
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

// Define PropTypes for the component
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
          ).isRequired,
  deleteTask: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default TaskList;
