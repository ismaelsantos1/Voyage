// components/modals/EditPasseioModal.tsx
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Passeio } from '../../types/userItems';

interface EditPasseioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: number, data: Partial<Passeio>) => Promise<void>;
  passeio: Passeio | null;
}

export function EditPasseioModal({ isOpen, onClose, onSubmit, passeio }: EditPasseioModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    duracao_horas: '',
    nivel_dificuldade: 'facil' as 'facil' | 'moderado' | 'dificil',
    inclui_refeicao: false,
    inclui_transporte: false,
    capacidade_maxima: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (passeio) {
      setFormData({
        nome: passeio.nome,
        descricao: passeio.descricao,
        preco: passeio.preco.toString(),
        duracao_horas: passeio.duracao_horas.toString(),
        nivel_dificuldade: passeio.nivel_dificuldade,
        inclui_refeicao: Boolean(passeio.inclui_refeicao),
        inclui_transporte: Boolean(passeio.inclui_transporte),
        capacidade_maxima: passeio.capacidade_maxima.toString()
      });
    }
  }, [passeio]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passeio) return;

    if (isNaN(Number(formData.preco))) {
      setError('Por favor, insira um preço válido');
      return;
    }
  
    setLoading(true);
    setError('');
  
    try {
      const dataToUpdate = {
        ...formData,
        preco: formData.preco, // Mantém como string
        duracao_horas: Number(formData.duracao_horas),
        capacidade_maxima: Number(formData.capacidade_maxima),
        inclui_refeicao: formData.inclui_refeicao ? 1 : 0,
        inclui_transporte: formData.inclui_transporte ? 1 : 0
      };
  
      await onSubmit(passeio.id, dataToUpdate);
      onClose();
    } catch (err) {
      setError('Erro ao atualizar passeio. Tente novamente.');
      console.error('Erro ao atualizar:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Editar Passeio</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Passeio
            </label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                onChange={(e) => setFormData(prev => ({ ...prev, preco: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                onChange={(e) => setFormData(prev => ({ ...prev, duracao_horas: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              onChange={(e) => setFormData(prev => ({ ...prev, nivel_dificuldade: e.target.value as 'facil' | 'moderado' | 'dificil' }))}
              className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="facil">Fácil</option>
              <option value="moderado">Moderado</option>
              <option value="dificil">Difícil</option>
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
              onChange={(e) => setFormData(prev => ({ ...prev, capacidade_maxima: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="inclui_refeicao"
                checked={formData.inclui_refeicao}
                onChange={(e) => setFormData(prev => ({ ...prev, inclui_refeicao: e.target.checked }))}
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
                onChange={(e) => setFormData(prev => ({ ...prev, inclui_transporte: e.target.checked }))}
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
              disabled={loading}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⋯</span>
                  Salvando...
                </>
              ) : (
                'Salvar Alterações'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}