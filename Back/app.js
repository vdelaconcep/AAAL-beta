import express from "express";
import morgan from "morgan";
import cors from "cors";

import comisionRouter from './routes/comisionRouter.js';
import contactoRouter from './routes/contactoRouter.js';
import comunidadRouter from './routes/comunidadRouter.js';
import galeriaRouter from './routes/galeriaRouter.js';
import vehiculosRouter from './routes/vehiculosRouter.js';
import usuariosRouter from './routes/usuariosRouter.js';

// Servidor
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
    res.send('API en desarrollo')
})
app.use('/api/comision', comisionRouter);
app.use('/api/contacto', contactoRouter);
app.use('/api/comunidad', comunidadRouter);
app.use('/api/galeria', galeriaRouter);
app.use('/api/vehiculos', vehiculosRouter);
app.use('/api/usuarios', usuariosRouter);

export default app;

