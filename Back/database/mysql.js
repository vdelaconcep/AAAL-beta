import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import mysql from 'mysql2/promise';
import path from 'path';

let connection;

try {
    const isLocal = process.env.NODE_ENV !== 'production';

    let sslOptions = undefined;
    if (isLocal) {
        const certPath = path.resolve('./ca.pem');
        if (fs.existsSync(certPath)) {
            sslOptions = { ca: fs.readFileSync(certPath) };
            console.log('🔑 Usando certificado local para conexión SSL');
        } else {
            console.warn('⚠️ Certificado local no encontrado, se conectará sin SSL');
        }
    }

    connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        timezone: '-03:00',
        ssl: sslOptions,
        connectTimeout: 60000
    });

    console.log("✅ Conexión exitosa a la base de datos");

} catch (err) {
    console.error('❌ Error al conectar a la base de datos:', err.message);
    throw err;
}

export default connection;
