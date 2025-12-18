import Comision from "../models/comisionModel.js";

export const obtenerComision = async (req, res) => {
    try {
        const comision = await Comision.getAll();
        res.json(comision);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};