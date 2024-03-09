import { pool } from "../db.js";

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
    const result = await pool.query("SELECT * FROM tareas");

    const tareas = result.recordset;
    res.json(tareas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTarea = async (req, res) => {
  try {
    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("SELECT * FROM tareas WHERE id = @id");

    if (result.recordset.length > 0) {
      const tarea = result.recordset[0];
      res.json(tarea);
    } else {
      res.status(404).json({ message: "Tarea no encontrada" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const crearTarea = async (req, res) => {
  try {
    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;

    const result = await pool
      .request()
      .input("titulo", titulo)
      .input("descripcion", descripcion)
      .query(
        "INSERT INTO tareas(titulo, descripcion) OUTPUT INSERTED.id VALUES (@titulo, @descripcion)"
      );

    console.log(result);
    res.json({
      id: result.recordset[0].id, // id
      titulo,
      descripcion,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const actualizarTarea = async (req, res) => {
  try {

    const existenciaTarea = await pool
      .request()
      .input("id", req.params.id)
      .query("SELECT * FROM tareas WHERE id = @id");

    if (existenciaTarea.recordset.length === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    const result = await pool
      .request()
      .input("id", req.params.id)
      .input("titulo", req.body.titulo)
      .input("descripcion", req.body.descripcion)
      .query(
        "UPDATE tareas SET titulo = @titulo, descripcion = @descripcion WHERE id = @id"
      );

    res.json({ message: "Tarea actualizada correctamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const eliminarTarea = async (req, res) => {
  try {
    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("DELETE FROM tareas WHERE id = @id");

    if(result.rowsAffected == 0){
      return res.status(404).json({message: "task no found"})
    }  

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
