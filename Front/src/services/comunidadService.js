import { apiClient } from "@/services/apiClient";

export const enviarMensajeComunidad = (data) => {
    return apiClient.post('/api/comunidad/mensajeNuevo', data);
};

export const obtenerMensajesComunidad = () => {
    return apiClient.get('/api/comunidad/mensajes');
};

export const obtenerMensajesAprobados = (page=1, limit=5) => {
    return apiClient.get(`/api/comunidad/mensajesAprobados?page=${page}&limit=${limit}`);
};