import Vehiculos from "../models/vehiculosModel.js";
import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const vehiculoNuevo = async (req, res) => {

    const { marca, modelo, anio, descripcion, usuario } = req.body;

    if (!marca || !modelo || !anio || !descripcion || !usuario) return res.status(400).json({ error: "Marca, modelo, año, descripción y usuario son obligatorios" });

    let foto = null;
    let publicId = null;

    if (req.file) {
        // Subir imagen a Cloudinary
        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "image"
            });
            foto = result.secure_url;
            publicId = result.public_id;

        } catch (err) {
            return res.status(500).json({ error: `Error al subir imagen a Cloudinary: ${err.message}` });
        }
    } else {
        return res.status(400).json({error: 'Se debe enviar una foto del vehículo'})
    }

    const nuevoVehiculo = {
        marca,
        modelo,
        anio,
        descripcion,
        foto,
        usuario,
        publicId
    };

    try {
        const vehiculoGuardado = await Vehiculos.ingresarVehiculo(nuevoVehiculo);
        res.status(200).json(vehiculoGuardado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const modificarVehiculo = async (req, res) => {

    const { id, marca, modelo, anio, descripcion, usuario } = req.body;

    if (!id) return res.status(400).json({ error: 'Se debe indicar el id del vehículo a modificar' });

    if (!usuario) return res.status(400).json({ error: 'Se debe indicar el id del usuario que introduce la modificación' });

    if (!marca && !modelo && !anio && !descripcion && !req.file) return res.status(400).json({ error: "Se debe enviar alguna modificación para realizar en el registro del vehículo" });

    let foto = null;
    let publicId = null;

    if (req.file) {
        // Subir imagen a Cloudinary
        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "image"
            });
            foto = result.secure_url;
            publicId = result.public_id;

        } catch (err) {
            return res.status(500).json({ error: `Error al subir imagen a Cloudinary: ${err.message}` });
        }
    };

    const updateVehiculo = {
        id,
        marca,
        modelo,
        anio,
        descripcion,
        foto,
        usuario,
        publicId
    };

    try {
        const vehiculoActualizado = await Vehiculos.actualizarVehiculo(updateVehiculo);
        return res.status(200).json(vehiculoActualizado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const obtenerVehiculos = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);

        const result = await Vehiculos.getAll(page, limit);

        return res.status(200).json(result);

    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

const buscarVehiculos = async (req, res) => {

    const { marca, modelo, desde, hasta } = req.query;

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
    
    try {
        const resultado = await Vehiculos.getConFiltro(marca, modelo, desde, hasta, page, limit);

        return res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const sugerenciasMarcaVehiculos = async (req, res) => {

    const { input } = req.query;

    try {
        const suggestions = await Vehiculos.getSuggestionMarcas(input);

        return res.status(200).json(suggestions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export {
    vehiculoNuevo,
    modificarVehiculo,
    obtenerVehiculos,
    buscarVehiculos,
    sugerenciasMarcaVehiculos
};
