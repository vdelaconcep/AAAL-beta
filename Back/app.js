import express from "express";
import morgan from "morgan";
import cors from "cors";

import comisionRouter from './routes/comisionRouter.js';

// Servidor
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/', (req, res) => {
    res.send('API en desarrollo')
})
app.use('/api/comision', comisionRouter);

export default app;

