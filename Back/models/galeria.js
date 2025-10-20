import pool from '../database/mysql.js';
import { v4 as uuidv4 } from 'uuid';

class FotosGaleria {
    static async crearEventoGaleria(data) {
        // Máxima cantidad de fotos que se pueden enviar al mismo tiempo
        const MAX_FOTOS = 20;
        const arrayFotos = data.fotos;

        // Comprobaciones
        if (!arrayFotos || arrayFotos.length === 0) {
            throw new Error('Error: no se enviaron fotos');
        }

        if (arrayFotos.length > MAX_FOTOS) {
            throw new Error(`No se pueden agregar más de ${MAX_FOTOS} fotos a la vez`);
        }

        // Abrir conexión
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Verificar si existe tabla de eventos
            const [rowsEventos] = await connection.query("SHOW TABLES LIKE 'eventosGaleria'");

            // Si no existe, crearla
            if (rowsEventos.length === 0) {
                const createQuery = `
                CREATE TABLE eventosGaleria (
                    id CHAR(36) NOT NULL PRIMARY KEY,
                    nombre VARCHAR(60) NOT NULL,
                    fecha DATE NOT NULL,
                    descripcion VARCHAR(140),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    created_by CHAR(36) NOT NULL,
                    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    modified_by CHAR(36) NOT NULL
                )`;
                await connection.query(createQuery);
                console.log("Tabla 'eventosGaleria' creada ✅");
            }

            // Verificar si existe tabla de fotos (relación 1:N)
            const [rowsFotos] = await connection.query("SHOW TABLES LIKE 'fotosGaleria'");

            // Si no existe, crearla
            if (rowsFotos.length === 0) {
                const createQuery = `
                CREATE TABLE fotosGaleria (
                    id CHAR(36) NOT NULL PRIMARY KEY,
                    id_evento CHAR(36) NOT NULL,
                    url VARCHAR(1000) NOT NULL,
                    descripcion VARCHAR(140),
                    orden INT DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    created_by CHAR(36) NOT NULL,
                    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    modified_by CHAR(36) NOT NULL,
                    cloudinary_public_id VARCHAR(255) NOT NULL,
                    FOREIGN KEY (id_evento) REFERENCES eventosGaleria(id) ON DELETE CASCADE,
                    INDEX idx_evento (id_evento),
                    INDEX idx_orden (id_evento, orden)
                )`;
                await connection.query(createQuery);
                console.log("Tabla 'fotosGaleria' creada ✅");
            }

            // Insertar datos en las tablas
            const eventoId = uuidv4();

            const insertQueryEvento = `
                INSERT INTO eventosGaleria (id, nombre, fecha, descripcion, created_by, modified_by)
                VALUES(?, ?, ?, ?, ?, ?)
            `;
            
            const valuesEvento = [eventoId, data.nombre, data.fecha, data.descripcion, data.usuario, data.usuario];
            await connection.query(insertQueryEvento, valuesEvento);

            const insertQueryFotos = `
                INSERT INTO fotosGaleria (id, id_evento, url, orden, created_by, modified_by, cloudinary_public_id)
                VALUES ?
            `;

            const valuesFotos = arrayFotos.map((foto, index) => [
                uuidv4(),
                eventoId,
                foto.url,
                index + 1,
                data.usuario,
                data.usuario,
                foto.publicId
            ]);

            await connection.query(insertQueryFotos, [valuesFotos]);
            
            await connection.commit();

            return {
                success: true,
                message: `Evento creado con ${arrayFotos.length} fotos (id del evento: ${eventoId})`,
            };

        } catch (error) {
            await connection.rollback();
            throw new Error('Error al guardar información en base de datos: ' + error.message);
        } finally {
            connection.release();
        }
    }

    // Para comprobar si existe una foto o evento en particular
    static async existe(tipo, id) {
        const tipos = {
            'foto': 'fotosGaleria',
            'evento': 'eventosGaleria'
        };

        if (!tipos[tipo] || !id) {
            return false;
        }

        let query = `SELECT EXISTS(SELECT 1 FROM ${tipos[tipo]} WHERE id = ?) as existe`;

        try {
            const [rows] = await pool.query(query, [id]);
            return rows[0].existe === 1;
        } catch (error) {
            return false;
        }
    }

    static async setEvento(eventoId, nombre = null, fecha = null, descripcion = null, usuario) {
        // Comprobaciones
        if (!nombre && !fecha && !descripcion) {
            throw new Error('No se han introducido modificaciones al evento');
        }

        if (!eventoId) {
            throw new Error('Debe ingresar el id del evento a modificar');
        }

        const existeEvento = await this.existe('evento', eventoId);
        if (!existeEvento) {
            throw new Error(`No se encontró el evento con ID ${eventoId}`);
        }

        if (!usuario) {
            throw new Error('Se debe indicar el usuario que modifica el evento');
        }

        const updates = [];
        const values = [];

        if (nombre) {
            updates.push('nombre = ?');
            values.push(nombre)
        };

        if (fecha) {
            updates.push('fecha = ?');
            values.push(fecha)
        };

        if (descripcion) {
            updates.push('descripcion = ?');
            values.push(descripcion)
        }

        updates.push('modified_by = ?');
        values.push(usuario);
        values.push(eventoId);

        const query = `UPDATE eventosGaleria SET ${updates.join(', ')} WHERE id = ?`

        try {
            const [result] = await pool.query(query, values);

            return {
                success: true,
                message: `Agregadas modificaciones al evento con ID ${eventoId}`,
                affectedRows: result.affectedRows
            };
        } catch (error) {
            throw new Error(`Error al modificar evento: ${error.message}`)
        }
    };

    static async agregarFotosAEvento(eventoId, usuario, fotos) {
        // Máxima cantidad de fotos que se pueden enviar al mismo tiempo
        const MAX_FOTOS = 20;

        // Comprobaciones
        if (!eventoId) {
            throw new Error('Debe ingresar el id del evento para añadir fotos');
        }

        if (!fotos || fotos.length === 0) {
            throw new Error('Error: no se enviaron fotos');
        }

        if (fotos.length > MAX_FOTOS) {
            throw new Error(`No se pueden agregar más de ${MAX_FOTOS} fotos a la vez`);
        }

        const existeEvento = await this.existe('evento', eventoId);
        if (!existeEvento) {
            throw new Error(`No se encontró el evento con ID ${eventoId}`);
        }

        if (!usuario) {
            throw new Error('Se debe indicar el usuario que ingresa las fotos nuevas')
        }

        // Abrir conexión
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Agregar fotos en tabla
            const insertQueryFotos = `
                INSERT INTO fotosGaleria (id, id_evento, url, orden, created_by, modified_by, cloudinary_public_id)
                VALUES ?
            `;

            // Último número de orden de foto para ese evento
            const [maxOrdenAnterior] = await connection.query(
                'SELECT COALESCE(MAX(orden), 0) as maxOrden FROM fotosGaleria WHERE id_evento = ?',
                [eventoId]);
            
            const ordenInicial = maxOrdenAnterior[0].maxOrden

            const valuesFotos = fotos.map((foto, index) => [
                uuidv4(),
                eventoId,
                foto.url,
                ordenInicial + index + 1,
                usuario,
                usuario,
                foto.publicId
            ]);

            await connection.query(insertQueryFotos, [valuesFotos]);

            await connection.query(
                'UPDATE eventosGaleria SET modified_by = ? WHERE id = ?',
                [usuario, eventoId]
            );
            
            await connection.commit();

            return {
                success: true,
                message: `Agregadas ${fotos.length} fotos al evento con ID ${eventoId}`,
            };

        } catch (error) {
            await connection.rollback();
            throw new Error('Error al guardar fotos en base de datos: ' + error.message);
        } finally {
            connection.release();
        }
    }

    static async setDescripcionFoto(fotoId, usuario, descripcion) {
        // Comprobaciones
        if (!fotoId) {
            throw new Error('Debe ingresar el id de la foto para añadir descripción');
        }

        const existeFoto = await this.existe('foto', fotoId);
        if (!existeFoto) {
            throw new Error(`La foto con ID ${fotoId} no fue encontrada`);
        }

        if (!descripcion) {
            throw new Error('Error: no se envió la descripción');
        }

        if (!usuario) {
            throw new Error('Error: se debe indicar el usuario que agrega o modifica la descripción');
        }

        try {
            const query = 'UPDATE fotosGaleria SET descripcion = ?, modified_by = ? WHERE id = ?';

            await pool.query(query, [descripcion, usuario, fotoId]);

            return {
                success: true,
                message: `Descripción añadida por el usuario ${usuario} a la foto con id ${fotoId}: ${descripcion}`
            }

        } catch (error) {
            throw new Error('Error al guardar la descripción: ' + error.message);
        };
    }

    static fechasValidas(desde, hasta) {
        if (!desde || !hasta) throw new Error('Debe ingresar fechas inicial y final del rango de fechas');

        const fechaDesde = new Date(desde);
        const fechaHasta = new Date(hasta);

        if (isNaN(fechaDesde.getTime())) {
            throw new Error('La fecha de inicio no es válida');
        }

        if (isNaN(fechaHasta.getTime())) {
            throw new Error('La fecha de finalización no es válida');
        }

        if (fechaDesde > fechaHasta) {
            throw new Error('La fecha de inicio debe ser anterior a la fecha de finalización del rango');
        }

        return true;
    }

    static async getFotos(fotoId = null, fechaDesde = null, fechaHasta = null, page, limit) {

        if (!fotoId && (!page || !limit || page < 1 || limit < 1)) {
            throw new Error('Se requieren parámetros válidos de paginación (page y limit)');
        }

        if ((fechaDesde && !fechaHasta) || (!fechaDesde && fechaHasta)) {
            throw new Error('Debe ingresar ambas fechas (desde y hasta) para filtrar por rango');
        }

        try {
            let query = `
            SELECT 
                f.id,
                f.url,
                f.descripcion,
                f.orden,
                f.created_by,
                f.created_at,
                f.modified_at,
                f.modified_by,
                f.id_evento,
                e.nombre as evento,
                e.fecha as fecha
            FROM fotosGaleria f
            INNER JOIN eventosGaleria e ON f.id_evento = e.id
        `;

            let params = [];
            let conditions = [];

            if (fotoId) {
                conditions.push('f.id = ?');
                params.push(fotoId);
            }

            if (fechaDesde && fechaHasta) {
                this.fechasValidas(fechaDesde, fechaHasta);

                conditions.push('e.fecha >= ?');
                conditions.push('e.fecha <= ?');
                params.push(fechaDesde, fechaHasta);

            }

            if (conditions.length > 0) query += ' WHERE ' + conditions.join(' AND ');

            let total = 0;
            let totalPages = 0;

            if (!fotoId) {
                let queryTotal = 'SELECT COUNT(*) as total FROM fotosGaleria';

                let paramsTotal = [];

                if (conditions.length > 0) {
                    queryTotal += ' WHERE ' + conditions.join(' AND ');

                    if (fechaDesde && fechaHasta) {
                        paramsTotal.push(fechaDesde, fechaHasta);
                    }
                }
                const [totalResult] = await pool.query(queryTotal, paramsTotal);
                total = totalResult[0].total;
                totalPages = Math.ceil(total / limit);

                query += ' ORDER BY e.fecha DESC LIMIT ? OFFSET ?';

                const offset = (page - 1) * limit
                params.push(limit, offset);
            }

            const [rows] = await pool.query(query, params);

            if (fotoId && rows.length === 0) throw new Error('No se encontró una foto con el id ingresado')
            
            if (fechaDesde && fechaHasta && rows.length === 0) throw new Error('No se encontraron fotos para el rango de fechas ingresado')
            
            if (fotoId) {
                return {
                    success: true,
                    rows: rows[0]
                };
            } else {
                return {
                    success: true,
                    rows,
                    paginacion: {
                        currentPage: page,
                        totalPages,
                        totalItems: total,
                        itemsPerPage: limit
                    }
                };
            }

        } catch (error) {
            throw new Error('Error al obtener foto(s): ' + error.message);
        }
    }

    static async getPublicIdFotos(fotosIds) {
        if (!fotosIds || !Array.isArray(fotosIds) || fotosIds.length === 0) {
            throw new Error('Se deben enviar los id de las fotos');
        }

        try {
            const [rows] = await pool.query('SELECT cloudinary_public_id FROM fotosGaleria WHERE id IN (?)',
                [fotosIds]
            );

            return rows
                .map(row => row.cloudinary_public_id)
                .filter(Boolean);

        } catch (error) {
            throw new Error(`Error al obtener cloudinary public id de las fotos: ${error.message}`)
        }
    }

    static async getEvento(eventoId) {

        // Comprobaciones
        if (!eventoId) {
            throw new Error('Se debe indicar el id del evento');
        }
        const existe = await this.existe('evento', eventoId);
        if (!existe) {
            throw new Error(`El evento con ID ${eventoId} no existe`);
        }

        try {
            const [rows] = await pool.query(
                'SELECT id, url, descripcion, orden, created_by, created_at, modified_at, modified_by, cloudinary_public_id FROM fotosGaleria WHERE id_evento=?',
                [eventoId]
            );

            const [evento] = await pool.query(
                'SELECT id, nombre, fecha, descripcion, created_by, created_at, modified_at, modified_by FROM eventosGaleria WHERE id=?',
                [eventoId]
            );

            return {
                success: true,
                data: {
                    ...evento[0],
                    fotos: rows
                }
            }
        } catch (error) {
            throw new Error('Error al obtener información del evento desde la base de datos: '+ error.message)
        }
    }

    static async getEventos(fechaDesde = null, fechaHasta = null) {

        if ((fechaDesde && !fechaHasta) || (!fechaDesde && fechaHasta)) {
            throw new Error('Debe ingresar ambas fechas (desde y hasta) para filtrar por rango');
        }

        try {
            let query =`
            SELECT 
                e.id,
                e.nombre,
                e.fecha,
                e.descripcion,
                e.created_by,
                e.created_at,
                e.modified_by,
                e.modified_at,
                f.url as foto_url,
                COALESCE(foto_count.total_fotos, 0) as total_fotos
            FROM eventosGaleria e
            LEFT JOIN fotosGaleria f ON e.id = f.id_evento
                AND f.orden = (
                    SELECT MIN(orden)
                    FROM fotosGaleria
                    WHERE id_evento = e.id
                )
            LEFT JOIN (
                SELECT id_evento, COUNT(*) as total_fotos
                FROM fotosGaleria
                GROUP BY id_evento
            ) foto_count ON e.id = foto_count.id_evento
        `;
            
            let params = [];
            let conditions = '';

            if (fechaDesde && fechaHasta) {
                if (!this.fechasValidas(fechaDesde, fechaHasta)) throw new Error('Deben ingresarse fechas válidas');

                conditions += 'e.fecha >= ? AND e.fecha <= ?';
                params.push(fechaDesde, fechaHasta);

                if (conditions.length > 0) query += ' WHERE ' + conditions;
            }

            query += ' ORDER BY e.fecha DESC';

            const [rows] = await pool.query(query, params);
            
            return {
                success: true,
                data: rows
            };

        } catch (error) {
            throw new Error('Error al obtener eventos: ' + error.message);
        }
    }

    static async deleteEventoGaleria(eventoId) {
        // Comprobaciones
        if (!eventoId) {
            throw new Error('Se debe indicar el id del evento');
        }
        const existe = await this.existe('evento', eventoId);
        if (!existe) {
            throw new Error(`El evento con ID ${eventoId} no existe`);
        }

        try {

            const queryEvento = 'DELETE FROM eventosGaleria WHERE id = ?'
            await pool.query(queryEvento, [eventoId]);

            return {
                success: true,
                message: 'El evento y las fotos han sido eliminados de la base de datos'
            }
        } catch (error) {
            throw new Error('Error al eliminar el evento de la base de datos: ' + error.message)
        }
    }

    static async deleteFotosGaleria(fotosIds) {

        if (!fotosIds || fotosIds.length === 0) {
            throw new Error('No se enviaron fotos para eliminar');
        }

        try {
            // Eliminar múltiples fotos
            const [result] = await pool.query(
                'DELETE FROM fotosGaleria WHERE id IN (?)',
                [fotosIds]
            );

            if (result.affectedRows === 0) {
                throw new Error('No se encontraron fotos con los IDs proporcionados');
            }

            if (result.affectedRows < fotosIds.length) {
                return {
                    success: true,
                    message: `Eliminadas ${result.affectedRows} de ${fotosIds.length} solicitudes`,
                    warning: 'Algunos IDs no existían en la base de datos',
                    eliminadas: result.affectedRows,
                    solicitadas: fotosIds.length
                };
            }

            return {
                success: true,
                message: `Eliminadas ${fotosIds.length} fotos`
            };
        } catch (error) {
            throw new Error('Error al eliminar fotos: ' + error.message);
        };
    }
};

export default FotosGaleria;