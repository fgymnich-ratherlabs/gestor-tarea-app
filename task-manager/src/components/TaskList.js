import React from 'react';

const TaskList = ({ tasks, onEditClick, deleteTask }) => {
    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    {task.name}
                    <button onClick={() => onEditClick(task)}>Edit</button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
