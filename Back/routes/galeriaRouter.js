import express from 'express';

import {
    nuevoEventoGaleria,
    agregarFotos,
    agregarDescripcion,
    obtenerFotos,
    obtenerEventos,
    eliminarEvento,
    eliminarFotos
} from '../controllers/galeriaController.js';

import { validacionEventoGaleria } from '../helpers/galeriaHelper.js';

import { validar } from '../middlewares/validator.js';

const router = express.Router();

import multer from 'multer';
const upload = multer({ dest: "uploads/temp/" });

// Nuevo evento
router.post('/eventoNuevo', upload.array('fotos', 20), validacionEventoGaleria, validar, nuevoEventoGaleria);

// Agregar fotos a evento existente
router.post('/agregarFotos/:eventoId', upload.array('fotos', 20), agregarFotos);

// Agregar descripción a foto existente
router.post('/agregarDescripcion/:fotoId', agregarDescripcion);

// Obtener 1 foto o todas las fotos de la galería (o filtradas por fecha con query params)
router.get('/fotos', obtenerFotos)
router.get('/fotos/:fotoId', obtenerFotos);

// Obtener 1 evento con todas sus fotos, o todos los eventos (o filtrados por fecha con query params) con url de la primer foto
router.get('/eventos', obtenerEventos);
router.get('/eventos/:eventoId', obtenerEventos);

// Eliminar evento
router.delete('/eliminarEvento/:eventoId', eliminarEvento);

// Eliminar fotos
router.delete('/eliminarFotos', eliminarFotos);

export default router;