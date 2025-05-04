// components/Roteiros/RoteiroFilters.tsx
import { useState } from 'react';
import { Calendar, Filter } from 'lucide-react';

interface RoteiroFiltersProps {
  onFilterChange: (filters: RoteiroFilters) => void;
}

interface RoteiroFilters {
  status?: string;
  data?: string;
  destino?: number;
}

export function RoteiroFilters({ onFilterChange }: RoteiroFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<RoteiroFilters>({
    status: '',
    data: '',
    destino: undefined
  });

  const handleApplyFilters = () => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '' && value !== undefined)
    );
    onFilterChange(activeFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        <Filter size={20} />
        <span className="font-medium">Filtros</span>
      </button>

      {isOpen && (
        <>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={e => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 p-2"
              >
                <option value="">Todos</option>
                <option value="agendado">Agendado</option>
                <option value="confirmado">Confirmado</option>
                <option value="concluido">Concluído</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.data}
                  onChange={e => setFilters(prev => ({ ...prev, data: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 p-2 pl-10"
                  min={new Date().toISOString().split('T')[0]}
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => {
                setFilters({ status: '', data: '', destino: undefined });
                onFilterChange({});
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Limpar Filtros
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Aplicar Filtros
            </button>
          </div>
        </>
      )}
    </div>
  );
}