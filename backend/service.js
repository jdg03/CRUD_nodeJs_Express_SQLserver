import express from 'express';
import { PORT } from './config.js';
import path from 'path'; // Importa el módulo path
import { fileURLToPath } from 'url'; // También debes importar fileURLToPath si lo estás usando

import tareasRoutes from './routes/tareas.routes.js';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));



app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use(tareasRoutes);

//ruta inicial
app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});
