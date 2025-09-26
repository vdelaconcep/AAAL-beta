import { apiClient } from "./apiClient";

export const enviarMensajeComunidad = (data) => {
    return apiClient.post('/api/comunidad/mensajeNuevo', data);
};