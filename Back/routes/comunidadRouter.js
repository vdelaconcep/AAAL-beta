import express from 'express';

import { enviarMensajeComunidad } from '../controllers/comunidadController.js';

import { validacionMensajesComunidad } from '../helpers/mensajesComunidadHelper.js';

import { validar } from '../middlewares/validator.js';


const router = express.Router();

import multer from 'multer';
const upload = multer({ dest: "uploads/" });

// Enviar mensaje
router.post('/mensajeNuevo', upload.single('imagen'), validacionMensajesComunidad, validar, enviarMensajeComunidad);

export default router;