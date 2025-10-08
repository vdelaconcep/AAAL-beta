import { apiClient } from "@/services/apiClient";

export const enviarMensajeComunidad = (data) => {
    return apiClient.post('/api/comunidad/mensajeNuevo', data);
};

export const obtenerMensajesComunidad = () => {
    return apiClient.get('/api/comunidad/mensajes');
};

export const obtenerMensajesAprobados = () => {
    return apiClient.get('/api/comunidad/mensajesAprobados');
};