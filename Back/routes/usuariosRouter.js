import express from 'express';

import { validar } from '../middlewares/validator.js';

const router = express.Router();

// Registrar usuario nuevo
router.post('/nuevo', usuarioNuevo);

// Ingreso de usuario (login)
router.post('/login', loginUsuario);

// Obtener todos los usuarios
router.get('/todos', obtenerUsuarios);


export default router;