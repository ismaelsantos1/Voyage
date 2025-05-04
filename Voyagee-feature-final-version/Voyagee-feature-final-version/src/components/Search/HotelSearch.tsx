import { MapPin, Users, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import { format, isToday, isTomorrow, addDays } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const HotelSearch = () => {
    const [guestCount, setGuestCount] = useState(1);
    const [isGuestMenuOpen, setIsGuestMenuOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [dateRange, setDateRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1), // Default para 1 dia de estadia
            key: 'selection',
        },
    ]);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsGuestMenuOpen(false);
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
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative md:col-span-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Para onde você vai?"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                </div>

                <div className="relative md:col-span-2">
                    <button
                        onClick={() => setIsCalendarOpen(true)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 hover:border-gray-400 text-left transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <MapPin className="h-5 w-5 text-gray-400 absolute left-3" />
                        <span className="text-gray-700">
                            {dateRange[0].startDate && dateRange[0].endDate
                                ? `${formatDateDisplay(dateRange[0].startDate)} - ${formatDateDisplay(dateRange[0].endDate)}`
                                : 'Check-in - Check-out'}
                        </span>
                    </button>
                </div>

                <div className="relative md:col-span-1" ref={menuRef}>
                    <button
                        onClick={() => setIsGuestMenuOpen(!isGuestMenuOpen)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 hover:border-gray-400 text-left transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <Users className="h-5 w-5 text-gray-400 absolute left-3" />
                        <span className="text-gray-700">
                            {guestCount} {guestCount === 1 ? 'Hóspede' : 'Hóspedes'}
                        </span>
                    </button>

                    {isGuestMenuOpen && (
                        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Hóspedes</span>
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center">{guestCount}</span>
                                    <button
                                        onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
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

            {/* Modal do Calendário */}
            {isCalendarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-900">Selecione as datas</h2>
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
                                direction={window.innerWidth >= 768 ? "horizontal" : "vertical"}
                                locale={ptBR}
                                weekdayDisplayFormat="EEEEEE"
                                minDate={new Date()}
                                rangeColors={['#3b82f6']}
                                className="!border-0"
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
        </>
    );
};

export default HotelSearch;