import pool from '../database/mysql.js';
import { v4 as uuidv4 } from 'uuid';

class FotosGaleria {
    static async crearEventoGaleria(data) {
        // Máxima cantidad de fotos que se pueden enviar al mismo tiempo
        const MAX_FOTOS = 20;

        // Comprobaciones
        if (!data.fotos || data.fotos.length === 0) {
            throw new Error('Error: no se enviaron fotos');
        }

        if (data.fotos.length > MAX_FOTOS) {
            throw new Error(`No se pueden agregar más de ${MAX_FOTOS} fotos a la vez`);
        }

        const urlsInvalidas = data.fotos.filter(url => !url || typeof url !== 'string' || url.trim() === '');
        if (urlsInvalidas.length > 0) {
            throw new Error('Se encontraron URLs inválidas o vacías');
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
                    created_by CHAR(36) NOT NULL
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
                INSERT INTO eventosGaleria (id, nombre, fecha, descripcion, created_by)
                VALUES(?, ?, ?, ?, ?)
            `;
            
            const valuesEvento = [eventoId, data.nombre, data.fecha, data.descripcion, data.usuario];
            await connection.query(insertQueryEvento, valuesEvento);

            const insertQueryFotos = `
                INSERT INTO fotosGaleria (id, id_evento, url, orden, created_by)
                VALUES ?
            `;

            const valuesFotos = data.fotos.map((url, index) => [
                uuidv4(),
                eventoId,
                url,
                index + 1,
                data.usuario
            ]);

            await connection.query(insertQueryFotos, [valuesFotos]);
            
            await connection.commit();

            return {
                success: true,
                message: `Evento creado con ${data.fotos.length} fotos (id del evento: ${eventoId})`,
            };

        } catch (error) {
            await connection.rollback();
            throw new Error('Error al guardar información en base de datos: ' + error.message);
        } finally {
            connection.release();
        }
    }

    static async existeEvento(eventoId) {
        if (!eventoId) {
            throw new Error('No se ingresó el ID del evento');
        }

        try {
            const [rows] = await pool.query(
                'SELECT EXISTS(SELECT 1 FROM eventosGaleria WHERE id = ?) as existe',
                [eventoId]
            );
            return rows[0].existe === 1;
        } catch (error) {
            throw new Error('Error al verificar existencia del evento: ' + error.message);
        }
    }

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

        const urlsInvalidas = fotos.filter(url => !url || typeof url !== 'string' || url.trim() === '');
        if (urlsInvalidas.length > 0) {
            throw new Error('Se encontraron URLs inválidas o vacías');
        }

        const existe = await this.existeEvento(eventoId);
        if (!existe) {
            throw new Error(`El evento con ID ${eventoId} no existe`);
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
                INSERT INTO fotosGaleria (id, id_evento, url, orden, created_by)
                VALUES ?
            `;

            const valuesFotos = fotos.map((url, index) => [
                uuidv4(),
                eventoId,
                url,
                index + 1,
                usuario
            ]);

            await connection.query(insertQueryFotos, [valuesFotos]);
            
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

    static async existeFoto(fotoId) {
        if (!fotoId) {
            throw new Error('No se ingresó el ID de la foto');
        }

        try {
            const [rows] = await pool.query(
                'SELECT EXISTS(SELECT 1 FROM fotosGaleria WHERE id = ?) as existe',
                [fotoId]
            );
            return rows[0].existe === 1;
        } catch (error) {
            throw new Error('Error al verificar existencia de la foto: ' + error.message);
        }
    }

    static async agregarDescripcionAFoto(fotoId, descripcion) {
        // Comprobaciones
        if (!fotoId) {
            throw new Error('Debe ingresar el id de la foto para añadir descripción');
        }

        const existe = await this.existeFoto(fotoId);
        if (!existe) {
            throw new Error(`La foto con ID ${fotoId} no existe`);
        }

        if (!descripcion) {
            throw new Error('Error: no se envió la descripción');
        }

        try {
            const query = 'UPDATE fotosGaleria SET descripcion = ? WHERE id = ?';

            await pool.query(query, [descripcion, fotoId]);

            return {
                success: true,
                message: `Descripción añadida a la foto con id ${fotoId}: ${descripcion}`
            }

        } catch (error) {
            throw new Error('Error al añadir la descripción: ' + error.message);
        };
    }

    static async getFotos() {
        try {
            const [rows] = await pool.query('SELECT * FROM fotosGaleria');
            return rows;
        } catch (error) {
            throw new Error('Error al obtener fotos desde la base de datos: '+ error.message)
        }
    }

    static async getFotosDeEvento(eventoId) {

        // Comprobaciones
        if (!eventoId) {
            throw new Error('Se debe indicar el id del evento');
        }
        const existe = await this.existeEvento(eventoId);
        if (!existe) {
            throw new Error(`El evento con ID ${eventoId} no existe`);
        }

        try {
            const [rows] = await pool.query(
                'SELECT * FROM fotosGaleria WHERE id_evento=?',
                [eventoId]
            );
            return rows;
        } catch (error) {
            throw new Error('Error al obtener fotos del evento desde la base de datos: '+ error.message)
        }
    }

    static async getFotosPorFecha(desde, hasta) {

        // Comprobaciones
        const fechaDesde = new Date(desde);
        const fechaHasta = new Date(hasta);

        if (isNaN(fechaDesde.getTime())) {
            throw new Error('La fecha de inicio no es válida');
        }

        if (isNaN(fechaHasta.getTime())) {
            throw new Error('La fecha de finalización no es válida');
        }

        if (fechaDesde > fechaHasta) {
            throw new Error('La fecha de inicio debe ser anterior a la fecha de finalización');
        }

        try {
            const [rows] = await pool.query(
                'SELECT * FROM fotosGaleria WHERE fecha >= ? AND fecha <= ?'
                [desde, hasta]
            );
            return rows;
        } catch (error) {
            throw new Error('Error al obtener fotos por fecha desde la base de datos: '+ error.message)
        }
    }

    static async deleteEventoGaleria(eventoId) {
        // Comprobaciones
        if (!eventoId) {
            throw new Error('Se debe indicar el id del evento');
        }
        const existe = await this.existeEvento(eventoId);
        if (!existe) {
            throw new Error(`El evento con ID ${eventoId} no existe`);
        }
        try {
            const query = 'DELETE FROM eventosGaleria WHERE id = ?'
            await pool.query(query, [eventoId]);

            return {
                success: true,
                message: `El evento de id ${eventoId} ha sido eliminado de la base de datos`
            }
        } catch (error) {
            throw new Error('Error al eliminar el evento de la base de datos: ' + error.message)
        }
    }

    static async deleteFotosGaleria(eventoId, fotosIds) {

        // Comprobaciones
        if (!eventoId) {
            throw new Error('Se debe indicar el id del evento');
        }
        const existe = await this.existeEvento(eventoId);
        if (!existe) {
            throw new Error(`El evento con ID ${eventoId} no existe`);
        }

        if (!fotosIds || fotosIds.length === 0) {
            throw new Error('No se enviaron fotos para eliminar');
        }

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Eliminar múltiples fotos
            await connection.query(
                'DELETE FROM fotosGaleria WHERE id_evento = ? AND id IN (?)',
                [eventoId, fotosIds]
            );

            await connection.commit();

            return {
                success: true,
                message: `Eliminadas ${fotosIds.length} fotos del evento ${eventoId}`
            };
        } catch (error) {
            await connection.rollback();
            throw new Error('Error al eliminar fotos: ' + error.message);
        } finally {
            connection.release();
        }
    }
};

export default FotosGaleria;