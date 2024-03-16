import sql from 'mssql';
import { DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE } from './config.js';



export const pool = new sql.ConnectionPool({
    server: DB_SERVER,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    options: {
        trustedConnection: false,
        encrypt: false
    }
});

pool.connect()
    .then(() => console.log('Conexión exitosa a SQL Server'))
    .catch(err => console.error('Error al conectar a SQL Server', err));
