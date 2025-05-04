export interface UserProfile {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    telefone: string | null;
    data_nascimento: string;
    created_at: string;
    updated_at: string;
    role: 'user' | 'guide' | 'admin';
    is_active: number;
    tipo: 'guia' | 'viajante';
    biografia: string | null;
    anos_experiencia: number | null;
    avaliacao_media: number | null;
    numero_avaliacoes: number | null;
    status_verificacao: string | null;
    cep: string | null;
    pais: string | null;
    estado: string | null;
    cidade: string | null;
    bairro: string | null;
    rua: string | null;
    endereco_numero: string | null;
    complemento: string | null;
}

export interface ProfileUpdateData {
    nome?: string;
    telefone?: string;
    biografia?: string;
    endereco?: {
        cep?: string;
        pais?: string;
        estado?: string;
        cidade?: string;
        bairro?: string;
        rua?: string;
        numero?: string;
        complemento?: string;
    };
}

export interface ApiResponse<T> {
    success: boolean;
    user: T;
}
