import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import {
    X,
    Star,
    Clock,
    Users,
    Coffee,
    Car,
    MapPin,
    AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { RoteiroDetalhado } from '../../types/userItems';
import useClickOutside from '../../hooks/useClickOutside';
import { StarRating } from '../StarRating';

interface RoteiroDetalheModalProps {
    roteiro: RoteiroDetalhado;
    isOpen: boolean;
    onClose: () => void;
    onAvaliacaoSubmit: () => void;
}

export default function RoteiroDetalheModal({
    roteiro,
    isOpen,
    onClose,
    onAvaliacaoSubmit,
}: RoteiroDetalheModalProps) {
    const { user } = useAuth();
    const modalRef = useRef<HTMLDivElement>(null);
    const [avaliacao, setAvaliacao] = useState<{
        nota: number;
        comentario: string;
    }>({
        nota: 5,
        comentario: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showAvaliacaoForm, setShowAvaliacaoForm] = useState(false);

    useClickOutside(modalRef, () => {
        if (isOpen) onClose();
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        if (user && showAvaliacaoForm) {
            const jaAvaliou = roteiro.avaliacoes.some(
                (a) => a.avaliador_nome === user.name,
            );
    
            if (jaAvaliou) {
                setShowAvaliacaoForm(false);
                toast.error('Você já avaliou este roteiro anteriormente.');
            }
        }
    }, [showAvaliacaoForm, user, roteiro.avaliacoes]);

    const usuarioJaAvaliou = roteiro.avaliacoes.some(
        (a) => a.avaliador_nome === user?.name,
    );

    const podeAvaliar = !usuarioJaAvaliou && roteiro.status === 'concluido' && user !== null;

    const getStatusColor = (status: string) => {
        const colors = {
            agendado: 'bg-yellow-100 text-yellow-800',
            confirmado: 'bg-green-100 text-green-800',
            concluido: 'bg-blue-100 text-blue-800',
            cancelado: 'bg-red-100 text-red-800',
        };
        return colors[status as keyof typeof colors];
    };
    interface ApiError {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
    const handleSubmitAvaliacao = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            await api.post(`/roteiros/${roteiro.id}/avaliar`, {
                nota: avaliacao.nota,
                comentario: avaliacao.comentario,
            });
            setAvaliacao({ nota: 5, comentario: '' });
            setShowAvaliacaoForm(false);
            onAvaliacaoSubmit();
        } catch (err) {
            const apiError = err as ApiError;
            // Usa a mensagem da API se disponível, caso contrário usa mensagem padrão
            const errorMessage = apiError.response?.data?.message || 
                'Não foi possível enviar sua avaliação. Tente novamente.';
            setError(errorMessage);
            toast.error(errorMessage); // Opcional: mostrar o erro também como toast
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
                ref={modalRef}
                className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-modalEnter">
                <div className="p-6 space-y-8">
                    {/* Header com Status */}
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {roteiro.passeio_nome}
                            </h2>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                                    <span className="text-gray-600">
                                        {roteiro.destino_nome} -{' '}
                                        {roteiro.cidade}, {roteiro.estado}
                                    </span>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                        roteiro.status,
                                    )}`}>
                                    {roteiro.status.charAt(0).toUpperCase() +
                                        roteiro.status.slice(1)}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Informações Principais */}
                        <div className="space-y-6">
                            <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-gray-500" />
                                        <span className="text-gray-700">
                                            {new Date(
                                                roteiro.data,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="text-gray-700">
                                        {roteiro.hora_inicio} -{' '}
                                        {roteiro.hora_fim}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-gray-500" />
                                        <span className="text-gray-700">
                                            {roteiro.vagas_disponiveis} vagas
                                            disponíveis
                                        </span>
                                    </div>
                                    <span className="text-xl font-bold text-blue-600">
                                        R$ {Number(roteiro.preco).toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex items-center gap-6">
                                    {roteiro.inclui_refeicao === 1 && (
                                        <div className="flex items-center gap-2">
                                            <Coffee className="w-5 h-5 text-emerald-500" />
                                            <span>Refeição incluída</span>
                                        </div>
                                    )}
                                    {roteiro.inclui_transporte === 1 && (
                                        <div className="flex items-center gap-2">
                                            <Car className="w-5 h-5 text-indigo-500" />
                                            <span>Transporte incluído</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Sobre o passeio
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {roteiro.passeio_descricao}
                                </p>
                            </div>

                            {/* Seção do Guia */}
                            <div className="border-t pt-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Guia do Passeio
                                </h3>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-medium">
                                        {roteiro.criador_nome.charAt(0)}
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-medium text-gray-900">
                                            {roteiro.criador_nome}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {roteiro.criador_biografia ||
                                                'Guia Turístico'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Avaliações */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Avaliações
                                    </h3>
                                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                        <span className="font-medium">
                                            {Number(
                                                roteiro.avaliacao_media,
                                            ).toFixed(1)}
                                        </span>
                                        <span className="text-sm text-gray-500 ml-1">
                                            ({roteiro.total_avaliacoes})
                                        </span>
                                    </div>
                                </div>
                                {podeAvaliar && !showAvaliacaoForm && (
                                    <button
                                        onClick={() =>
                                            setShowAvaliacaoForm(true)
                                        }
                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        Avaliar
                                    </button>
                                )}
                            </div>

                            {/* Form de Avaliação */}
                            {showAvaliacaoForm && podeAvaliar && (
                                <form
                                    onSubmit={handleSubmitAvaliacao}
                                    className="bg-blue-50 p-4 rounded-lg space-y-4 animate-fadeIn">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Sua avaliação
                                        </label>
                                        <StarRating
                                            rating={avaliacao.nota}
                                            onRating={(nota) =>
                                                setAvaliacao((prev) => ({
                                                    ...prev,
                                                    nota,
                                                }))
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Seu comentário
                                        </label>
                                        <textarea
                                            value={avaliacao.comentario}
                                            onChange={(e) =>
                                                setAvaliacao((prev) => ({
                                                    ...prev,
                                                    comentario: e.target.value,
                                                }))
                                            }
                                            rows={3}
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                            placeholder="Conte como foi sua experiência..."
                                        />
                                    </div>
                                    {error && (
                                        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                                            <AlertCircle className="inline-block w-4 h-4 mr-2" />
                                            {error}
                                        </div>
                                    )}
                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowAvaliacaoForm(false)
                                            }
                                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                            disabled={loading}>
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
                                            {loading
                                                ? 'Enviando...'
                                                : 'Enviar Avaliação'}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* Lista de Avaliações */}
                            <div className="space-y-4">
                                {roteiro.avaliacoes.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">
                                        Ainda não há avaliações para este
                                        roteiro.
                                    </p>
                                ) : (
                                    roteiro.avaliacoes.map(
                                        (avaliacao, index) => (
                                                <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-2 animate-fadeIn">
                                                <div className="flex justify-between items-start">
                                                  <div>
                                                    <p className="font-medium text-gray-900">
                                                      {avaliacao.avaliador_nome}
                                                    </p>
                                                    <div className="flex items-center mt-1">
                                                      <StarRating
                                                        rating={Number(avaliacao.nota)}
                                                        onRating={() => {}} // Função vazia pois é somente leitura
                                                        readonly
                                                      />
                                                    </div>
                                                  </div>
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(
                                                            avaliacao.created_at,
                                                        ).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700">
                                                    {avaliacao.comentario}
                                                </p>
                                            </div>
                                        ),
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}