// components/modals/CreatePasseioModal.tsx
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Destino } from '../../types/userItems';
import { userItemsService } from '../../services/userItemsService';

interface CreatePasseioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

export function CreatePasseioModal({ isOpen, onClose, onSubmit }: CreatePasseioModalProps) {
  const initialFormState = {
    nome: '',
    descricao: '',
    preco: '',
    duracao_horas: '',
    nivel_dificuldade: 'facil',
    inclui_refeicao: false,
    inclui_transporte: false,
    destino_id: '',
    capacidade_maxima: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [allDestinos, setAllDestinos] = useState<Destino[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchAllDestinos();
    }
  }, [isOpen]);

  const fetchAllDestinos = async () => {
    try {
      const response = await userItemsService.getAllDestinos();
      setAllDestinos(response.data);
    } catch (error) {
      console.error('Erro ao buscar destinos:', error);
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSubmit = {
        ...formData,
        preco: parseFloat(formData.preco),
        duracao_horas: parseInt(formData.duracao_horas as string),
        capacidade_maxima: parseInt(formData.capacidade_maxima as string),
        inclui_refeicao: formData.inclui_refeicao ? 1 : 0,
        inclui_transporte: formData.inclui_transporte ? 1 : 0,
        destino_id: parseInt(formData.destino_id as string)
      };
      
      await onSubmit(dataToSubmit);
      resetForm();
      onClose();
    } catch (error) {
      console.error('Erro ao criar passeio:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleClickOutside}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Criar Novo Passeio</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Passeio
            </label>
            <input
              type="text"
              value={formData.nome}
              onChange={e => setFormData(prev => ({ ...prev, nome: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              value={formData.descricao}
              onChange={e => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 p-2"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço (R$)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.preco}
                onChange={e => setFormData(prev => ({ ...prev, preco: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duração (horas)
              </label>
              <input
                type="number"
                min="1"
                value={formData.duracao_horas}
                onChange={e => setFormData(prev => ({ ...prev, duracao_horas: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 p-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nível de Dificuldade
            </label>
            <select
              value={formData.nivel_dificuldade}
              onChange={e => setFormData(prev => ({ ...prev, nivel_dificuldade: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 p-2"
              required
            >
              <option value="facil">Fácil</option>
              <option value="moderado">Moderado</option>
              <option value="dificil">Difícil</option>
            </select>
          </div>

            <div>
              <label className="block mb-1">Destino</label>
              <select
                value={formData.destino_id}
                onChange={e => setFormData(prev => ({ ...prev, destino_id: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 p-2"
                required
              >
                <option value="">Selecione um destino</option>
                {allDestinos.map(destino => (
                  <option key={destino.id} value={destino.id}>
                    {destino.nome} - {destino.cidade}, {destino.estado}
                  </option>
                ))}
              </select>
            </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacidade Máxima
            </label>
            <input
              type="number"
              min="1"
              value={formData.capacidade_maxima}
              onChange={e => setFormData(prev => ({ ...prev, capacidade_maxima: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 p-2"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="inclui_refeicao"
                checked={formData.inclui_refeicao}
                onChange={e => setFormData(prev => ({ ...prev, inclui_refeicao: e.target.checked }))}
                className="h-4 w-4 text-blue-500 rounded border-gray-300"
              />
              <label htmlFor="inclui_refeicao" className="ml-2 text-sm text-gray-700">
                Inclui Refeição
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="inclui_transporte"
                checked={formData.inclui_transporte}
                onChange={e => setFormData(prev => ({ ...prev, inclui_transporte: e.target.checked }))}
                className="h-4 w-4 text-blue-500 rounded border-gray-300"
              />
              <label htmlFor="inclui_transporte" className="ml-2 text-sm text-gray-700">
                Inclui Transporte
              </label>
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
              {loading ? 'Criando...' : 'Criar Passeio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}