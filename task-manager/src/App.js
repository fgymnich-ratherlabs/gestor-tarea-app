//run with npm run start
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './styles.css';

const App = () => {
    // Inicializa el estado de tareas con datos del localStorage
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      const savedTasks = localStorage.getItem("tasks");
      setTasks(savedTasks ? JSON.parse(savedTasks) : []);
    }, []);

    const API_URL = 'http://localhost:3001';

    useEffect(() => {
        // Recuperar tareas del backend al cargar el componente
        const loadTasks = async () => {
          try {
            const response = await axios.get(`${API_URL}/tasks`);
            const data = response.data;
            setTasks(data);
          } catch (error) {
            console.error('Error al recuperar tareas:', error);
          }
        };
    
        loadTasks();
      }, []);

    //Efecto que guarda las tareas en localStorage cada vez que se actualizan
    useEffect(() => {
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }, [tasks]);

    //Add Tarea nueva
    const addTask = async (task) => {
        try {
          const response = await axios.post(`${API_URL}/tasks`, task, {
            headers: { 'Content-Type': 'application/json' }
          });
          const newTask = response.data;
          setTasks([...tasks, newTask]);
        } catch (error) {
          console.error('Error al añadir tarea:', error);
        }
    };

    //Inicializa la task de buffer que se va a modificar
    const [currentTask, setCurrentTask] = useState(null);


    //Actualizar tarea
    const updateTask = async (task) => {
        try {
            const response = await axios.put(`${API_URL}/tasks/${task.id}`, task, {
                headers: { 'Content-Type': 'application/json' }
            });
            const updatedTask = response.data;
            setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
            setCurrentTask(null);
        } catch (error) {
            console.error('Error al actualizar tarea:', error);
        }
    };      

    //Borrar tarea
    const deleteTask = async (id) => {
        try {
          await axios.delete(`${API_URL}/tasks/${id}`);
          setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
          console.error('Error al eliminar tarea:', error);
        }
    };

    const handleEditClick = (task) => {
        setCurrentTask(task);
    };

    return (
        <div className="container">
          <h1>Task Manager</h1>
          <TaskForm addTask={addTask} updateTask={updateTask} currentTask={currentTask} />
          <TaskList tasks={tasks} deleteTask={deleteTask} onEditClick={handleEditClick} />
        </div>
      );
    
};

export default App;

