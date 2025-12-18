import Clasificados from '../models/clasificadosModel.js';
import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const avisoNuevo = async (req, res) => {

    const { titulo, descripcion, contacto } = req.body;

    if (!titulo || !descripcion || !contacto) return res.status(400).json({ error: "Título, descripción y contacto son obligatorios" });

    if (!req.file) {
        return res.status(400).json({
            error: "Se debe subir una foto"
        });
    }

    let foto, publicId
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "image",
            folder: "Clasificados",
            transformation: [
                { width: 1920, crop: "limit" },
                { quality: "auto:good" }
            ]
        });

        foto = result.secure_url;
        publicId = result.public_id;

    } catch (error) {
        return res.status(500).json({ error: `Error al subir imagen a Cloudinary: ${error.message}` });
    }

    const nuevoAvisoClasificado = {
        titulo,
        descripcion,
        contacto,
        foto,
        publicId
    }

    try {
        const avisoGuardado = await Clasificados.nuevoAviso(nuevoAvisoClasificado);

        res.status(200).json(avisoGuardado);

    } catch (error) {
        return res.status(500).json({ error: `Error al guardar aviso clasificado: ${error.message}` });
    }

}

const aprobarAviso = async (req, res) => {
    const { id } = req.params;
    const { usuario } = req.body;

    if (!id || !usuario) res.status(400).json({ error: 'Se debe indicar id del aviso y id del usuario que autoriza' });

    try {
        const autorizado = await Clasificados.autorizarAviso(id, usuario);

        res.status(200).json(autorizado)

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const eliminarAviso = async (req, res) => {
    const { id } = req.params;

    if (!id) res.status(400).json({ error: 'Se debe ingresar el id del aviso a eliminar' });

    try {
        const publicId = await Clasificados.getPublicId(id);

        const cloudinaryResult = await cloudinary.uploader.destroy(publicId, {
            resource_type: "image"
        });

        const avisoEliminado = await Clasificados.borrarAviso(id);

        res.status(200).json({
            ...avisoEliminado,
            cloudinary: cloudinaryResult
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const modificarAviso = async (req, res) => {
    
}

const obtenerAvisos = async (req, res) => {
    
    const { filter } = req.params;

    const { page = 1, limit = 5 } = req.query;

    if (!filter) res.status(400).json({ error: 'Se debe indicar el tipo de avisos requeridos' });

    try {
        const avisos = await Clasificados.get(filter, page, limit);

        res.status(200).json(avisos);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export {
    avisoNuevo,
    aprobarAviso,
    eliminarAviso,
    modificarAviso,
    obtenerAvisos
}