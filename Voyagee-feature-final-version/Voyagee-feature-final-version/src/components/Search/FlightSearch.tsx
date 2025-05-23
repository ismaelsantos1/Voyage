import { useState, useRef, useEffect } from 'react';
import { Plane, Calendar, Users, X } from 'lucide-react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import { format, isToday, isTomorrow, addDays } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const FlightSearch = () => {
  const [tripType, setTripType] = useState<'round' | 'one-way'>('round');
  const [passengersCount, setPassengersCount] = useState(1);
  const [isPassengersMenuOpen, setIsPassengersMenuOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsPassengersMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDateDisplay = (date: Date) => {
    if (isToday(date)) {
      return 'Hoje';
    }
    if (isTomorrow(date)) {
      return 'Amanhã';
    }
    return format(date, 'dd MMM', { locale: ptBR });
  };

  const handleDateSelect = (ranges: RangeKeyDict) => {
    setDateRange([ranges.selection]);
  };

  const handleDateConfirm = () => {
    setIsCalendarOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setTripType('round')}
          className={`px-4 py-2 rounded-full text-sm ${
            tripType === 'round'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          } transition-colors`}
        >
          Ida e volta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Plane className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="De onde?"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-0 focus:border-gray-400 transition-colors"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Plane className="h-5 w-5 text-gray-400 transform rotate-90" />
          </div>
          <input
            type="text"
            placeholder="Para onde?"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-0 focus:border-gray-400 transition-colors"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setIsCalendarOpen(true)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 hover:border-gray-400 text-left transition-colors"
          >
            <Calendar className="h-5 w-5 text-gray-400 absolute left-3" />
            <span>
              {dateRange[0].startDate && dateRange[0].endDate
                ? `${formatDateDisplay(dateRange[0].startDate)} - ${
                    tripType === 'round'
                      ? formatDateDisplay(dateRange[0].endDate!)
                      : ''
                  }`
                : 'Selecione a data'}
            </span>
          </button>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsPassengersMenuOpen(!isPassengersMenuOpen)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 hover:border-gray-400 text-left transition-colors flex items-center"
          >
            <Users className="h-5 w-5 text-gray-400 absolute left-3" />
            <span>
              {passengersCount}{' '}
              {passengersCount === 1 ? 'Passageiro' : 'Passageiros'}
            </span>
          </button>

          {isPassengersMenuOpen && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Passageiros</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      setPassengersCount(Math.max(1, passengersCount - 1))
                    }
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{passengersCount}</span>
                  <button
                    onClick={() =>
                      setPassengersCount(Math.min(10, passengersCount + 1))
                    }
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isCalendarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Selecione as datas
              </h2>
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <DateRange
                onChange={handleDateSelect}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                months={window.innerWidth >= 768 ? 2 : 1}
                direction={window.innerWidth >= 768 ? 'horizontal' : 'vertical'}
                locale={ptBR}
                minDate={new Date()}
                rangeColors={['#3b82f6']}
                showMonthAndYearPickers={true}
                showDateDisplay={false}
              />
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDateConfirm}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
