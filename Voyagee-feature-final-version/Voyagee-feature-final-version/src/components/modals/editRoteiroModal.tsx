// components/modals/EditRoteiroModal.tsx
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Roteiro, Passeio } from '../../types/userItems';

interface EditRoteiroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: number, data: Partial<Roteiro>) => Promise<void>;
  roteiro: Roteiro | null;
  passeios: Passeio[];
}

export function EditRoteiroModal({ isOpen, onClose, onSubmit, roteiro }: EditRoteiroModalProps) {
  const [formData, setFormData] = useState({
    data: '',
    hora_inicio: '',
    hora_fim: '',
    vagas_disponiveis: '',
    status: 'agendado' as 'agendado' | 'confirmado' | 'concluido' | 'cancelado'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (roteiro) {
      setFormData({
        data: roteiro.data.split('T')[0], // Formatando a data para YYYY-MM-DD
        hora_inicio: roteiro.hora_inicio,
        hora_fim: roteiro.hora_fim,
        vagas_disponiveis: String(roteiro.vagas_disponiveis),
        status: roteiro.status
      });
    }
  }, [roteiro]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roteiro) return;

    setLoading(true);
    setError('');

    try {
      await onSubmit(roteiro.id, {
        ...formData,
        vagas_disponiveis: Number(formData.vagas_disponiveis)
      });
      onClose();
    } catch (err) {
      setError('Erro ao atualizar roteiro. Tente novamente.');
      console.error('Erro ao atualizar:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !roteiro) return null;

  // Calcula a data mínima (hoje)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Editar Roteiro</h2>
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
              Data do Roteiro
            </label>
            <input
              type="date"
              min={today}
              value={formData.data}
              onChange={e => setFormData(prev => ({ ...prev, data: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                value={formData.hora_inicio}
                onChange={e => setFormData(prev => ({ ...prev, hora_inicio: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hora de Término
              </label>
              <input
                type="time"
                value={formData.hora_fim}
                onChange={e => setFormData(prev => ({ ...prev, hora_fim: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              min="0"
              value={formData.vagas_disponiveis}
              onChange={e => setFormData(prev => ({ ...prev, vagas_disponiveis: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
              className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="agendado">Agendado</option>
              <option value="confirmado">Confirmado</option>
              <option value="concluido">Concluído</option>
              <option value="cancelado">Cancelado</option>
            </select>
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