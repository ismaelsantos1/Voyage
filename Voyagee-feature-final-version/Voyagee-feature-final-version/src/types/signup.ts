export type UserType = 'tourist' | 'guide' | null;

export interface FormData {
    userType: UserType;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    address?: string;
    password: string;
    confirmPassword: string;
    documents?: File[];
    terms: boolean;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    streetAddress: string;
    number: string;
    complement?: string;
    bairro?: string;
}

export interface FormErrors {
    userType?: string;
    name?: string;
    email?: string;
    cpf?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
    country?: string;
    state?: string;
    city?: string;
    zipCode?: string;
    streetAddress?: string;
    number?: string;
    submit?: string;
    bairro?: string;
}