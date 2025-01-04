import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from './Calendar';
import { useClickOutside } from '../hooks/useClickOutside';

interface DateInputProps {
  mode: 'range' | 'single';
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: { start: Date | null; end: Date | null }) => void;
}

export function DateInput({ mode, startDate, endDate, onChange }: DateInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useClickOutside(containerRef, () => setIsOpen(false));

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('es', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const displayValue = mode === 'single'
    ? formatDate(startDate)
    : startDate && endDate
      ? `${formatDate(startDate)} - ${formatDate(endDate)}`
      : '';

  return (
    <div ref={containerRef} className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full cursor-pointer"
      >
        <input
          type="text"
          readOnly
          placeholder={mode === 'single' ? "Seleccionar fecha" : "Seleccionar rango de fechas"}
          value={displayValue}
          className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        />
        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-2">
          <Calendar
            mode={mode}
            startDate={startDate}
            endDate={endDate}
            onChange={(dates) => {
              onChange(dates);
              if (mode === 'single' || (dates.start && dates.end)) {
                setIsOpen(false);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}