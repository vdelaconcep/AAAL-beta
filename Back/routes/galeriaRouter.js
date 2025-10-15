import express from 'express';

import {
    nuevoEventoGaleria,
    agregarFotos,
    agregarDescripcion,
    obtenerFotos,
    eliminarEvento,
    eliminarFotos
} from '../controllers/galeriaController.js';

/* import { validacionMensajesComunidad } from '../helpers/mensajesComunidadHelper.js';

import { validar } from '../middlewares/validator.js'; */

const router = express.Router();

import multer from 'multer';
const upload = multer({ dest: "uploads/temp/" });

// Nuevo evento
router.post('/eventoNuevo', upload.array('fotos', 20), /* validacionMensajesComunidad, validar, */ nuevoEventoGaleria);

// Agregar fotos a evento existente
router.post('/agregarFotos/:eventoId', upload.array('fotos', 20), agregarFotos);

// Agregar descripción a foto existente
router.post('/agregarDescripcion/:fotoId', agregarDescripcion);

// Obtener fotos (query params)
router.get('/', obtenerFotos);

// Eliminar evento
router.delete('/eliminarEvento/:eventoId', eliminarEvento);

// Eliminar fotos
router.delete('/eliminarFotos/:eventoId', eliminarFotos);

export default router;