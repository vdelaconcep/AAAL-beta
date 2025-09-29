import { apiClient } from "@/services/apiClient";

export const enviarMensajeComunidad = (data) => {
    return apiClient.post('/api/comunidad/mensajeNuevo', data);
};