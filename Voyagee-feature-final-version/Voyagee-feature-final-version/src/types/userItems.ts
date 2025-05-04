export interface Destino {
    id: number;
    nome: string;
    estado: string;
    cidade: string;
    descricao?: string;
    latitude?: string;
    longitude?: string;
}

export interface Passeio {
    id: number;
    nome: string;
    descricao: string;
    preco: string;
    duracao_horas: number;
    nivel_dificuldade: 'facil' | 'moderado' | 'dificil';
    inclui_refeicao: number;
    inclui_transporte: number;
    destino_id: number;
    guia_id: number;
    capacidade_maxima: number;
    created_at: string;
    updated_at: string;
    pessoa_id: number;
    destino_nome: string;
    cidade: string;
    estado: string;
    criador_nome: string;
    criador_email: string;
    criador_eh_guia: number;
}

export interface Roteiro {
    id: number;
    passeio_id: number;
    data: string;
    hora_inicio: string;
    hora_fim: string;
    status: 'agendado' | 'confirmado' | 'concluido' | 'cancelado';
    vagas_disponiveis: number;
    passeio_nome?: string;
    passeio_descricao?: string;
}

export interface PaginationData {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    roteiros?: T[];
    passeios?: T[];
    destinos?: T[];
    pagination: PaginationData;
}

export interface Avaliacao {
    nota: string;
    comentario: string;
    created_at: string;
    avaliador_nome: string;
}

export interface RoteiroDetalhado extends Roteiro {
    destino_descricao: string;
    latitude: string;
    longitude: string;
    avaliacao_media: string;
    total_avaliacoes: number;
    avaliacoes: Avaliacao[];
    preco: string;
    inclui_refeicao: number;
    inclui_transporte: number;
}