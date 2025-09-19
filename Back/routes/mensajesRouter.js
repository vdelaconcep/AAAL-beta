import express from 'express';

import { enviarMensaje } from '../controllers/mensajesController.js';

import { validacionMensajes } from '../helpers/mensajesHelper.js';

import { validar } from '../middlewares/validator.js';


const router = express.Router();

// Enviar mensaje
router.post('/mensajeNuevo', validacionMensajes, validar, enviarMensaje);

export default router;