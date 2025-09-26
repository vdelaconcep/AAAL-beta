import express from 'express';

import { enviarMensajeContacto } from '../controllers/contactoController.js';

import { validacionMensajesContacto } from '../helpers/mensajesContactoHelper.js';

import { validar } from '../middlewares/validator.js';


const router = express.Router();

// Enviar mensaje
router.post('/mensajeNuevo', validacionMensajesContacto, validar, enviarMensajeContacto);

export default router;