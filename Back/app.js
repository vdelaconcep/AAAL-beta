import express from "express";
import morgan from "morgan";
import cors from "cors";

/* import mensajesRouter from ... */

// Servidor
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
/* app.use('api/mensajes', mensajesRouter) */

export default app;

