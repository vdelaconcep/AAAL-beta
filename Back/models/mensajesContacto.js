import pool from '../database/mysql.js';
import { v4 as uuidv4 } from 'uuid';

class MensajesContacto {
    static async enviarMensaje(data) {
        try {

            // Verificar si existe la tabla
            const [rows] = await pool.query("SHOW TABLES LIKE 'mensajesContacto'");

            // Si no existe, crearla
            if (rows.length === 0) {
                const createQuery = `
                CREATE TABLE mensajesContacto (
                    id CHAR(36) NOT NULL PRIMARY KEY,
                    nombre VARCHAR(50) NOT NULL,
                    email VARCHAR(50) NOT NULL,
                    telefono INT,
                    asunto VARCHAR(50),
                    mensaje VARCHAR(500),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`;
                await pool.query(createQuery);
                console.log("Tabla 'mensajesContacto' creada ✅");
            }

            // Insertar datos en la tabla
            const uuid = uuidv4();

            const insertQuery = `
                INSERT INTO mensajesContacto (id, nombre, email, telefono, asunto, mensaje)
                VALUES(?, ?, ?, ?, ?, ?)
            `;
            const values = [uuid, data.nombre, data.email, data.telefono, data.asunto, data.mensaje];
            const [result] = await pool.query(insertQuery, values);
            
            return { id: uuid, ...data };

        } catch (error) {
            throw new Error('Error al guardar mensaje en base de datos: ' + error.message);
        }
    }
}

export default MensajesContacto;