import pool from '../database/mysql.js';
import { v4 as uuidv4 } from 'uuid';

class Vehiculos {
    static async ingresarVehiculo(data) {
        try {

            // Verificar si existe la tabla
            const [rows] = await pool.query("SHOW TABLES LIKE 'vehiculos'");

            // Si no existe, crearla
            if (rows.length === 0) {
                const createQuery = `
                CREATE TABLE vehiculos (
                    id CHAR(36) NOT NULL PRIMARY KEY,
                    marca VARCHAR(50) NOT NULL,
                    modelo VARCHAR(50) NOT NULL,
                    anio YEAR NOT NULL,
                    descripcion VARCHAR(140) NOT NULL,
                    foto VARCHAR(1000) NOT NULL,
                    created_by CHAR(36) DEFAULT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    modified_by CHAR(36) DEFAULT NULL,
                    modified_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                    cloudinary_public_id VARCHAR(255),
                    CONSTRAINT fk_vehiculos_created_by
                    FOREIGN KEY (created_by) REFERENCES usuarios(id) ON DELETE SET NULL,
                    CONSTRAINT fk_vehiculos_modified_by
                    FOREIGN KEY (modified_by) REFERENCES usuarios(id) ON DELETE SET NULL

                )`;
                await pool.query(createQuery);
                console.log("Tabla 'vehiculos' creada ✅");
            }

            // Insertar datos en la tabla
            const uuid = uuidv4();

            const insertQuery = `
                INSERT INTO vehiculos (id, marca, modelo, anio, descripcion, foto, created_by, cloudinary_public_id)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [uuid, data.marca, data.modelo, data.anio, data.descripcion, data.foto, data.usuario, data.publicId];
            await pool.query(insertQuery, values);

            return {
                success: true,
                message: `Vehículo creado por usuario ${data.usuario}: ${data.marca} ${data.modelo} ${data.anio} ${data.descripcion}, id=${uuid}`
            };

        } catch (error) {
            throw new Error('Error al guardar vehículo: ' + error.message);
        }
    }

    static async actualizarVehiculo(data) {
        
        const { id, marca, modelo, anio, descripcion, foto, usuario, publicId } = data;

        if (!id && (!marca || !modelo || !anio || !descripcion || !foto)) throw new Error('Se debe indicar el id del vehículo a modificar y enviar al menos una modificación');

        if (!usuario) throw new Error('Se debe indicar el id del usuario que introduce la modificación');

        try {
            // Chequear que exista el vehículo
            let queryExiste = `SELECT EXISTS(SELECT 1 FROM vehiculos WHERE id = ?) as existe`;
            const [vehiculo] = await pool.query(queryExiste, [id]);
            const existe = vehiculo[0].existe === 1;

            if (!existe) throw new Error('El vehículo indicado no está registrado en la base de datos');

            // modificar el registro
            const campos = { marca, modelo, anio, descripcion, foto, modified_by: usuario, cloudinary_public_id: publicId };

            const entries = Object.entries(campos).filter(([_, value]) => value !== undefined);
            const updates = entries.map(([key]) => `${key} = ?`).join(', ');
            const values = [...entries.map(([_, value]) => value), id];

            const query = `UPDATE vehiculos SET ${updates} WHERE id = ?`;

            const [result] = await pool.query(query, values);

            return {
                success: true,
                message: `Agregadas modificaciones al vehículo con ID ${id}`,
                affectedRows: result.affectedRows
            };

        } catch (error) {
            throw new Error('Error al modificar datos del vehículo: ' + error.message);
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
            const queryTotal = 'SELECT COUNT(*) as total FROM vehiculos';

            const [totalResult] = await pool.query(queryTotal);
            const total = totalResult[0].total;
            const totalPages = Math.ceil(total / limit);

            const offset = (page - 1) * limit;

            const values = [limit, offset]

            const [rows] = await pool.query('SELECT id, marca, modelo, anio, descripcion, foto FROM vehiculos ORDER BY created_at DESC LIMIT ? OFFSET ?', values);

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
            }
        } catch (error) {
            throw new Error('Error al obtener vehículos: ' + error.message);
        }
    };

    static async getConFiltro(marca, modelo, desde, hasta, page, limit) {

        if (!marca?.trim() && !modelo?.trim() && !desde && !hasta) throw new Error('No se ingresaron parámetros de búsqueda');

        if (desde && hasta && parseInt(desde) > parseInt(hasta)) {
            throw new Error('El año "desde" no puede ser mayor que "hasta"');
        }

        page = parseInt(page);
        limit = parseInt(limit);

        const MAX_LIMIT = 100;

        if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
            throw new Error('Se requieren parámetros válidos de paginación (page y limit)');
        };

        if (limit > MAX_LIMIT) limit = MAX_LIMIT;
        
        let query = 'SELECT id, marca, modelo, anio, descripcion, foto FROM vehiculos WHERE ';

        const params = [];
        const queryAdd = [];

        const escapeLike = (str) => str.replace(/[%_]/g, '\\$&');

        if (marca) {
            params.push(`%${escapeLike(marca)}%`);
            queryAdd.push('marca LIKE ?')
        };

        if (modelo) {
            params.push(`%${escapeLike(modelo)}%`);
            queryAdd.push('modelo LIKE ?')
        };

        if (desde) {
            params.push(desde);
            queryAdd.push('anio >= ?')
        };

        if (hasta) {
            params.push(hasta);
            queryAdd.push('anio <= ?')
        };

        query = query + queryAdd.join(' AND ') + ' ORDER BY created_at DESC LIMIT ? OFFSET ?';

        try {
            const queryTotal = 'SELECT COUNT(*) as total FROM vehiculos WHERE ' + queryAdd.join(' AND ');

            const [totalResult] = await pool.query(queryTotal, [...params]);
            const total = totalResult[0].total;
            const totalPages = Math.ceil(total / limit);

            const offset = (page - 1) * limit;

            params.push(limit, offset);

            const [rows] = await pool.query(query, params);

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
            }
        } catch (error) {
            throw new Error('Error al obtener vehículos: ' + error.message);
        }
    }

    static async getSuggestionMarcas(input, limit=10) {
        if (!input?.trim()) {
            return {
                success: true,
                rows:[]
            }
        }

        const MAX_LIMIT = 20;
        if (limit > MAX_LIMIT) limit = MAX_LIMIT;

        const escapeLike = (str) => str.replace(/[%_]/g, '\\$&');
        const searchTerm = `${escapeLike(input.trim())}%`;

        try {
            const query = `
                SELECT marca, COUNT(*) as cantidad
                FROM vehiculos
                WHERE marca LIKE ?
                GROUP BY marca
                ORDER BY cantidad DESC, marca ASC
                LIMIT ?
            `;

            const [rows] = await pool.query(query, [searchTerm, limit]);

            return {
                success: true,
                rows: rows.map(row => row.marca)
            };
        } catch (error) {
            throw new Error('Error al obtener sugerencias: ' + error.message)
        };
    }
};

export default Vehiculos;