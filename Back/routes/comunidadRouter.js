import express from 'express';

import {
    enviarMensajeComunidad,
    obtenerMensajesComunidad,
    obtenerMensajesAprobados
} from '../controllers/comunidadController.js';

import { validacionMensajesComunidad } from '../helpers/mensajesComunidadHelper.js';

import { validar } from '../middlewares/validator.js';

const router = express.Router();

import multer from 'multer';
const upload = multer({ dest: "uploads/" });

// Enviar mensaje
router.post('/mensajeNuevo', upload.single('imagen'), validacionMensajesComunidad, validar, enviarMensajeComunidad);

// Obtener todos los mensajes recibidos
router.get('/mensajes', /* Faltan permisos de administrador */ obtenerMensajesComunidad);

// Obtener mensajes aprobados por el administrador para mostrarse
router.get('/mensajesAprobados', obtenerMensajesAprobados);

export default router;