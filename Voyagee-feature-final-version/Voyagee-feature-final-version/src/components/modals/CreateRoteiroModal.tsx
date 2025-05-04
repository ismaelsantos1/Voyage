// components/modals/CreateRoteiroModal.tsx
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Passeio } from '../../types/userItems';
import { userItemsService } from '../../services/userItemsService';

interface CreateRoteiroModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
}

export function CreateRoteiroModal({
    isOpen,
    onClose,
    onSubmit,
}: CreateRoteiroModalProps) {
    const today = new Date().toISOString().split('T')[0];

    const initialFormState = {
        passeioId: '',
        data: today,
        horaInicio: '',
        horaFim: '',
        vagasDisponiveis: '',
    };

    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);
    const [allPasseios, setAllPasseios] = useState<Passeio[]>([]);
    const [selectedPasseio, setSelectedPasseio] = useState<Passeio | null>(
        null,
    );

    useEffect(() => {
        if (isOpen) {
            fetchAllPasseios();
        }
    }, [isOpen]);

    const fetchAllPasseios = async () => {
        try {
            const response = await userItemsService.getAllPasseios();
            setAllPasseios(response.data);
        } catch (error) {
            console.error('Erro ao buscar passeios:', error);
        }
    };

    const handlePasseioChange = (passeioId: string) => {
        const passeio = allPasseios.find((p) => p.id === parseInt(passeioId));
        setSelectedPasseio(passeio || null);
        setFormData((prev) => ({
            ...prev,
            passeioId: passeioId,
            vagasDisponiveis: passeio ? String(passeio.capacidade_maxima) : '',
        }));
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setSelectedPasseio(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dataToSubmit = {
                passeioId: parseInt(formData.passeioId),
                data: formData.data,
                horaInicio: formData.horaInicio,
                horaFim: formData.horaFim,
                vagasDisponiveis: parseInt(formData.vagasDisponiveis),
            };
            await onSubmit(dataToSubmit);
            resetForm();
            onClose();
        } catch (error) {
            console.error('Erro ao criar roteiro:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Criar Novo Roteiro</h2>
                    <button
                        onClick={() => {
                            resetForm();
                            onClose();
                        }}
                        className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Selecione o Passeio
                            </label>
                            <select
                                value={formData.passeioId}
                                onChange={(e) =>
                                    handlePasseioChange(e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 p-2"
                                required>
                                <option value="">Selecione um passeio</option>
                                {allPasseios.map((passeio) => (
                                    <option key={passeio.id} value={passeio.id}>
                                        {passeio.nome} - {passeio.destino_nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedPasseio && (
                            <div className="bg-blue-50 p-3 rounded-lg">
                                <h4 className="font-medium text-blue-800">
                                    Detalhes do Passeio
                                </h4>
                                <p className="text-sm text-blue-600">
                                    Duração: {selectedPasseio.duracao_horas}h
                                </p>
                                <p className="text-sm text-blue-600">
                                    Capacidade máxima:{' '}
                                    {selectedPasseio.capacidade_maxima} pessoas
                                </p>
                                <p className="text-sm text-blue-600">
                                    Preço: R${' '}
                                    {Number(selectedPasseio.preco).toFixed(2)}
                                </p>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Data do Roteiro
                            </label>
                            <input
                                type="date"
                                min={today}
                                value={formData.data}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        data: e.target.value,
                                    }))
                                }
                                className="w-full rounded-lg border border-gray-300 p-2"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Hora de Início
                                </label>
                                <input
                                    type="time"
                                    value={formData.horaInicio}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            horaInicio: e.target.value,
                                        }))
                                    }
                                    className="w-full rounded-lg border border-gray-300 p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Hora de Término
                                </label>
                                <input
                                    type="time"
                                    value={formData.horaFim}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            horaFim: e.target.value,
                                        }))
                                    }
                                    className="w-full rounded-lg border border-gray-300 p-2"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Vagas Disponíveis
                            </label>
                            <input
                                type="number"
                                value={formData.vagasDisponiveis}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        vagasDisponiveis: e.target.value,
                                    }))
                                }
                                className="w-full rounded-lg border border-gray-300 p-2"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6 space-x-2">
                        <button
                            type="button"
                            onClick={() => {
                                resetForm();
                                onClose();
                            }}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            disabled={loading}>
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                            disabled={loading}>
                            {loading ? 'Criando...' : 'Criar Roteiro'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
