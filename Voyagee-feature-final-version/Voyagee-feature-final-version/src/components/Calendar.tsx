import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
    onSelect: (dates: { start: Date | null; end: Date | null }) => void;
    onClose: () => void;
    initialDates?: {
        start: Date | null;
        end: Date | null;
    };
}

const Calendar = ({ onSelect, onClose }: CalendarProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState<{
        start: Date | null;
        end: Date | null;
    }>({
        start: null,
        end: null,
    });
    const [hoverDate, setHoverDate] = useState<Date | null>(null);

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const handleDateClick = (date: Date) => {
        if (
            !selectedDates.start ||
            (selectedDates.start && selectedDates.end)
        ) {
            setSelectedDates({ start: date, end: null });
            setHoverDate(null);
        } else {
            if (date < selectedDates.start) {
                setSelectedDates({ start: date, end: null });
            } else {
                setSelectedDates({ start: selectedDates.start, end: date });
                onSelect({ start: selectedDates.start, end: date });
                onClose();
            }
        }
    };

    const handleDateHover = (date: Date) => {
        if (selectedDates.start && !selectedDates.end) {
            setHoverDate(date);
        }
    };

    const isDateInRange = (date: Date) => {
        if (!selectedDates.start) return false;

        const start = selectedDates.start;
        const end = selectedDates.end || hoverDate;

        if (!end) return false;

        const isInRange =
            start < end
                ? date >= start && date <= end
                : date >= end && date <= start;

        return isInRange;
    };

    const renderCalendar = (monthOffset: number = 0) => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + monthOffset;
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const days = [];

        // Preenchimento dos dias vazios no início
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-10" />);
        }

        // Dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isSelected =
                date.toDateString() === selectedDates.start?.toDateString() ||
                date.toDateString() === selectedDates.end?.toDateString();
            const isInRange = isDateInRange(date);
            const isStartDate =
                date.toDateString() === selectedDates.start?.toDateString();
            const isEndDate =
                date.toDateString() ===
                (selectedDates.end || hoverDate)?.toDateString();

            days.push(
                <button
                    key={day}
                    onClick={() => handleDateClick(date)}
                    onMouseEnter={() => handleDateHover(date)}
                    onMouseLeave={() => setHoverDate(null)}
                    className={`
                      relative h-10 w-10 flex items-center justify-center transition-colors
                      ${isSelected ? 'z-10' : ''}
                      ${
                          isStartDate
                              ? 'bg-blue-500 text-white rounded-full hover:bg-blue-600'
                              : ''
                      }
                      ${
                          isEndDate && !isStartDate // Adicionamos !isStartDate para não conflitar
                              ? 'bg-blue-500 text-white rounded-full hover:bg-blue-600'
                              : ''
                      }
                      ${isInRange && !isSelected ? 'bg-blue-100' : ''}
                      ${
                          !isSelected && !isInRange
                              ? 'hover:bg-gray-100 rounded-full'
                              : ''
                      }
                      ${
                          (isStartDate && !isEndDate) ||
                          (isEndDate && !isStartDate)
                              ? 'after:absolute after:inset-0 after:w-1/2 after:h-full after:bg-blue-100 after:-z-10'
                              : ''
                      }
                      ${
                          isStartDate
                              ? 'after:right-0'
                              : isEndDate
                              ? 'after:left-0'
                              : ''
                      }
                  `}>
                    {day}
                </button>,
            );
        }

        return days;
    };

    const monthNames = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ];

    return (
        <div
            className="bg-white rounded-lg shadow-xl p-4 absolute top-full left-0 mt-2 w-[660px] z-50"
            onMouseLeave={() => setHoverDate(null)}>
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() =>
                        setCurrentDate(
                            new Date(
                                currentDate.setMonth(
                                    currentDate.getMonth() - 1,
                                ),
                            ),
                        )
                    }
                    className="p-1 hover:bg-gray-100 rounded-full">
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex space-x-24">
                    <span className="font-medium">
                        {monthNames[currentDate.getMonth()]}{' '}
                        {currentDate.getFullYear()}
                    </span>
                    <span className="font-medium">
                        {monthNames[(currentDate.getMonth() + 1) % 12]}{' '}
                        {currentDate.getMonth() === 11
                            ? currentDate.getFullYear() + 1
                            : currentDate.getFullYear()}
                    </span>
                </div>
                <button
                    onClick={() =>
                        setCurrentDate(
                            new Date(
                                currentDate.setMonth(
                                    currentDate.getMonth() + 1,
                                ),
                            ),
                        )
                    }
                    className="p-1 hover:bg-gray-100 rounded-full">
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            <div className="flex space-x-8">
                {[0, 1].map((offset) => (
                    <div key={offset} className="flex-1">
                        <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-2">
                            {[
                                'Dom',
                                'Seg',
                                'Ter',
                                'Qua',
                                'Qui',
                                'Sex',
                                'Sáb',
                            ].map((day) => (
                                <div key={day}>{day}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {renderCalendar(offset)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
