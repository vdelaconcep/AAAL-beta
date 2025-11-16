import { apiClient } from "@/services/apiClient";

export const getSuggestions = (input) => {
    return apiClient.get(`/api/vehiculos/marca?input=${input}`);
};

export const getAll = (page = 1, limit = 10) => {
    return apiClient.get(`/api/vehiculos/todos?page=${page}&limit=${limit}`)
};

export const getFiltered = (marca, modelo, desde, hasta, page = 1, limit = 21) => {

    return apiClient.get('/api/vehiculos/buscar', {
        params: {
            marca,
            modelo,
            desde,
            hasta,
            page,
            limit
        }
    });
};