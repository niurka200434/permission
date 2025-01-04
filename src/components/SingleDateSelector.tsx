import React from 'react';
import { Calendar } from 'lucide-react';
import { getCurrentDate } from '../utils/dateUtils';

interface SingleDateSelectorProps {
  date: string;
  onDateChange: (date: string) => void;
}

export function SingleDateSelector({ date, onDateChange }: SingleDateSelectorProps) {
  const minDate = getCurrentDate();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Fecha de solicitud
      </label>
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="date"
          value={date}
          min={minDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}