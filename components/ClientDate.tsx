import React, { useEffect, useState } from 'react';

interface ClientDateProps {
  date: string | number | Date;
  options?: Intl.DateTimeFormatOptions;
  locale?: string;
  type?: 'date' | 'time' | 'datetime';
  fallback?: React.ReactNode;
}

const ClientDate: React.FC<ClientDateProps> = ({
  date,
  options = {},
  locale = 'es-ES',
  type = 'date',
  fallback = 'Cargando...'
}) => {
  const [mounted, setMounted] = useState(false);
  const [formatted, setFormatted] = useState('');

  useEffect(() => {
    setMounted(true);
    if (date) {
      const d = new Date(date);
      let str = '';
      if (type === 'date') str = d.toLocaleDateString(locale, options);
      else if (type === 'time') str = d.toLocaleTimeString(locale, options);
      else str = d.toLocaleString(locale, options);
      setFormatted(str);
    }
  }, [date, locale, type, options]);

  if (!mounted) return <span>{fallback}</span>;
  return <span>{formatted}</span>;
};

export default ClientDate; 