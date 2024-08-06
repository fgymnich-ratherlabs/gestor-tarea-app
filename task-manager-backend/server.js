const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const sequelize = require('./config/db');
require('dotenv').config();  // Cargar variables de entorno

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/tasks', tasksRouter);

// Sincronizar modelos y arrancar el servidor
sequelize.sync()
  .then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(error => console.error('Error syncing database:', error));
