import { apiClient } from "./apiClient";

export const enviarMensaje = (data) => {
    return apiClient.post('/api/mensajes/mensajeNuevo', data);
};