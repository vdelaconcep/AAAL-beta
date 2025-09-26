import pool from '../database/mysql.js';

class MensajesComunidad {
    static async enviarMensaje(data) {
        try {

            // Verificar si existe la tabla
            const [rows] = await pool.query("SHOW TABLES LIKE 'mensajesComunidad'");

            // Si no existe, crearla
            if (rows.length === 0) {
                const createQuery = `
                CREATE TABLE mensajesComunidad (
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(50) NOT NULL,
                    relacion VARCHAR(50) NOT NULL,
                    titulo VARCHAR(50) NOT NULL,
                    mensaje VARCHAR(500) NOT NULL,
                    foto VARCHAR(1000),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`;
                await pool.query(createQuery);
                console.log("Tabla 'mensajesComunidad' creada ✅");
            }

            // Insertar datos en la tabla
            const insertQuery = `
                INSERT INTO mensajesComunidad (nombre, relacion, titulo, mensaje, foto)
                VALUES(?, ?, ?, ?, ?)
            `;
            const values = [data.nombre, data.relacion, data.titulo, data.mensaje, data.foto];
            const [result] = await pool.query(insertQuery, values);
            
            return { id: result.insertId, ...data };

        } catch (error) {
            throw new Error('Error al guardar mensaje en base de datos: ' + error.message);
        }
    }
}

export default MensajesComunidad;