import express from 'express';

import {
    nuevoEventoGaleria,
    modificarEvento,
    agregarFotos,
    agregarDescripcion,
    obtenerFotos,
    obtenerEventos,
    eliminarEvento,
    eliminarFotos
} from '../controllers/galeriaController.js';

import {
    validacionEventoGaleria,
    validacionModificarEventoGaleria,
    validacionFotosGaleria,
    validacionModificarFotoGaleria,
    validacionEliminarFotosGaleria
} from '../helpers/galeriaHelper.js';

import { validar } from '../middlewares/validator.js';

const router = express.Router();

import multer from 'multer';
const upload = multer({ dest: "uploads/temp/" });

// Nuevo evento
router.post('/eventos', upload.array('fotos', 20), validacionEventoGaleria, validar, nuevoEventoGaleria);

// Modificar evento
router.put('/eventos/:eventoId', validacionModificarEventoGaleria, validar, modificarEvento);

// Agregar fotos a evento existente
router.post('/eventos/:eventoId/fotos', upload.array('fotos', 20), validacionFotosGaleria, validar, agregarFotos);

// Agregar o modificar descripción a foto existente
router.post('/fotos/:fotoId/descripcion', validacionModificarFotoGaleria, validar, agregarDescripcion);

// Obtener 1 foto o todas las fotos de la galería (o filtradas por fecha con query params)
router.get('/fotos', obtenerFotos)
router.get('/fotos/:fotoId', obtenerFotos);

// Obtener 1 evento con todas sus fotos, o todos los eventos (o filtrados por fecha con query params) con url de la primer foto
router.get('/eventos', obtenerEventos);
router.get('/eventos/:eventoId', obtenerEventos);

// Eliminar evento
router.delete('/eventos/:eventoId', eliminarEvento);

// Eliminar fotos
router.delete('/fotos', validacionEliminarFotosGaleria, validar, eliminarFotos);

export default router;