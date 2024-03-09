import express from "express";
import { PORT } from './config.js';
import tareasRouetes from './routes/tareas.routes.js'

const app = express();

//permite recibir enviar respuestas en formato Json
app.use(express.json());


app.use(tareasRouetes);

app.listen(PORT);
console.log(`Server is listening on port: ${PORT}`);


//tener instalado Node
//npm install ->  instala las dependencias del archivo packaje.json
//npm run dev  -> Levanta el servidor y corre la aplicacion
