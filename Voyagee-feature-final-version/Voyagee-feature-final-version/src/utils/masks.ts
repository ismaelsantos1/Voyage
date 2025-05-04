export const maskCPF = (value: string) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    };
    
    export const validateCPF = (cpf: string) => {
        const numericCPF = cpf.replace(/\D/g, '');
        if (numericCPF.length !== 11) return false;
        // Implementar validação completa do CPF aqui
        return true;
    };