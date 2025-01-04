// Función para obtener la fecha actual en formato YYYY-MM-DD
export const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Función para validar que una fecha sea futura o igual a hoy
export const isValidFutureDate = (date: string) => {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today;
};

// Función para validar el rango de fechas
export const isValidDateRange = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) return false;
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start <= end && isValidFutureDate(startDate);
};