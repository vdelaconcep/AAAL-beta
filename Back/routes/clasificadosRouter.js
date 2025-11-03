import express from 'express';

import {
    avisoNuevo,
    modificarAviso,
    obtenerAvisos
} from '../controllers/clasificadosController.js';

/* import {
    validacionVehiculos,
    validacionModificacionVehiculos
} from '../helpers/vehiculosHelper.js'; */

import { validar } from '../middlewares/validator.js';

import { admin } from '../middlewares/admin.js';

const router = express.Router();

import multer from 'multer';
const upload = multer({ dest: "uploads/" });

// Ingresar aviso nuevo
router.post('/nuevo', admin, upload.single('foto')/* , validacionVehiculos, validar */, avisoNuevo);

// Modificar aviso
router.put('/modificar', admin, upload.single('foto')/* , validacionModificacionVehiculos, validar */, modificarAviso);

// Obtener todos los avisos (por página)
router.get('/todos', obtenerAvisos);

export default router;