import connection from '../database/mysql.js';

class Mensajes {
    static async enviarMensaje(data) {
        try {

            // Verificar si existe la tabla
            const [rows] = await connection.query("SHOW TABLES LIKE 'mensajesContacto'");

            // Si no existe, crearla
            if (rows.length === 0) {
                const createQuery = `
                CREATE TABLE mensajesContacto (
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(50) NOT NULL,
                    email VARCHAR(50) NOT NULL,
                    telefono INT,
                    asunto VARCHAR(50),
                    mensaje VARCHAR(500),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`;
                await connection.query(createQuery);
                console.log("Tabla 'mensajesContacto' creada ✅");
            }

            // Insertar datos en la tabla
            const insertQuery = `
                INSERT INTO mensajesContacto (nombre, email, telefono, asunto, mensaje)
                VALUES(?, ?, ?, ?, ?)
            `;
            const values = [data.nombre, data.email, data.telefono, data.asunto, data.mensaje];
            const [result] = await connection.query(insertQuery, values);
            
            return { id: result.insertId, ...data };

        } catch (error) {
            throw new Error('Error al guardar mensaje en base de datos: ' + error.message);
        }
    }
    
    static async enviarCorreoRespuesta(data) {
    try {
        
    } catch (error) {
        
    }
    }
}

export default Mensajes;