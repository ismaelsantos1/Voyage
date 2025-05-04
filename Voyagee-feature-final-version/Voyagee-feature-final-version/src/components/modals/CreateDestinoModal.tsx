import { useState, useCallback } from 'react';
import { X } from 'lucide-react';

interface CreateDestinoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
}

interface FormData {
    nome: string;
    estado: string;
    cidade: string;
    descricao: string;
    latitude: string;
    longitude: string;
}

interface Location {
    lat: string;
    lon: string;
    display_name: string;
}

function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export function CreateDestinoModal({
    isOpen,
    onClose,
    onSubmit,
}: CreateDestinoModalProps) {
    const initialFormState: FormData = {
        nome: '',
        estado: '',
        cidade: '',
        descricao: '',
        latitude: '',
        longitude: ''
    };

    const [formData, setFormData] = useState<FormData>(initialFormState);
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setFormData(initialFormState);
    };

    const extractLocationInfo = (displayName: string) => {
        const parts = displayName.split(', ');
        const estado = parts.find(part => 
            part === 'Rio Grande do Norte' || 
            part === 'São Paulo' || 
            part.length === 2
        ) || '';
        const cidadeIndex = parts.findIndex(part => part === estado) - 3;
        const cidade = cidadeIndex >= 0 ? parts[cidadeIndex] : '';
        return { cidade, estado };
    };

    const fetchLocationData = async (query: string) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`
            );
            const data = await response.json();

            if (data && data.length > 0) {
                const location = data[0] as Location;
                const { cidade, estado } = extractLocationInfo(location.display_name);

                setFormData(prev => ({
                    ...prev,
                    latitude: location.lat,
                    longitude: location.lon,
                    cidade: cidade,
                    estado: estado
                }));
            }
        } catch (error) {
            console.error('Erro ao buscar dados de localização:', error);
        }
    };

    const debouncedFetchLocation = useCallback(
        debounce((query: string) => fetchLocationData(query), 500),
        []
    );

    const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNome = e.target.value;
        setFormData(prev => ({
            ...prev,
            nome: newNome
        }));

        if (newNome.length > 2) {
            debouncedFetchLocation(newNome);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
            resetForm();
            onClose();
        } catch (error) {
            console.error('Erro ao criar destino:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
            onClick={handleClickOutside}
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Criar Novo Destino</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome do Destino
                        </label>
                        <input
                            type="text"
                            value={formData.nome}
                            onChange={handleNomeChange}
                            className="w-full rounded-lg border border-gray-300 p-2"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Estado
                            </label>
                            <input
                                type="text"
                                value={formData.estado}
                                onChange={(e) =>
                                    setFormData(prev => ({
                                        ...prev,
                                        estado: e.target.value,
                                    }))
                                }
                                className="w-full rounded-lg border border-gray-300 p-2"
                                required
                                maxLength={2}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cidade
                            </label>
                            <input
                                type="text"
                                value={formData.cidade}
                                onChange={(e) =>
                                    setFormData(prev => ({
                                        ...prev,
                                        cidade: e.target.value,
                                    }))
                                }
                                className="w-full rounded-lg border border-gray-300 p-2"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descrição
                        </label>
                        <textarea
                            value={formData.descricao}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    descricao: e.target.value,
                                }))
                            }
                            className="w-full rounded-lg border border-gray-300 p-2"
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Latitude
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={formData.latitude}
                                onChange={(e) =>
                                    setFormData(prev => ({
                                        ...prev,
                                        latitude: e.target.value,
                                    }))
                                }
                                className="w-full rounded-lg border border-gray-300 p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Longitude
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={formData.longitude}
                                onChange={(e) =>
                                    setFormData(prev => ({
                                        ...prev,
                                        longitude: e.target.value,
                                    }))
                                }
                                className="w-full rounded-lg border border-gray-300 p-2"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Criando...' : 'Criar Destino'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}