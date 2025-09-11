import { apiClient } from "./apiClient";

export const obtenerComision = () => {
    return apiClient.get('/api/comision');
};