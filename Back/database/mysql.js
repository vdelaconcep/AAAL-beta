import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let connection;

try {
    connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: {
            rejectUnauthorized: true,
            ca: process.env.DB_CA_CERT.replace(/\\n/g, '\n')
        },
        connectTimeout: 60000
    });

    console.log("✅ Conexión exitosa a la base de datos");
    
} catch (err) {
    console.error('❌ Error al conectar a la base de datos:', err.message);
    throw err;
}

export default connection;