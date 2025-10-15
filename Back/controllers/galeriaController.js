import FotosGaleria from "../models/galeria.js";
import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const nuevoEventoGaleria = async (req, res) => {

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
        return res.status(500).json({ error: err.message });
    }
};

const agregarFotos = async (req, res) => {
    const { usuario } = req.body;

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({
            error: "Se debe subir al menos una foto"
        });
    }
    
    let eventoId = '';
    if (req.params.eventoId) {
        eventoId = req.params.eventoId;
    } else return res.status(400).json({
        error: "Se debe indicar el evento al que se desean añadir fotos"
    });

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

    try {
        const fotosGuardadas = await FotosGaleria.agregarFotosAEvento(eventoId, usuario, urlFotos);

        return res.status(200).json({
            success: true,
            ...fotosGuardadas
        })

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const agregarDescripcion = async (req, res) => {
    let fotoId = '';
    if (req.params.fotoId) {
        fotoId = req.params.fotoId;
    } else return res.status(400).json({
        error: "Se debe indicar el id de la foto a la que se desea añadir la descripción"
    });

    if (!req.body.descripcion || req.body.descripcion === "") return res.status(400).json({
        error: "Se debe enviar una descripción para la foto"
    });

    const descripcion = req.body.descripcion;

    try {
        const descripcionGuardada = await FotosGaleria.agregarDescripcionAFoto(fotoId, descripcion);

        return res.status(200).json({
            success: true,
            ...descripcionGuardada
        })

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const obtenerFotos = async (req, res) => {
    
    try {
        let fotos = [];

        if (req.query.eventoId) {
            fotos = await FotosGaleria.getFotosDeEvento(req.query.eventoId);
        } else if (req.query.desde && req.query.hasta) {
            fotos = await FotosGaleria.getFotosPorFecha(req.query.desde, req.query.hasta);
        } else {
            fotos = await FotosGaleria.getFotos();
        }

        if (!fotos || fotos.length === 0) return res.status(404).json({ error: 'No se encontraron fotos' });

        return res.status(200).json({
            success: true,
            data: fotos
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const eliminarEvento = async (req, res) => {
    let eventoId = '';
    if (req.params.eventoId) {
        eventoId = req.params.eventoId;
    } else return res.status(400).json({
        error: "Se debe indicar el id el evento que se desea eliminar de la base de datos"
    });

    try {
        const eventoEliminado = await FotosGaleria.deleteEventoGaleria(eventoId);
        return res.status(201).json(eventoEliminado)
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const eliminarFotos = async (req, res) => {
    let eventoId = '';
    if (req.params.eventoId) {
        eventoId = req.params.eventoId;
    } else return res.status(400).json({
        error: "Se debe indicar el id del evento al que pertenecen las fotos que se desean eliminar"
    });

    const { fotos } = req.body;

    if (!fotos || fotos.length === 0) {
        return res.status(400).json({ error: 'No se enviaron fotos para eliminar' });
    };

    try {
        const fotosEliminadas = await FotosGaleria.deleteFotosGaleria(eventoId, fotos);

        return res.status(201).json(fotosEliminadas);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
}

export {
    nuevoEventoGaleria,
    agregarFotos,
    agregarDescripcion,
    obtenerFotos,
    eliminarEvento,
    eliminarFotos
};