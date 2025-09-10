import express from 'express';

import { obtenerComision } from '../controllers/comisionController.js';


const router = express.Router();

// Obtener todos los miembros de la comisión directiva
router.get('/', obtenerComision);

export default router;