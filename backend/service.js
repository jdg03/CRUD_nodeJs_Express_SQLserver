import express from 'express';
import { PORT } from './config.js';
import path from 'path'; // Importa el módulo path
import { fileURLToPath } from 'url'; // También debes importar fileURLToPath si lo estás usando
import bodyParser from 'body-parser';

import tareasRoutes from './routes/tareas.routes.js';

const app = express();

// __dirname que contiene la ruta del directorio 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
//Utiliza el método join del módulo path para combinar dos rutas en una sola 
export const ruta = path.join(__dirname, '../frontend/views');

// Define el motor de plantillas
app.set('view engine', 'ejs');
// Establece la ruta de las plantillas
app.set('views', ruta);

//Define los archivos estaticos
const archivosEstaticos = path.join(__dirname, '../frontend');
app.use(express.static(archivosEstaticos));

// Configurar body-parser para analizar datos de formularios HTML
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar body-parser para analizar datos JSON
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Middleware para parsear JSON
app.use(express.json());

//ruta inicial
app.get('/', (req, res) => {
  
  res.render('index', { PORT });
});

// Rutas
app.use(tareasRoutes);
