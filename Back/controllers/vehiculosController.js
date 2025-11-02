import Vehiculos from "../models/vehiculos.js";
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
    } else {
        return res.status(400).json({error: 'Se debe enviar una foto del vehículo'})
    }

    const nuevoVehiculo = {
        marca,
        modelo,
        anio,
        descripcion,
        foto,
        usuario
    };

    try {
        const vehiculoGuardado = await Vehiculos.ingresarVehiculo(nuevoVehiculo);

        res.status(200).json(vehiculoGuardado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const obtenerVehiculos = async (req, res) => {
    try {
        const todos = await Vehiculos.getAll();

        if (!todos) return res.status(404).json({ error: 'No se encontraron vehículos' });

        return res.status(200).json(todos);

    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

const buscarVehiculos = async (req, res) => {

    const { marca, modelo, desde, hasta } = req.query;
    
    try {
        const resultado = await Vehiculos.getConFiltro(marca, modelo, desde, hasta);

        return res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export {
    vehiculoNuevo,
    obtenerVehiculos,
    buscarVehiculos
};
