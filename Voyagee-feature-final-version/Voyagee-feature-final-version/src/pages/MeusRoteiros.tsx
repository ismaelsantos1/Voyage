import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userItemsService } from '../services/userItemsService';
import { Destino, Passeio, Roteiro } from '../types/userItems';
import { ItemCarousel } from '../components/ItemCarousel';
import { MapPin, Clock, Users, Pencil, Trash2 } from 'lucide-react';
import { CreateDestinoModal } from '../components/modals/CreateDestinoModal';
import { CreatePasseioModal } from '../components/modals/CreatePasseioModal';
import { CreateRoteiroModal } from '../components/modals/CreateRoteiroModal';
import { DeleteConfirmationModal } from '../components/modals/DeleteConfirmationModal';
import { EditDestinoModal } from '../components/modals/EditDestinoModal';
import { EditPasseioModal } from '../components/modals/EditPasseioModal';
import { EditRoteiroModal } from '../components/modals/editRoteiroModal';

export default function MeusRoteiros() {
    const { user } = useAuth();
    const [destinos, setDestinos] = useState<Destino[]>([]);
    const [passeios, setPasseios] = useState<Passeio[]>([]);
    const [roteiros, setRoteiros] = useState<Roteiro[]>([]);
    const [loading, setLoading] = useState({
        destinos: true,
        passeios: true,
        roteiros: true,
    });

    const [deleteModal, setDeleteModal] = useState<{
        show: boolean;
        tipo: 'destino' | 'passeio' | 'roteiro' | null;
        item: Destino | Passeio | Roteiro | null;
    }>({
        show: false,
        tipo: null,
        item: null,
    });
    const [editingDestino, setEditingDestino] = useState<Destino | null>(null);
    const [editingPasseio, setEditingPasseio] = useState<Passeio | null>(null);
    const [editingRoteiro, setEditingRoteiro] = useState<Roteiro | null>(null);

    // Estado para controlar a exibição dos modais
    const [modals, setModals] = useState({
        destino: false,
        passeio: false,
        roteiro: false,
    });

    useEffect(() => {
        if (user?.id) {
            fetchUserItems();
        }
    }, [user]);

    const fetchUserItems = async () => {
        try {
            const [destinosRes, passeiosRes, roteirosRes] = await Promise.all([
                userItemsService.getDestinos(user!.id),
                userItemsService.getPasseios(user!.id),
                userItemsService.getRoteiros(user!.id),
            ]);

            setDestinos(destinosRes.data || []);
            setPasseios(passeiosRes.data || []);
            setRoteiros(roteirosRes.data || []);
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
            // Em caso de erro, garantimos que os arrays estão vazios
            setDestinos([]);
            setPasseios([]);
            setRoteiros([]);
        } finally {
            setLoading({
                destinos: false,
                passeios: false,
                roteiros: false,
            });
        }
    };

    const getItemName = (
        item: Destino | Passeio | Roteiro,
        tipo: 'destino' | 'passeio' | 'roteiro',
    ): string => {
        switch (tipo) {
            case 'destino':
                return (item as Destino).nome;
            case 'passeio':
                return (item as Passeio).nome;
            case 'roteiro':
                return (item as Roteiro).passeio_nome || '';
            default:
                return '';
        }
    };

    const handleCreateDestino = async (data: Omit<Destino, 'id'>) => {
        try {
            await userItemsService.createDestino(data);
            fetchUserItems(); // Recarrega os dados
        } catch (error) {
            console.error('Erro ao criar destino:', error);
            throw error;
        }
    };

    const handleCreatePasseio = async (data: Omit<Passeio, 'id'>) => {
        try {
            await userItemsService.createPasseio(data);
            fetchUserItems();
        } catch (error) {
            console.error('Erro ao criar passeio:', error);
            throw error;
        }
    };

    const handleCreateRoteiro = async (
        data: Omit<Roteiro, 'id' | 'status'>,
    ) => {
        try {
            await userItemsService.createRoteiro(data);
            fetchUserItems();
        } catch (error) {
            console.error('Erro ao criar roteiro:', error);
            throw error;
        }
    };

    const handleEditDestino = async (id: number, data: Partial<Destino>) => {
        try {
            await userItemsService.updateDestino(id, data);
            await fetchUserItems();
        } catch (error) {
            console.error('Erro ao editar destino:', error);
            throw error;
        }
    };

    const handleEditPasseio = async (id: number, data: Partial<Passeio>) => {
        try {
            await userItemsService.updatePasseio(id, data);
            await fetchUserItems();
        } catch (error) {
            console.error('Erro ao editar passeio:', error);
            throw error;
        }
    };

    const handleEditRoteiro = async (id: number, data: Partial<Roteiro>) => {
        try {
            // Ajustando os nomes dos campos para o formato da API
            const apiData = {
                data: data.data,
                horaInicio: data.hora_inicio,
                horaFim: data.hora_fim,
                status: data.status,
                vagasDisponiveis: data.vagas_disponiveis,
            };

            await userItemsService.updateRoteiro(id, apiData);
            await fetchUserItems();
        } catch (error) {
            console.error('Erro ao editar roteiro:', error);
            throw error;
        }
    };

    const handleDeleteDestino = (destino: Destino) => {
        setDeleteModal({
            show: true,
            tipo: 'destino',
            item: destino,
        });
    };

    const handleDeletePasseio = (passeio: Passeio) => {
        setDeleteModal({
            show: true,
            tipo: 'passeio',
            item: passeio,
        });
    };

    const handleDeleteRoteiro = (roteiro: Roteiro) => {
        setDeleteModal({
            show: true,
            tipo: 'roteiro',
            item: roteiro,
        });
    };

    const handleConfirmDelete = async () => {
        if (!deleteModal.item || !deleteModal.tipo) return;

        try {
            switch (deleteModal.tipo) {
                case 'destino':
                    await userItemsService.deleteDestino(deleteModal.item.id);
                    break;
                case 'passeio':
                    await userItemsService.deletePasseio(deleteModal.item.id);
                    break;
                case 'roteiro':
                    await userItemsService.deleteRoteiro(deleteModal.item.id);
                    break;
            }
            await fetchUserItems();
            setDeleteModal({ show: false, tipo: null, item: null });
        } catch (error) {
            console.error('Erro ao excluir item:', error);
            throw error;
        }
    };

    const renderDestino = (destino: Destino) => (
        <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col relative group">
            {/* Menu de ações */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white rounded-lg shadow-lg p-1 flex gap-1">
                    <button
                        onClick={() => setEditingDestino(destino)}
                        className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar">
                        <Pencil size={16} />
                    </button>
                    <button
                        onClick={() => handleDeleteDestino(destino)}
                        className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Conteúdo existente */}
            <h3 className="font-semibold text-lg mb-2 line-clamp-1 pr-12">
                {destino.nome}
            </h3>
            <div className="flex flex-col gap-2 text-gray-600 text-sm flex-grow">
                <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="min-w-4 h-4 mr-2" />
                    <span className="truncate">{`${destino.cidade}, ${destino.estado}`}</span>
                </div>
                {destino.descricao && (
                    <p className="text-gray-600 text-sm line-clamp-2 flex-grow">
                        {destino.descricao}
                    </p>
                )}
            </div>
        </div>
    );

    const renderPasseio = (passeio: Passeio) => {
        const getDifficultyColor = (
            nivel: 'facil' | 'moderado' | 'dificil',
        ) => {
            switch (nivel) {
                case 'facil':
                    return 'bg-green-100 text-green-800';
                case 'moderado':
                    return 'bg-yellow-100 text-yellow-800';
                case 'dificil':
                    return 'bg-red-100 text-red-800';
                default:
                    return 'bg-gray-100 text-gray-800';
            }
        };

        return (
            <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col relative group">
                {/* Menu de ações */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="bg-white rounded-lg shadow-lg p-1 flex gap-1">
                        <button
                            onClick={() => setEditingPasseio(passeio)}
                            className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar">
                            <Pencil size={16} />
                        </button>
                        <button
                            onClick={() => handleDeletePasseio(passeio)}
                            className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Excluir">
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                <h3 className="font-semibold text-lg mb-2 line-clamp-1 pr-12">
                    {passeio.nome}
                </h3>
                <div className="flex flex-col gap-3 text-gray-600 text-sm flex-grow">
                    {/* Descrição */}
                    <p className="line-clamp-2">{passeio.descricao}</p>

                    {/* Informações básicas */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center">
                            <Clock className="min-w-4 h-4 mr-2" />
                            <span>{passeio.duracao_horas}h</span>
                        </div>
                        <div className="flex items-center">
                            <Users className="min-w-4 h-4 mr-2" />
                            <span>
                                Máx: {passeio.capacidade_maxima} pessoas
                            </span>
                        </div>
                    </div>

                    {/* Inclusões e Nível de Dificuldade */}
                    <div className="flex flex-wrap gap-2">
                        {passeio.inclui_refeicao === 1 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3 mr-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2">
                                    <path d="M18 6L6 12H2v3h4l12 6v-4m0-13v4" />
                                    <path d="M6 15h4" />
                                    <path d="M2 9h4" />
                                </svg>
                                Refeição
                            </span>
                        )}
                        {passeio.inclui_transporte === 1 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3 mr-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2">
                                    <rect
                                        x="3"
                                        y="8"
                                        width="18"
                                        height="12"
                                        rx="2"
                                    />
                                    <path d="M6 21v-4" />
                                    <path d="M18 21v-4" />
                                    <path d="M3 14h18" />
                                </svg>
                                Transporte
                            </span>
                        )}
                        <span
                            className={`
                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${getDifficultyColor(passeio.nivel_dificuldade)}
                        `}>
                            {passeio.nivel_dificuldade === 'facil' && (
                                <svg
                                    className="w-3 h-3 mr-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2">
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                    <circle cx="12" cy="12" r="10" />
                                </svg>
                            )}
                            {passeio.nivel_dificuldade === 'moderado' && (
                                <svg
                                    className="w-3 h-3 mr-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2">
                                    <path d="M8 15h8" />
                                    <circle cx="12" cy="12" r="10" />
                                </svg>
                            )}
                            {passeio.nivel_dificuldade === 'dificil' && (
                                <svg
                                    className="w-3 h-3 mr-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2">
                                    <path d="M8 9s1.5 2 4 2 4-2 4-2" />
                                    <circle cx="12" cy="12" r="10" />
                                </svg>
                            )}
                            {passeio.nivel_dificuldade.charAt(0).toUpperCase() +
                                passeio.nivel_dificuldade.slice(1)}
                        </span>
                    </div>

                    {/* Localização */}
                    <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate">
                            {passeio.cidade}, {passeio.estado}
                        </span>
                    </div>

                    {/* Preço */}
                    <div className="text-lg font-semibold text-blue-600 mt-auto">
                        R$ {Number(passeio.preco).toFixed(2)}
                    </div>
                </div>
            </div>
        );
    };

    const renderRoteiro = (roteiro: Roteiro) => (
        <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col relative group">
            {/* Menu de ações */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <div className="bg-white rounded-lg shadow-lg p-1 flex gap-1">
                    <button
                        onClick={() => setEditingRoteiro(roteiro)}
                        className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar">
                        <Pencil size={16} />
                    </button>
                    <button
                        onClick={() => handleDeleteRoteiro(roteiro)}
                        className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <h3 className="font-semibold text-lg mb-2 line-clamp-2 pr-12">
                {roteiro.passeio_nome || 'Roteiro'} -{' '}
                {new Date(roteiro.data).toLocaleDateString()}
            </h3>
            <div className="flex flex-col gap-2 text-gray-600 text-sm flex-grow">
                <div className="flex items-center">
                    <Clock className="min-w-4 h-4 mr-2" />
                    <span className="truncate">
                        {roteiro.hora_inicio} - {roteiro.hora_fim}
                    </span>
                </div>
                <div className="flex items-center">
                    <Users className="min-w-4 h-4 mr-2" />
                    <span>{roteiro.vagas_disponiveis} vagas disponíveis</span>
                </div>
                {roteiro.passeio_descricao && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {roteiro.passeio_descricao}
                    </p>
                )}
                <span
                    className={`
                        px-2 py-1 rounded-full text-xs font-medium mt-auto inline-block w-fit
                        ${
                            roteiro.status === 'agendado'
                                ? 'bg-yellow-100 text-yellow-800'
                                : roteiro.status === 'confirmado'
                                ? 'bg-green-100 text-green-800'
                                : roteiro.status === 'concluido'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                        }
                    `}>
                    {roteiro.status.charAt(0).toUpperCase() +
                        roteiro.status.slice(1)}
                </span>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
                Meus Roteiros
            </h1>

            <div className="space-y-8 sm:space-y-12">
                <ItemCarousel
                    title="Meus Destinos"
                    items={destinos}
                    renderItem={renderDestino}
                    loading={loading.destinos}
                    onCreateNew={() =>
                        setModals((prev) => ({ ...prev, destino: true }))
                    }
                />

                <ItemCarousel
                    title="Meus Passeios"
                    items={passeios}
                    renderItem={renderPasseio}
                    loading={loading.passeios}
                    onCreateNew={() =>
                        setModals((prev) => ({ ...prev, passeio: true }))
                    }
                />

                <ItemCarousel
                    title="Roteiros Agendados"
                    items={roteiros}
                    renderItem={renderRoteiro}
                    loading={loading.roteiros}
                    onCreateNew={() =>
                        setModals((prev) => ({ ...prev, roteiro: true }))
                    }
                />
            </div>

            {/* Modais */}
            <CreateDestinoModal
                isOpen={modals.destino}
                onClose={() =>
                    setModals((prev) => ({ ...prev, destino: false }))
                }
                onSubmit={handleCreateDestino}
            />

            <CreatePasseioModal
                isOpen={modals.passeio}
                onClose={() =>
                    setModals((prev) => ({ ...prev, passeio: false }))
                }
                onSubmit={handleCreatePasseio}
                destinos={destinos}
            />

            <CreateRoteiroModal
                isOpen={modals.roteiro}
                onClose={() =>
                    setModals((prev) => ({ ...prev, roteiro: false }))
                }
                onSubmit={handleCreateRoteiro}
                passeios={passeios}
            />

            <DeleteConfirmationModal
                isOpen={deleteModal.show}
                onClose={() =>
                    setDeleteModal({ show: false, tipo: null, item: null })
                }
                onConfirm={handleConfirmDelete}
                title={`Excluir ${
                    deleteModal.tipo === 'destino'
                        ? 'Destino'
                        : deleteModal.tipo === 'passeio'
                        ? 'Passeio'
                        : 'Roteiro'
                }`}
                message={
                    deleteModal.item && deleteModal.tipo
                        ? `Tem certeza que deseja excluir ${
                              deleteModal.tipo === 'destino'
                                  ? 'o destino'
                                  : deleteModal.tipo === 'passeio'
                                  ? 'o passeio'
                                  : 'o roteiro'
                          } "${getItemName(
                              deleteModal.item,
                              deleteModal.tipo,
                          )}"? Esta ação não pode ser desfeita.`
                        : ''
                }
            />

            <EditDestinoModal
                isOpen={editingDestino !== null}
                onClose={() => setEditingDestino(null)}
                onSubmit={handleEditDestino}
                destino={editingDestino}
            />
            <EditPasseioModal
                isOpen={editingPasseio !== null}
                onClose={() => setEditingPasseio(null)}
                onSubmit={handleEditPasseio}
                passeio={editingPasseio}
            />
            <EditRoteiroModal
                isOpen={editingRoteiro !== null}
                onClose={() => setEditingRoteiro(null)}
                onSubmit={handleEditRoteiro}
                roteiro={editingRoteiro}
                passeios={passeios}
            />
        </div>
    );
}
