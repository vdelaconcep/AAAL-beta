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
    const { fotoId } = req.params;
    const { descripcion } = req.body;

    if (!fotoId) return res.status(400).json({
        error: "Se debe indicar el id de la foto a la que se desea añadir la descripción"
    });

    if (!descripcion) return res.status(400).json({
        error: "Se debe enviar una descripción para la foto"
    });

    try {
        const descripcionGuardada = await FotosGaleria.agregarDescripcionAFoto(fotoId, descripcion);

        return res.status(200).json(descripcionGuardada);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const obtenerFotos = async (req, res) => {
    
    try {

        const { fotoId } = req.params;

        const { fechaDesde, fechaHasta } = req.query;

        let resultado;

        try {
            if (fotoId) {
                resultado = await FotosGaleria.getFotos(fotoId, null, null);
            } else if (fechaDesde || fechaHasta) {
                resultado = await FotosGaleria.getFotos(null, fechaDesde, fechaHasta);
            } else resultado = await FotosGaleria.getFotos();

            if (!resultado) return res.status(404).json({ error: 'No se encontró información de la/las foto/s solicitada/s' });

            return res.status(200).json(resultado);

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const obtenerEventos = async (req, res) => {

    const { eventoId } = req.params;

    const { fechaDesde, fechaHasta } = req.query;

    let resultado;

    try {
        if (eventoId) {
            resultado = await FotosGaleria.getEvento(eventoId);
        } else if (fechaDesde || fechaHasta) {
            resultado = await FotosGaleria.getEventos(fechaDesde, fechaHasta);
        } else resultado = await FotosGaleria.getEventos();

        if (!resultado) return res.status(404).json({ error: 'No se encontró información de el/los evento/s solicitado/s' });

        return res.status(200).json(resultado);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const eliminarEvento = async (req, res) => {
    const { eventoId } = req.params;

    if (!eventoId) return res.status(400).json({
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

    const { fotos } = req.body;

    if (!fotos || fotos.length === 0) {
        return res.status(400).json({ error: 'No se ingresaron los id de las fotos a eliminar' });
    };

    try {
        const fotosEliminadas = await FotosGaleria.deleteFotosGaleria(fotos);

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
    obtenerEventos,
    eliminarEvento,
    eliminarFotos
};