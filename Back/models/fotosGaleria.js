import pool from '../database/mysql.js';
import { v4 as uuidv4 } from 'uuid';

class FotosGaleria {
    static async crearEventoGaleria(data) {

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
                    created_by VARCHAR(50) NOT NULL,
                    modified_by VARCHAR(50)
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

            if (data.fotos && data.fotos.length > 0) {

                const insertQueryFotos = `
                    INSERT INTO fotosGaleria (id, id_evento, url, orden)
                    VALUES ?
                `;

                const valuesFotos = data.fotos.map((url, index) => [
                    uuidv4(),
                    eventoId,
                    url,
                    index + 1
                ]);

                await connection.query(insertQueryFotos, [valuesFotos]);
            }
            
            await connection.commit();

            return {
                eventoId,
                message: `Evento creado con ${data.fotos.length} fotos`,
            };

        } catch (error) {
            await connection.rollback();
            throw new Error('Error al guardar información en base de datos: ' + error.message);
        } finally {
            connection.release();
        }
    }
};

export default FotosGaleria;