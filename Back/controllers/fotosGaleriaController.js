import FotosGaleria from "../models/fotosGaleria.js";
import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const nuevoEventoGaleriaFotos = async (req, res) => {

    const { nombre, fecha, descripcion, usuario } = req.body;

    if (!nombre || !fecha || !usuario) return res.status(400).json({ error: "Nombre, fecha y usuario son obligatorios" });

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({
            error: "Se debe subir al menos una foto"
        });
    }

    let urlFotos = [];
    // Subir imágenes a Cloudinary
    try {
        const uploadPromises = req.files.map(file =>
            cloudinary.uploader.upload(file.path, {
                resource_type: "image",
                folder: "eventos_galeria",
                transformation: [
                    { width: 1920, crop: "limit" },
                    { quality: "auto:good" }
                ]
            })
        );

        const results = await Promise.all(uploadPromises);

        urlFotos = results.map(result => result.secure_url);

    } catch (err) {
        return res.status(500).json({ error: `Error al subir imágenes a Cloudinary: ${err.message}` });
    }
    

    const eventoGaleriaNuevo = {
        nombre,
        fecha,
        descripcion,
        usuario,
        fotos: urlFotos
    };

    try {
        const eventoGaleriaGuardado = await FotosGaleria.crearEventoGaleria(eventoGaleriaNuevo);

        res.status(200).json({
            success: true,
            ... eventoGaleriaGuardado
        });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { nuevoEventoGaleriaFotos };