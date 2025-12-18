import Usuarios from '../models/usuariosModel.js'
import jwt from 'jsonwebtoken';

const usuarioNuevo = async (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) return res.status(400).json({ error: 'Faltan datos de registro (nombre, e-mail, o contraseña)' });

    try {

        const existe = await Usuarios.emailExistInTable(email);

        if (existe) return res.status(400).json({ error: 'El e-mail ya se encuentra registrado' });
        
        const usuarioNuevo = {
            nombre,
            email,
            password
        }

        const usuarioGuardado = await Usuarios.registrarUsuario(usuarioNuevo);

        return res.status(200).json(usuarioGuardado);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: 'Se debe indicar usuario y contraseña para ingresar' });

    try {
        const usuario = await Usuarios.login(email, password);

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            success: true,
            token,
            usuario
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const obtenerUsuarios = async (req, res) => {
    try {
        const todos = await Usuarios.getAll();
        return res.status(200).json(todos)
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export {
    usuarioNuevo,
    loginUsuario,
    obtenerUsuarios
}