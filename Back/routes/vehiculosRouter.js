import express from 'express';

import {
    vehiculoNuevo,
    modificarVehiculo,
    obtenerVehiculos,
    buscarVehiculos
} from '../controllers/vehiculosController.js';

import {
    validacionVehiculos,
    validacionModificacionVehiculos
} from '../helpers/vehiculosHelper.js';

import { validar } from '../middlewares/validator.js';

import { admin } from '../middlewares/admin.js';

const router = express.Router();

import multer from 'multer';
const upload = multer({ dest: "uploads/" });

// Ingresar vehículo
router.post('/nuevo', admin, upload.single('foto'), validacionVehiculos, validar, vehiculoNuevo);

// Modificar vehículo
router.put('/modificar', admin, upload.single('foto'), validacionModificacionVehiculos, validar, modificarVehiculo);

// Obtener todos los vehículos
router.get('/todos', obtenerVehiculos);

// FIltrar por query params
router.get('/buscar', buscarVehiculos);


export default router;