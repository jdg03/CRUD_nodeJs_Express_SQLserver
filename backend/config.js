export const PORT = 4000;



export const DB_USER = ''; // Nombre de usuario de la base de datos
export const DB_PASSWORD = ''; // Contraseña de la base de datos
export const DB_SERVER = 'localhost'; // Nombre del servidor de la base de datos solo con localhost me funciono
export const DB_DATABASE = 'tareas_db'; // Nombre de la base de dat os

/** 

--CODIGO PARA CREAR LA BASE DE DATOS

Create DATABASE tareas_db

USE tareas_db;

CREATE TABLE tareas (
    id INT PRIMARY KEY IDENTITY,
    titulo VARCHAR(100) NOT NULL,
    descripcion VARCHAR(300),
    estado BIT NOT NULL DEFAULT 0,
    fecha DATETIME NOT NULL DEFAULT GETDATE()
);

*/