import 'dotenv/config';
import app from './app.js';
import connection from './database/mysql.js';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

async function startServer() {
    try {
        const [rows] = await connection.query("SELECT NOW() AS hora");
        console.log("Hora del servidor:", rows[0].hora);

        if (!process.env.VERCEL) {
            app.listen(PORT, HOST, () => {
            console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
        });
        }

    } catch (err) {
        console.error("❌ Error en la base de datos:", err.message);
        process.exit(1);
    }
}

startServer();