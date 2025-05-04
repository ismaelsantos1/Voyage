// components/Roteiros/RoteiroCard.tsx
import { Clock, Users, MapPin, User } from 'lucide-react';
import { Roteiro, RoteiroDetalhado } from '../../types/userItems';
import { useState } from 'react';
import api from '../../services/api';
import RoteiroDetalheModal from './RoteiroDetalheModal';

interface RoteiroCardProps {
    roteiro: Roteiro & {
        criador_nome: string;
        criador_eh_guia: number;
        preco: string;
        cidade: string;
        estado: string;
    };
}

export function RoteiroCard({ roteiro }: RoteiroCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roteiroDetalhado, setRoteiroDetalhado] = useState<RoteiroDetalhado | null>(null);
    const [, setLoading] = useState(false);

    const handleCardClick = async () => {
        if (!roteiroDetalhado) {
            setLoading(true);
            try {
                const response = await api.get(`/roteiros/${roteiro.id}`);
                setRoteiroDetalhado(response.data.roteiro);
            } catch (error) {
                console.error('Erro ao carregar detalhes:', error);
            } finally {
                setLoading(false);
            }
        }
        setIsModalOpen(true);
    };

    const handleAvaliacaoSubmit = async () => {
        // Recarrega os detalhes do roteiro após uma nova avaliação
        try {
            const response = await api.get(`/roteiros/${roteiro.id}`);
            setRoteiroDetalhado(response.data.roteiro);
        } catch (error) {
            console.error('Erro ao recarregar detalhes:', error);
        }
    };

    return (
        <>
            <div
                onClick={handleCardClick}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
                <div className="p-6">
                    {/* Cabeçalho com nome do passeio e data */}
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                            {roteiro.passeio_nome}
                        </h3>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                roteiro.status === 'agendado'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : roteiro.status === 'confirmado'
                                    ? 'bg-green-100 text-green-800'
                                    : roteiro.status === 'concluido'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-red-100 text-red-800'
                            }`}>
                            {roteiro.status.charAt(0).toUpperCase() +
                                roteiro.status.slice(1)}
                        </span>
                    </div>

                    {/* Informações do passeio */}
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center text-gray-600">
                                <Clock className="w-4 h-4 mr-2" />
                                <span>
                                    {new Date(roteiro.data).toLocaleDateString()} •{' '}
                                    {roteiro.hora_inicio} - {roteiro.hora_fim}
                                </span>
                            </div>
                            {roteiro && (
                                <div className="flex items-center text-gray-600">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span>
                                        {roteiro.cidade}, {roteiro.estado}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center text-gray-600">
                                <Users className="w-4 h-4 mr-2" />
                                <span>
                                    {roteiro.vagas_disponiveis} vagas disponíveis
                                </span>
                            </div>
                        </div>

                        {/* Detalhes adicionais */}
                        {roteiro.passeio_descricao && (
                            <p className="text-gray-600 text-sm line-clamp-2">
                                {roteiro.passeio_descricao}
                            </p>
                        )}

                        {/* Informações do criador e preço */}
                        <div className="pt-4 mt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center min-w-0 flex-1">
                                    {' '}
                                    {/* min-w-0 permite truncamento */}
                                    <div
                                        className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-white ${
                                            roteiro.criador_eh_guia
                                                ? 'bg-blue-500'
                                                : 'bg-green-500'
                                        }`}>
                                        <User className="w-4 h-4" />
                                    </div>
                                    <div className="ml-2 min-w-0">
                                        {' '}
                                        {/* min-w-0 permite truncamento */}
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {roteiro.criador_nome}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {roteiro.criador_eh_guia
                                                ? 'Guia Turístico'
                                                : 'Viajante'}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    {' '}
                                    {/* shrink-0 impede compressão */}
                                    <p className="text-lg font-bold text-blue-600">
                                        R$ {Number(roteiro.preco).toFixed(2)}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        por pessoa
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {roteiroDetalhado && (
                <RoteiroDetalheModal
                    roteiro={roteiroDetalhado}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAvaliacaoSubmit={handleAvaliacaoSubmit}
                />
            )}
        </>
    );
}
