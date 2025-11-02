import express from 'express';

import {
    vehiculoNuevo,
    obtenerVehiculos,
    buscarVehiculos
} from '../controllers/vehiculosController.js';

import { validacionVehiculos } from '../helpers/vehiculosHelper.js';

import { validar } from '../middlewares/validator.js';

const router = express.Router();

import multer from 'multer';
const upload = multer({ dest: "uploads/" });

// Ingresar vehículo
router.post('/nuevo', upload.single('foto'), validacionVehiculos, validar, vehiculoNuevo);

// Obtener todos los vehículos
router.get('/todos', obtenerVehiculos);

// FIltrar por query params
router.get('/buscar', buscarVehiculos);


export default router;