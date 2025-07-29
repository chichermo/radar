// Utilidades para formateo consistente de números y fechas
// Esto evita errores de hidratación en Next.js

/**
 * Formatea un número usando el formato inglés para consistencia entre servidor y cliente
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('es-ES');
};

/**
 * Formatea un número con unidades específicas
 */
export const formatNumberWithUnit = (num: number, unit: string): string => {
  return `${formatNumber(num)} ${unit}`;
};

/**
 * Formatea una fecha usando el formato inglés para consistencia
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Formatea una fecha solo con fecha (sin hora)
 */
export const formatDateOnly = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Formatea una fecha solo con hora
 */
export const formatTimeOnly = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Formatea una fecha y hora completa de manera consistente
 */
export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

/**
 * Formatea una distancia en kilómetros
 */
export const formatDistance = (distanceKm: number): string => {
  return formatNumberWithUnit(Math.round(distanceKm), 'km');
};

/**
 * Formatea una velocidad en km/s
 */
export const formatVelocity = (velocityKmS: number): string => {
  return `${formatNumber(velocityKmS)} km/s`;
};

/**
 * Formatea un ángulo en grados
 */
export const formatAngle = (angleDegrees: number): string => {
  return `${angleDegrees.toFixed(1)}°`;
}; 