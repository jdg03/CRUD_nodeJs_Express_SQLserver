import { pool } from "../db.js";
import Tarea from '../models/tareas.model.js';

 // prueba de conexion
 export const ping = async (req, res) => {
  try {
    const result = await pool.request().query('SELECT 1 + 1 as result');
    console.log(result.recordset[0]);
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


export const getTareas = async (req, res) => {
  try {
    const tareas = await Tarea.getAllTareas();
    
    //res.send(tareas);

    res.render('tareas', { tareas }); // Renderiza la vista 'tareas.ejs' y pasa las tareas como datos
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTarea = async (req, res) => {
  try {
    const id = req.params.id;
    const tarea = await Tarea.getTareaById(id);
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearTarea = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const nuevaTarea = await Tarea.crearTarea(titulo, descripcion);
    res.json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarTarea = async (req, res) => {
  try {
    const id = req.params.id;
    const { titulo, descripcion } = req.body;
    const mensaje = await Tarea.actualizarTarea(id, titulo, descripcion);
    res.json({ message: mensaje });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarTarea = async (req, res) => {
  try {
    const id = req.params.id;
    await Tarea.eliminarTarea(id);
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
