// services/roteirosService.ts
import api from './api';
import { RoteiroFilters, ApiListResponse } from '../types/roteiros';
import { Roteiro, Passeio, Destino } from '../types/userItems';


export const roteirosService = {
  async listRoteiros(filters: RoteiroFilters = {}) {
    const params = new URLSearchParams();
    
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.status) params.append('status', filters.status);
    if (filters.data) params.append('data', filters.data);
    if (filters.destino) params.append('destino', filters.destino.toString());
    if (filters.criadorId) params.append('criadorId', filters.criadorId.toString());

    const response = await api.get<ApiListResponse<Roteiro>>(`/roteiros?${params}`);
    return response.data;
  },

  async listPasseios(filters: { destino_id?: number; page?: number; limit?: number }) {
    const params = new URLSearchParams();
    
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.destino_id) params.append('destino_id', filters.destino_id.toString());

    const response = await api.get<ApiListResponse<Passeio>>(`/passeios?${params}`);
    return response.data;
  },

  async listDestinos(filters: { estado?: string; cidade?: string; page?: number; limit?: number }) {
    const params = new URLSearchParams();
    
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.estado) params.append('estado', filters.estado);
    if (filters.cidade) params.append('cidade', filters.cidade);

    const response = await api.get<ApiListResponse<Destino>>(`/destinos?${params}`);
    return response.data;
  }
};