import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import mysql from 'mysql2/promise';
import path from 'path';

let connection;

let caCert = fs.readFileSync(path.resolve('./database/ca.pem'));

if (process.env.NODE_ENV !== 'desarrollo') {
    caCert = process.env.DB_CA_CERT.replace(/\\n/g, '\n');
} else caCert = fs.readFileSync(path.resolve('./database/ca.pem'));

try {
    connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        timezone: '-03:00',
        ssl: {
            rejectUnauthorized: true,
            ca: caCert
        },
        connectTimeout: 60000
    });

    console.log("✅ Conexión exitosa a la base de datos");

} catch (err) {
    console.error('❌ Error al conectar a la base de datos:', err.message);
    throw err;
}

export default connection;
