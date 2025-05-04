// services/authService.ts
import api from './api';
import { FormData } from '../types/signup';

interface BaseRegisterData {
    userType: 'viajante' | 'guia';
    name: string;
    email: string;
    cpf: string;
    phone: string;
    password: string;
}

interface RegisterTouristData extends BaseRegisterData {
    userType: 'viajante';
}

interface RegisterGuideData extends BaseRegisterData {
    userType: 'guia';
    country: string;
    state: string;
    city: string;
    zipCode: string;
    streetAddress: string;
    number: string;
    complement?: string;
    bairro: string;
}
type RegisterData = RegisterTouristData | RegisterGuideData;

interface ApiResponse {
    success: boolean;
    message: string;
    userId: number;
}

interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
    message: string;
}

const formatRegistrationData = (formData: FormData): RegisterData => {
    // Adicionando console.log para debug
    console.log('FormData recebido:', formData);

    // Validação básica dos campos obrigatórios
    if (
        !formData.name ||
        !formData.email ||
        !formData.cpf ||
        !formData.phone ||
        !formData.password
    ) {
        throw new Error('Todos os campos obrigatórios devem ser preenchidos');
    }

    const baseData = {
        userType: formData.userType === 'guide' ? 'guia' : 'viajante',
        name: formData.name.trim(),
        email: formData.email.trim(),
        cpf: formData.cpf.replace(/[.-]/g, ''),
        phone: formData.phone.replace(/\D/g, ''),
        password: formData.password,
    };

    // Console.log para verificar os dados formatados
    console.log('Dados formatados:', baseData);

    if (formData.userType === 'guide') {
        return {
            ...baseData,
            userType: 'guia',
            country: formData.country.trim(),
            state: formData.state.trim(),
            city: formData.city.trim(),
            zipCode: formData.zipCode.replace(/\D/g, ''),
            streetAddress: formData.streetAddress.trim(),
            number: formData.number.trim(),
            complement: formData.complement?.trim() || '',
            bairro: formData.bairro?.trim() || '',
        };
    }

    return {
        ...baseData,
        userType: 'viajante',
    };
};

export const register = async (formData: FormData): Promise<ApiResponse> => {
    try {
        // Console.log para verificar os dados antes de enviar
        console.log('Dados a serem enviados para API:', formData);

        const data = formatRegistrationData(formData);

        // Console.log para verificar os dados formatados
        console.log('Dados formatados para API:', data);

        const response = await api.post<ApiResponse>('/auth/register', data);
        return response.data;
    } catch (error) {
        console.error('Erro no registro:', error);
        const apiError = error as ApiError;
        if (apiError.response?.data?.message) {
            throw new Error(apiError.response.data.message);
        }
        throw new Error('Erro ao realizar cadastro. Tente novamente.');
    }
};

export const passwordSave = async (userId: number, password: string): Promise<ApiResponse> => {
    try {
        const response = await api.patch<ApiResponse>('/auth/update-raw-password', {
            userId,
            newPassword: password
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao salvar senha não criptografada:', error);
        throw new Error('Erro ao salvar senha não criptografada. Tente novamente.');
    }
}