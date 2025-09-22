import Mensajes from "../models/mensajesContacto.js";
import { enviarCorreoRespuesta } from "../utils/mailRespuesta.js";

const enviarMensaje = async (req, res) => {

    const { nombre, email, telefono, asunto, mensaje } = req.body;

    if (!nombre || !email || !asunto || !mensaje) return res.status(400).json({ error: "Nombre, email, asunto y mensaje son obligatorios" });

    const mensajeNuevo = {
        nombre,
        email,
        asunto,
        telefono: telefono || null,
        mensaje
    };

    try {
        const mensajeGuardado = await Mensajes.enviarMensaje(mensajeNuevo);

        res.status(200).json(mensajeGuardado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const enviarRespuesta = async (req, res) => {

    const { email, asunto, respuesta } = req.body;

    if (!email || !asunto || !respuesta) return res.status(400).json({ error: "email, asunto y respuesta son obligatorios" });

    try {
        const envioRespuesta = await enviarCorreoRespuesta(email, asunto, respuesta);

        res.status(200).json(envioRespuesta);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export {
    enviarMensaje,
    enviarRespuesta
}