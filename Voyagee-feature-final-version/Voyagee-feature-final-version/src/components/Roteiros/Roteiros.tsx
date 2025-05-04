// pages/Roteiros.tsx
import { useState, useEffect } from 'react';
import { RoteiroFilters } from './RoteiroFilters';
import { RoteiroCard } from './RoteiroCard';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { roteirosService } from '../../services/roteirosService';
import { Loader } from 'lucide-react';
import { Roteiro, Passeio } from '../../types/userItems';
import Empty  from '../../assets/empty.jpg';

interface RoteiroWithPasseio extends Roteiro {
    passeio?: Passeio;
}

export default function Roteiros() {
    const [filters, setFilters] = useState({});
    const [isLoadingInitial, setIsLoadingInitial] = useState(true);

    const fetchRoteiros = async (page: number) => {
        try {
            const response = await roteirosService.listRoteiros({
                ...filters,
                page,
                limit: 10,
            });

            const roteirosWithPasseio = await Promise.all(
                (response.roteiros || []).map(async (roteiro) => {
                    try {
                        const passeioResponse = await roteirosService.listPasseios({
                            destino_id: roteiro.passeio_id,
                            limit: 1,
                        });
                        return {
                            ...roteiro,
                            passeio: passeioResponse.passeios?.[0],
                        };
                    } catch (error) {
                        console.error(`Erro ao buscar passeio ${roteiro.passeio_id}:`, error);
                        return roteiro;
                    }
                }),
            );

            return {
                items: roteirosWithPasseio,
                hasMore: response.pagination.hasNext,
            };
        } catch (error) {
            console.error('Erro ao buscar roteiros:', error);
            throw error;
        }
    };

    const {
        items: roteiros,
        loading,
        error,
        hasMore
    } = useInfiniteScroll<RoteiroWithPasseio>(
        fetchRoteiros,
        [JSON.stringify(filters)] // Passa os filtros como dependência
    );

    useEffect(() => {
        if (roteiros.length > 0 || error) {
            setIsLoadingInitial(false);
        }
    }, [roteiros, error]);

    // Remove o loading inicial após a primeira carga
    useEffect(() => {
        if (roteiros.length > 0 || error) {
            setIsLoadingInitial(false);
        }
    }, [roteiros, error]);

    const renderEmptyState = () => (
        <div className="flex flex-col items-center justify-center py-12">
            <img
                src={Empty}
                alt="Nenhum roteiro encontrado"
                className="w-48 h-48 mb-4"
            />
            <p className="text-gray-600 text-lg mb-2">
                Nenhum roteiro encontrado
            </p>
            <p className="text-gray-500 text-sm">
                Tente ajustar os filtros ou volte mais tarde
            </p>
        </div>
    );

    if (isLoadingInitial) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Roteiros Disponíveis
                </h1>
                <p className="text-gray-600">
                    Explore os melhores roteiros turísticos selecionados por
                    nossos guias
                </p>
            </div>

            <RoteiroFilters onFilterChange={setFilters} />

            {roteiros.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {roteiros.map((roteiro) => (
                        <RoteiroCard
                            key={roteiro.id}
                            roteiro={roteiro}
                            passeio={roteiro.passeio}
                        />
                    ))}
                </div>
            ) : (
                !loading && renderEmptyState()
            )}

            {loading && (
                <div className="flex justify-center py-8">
                    <Loader className="w-8 h-8 animate-spin text-blue-500" />
                </div>
            )}

            {error && (
                <div className="text-center py-8 px-4 bg-red-50 rounded-lg text-red-600">
                    <p className="font-medium">Erro ao carregar os roteiros</p>
                    <p className="text-sm mt-1">
                        Por favor, tente novamente mais tarde
                    </p>
                </div>
            )}

            {!hasMore && roteiros.length > 0 && (
                <div className="text-center py-8 text-gray-600 border-t mt-8">
                    Você chegou ao fim dos roteiros disponíveis
                </div>
            )}
        </div>
    );
}
