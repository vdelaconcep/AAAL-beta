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

    let arrayFotos = [];
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

        arrayFotos = results.map(result => ({
            url: result.secure_url,
            publicId: result.public_id
        }));

    } catch (err) {
        return res.status(500).json({ error: `Error al subir imágenes a Cloudinary: ${err.message}` });
    }
    

    const eventoGaleriaNuevo = {
        nombre,
        fecha,
        descripcion,
        usuario,
        fotos: arrayFotos
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

const modificarEvento = async (req, res) => {

    const { nombre, fecha, descripcion, usuario } = req.body;
    const { eventoId } = req.params;

    if (!eventoId) return res.status(400).json({ error: 'Se debe indicar el id del evento a modificar' });

    if (!nombre && !fecha && !descripcion) return res.status(400).json({ error: 'No se enviaron modificaciones para realizar al evento' });

    if (!usuario) return res.status(400).json({ error: 'Se debe indicar el id del usuario que introduce las modificaciones' });

    try {
        const eventoModificado = await FotosGaleria.setEvento(eventoId, nombre, fecha, descripcion, usuario);

        return res.status(200).json(eventoModificado);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const agregarFotos = async (req, res) => {

    const { usuario } = req.body;
    const { eventoId } = req.params;

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({
            error: "Se debe subir al menos una foto"
        });
    }
    
    if (!eventoId) return res.status(400).json({ error: "Se debe indicar el evento al que se desean añadir fotos" });
    
    if(!usuario) return res.status(400).json({error: 'Se debe ingresar el id del usuario que hará la modificación'})

    let arrayFotos = [];
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

        arrayFotos = results.map(result => ({
            url: result.secure_url,
            publicId: result.public_id
        }));

    } catch (err) {
        return res.status(500).json({ error: `Error al subir imágenes a Cloudinary: ${err.message}` });
    }

    try {
        const fotosGuardadas = await FotosGaleria.agregarFotosAEvento(eventoId, usuario, arrayFotos);

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
    const { descripcion, usuario } = req.body;

    if (!fotoId) return res.status(400).json({
        error: "Se debe indicar el id de la foto para la que se desea guardar la descripción"
    });

    if (!descripcion) return res.status(400).json({
        error: "Se debe enviar una descripción para la foto"
    });

    try {
        const descripcionGuardada = await FotosGaleria.setDescripcionFoto(fotoId, usuario, descripcion);

        return res.status(200).json(descripcionGuardada);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const obtenerFotos = async (req, res) => {
    
    try {

        const { fotoId } = req.params;

        const { fechaDesde, fechaHasta } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 21;

        const maxLimit = 100;
        const finalLimit = Math.min(limit, maxLimit);

        const finalPage = Math.max(1, page);

        let resultado;

        try {
            if (fotoId) {
                resultado = await FotosGaleria.getFotos(fotoId, null, null, null, null);
            } else if (fechaDesde || fechaHasta) {
                resultado = await FotosGaleria.getFotos(null, fechaDesde, fechaHasta, page, limit);
            } else resultado = await FotosGaleria.getFotos(null, null, null, page, limit);

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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 11;

    let resultado;

    try {
        if (eventoId) {
            resultado = await FotosGaleria.getEvento(eventoId);
        } else if (fechaDesde || fechaHasta) {
            resultado = await FotosGaleria.getEventos(fechaDesde, fechaHasta, page, limit);
        } else resultado = await FotosGaleria.getEventos(null, null, page, limit);

        if (!resultado) return res.status(404).json({ error: 'No se encontró información de el/los evento/s solicitado/s' });

        return res.status(200).json(resultado);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const eliminarEvento = async (req, res) => {
    const { eventoId } = req.params;

    if (!eventoId) return res.status(400).json({
        error: "Se debe indicar el id el evento que se desea eliminar"
    });

    try {
        const eventoAEliminar = await FotosGaleria.getEvento(eventoId);
        const fotosAEliminar = eventoAEliminar.data.fotos || [];

        if (fotosAEliminar.length > 0) {
            const deletePromises = fotosAEliminar.map(foto => cloudinary.uploader.destroy(foto.cloudinary_public_id, {
                resource_type: "image"
            }).catch(err => null));

            await Promise.all(deletePromises);
        }

        const eventoEliminado = await FotosGaleria.deleteEventoGaleria(eventoId);

        return res.status(200).json(eventoEliminado)

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const eliminarFotos = async (req, res) => {

    const { fotos } = req.body;

    if (!fotos || fotos.length === 0) {
        return res.status(400).json({ error: 'No se ingresaron los id de las fotos a eliminar' });
    };

    let publicIds = [];
    let cloudinaryResults = [];

    try {
        publicIds = await FotosGaleria.getPublicIdFotos(fotos);

        if (publicIds.length > 0) {
            const deletePromises = publicIds.map(publicId => cloudinary.uploader.destroy(publicId, {
                resource_type: "image"
            }));

            cloudinaryResults = await Promise.all(deletePromises);
        }

        const fotosEliminadas = await FotosGaleria.deleteFotosGaleria(fotos);

        return res.status(200).json({
            ...fotosEliminadas,
            cloudinary: cloudinaryResults
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export {
    nuevoEventoGaleria,
    modificarEvento,
    agregarFotos,
    agregarDescripcion,
    obtenerFotos,
    obtenerEventos,
    eliminarEvento,
    eliminarFotos
};