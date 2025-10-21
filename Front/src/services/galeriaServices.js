import { apiClient } from "@/services/apiClient";

export const getEventos = (page = 1, limit = 11) => {
    return apiClient.get(`/api/galeria/eventos?page=${page}&limit=${limit}`);
};

export const getEventosPorFecha = (desde, hasta, page = 1, limit = 11) => {
    return apiClient.get(`/api/galeria/eventos?fechaDesde=${desde}&fechaHasta=${hasta}&page=${page}&limit=${limit}`);
};

export const getEventoPorId = (eventoId) => {
    return apiClient.get(`/api/galeria/eventos/${eventoId}`);
}

export const getFotos = (page = 1, limit = 21) => {
    return apiClient.get(`/api/galeria/fotos?page=${page}&limit=${limit}`);
};

export const getFotosPorFecha = (desde, hasta, page = 1, limit = 21) => {
    return apiClient.get(`/api/galeria/fotos?fechaDesde=${desde}&fechaHasta=${hasta}&page=${page}&limit=${limit}`);
};

export const getFotoPorId = (fotoId) => {
    return apiClient.get(`/api/galeria/fotos/${fotoId}`);
};

export const eventoPost = (data) => {
    return apiClient.post('/api/galeria/eventos', data);
};

export const eventoPut = (eventoId, data) => {
    return apiClient.put(`/api/galeria/eventos/${eventoId}`, data);
};

export const fotosPost = (eventoId, data) => {
    return apiClient.put(`/api/galeria/eventos/${eventoId}/fotos`, data);
};

export const fotoPostDescripcion = (fotoId, data) => {
    return apiClient.post(`/api/galeria/fotos/${fotoId}/descripcion`, data);
};

export const delEvento = (eventoId) => {
    return apiClient.delete(`/api/galeria/eventos/${eventoId}`);
};

export const delFotos = (data) => {
    return apiClient.delete('/api/galeria/fotos', data);
};