import MensajesComunidad from "../models/comunidadModel.js";
import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const enviarMensajeComunidad = async (req, res) => {

    const { nombre, relacion, titulo, mensaje } = req.body;

    if (!nombre || !relacion || !titulo || !mensaje) return res.status(400).json({ error: "Nombre, relación, título y mensaje son obligatorios" });

    let foto = null;

    if (req.file) {
        // Subir imagen a Cloudinary
        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "image"
            });
            foto = result.secure_url;

        } catch (err) {
            return res.status(500).json({ error: `Error al subir imagen a Cloudinary: ${err.message}` });
        }
    }

    const mensajeNuevo = {
        nombre,
        relacion,
        titulo,
        mensaje,
        foto
    };

    try {
        const mensajeGuardado = await MensajesComunidad.enviarMensaje(mensajeNuevo);

        res.status(200).json(mensajeGuardado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const obtenerMensajesComunidad = async (req, res) => {
    try {
        const mensajes = await MensajesComunidad.getAll();
        res.json(mensajes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const obtenerMensajesAprobados = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        if (page < 1) {
            return res.status(400).json({ error: 'El número de página debe ser mayor a 0' });
        }

        if (limit < 1 || limit > 50) {
            return res.status(400).json({ error: 'La cantidad de mensajes por página debe ser mayor a 0 y menor a 50' });
        }

        const paginaMensajesAprobados = await MensajesComunidad.getPaginaAprobados(page, limit);
        
        res.json(paginaMensajesAprobados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    enviarMensajeComunidad,
    obtenerMensajesComunidad,
    obtenerMensajesAprobados
};