import express from "express";
import morgan from "morgan";
import cors from "cors";

import comisionRouter from './routes/comisionRouter.js';
import contactoRouter from './routes/contactoRouter.js';
import comunidadRouter from './routes/comunidadRouter.js'

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
app.use('/api/comunidad', comunidadRouter)


export default app;

