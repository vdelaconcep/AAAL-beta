import Comision from "../models/comisionDirectiva.js";

export const obtenerComision = async (req, res) => {
    try {
        const comision = await Comision.getAll();
        res.json({
            success: true,
            data: comision
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};