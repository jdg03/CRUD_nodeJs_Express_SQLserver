import Router from "express";
import { getTarea, getTareas, crearTarea,actualizarTarea, eliminarTarea, ping } from "../controllers/tareas.controllers.js";

const router = Router();

//ruta para probar la coonexion
router.get('/ping',ping)

router.get('/tareas', getTareas);
router.get('/tareas/:id',getTarea); 

router.post('/tareas',crearTarea); 

router.put('/tareas/:id',actualizarTarea); 

router.delete('/tareas/:id',eliminarTarea);

export default router;