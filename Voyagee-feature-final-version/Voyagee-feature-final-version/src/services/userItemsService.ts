import api from './api';
import { ApiResponse, Destino, Passeio, Roteiro } from '../types/userItems';

interface FetchParams {
    page?: number;
    limit?: number;
    estado?: string;
    cidade?: string;
    nivel_dificuldade?: 'facil' | 'moderado' | 'dificil';
    status?: 'agendado' | 'confirmado' | 'concluido' | 'cancelado';
}

export const userItemsService = {
    async getDestinos(userId: number, params?: FetchParams) {
        const response = await api.get<ApiResponse<Destino>>(
            `/destinos/usuario/${userId}`,
            { params },
        );
        return {
            ...response.data,
            data: response.data.destinos || [],
        };
    },
    async getAllDestinos() {
        const response = await api.get<ApiResponse<Destino>>('/destinos');
        return {
            ...response.data,
            data: response.data.destinos || [],
        };
    },

    async getPasseios(userId: number, params?: FetchParams) {
        const response = await api.get<ApiResponse<Passeio>>(
            `/passeios/usuario/${userId}`,
            { params },
        );
        return {
            ...response.data,
            data: response.data.passeios || [],
        };
    },
    async getAllPasseios() {
        const response = await api.get<ApiResponse<Passeio>>('/passeios');
        return {
            ...response.data,
            data: response.data.passeios || [],
        };
    },

    async getRoteiros(userId: number, params?: FetchParams) {
        const response = await api.get<ApiResponse<Roteiro>>(
            `/roteiros/usuario/${userId}`,
            { params },
        );
        return {
            ...response.data,
            data: response.data.roteiros || [],
        };
    },

    async createDestino(data: Omit<Destino, 'id'>) {
        const response = await api.post('/destinos', data);
        return response.data;
    },

    async createPasseio(data: Omit<Passeio, 'id'>) {
        const response = await api.post('/passeios', data);
        return response.data;
    },

    async createRoteiro(data: Omit<Roteiro, 'id' | 'status'>) {
        const response = await api.post('/roteiros', data);
        return response.data;
    },

    async updateDestino(id: number, data: Partial<Destino>) {
        const response = await api.patch(`/destinos/${id}`, data);
        return response.data;
    },

    async deleteDestino(id: number) {
        const response = await api.delete(`/destinos/${id}`);
        return response.data;
    },

    async updatePasseio(id: number, data: Partial<Passeio>) {
        const response = await api.patch(`/passeios/${id}`, data);
        return response.data;
      },
    
      async deletePasseio(id: number) {
        const response = await api.delete(`/passeios/${id}`);
        return response.data;
      },

      async updateRoteiro(id: number, data: Partial<Roteiro>) {
        const response = await api.patch(`/roteiros/${id}`, data);
        return response.data;
      },
    
      async deleteRoteiro(id: number) {
        const response = await api.delete(`/roteiros/${id}`);
        return response.data;
      }
};
