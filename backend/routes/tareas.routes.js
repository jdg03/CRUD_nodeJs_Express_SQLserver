import Router from "express";

import { getTarea, getTareas, crearTarea,actualizarTarea, eliminarTarea, ping, buscarPorId, buscarPorPalabra, nuevaTarea } from "../controllers/tareas.controllers.js";

const router = Router();

//ruta para probar la coonexion
router.get('/ping',ping)

router.get('/tareas', getTareas);
router.get('/tareas/:id',getTarea); 

router.get('/nuevaTarea',nuevaTarea); 
router.post('/tareas',crearTarea);


router.put('/tareas/:id',actualizarTarea); 

router.delete('/tareas/:id',eliminarTarea);

router.get('/buscar',buscarPorId);
router.get('/buscarPorPalabra',buscarPorPalabra);

export default router;