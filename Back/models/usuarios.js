import pool from '../database/mysql.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

class Usuarios {
    static async registrarUsuario(data) {
        try {

            // Verificar si existe la tabla
            const [rows] = await pool.query("SHOW TABLES LIKE 'usuarios'");

            // Si no existe, crearla
            if (rows.length === 0) {
                const createQuery = `
                CREATE TABLE usuarios (
                    id CHAR(36) NOT NULL PRIMARY KEY,
                    nombre VARCHAR(50) NOT NULL,
                    email VARCHAR(50) NOT NULL UNIQUE,
                    password VARCHAR(15) NOT NULL,
                    ultima_sesion TIMESTAMP NULL DEFAULT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`;
                await pool.query(createQuery);
                console.log("Tabla 'usuarios' creada ✅");
            }

            // Insertar datos en la tabla
            const uuid = uuidv4();
            const hash = bcrypt.hashSync(data.password, 10);

            const insertQuery = `
                INSERT INTO usuarios (id, nombre, email, password)
                VALUES(?, ?, ?, ?)
            `;

            const values = [uuid, data.nombre, data.email, hash];
            await pool.query(insertQuery, values);

            return {
                success: true,
                message: 'Usuario registrado'
            };

        } catch (error) {
            throw new Error('Error al registrar usuario: ' + error.message);
        }
    }

    static async login(email, pass) {
        try {
            // Buscar usuario
            const [user] = await pool.query('SELECT id, nombre, email, password FROM usuarios WHERE email = ? LIMIT 1', [email]);

            const usuario = user[0];

            if (!usuario) throw new Error('E-mail o contraseña incorrectos');
            
            // Verificar password
            const passwordOk = await bcrypt.compare(pass, usuario.password);

            if (!passwordOk) throw new Error('E-mail o contraseña incorrectos');

            // Guardar "última sesión"
            await pool.query('UPDATE usuarios SET ultima_sesion = NOW() WHERE id = ?', [usuario.id]);

            // Devolver datos
            return {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email
            }

        } catch (error) {
            throw new Error('Error al ingresar: ' + error.message)
        }
    }

    static async getAll() {
        try {
            const [rows] = await pool.query('SELECT id, nombre, email, password FROM usuarios ORDER BY created_at DESC');
            return rows;
        } catch (error) {
            throw new Error('Error al obtener usuarios: ' + error.message);
        }
    };

    static async getUserByEmail(email) {
        try {
            const [rows] = await pool.query('SELECT id, nombre, email, password FROM usuarios WHERE email = ? LIMIT 1', [email]);
            
            const usuario = rows[0];
            
            if (!usuario) return null;

            return usuario;

        } catch (error) {
            throw new Error('Error al buscar e-mail del usuario' + error.message)
        }
    };

};

export default Usuarios;