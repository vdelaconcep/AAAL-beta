import app from './app.js';
import { getConnection } from './database/mysql.js';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

async function startServer() {
    try {
        // Testear la conexión antes de iniciar el servidor
        const connection = await getConnection();
        const [rows] = await connection.query("SELECT NOW() AS hora");
        console.log("Hora del servidor:", rows[0].hora);

        // Iniciar servidor
        app.listen(PORT, HOST, () => {
            console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
        });

    } catch (err) {
        console.error("❌ No se pudo iniciar el servidor por error en la base de datos:", err.message);
        process.exit(1);
    }
}

startServer();