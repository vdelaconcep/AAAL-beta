import express from 'express';

import {
    usuarioNuevo,
    loginUsuario,
    obtenerUsuarios
} from '../controllers/usuariosController.js';

import {
    validacionUsuarios,
    validacionLogin
} from '../helpers/usuariosHelper.js';

import { validar } from '../middlewares/validator.js';

import { admin } from '../middlewares/admin.js';

const router = express.Router();

// Registrar usuario nuevo
router.post('/nuevo', validacionUsuarios, validar, usuarioNuevo);

// Ingreso de usuario (login)
router.post('/login', validacionLogin, validar, loginUsuario);

// Obtener todos los usuarios
router.get('/todos', admin, obtenerUsuarios);


export default router;