import { apiClient } from "./apiClient";

export const enviarMensaje = (data) => {
    return apiClient.post('/api/contacto/mensajeNuevo', data);
};