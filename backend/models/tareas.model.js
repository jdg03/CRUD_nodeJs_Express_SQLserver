import { pool } from "../db.js";

class Tarea {
  
  async getAllTareas() {
    try {
      const result = await pool.query("SELECT * FROM tareas");
      return result.recordset;
    } catch (error) {
      throw error;
    }
  }

  async getTareaById(id) {
    try {
      const result = await pool
        .request()
        .input("id", id)
        .query("SELECT * FROM tareas WHERE id = @id");

      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }

  async crearTarea(titulo, descripcion) {
    try {
      const result = await pool
        .request()
        .input("titulo", titulo)
        .input("descripcion", descripcion)
        .query(
          "INSERT INTO tareas(titulo, descripcion) OUTPUT INSERTED.id VALUES (@titulo, @descripcion)"
        );

      return {
        id: result.recordset[0].id,
        titulo,
        descripcion,
      };
    } catch (error) {
      throw error;
    }
  }

   async actualizarTarea(id, titulo, descripcion) {
    try {
      const existenciaTarea = await this.getTareaById(id);

      if (!existenciaTarea) {
        throw new Error("Tarea no encontrada");
      }

      await pool
        .request()
        .input("id", id)
        .input("titulo", titulo)
        .input("descripcion", descripcion)
        .query(
          "UPDATE tareas SET titulo = @titulo, descripcion = @descripcion WHERE id = @id"
        );

      return { message: "Tarea actualizada correctamente" };
    } catch (error) {
      throw error;
    }
  }

  async eliminarTarea(id) {
    try {
      const result = await pool
        .request()
        .input("id", id)
        .query("DELETE FROM tareas WHERE id = @id");

      if (result.rowsAffected === 0) {
        throw new Error("Tarea no encontrada");
      }

      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new Tarea();
