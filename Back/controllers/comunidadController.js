import MensajesComunidad from "../models/mensajesComunidad.js";
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

export {
    enviarMensajeComunidad
};