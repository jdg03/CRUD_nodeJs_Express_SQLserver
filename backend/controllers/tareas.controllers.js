import { pool } from "../db.js";
import Tarea from '../models/tareas.model.js';
import { ruta } from "../service.js";


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

    res.render(ruta +'/tareas', { tareas }); // Renderiza la vista 'tareas.ejs' y pasa las tareas como datos

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


export const buscarPorId = async (req, res)=> {
  try {
    // Obtener el ID enviado desde el formulario
    const id = req.query.id;
  

    // Lógica para buscar la tarea por el ID recibido
    const tarea = await Tarea.getTareaById(id);

    // Verificar si la tarea existe
    if (!tarea) {
      return res.redirect('/tareas');
    }

    // Si la tarea existe, renderizar la vista con la tarea encontrada
    
    res.render(ruta + '/idTarea', { tarea });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const nuevaTarea = async (req, res) => {
 
  res.render(ruta + '/crearTarea');
};



export const crearTarea = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const nuevaTarea = await Tarea.crearTarea(titulo, descripcion);
   console.log(nuevaTarea);
   res.redirect('/tareas');
    
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

export const buscarPorPalabra = async (req, res) => {
  try {
    const palabra = req.query.palabra;
    const tareas = await Tarea.buscarTareasPorPalabra(palabra);

    // Renderizar la vista con las tareas encontradas
    res.render(ruta + '/tareas', { tareas });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
