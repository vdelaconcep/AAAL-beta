import pool from '../database/mysql.js';
import { v4 as uuidv4 } from 'uuid';

class MensajesComunidad {
    static async enviarMensaje(data) {
        try {

            // Verificar si existe la tabla
            const [rows] = await pool.query("SHOW TABLES LIKE 'mensajesComunidad'");

            // Si no existe, crearla
            if (rows.length === 0) {
                const createQuery = `
                CREATE TABLE mensajesComunidad (
                    id CHAR(36) NOT NULL PRIMARY KEY,
                    nombre VARCHAR(50) NOT NULL,
                    relacion VARCHAR(50) NOT NULL,
                    titulo VARCHAR(50) NOT NULL,
                    mensaje VARCHAR(500) NOT NULL,
                    foto VARCHAR(1000),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    aprobado BOOLEAN NOT NULL DEFAULT FALSE,
                    INDEX idx_aprobado (aprobado)
                )`;
                await pool.query(createQuery);
                console.log("Tabla 'mensajesComunidad' creada ✅");
            }

            // Insertar datos en la tabla
            const uuid = uuidv4();
            const createdAt = new Date();

            const createdAtArg = new Intl.DateTimeFormat('es-AR', {
                dateStyle: 'short',
                timeStyle: 'short',
                timeZone: 'America/Argentina/Buenos_Aires'
            }).format(createdAt);

            const insertQuery = `
                INSERT INTO mensajesComunidad (id, nombre, relacion, titulo, mensaje, foto)
                VALUES(?, ?, ?, ?, ?, ?)
            `;
            
            const values = [uuid, data.nombre, data.relacion, data.titulo, data.mensaje, data.foto];
            const [result] = await pool.query(insertQuery, values);
            
            return {
                id: uuid,
                ...data,
                fechayhora: createdAtArg
            };

        } catch (error) {
            throw new Error('Error al guardar mensaje en base de datos: ' + error.message);
        }
    }

    static async getAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM mensajesComunidad');
            return rows;
        } catch (error) {
            throw new Error('Error al obtener mensajes de la comunidad: ' + error.message);
        }
    }

    static async getPaginaAprobados(page, limit) {
        const offset = (page - 1)*limit
        try {
            const [rows] = await pool.query('SELECT * FROM mensajesComunidad WHERE aprobado=TRUE ORDER BY id DESC LIMIT ? OFFSET ?', [limit, offset]);

            const [totalResult] = await pool.query(
                'SELECT COUNT(*) as total FROM mensajesComunidad WHERE aprobado=TRUE'
            );

            const total = totalResult[0].total;
            const totalPages = Math.ceil(total / limit);

            return {
                rows,
                paginacion: {
                    currentPage: page,
                    totalPages,
                    totalItems: total,
                    itemsPerPage: limit
                }
            };

        } catch (error) {
            throw new Error('Error al obtener mensajes de la comunidad: ' + error.message);
        }
    };

    static async getPendientes() {
        try {
            const [rows] = await pool.query('SELECT * FROM mensajesComunidad WHERE aprobado=FALSE');
            return rows;
        } catch (error) {
            throw new Error('Error al obtener mensajes de la comunidad: ' + error.message);
        }
    }
}

export default MensajesComunidad;