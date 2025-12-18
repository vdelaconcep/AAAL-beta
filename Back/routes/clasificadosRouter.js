import express from 'express';

import {
    avisoNuevo,
    aprobarAviso,
    eliminarAviso,
    modificarAviso,
    obtenerAvisos

} from '../controllers/clasificadosController.js';

import {
    validacionClasificados
} from '../helpers/clasificadosHelper.js';

import { validar } from '../middlewares/validator.js';

import { admin } from '../middlewares/admin.js';

const router = express.Router();

import multer from 'multer';
const upload = multer({ dest: "uploads/" });

// Ingresar aviso nuevo
router.post('/ingresar_nuevo', upload.single('foto'), validacionClasificados, validar, avisoNuevo);

// Autorizar aviso
router.put('/auth/:id', aprobarAviso);

// Eliminar aviso
router.delete('/eliminar/:id', eliminarAviso);

// Modificar aviso
router.put('/modificar', admin, upload.single('foto')/* , validacionModificacionVehiculos, validar */, modificarAviso);

// Obtener avisos (por página)
router.get('/:filter', obtenerAvisos);

export default router;