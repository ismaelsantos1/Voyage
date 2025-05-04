// types/roteiros.ts
export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface RoteiroFilters extends PaginationParams {
    status?: 'agendado' | 'confirmado' | 'concluido' | 'cancelado';
    data?: string;
    destino?: number;
    criadorId?: number;
}

export interface PaginationInfo {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface ApiListResponse<T> {
    success: boolean;
    roteiros?: T[];
    passeios?: T[];
    destinos?: T[];
    pagination: PaginationInfo;
}
