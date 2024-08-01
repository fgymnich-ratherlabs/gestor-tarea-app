import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './styles.css';

const App = () => {
    // Inicializa el estado de tareas con datos del localStorage
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
        
    });

    //Efecto que guarda las tareas en localStorage cada vez que se actualizan
    useEffect(() => {
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }, [tasks]);
    
    const addTask = (task) => {
        setTasks(prevTasks => [
            ...prevTasks,
            { id: Date.now(), name: task.name }
        ]);
    };

    const deleteTask = (id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    return (
        <div className="app">
            <h1>Task Manager</h1>
            <TaskForm addTask={addTask} />
            <TaskList tasks={tasks} deleteTask={deleteTask} />
        </div>
    );
};

export default App;

