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
                    descripcion VARCHAR(100) NOT NULL,
                    foto VARCHAR(1000) NOT NULL,
                    created_by CHAR(36) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`;
                await pool.query(createQuery);
                console.log("Tabla 'vehiculos' creada ✅");
            }

            // Insertar datos en la tabla
            const uuid = uuidv4();

            const insertQuery = `
                INSERT INTO vehiculos (id, marca, modelo, anio, descripcion, foto, created_by)
                VALUES(?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [uuid, data.marca, data.modelo, data.anio, data.descripcion, data.foto, data.usuario];
            await pool.query(insertQuery, values);

            return {
                success: true,
                message: `Vehículo creado por usuario ${data.usuario}: ${data.marca} ${data.modelo} ${data.anio} ${data.descripcion}, id=${uuid}`
            };

        } catch (error) {
            throw new Error('Error al guardar vehículo: ' + error.message);
        }
    }

    static async getAll() {
        try {
            const [rows] = await pool.query('SELECT id, marca, modelo, anio, descripcion, foto FROM vehiculos ORDER BY created_at DESC');
            return rows;
        } catch (error) {
            throw new Error('Error al obtener vehículos: ' + error.message);
        }
    };

    static async getConFiltro(marca, modelo, desde, hasta) {
        if (!marca && !modelo && !desde && !hasta) throw new Error('No se ingresaron parámetros de búsqueda');
        
        let query = 'SELECT marca, modelo, anio, descripcion, foto FROM vehiculos WHERE ';

        const params = [];
        const queryAdd = []

        if (marca) {
            params.push(marca);
            queryAdd.push('marca = ?')
        };

        if (modelo) {
            params.push(modelo);
            queryAdd.push('modelo = ?')
        };

        if (desde) {
            params.push(desde);
            queryAdd.push('anio >= ?')
        };

        if (hasta) {
            params.push(hasta);
            queryAdd.push('anio <= ?')
        };

        query = query + queryAdd.join(' AND ');

        try {
            const [rows] = await pool.query(query, params);
            return {
                success: true,
                rows: rows
            }
        } catch (error) {
            throw new Error('Error al obtener vehículos: ' + error.message);
        }
    }
};

export default Vehiculos;