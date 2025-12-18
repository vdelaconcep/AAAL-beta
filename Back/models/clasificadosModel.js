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
                    approved BOOLEAN NOT NULL DEFAULT FALSE,
                    approved_by CHAR(36) DEFAULT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    modified_by CHAR(36) DEFAULT NULL,
                    modified_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                    cloudinary_public_id VARCHAR(255),
                    CONSTRAINT fk_clasificados_approved_by
                    FOREIGN KEY (approved_by) REFERENCES usuarios(id) ON DELETE SET NULL,
                    CONSTRAINT fk_clasificados_modified_by
                    FOREIGN KEY (modified_by) REFERENCES usuarios(id) ON DELETE SET NULL

                )`;
                await pool.query(createQuery);
                console.log("Tabla 'clasificados' creada ✅");
            }

            // Insertar datos en la tabla
            const uuid = uuidv4();

            const insertQuery = `
                INSERT INTO clasificados (id, titulo, descripcion, contacto, foto, cloudinary_public_id)
                VALUES(?, ?, ?, ?, ?, ?)
            `;

            const values = [uuid, data.titulo, data.descripcion, data.contacto, data.foto, data.publicId];
            await pool.query(insertQuery, values);

            return {
                success: true,
                message: `Aviso ingresado con éxito. Id=${uuid}`
            };

        } catch (error) {
            throw new Error('Error al guardar aviso clasificado: ' + error.message);
        }
    }

    // Chequear que existan aviso (y si está aprobado) y usuario
    static async checkAvisoYUsuario(id_aviso, id_usuario) {
        try {
            const queryExisteAviso = `SELECT approved FROM clasificados WHERE id = ?`;
            const [aviso] = await pool.query(queryExisteAviso, [id_aviso]);
            const existeAviso = aviso.length !== 0;

            if (!existeAviso) throw new Error('No se encontró un aviso clasificado con el id ingresado');
            
            const avisoAprobado = aviso[0].approved === 1;

            let existeUsuario = false;

            if (id_usuario) {

                const queryExisteUsuario = `SELECT EXISTS(SELECT 1 FROM usuarios WHERE id = ?) as existe`;
                const [usuario] = await pool.query(queryExisteUsuario, [id_usuario]);
                const existeUsuario = usuario[0].existe === 1;

                if (!existeUsuario) throw new Error('No se encontró un usuario con el id ingresado');

            }

            return {
                existeAviso,
                avisoAprobado,
                existeUsuario
            };

        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async actualizarAviso(data) {

        const { id, titulo, descripcion, contacto, foto, usuario, publicId } = data;

        if (!id && (!titulo || !contacto || !descripcion || !foto)) throw new Error('Se debe indicar el id del aviso a modificar y enviar al menos una modificación');

        if (!usuario) throw new Error('Se debe indicar el id del usuario que introduce la modificación');

        try {
            await this.checkAvisoYUsuario(id, usuario);

            // modificar el registro
            const campos = { titulo, descripcion, contacto, foto, modified_by: usuario, cloudinary_public_id: publicId };

            const entries = Object.entries(campos).filter(([_, value]) => value !== undefined);
            const updates = entries.map(([key]) => `${key} = ?`).join(', ');
            const values = [...entries.map(([_, value]) => value), id];

            const query = `UPDATE clasificados SET ${updates} WHERE id = ?`;

            const [result] = await pool.query(query, values);

            return {
                success: true,
                message: `Agregadas modificaciones al aviso clasificado con Id=${id}`,
                affectedRows: result.affectedRows
            };

        } catch (error) {
            throw new Error('Error al modificar aviso: ' + error.message);
        }
    }

    static async autorizarAviso(id, usuario) {

        try {
            const check = await this.checkAvisoYUsuario(id, usuario);

            if (check.avisoAprobado) throw new Error('El aviso con el id indicado ya se encuentra autorizado');

            const queryAuth = 'UPDATE clasificados SET approved = 1, approved_by = ? WHERE id = ?'

            const [result] = await pool.query(queryAuth, [usuario, id]);

            return {
                success: true,
                message: 'Aviso autorizado',
                affectedRows: result.affectedRows
            }
        } catch (error) {
            throw new Error('Error al autorizar aviso: ' + error.message);
        }
        
    }

    static async getPublicId(id) {
        try {
            const query = 'SELECT cloudinary_public_id FROM clasificados WHERE id = ?';
            const [publicId] = await pool.query(query, [id]);

            if (publicId.length === 0) throw new Error('No se encontró un aviso clasificado con el id ingresado');

            return publicId[0].cloudinary_public_id

        } catch (error) {
            throw new Error('Error al obtener Cloudinary Public ID: ' + error.message);
        }
    }

    static async borrarAviso(id) {

        try {
            const aviso = await this.checkAvisoYUsuario(id, null);

            if (!aviso.existeAviso) throw new Error('No se encontró un aviso clasificado con el id ingresado');

            const query = 'DELETE FROM clasificados WHERE id = ?'

            const [result] = await pool.query(query, [id]);

            return {
                success: true,
                message: 'Aviso eliminado',
                affectedRows: result.affectedRows
            }
        } catch (error) {
            throw new Error('Error al eliminar aviso: ' + error.message);
        }
        
    }

    static async get(filter, page, limit) {

        const VALID_FILTERS = ['todos', 'aprobados', 'nuevos'];
        if (!VALID_FILTERS.includes(filter)) {
            throw new Error(`Filtro inválido. Usar: ${VALID_FILTERS.join(', ')}`);
        }

        const MAX_LIMIT = 100;
        page = parseInt(page);
        limit = Math.min(parseInt(limit), MAX_LIMIT);

        if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
            throw new Error('Se requieren parámetros válidos de paginación (page y limit)');
        };

        if (limit > MAX_LIMIT) limit = MAX_LIMIT;

        try {
            const whereClause = filter === 'aprobados' ? ' WHERE approved = 1'
                : filter === 'nuevos' ? ' WHERE approved = 0'
                    : '';
            
            let queryTotal = `SELECT COUNT(*) as total FROM clasificados${whereClause}`;
            let query = `SELECT id, titulo, descripcion, contacto, foto, created_at
            FROM clasificados${whereClause}
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
            `;

            const [totalResult] = await pool.query(queryTotal);
            const total = totalResult[0].total;
            const totalPages = Math.ceil(total / limit);

            const offset = (page - 1) * limit;

            const [rows] = await pool.query(query, [limit, offset]);

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