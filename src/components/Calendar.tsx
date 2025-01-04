import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  mode: 'range' | 'single';
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: { start: Date | null; end: Date | null }) => void;
}

export function Calendar({ mode, startDate, endDate, onChange }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  
  // Obtener el primer día del mes actual
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const startingDayIndex = firstDayOfMonth.getDay();
  
  // Obtener el último día del mes actual
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const totalDays = lastDayOfMonth.getDate();
  
  // Crear array de días del mes
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
  
  // Función para verificar si una fecha es anterior a hoy
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  
  // Función para verificar si una fecha está seleccionada
  const isSelected = (date: Date) => {
    if (!startDate) return false;
    if (mode === 'single') {
      return date.toDateString() === startDate.toDateString();
    }
    if (!endDate) return date.toDateString() === startDate.toDateString();
    return date >= startDate && date <= endDate;
  };
  
  // Función para manejar la selección de fechas
  const handleDateClick = (date: Date) => {
    if (isPastDate(date)) return;
    
    if (mode === 'single') {
      onChange({ start: date, end: null });
      return;
    }
    
    if (!startDate || (startDate && endDate) || date < startDate) {
      onChange({ start: date, end: null });
    } else {
      onChange({ start: startDate, end: date });
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Header del calendario */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {currentMonth.toLocaleDateString('es', { month: 'long', year: 'numeric' })}
        </h2>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>
      
      {/* Grid de días */}
      <div className="grid grid-cols-7 gap-1">
        {/* Espacios vacíos para alinear el primer día */}
        {Array.from({ length: startingDayIndex }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        
        {/* Días del mes */}
        {daysArray.map((day) => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
          const isDisabled = isPastDate(date);
          const isDateSelected = isSelected(date);
          
          return (
            <button
              key={day}
              onClick={() => handleDateClick(date)}
              disabled={isDisabled}
              className={`
                h-10 rounded-full flex items-center justify-center text-sm
                ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-50'}
                ${isDateSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
      
      {/* Leyenda */}
      {mode === 'range' && (
        <div className="mt-4 text-sm text-gray-600">
          {!startDate && 'Selecciona la fecha inicial'}
          {startDate && !endDate && 'Selecciona la fecha final'}
          {startDate && endDate && (
            <span>
              {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
            </span>
          )}
        </div>
      )}
    </div>
  );
}