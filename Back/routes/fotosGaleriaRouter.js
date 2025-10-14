import express from 'express';

import {
    nuevoEventoGaleriaFotos
} from '../controllers/fotosGaleriaController.js';

/* import { validacionMensajesComunidad } from '../helpers/mensajesComunidadHelper.js';

import { validar } from '../middlewares/validator.js'; */

const router = express.Router();

import multer from 'multer';
const upload = multer({ dest: "uploads/temp/" });

// Nuevo evento
router.post('/eventoNuevo', upload.array('fotos', 20), /* validacionMensajesComunidad, validar, */ nuevoEventoGaleriaFotos);

export default router;