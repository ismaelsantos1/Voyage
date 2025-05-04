export interface UserAddress {
    cep: string;
    pais: string;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    complemento?: string;
}

export interface User {
    id: number;
    nome: string;
    email: string;
    tipo: 'guia' | 'viajante';
    role: 'user' | 'guide' | 'admin';
    telefone?: string;
    data_nascimento?: string;
    biografia?: string;
    endereco?: UserAddress;
}

export interface LoginResponse {
    success: boolean;
    token: string;
    user: User;
}
