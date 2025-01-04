import React, { useState } from 'react';
import { Upload, Building2, Umbrella, Home, Users, User } from 'lucide-react';
import { DateInput } from './components/DateInput';
import { TimeInput } from './components/TimeInput';

function App() {
  const [requestType, setRequestType] = useState('days');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedPermission, setSelectedPermission] = useState('compensation');

  const permissions = [
    { id: 'compensation', name: 'COMPENSACIÓN', icon: Building2 },
    { id: 'vacation', name: 'CARGO VACACIONES', icon: Umbrella },
    { id: 'domestic', name: 'CALAMIDAD DOMESTICA', icon: Home },
    { id: 'medical', name: 'ATENCIÓN MEDICA', icon: Users },
    { id: 'institutional', name: 'INSTITUCIONAL', icon: Building2 },
    { id: 'field', name: 'SALIDA A CAMPO', icon: User }
  ];

  const handleDateChange = ({ start, end }: { start: Date | null; end: Date | null }) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requestType === 'days' && (!startDate || !endDate)) {
      alert('Por favor seleccione un rango de fechas válido');
      return;
    }
    if (requestType === 'hours' && (!startDate || !startTime || !endTime)) {
      alert('Por favor seleccione una fecha y horario válido');
      return;
    }
    // Aquí iría la lógica de envío del formulario
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Resumen de Permisos</h1>
          <div className="flex gap-4 text-sm">
            <div className="px-4 py-2 bg-gray-100 rounded-md">
              <span className="text-gray-600">Permisos Totales:</span>
              <span className="ml-2 font-semibold">0</span>
            </div>
            <div className="px-4 py-2 bg-green-100 rounded-md">
              <span className="text-green-600">Permisos Aprobados:</span>
              <span className="ml-2 font-semibold">0</span>
            </div>
            <div className="px-4 py-2 bg-red-100 rounded-md">
              <span className="text-red-600">Permisos Rechazados:</span>
              <span className="ml-2 font-semibold">0</span>
            </div>
          </div>
        </div>

        {/* Permission Types Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {permissions.map((permission) => (
            <button
              key={permission.id}
              onClick={() => setSelectedPermission(permission.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedPermission === permission.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-blue-200'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <permission.icon className={`w-6 h-6 ${
                  selectedPermission === permission.id ? 'text-blue-500' : 'text-gray-600'
                }`} />
                <span className={`text-sm font-medium ${
                  selectedPermission === permission.id ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {permission.name}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Request Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex gap-4 mb-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="requestType"
                value="days"
                checked={requestType === 'days'}
                onChange={(e) => {
                  setRequestType(e.target.value);
                  setStartDate(null);
                  setEndDate(null);
                }}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Solicitar por días</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="requestType"
                value="hours"
                checked={requestType === 'hours'}
                onChange={(e) => {
                  setRequestType(e.target.value);
                  setStartDate(null);
                  setEndDate(null);
                }}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Solicitar por horas</span>
            </label>
          </div>

          <div className="mb-6 space-y-4">
            <DateInput
              mode={requestType === 'days' ? 'range' : 'single'}
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateChange}
            />
            
            {requestType === 'hours' && (
              <div className="grid md:grid-cols-2 gap-4">
                <TimeInput
                  label="Hora de inicio"
                  value={startTime}
                  onChange={setStartTime}
                />
                <TimeInput
                  label="Hora de fin"
                  value={endTime}
                  onChange={setEndTime}
                />
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Razón
            </label>
            <textarea
              rows={4}
              placeholder="Ingrese el motivo de la solicitud"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adjuntar Documento
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-400 transition-colors">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Arrastra un documento para adjuntar</span>
                    <input type="file" className="sr-only" />
                  </label>
                </div>
                <p className="text-xs text-gray-500">o examinar</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Solicitar permiso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}