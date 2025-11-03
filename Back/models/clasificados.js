import pool from '../database/mysql.js';
import { v4 as uuidv4 } from 'uuid';

class Clasificados {
    static async nuevoAviso(data) {
        try {

            // Verificar si existe la tabla
            const [rows] = await pool.query("SHOW TABLES LIKE 'clasificados'");

            // Si no existe, crearla
            if (rows.length === 0) {
                const createQuery = `
                CREATE TABLE clasificados (
                    id CHAR(36) NOT NULL PRIMARY KEY,
                    titulo VARCHAR(50) NOT NULL,
                    descripcion VARCHAR(240) NOT NULL,
                    contacto VARCHAR(50) NOT NULL,
                    foto VARCHAR(1000) NOT NULL,
                    created_by CHAR(36) DEFAULT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    modified_by CHAR(36) DEFAULT NULL,
                    modified_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                    cloudinary_public_id VARCHAR(255),
                    CONSTRAINT fk_clasificados_created_by
                    FOREIGN KEY (created_by) REFERENCES usuarios(id) ON DELETE SET NULL,
                    CONSTRAINT fk_clasificados_modified_by
                    FOREIGN KEY (modified_by) REFERENCES usuarios(id) ON DELETE SET NULL

                )`;
                await pool.query(createQuery);
                console.log("Tabla 'clasificados' creada ✅");
            }

            // Insertar datos en la tabla
            const uuid = uuidv4();

            const insertQuery = `
                INSERT INTO clasificados (id, titulo, descripcion, contacto, foto, created_by, cloudinary_public_id)
                VALUES(?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [uuid, data.titulo, data.descripcion, data.contacto, data.foto, data.usuario, data.publicId];
            await pool.query(insertQuery, values);

            return {
                success: true,
                message: `Aviso ingresado con éxito. Id=${uuid}`
            };

        } catch (error) {
            throw new Error('Error al guardar aviso clasificado: ' + error.message);
        }
    }

    static async actualizarAviso(data) {

        const { id, titulo, descripcion, contacto, foto, usuario, publicId } = data;

        if (!id && (!titulo || !contacto || !descripcion || !foto)) throw new Error('Se debe indicar el id del aviso a modificar y enviar al menos una modificación');

        if (!usuario) throw new Error('Se debe indicar el id del usuario que introduce la modificación');

        try {
            // Chequear que exista el aviso
            let queryExiste = `SELECT EXISTS(SELECT 1 FROM clasificados WHERE id = ?) as existe`;
            const [aviso] = await pool.query(queryExiste, [id]);
            const existe = aviso[0].existe === 1;

            if (!existe) throw new Error('El aviso indicado no está registrado en la base de datos');

            // modificar el registro
            const campos = { titulo, descripcion, contacto, foto, modified_by: usuario, cloudinary_public_id: publicId };

            const entries = Object.entries(campos).filter(([_, value]) => value !== undefined);
            const updates = entries.map(([key]) => `${key} = ?`).join(', ');
            const values = [...entries.map(([_, value]) => value), id];

            const query = `UPDATE clasificados SET ${updates} WHERE id = ?`;

            const [result] = await pool.query(query, values);

            return {
                success: true,
                message: `Agregadas modificaciones al aviso clasificado con ID ${id}`,
                affectedRows: result.affectedRows
            };

        } catch (error) {
            throw new Error('Error al modificar datos del aviso clasificado: ' + error.message);
        }
    }

    static async getAll(page, limit) {

        page = parseInt(page);
        limit = parseInt(limit);

        const MAX_LIMIT = 100;

        if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
            throw new Error('Se requieren parámetros válidos de paginación (page y limit)');
        };

        if (limit > MAX_LIMIT) limit = MAX_LIMIT;

        try {
            const queryTotal = 'SELECT COUNT(*) as total FROM clasificados';

            const [totalResult] = await pool.query(queryTotal);
            const total = totalResult[0].total;
            const totalPages = Math.ceil(total / limit);

            const offset = (page - 1) * limit;

            const values = [limit, offset];

            const [rows] = await pool.query('SELECT id, titulo, descripcion, contacto, foto, created_at FROM clasificados ORDER BY created_at DESC LIMIT ? OFFSET ?', values);

            return {
                success: true,
                rows,
                paginacion: {
                    currentPage: page,
                    totalPages: totalPages || 0,
                    totalItems: total,
                    itemsPerPage: limit,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            };
        } catch (error) {
            throw new Error('Error al obtener avisos: ' + error.message);
        }
    };
};

export default Clasificados;