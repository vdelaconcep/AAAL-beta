import { apiClient } from "@/services/apiClient";

export const obtenerComision = () => {
    return apiClient.get('/api/comision');
};