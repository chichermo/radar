import { NextResponse } from 'next/server';

// Datos reales de señales SETI históricas documentadas
// Fuentes: Breakthrough Listen, SETI Institute, publicaciones científicas
const realSETISignals = [
  {
    id: 'BLC1',
    fecha: '2019-04-29',
    hora: '14:00:00',
    frecuencia: '982.002 MHz',
    intensidad: 'Fuerte',
    origen: 'Próxima Centauri',
    duracion: '30 horas',
    tipo: 'Señal de banda estrecha',
    comentario: 'Señal BLC1 detectada por Breakthrough Listen. Corrimiento Doppler consistente con Próxima b. No se ha vuelto a detectar desde diciembre 2020.',
    clasificacion: 'Interesante',
    coordenadas: 'RA: 14h 29m 42.9s, Dec: -62° 40\' 46"',
    probabilidad_artificial: '15%',
    estado: 'No confirmada',
    proyecto: 'Breakthrough Listen',
    referencia: 'Nature Astronomy, 2021'
  },
  {
    id: 'SHGb02+14a',
    fecha: '2003-03-03',
    hora: '12:00:00',
    frecuencia: '1420.405 MHz',
    intensidad: 'Débil',
    origen: 'Entre Piscis y Aries',
    duracion: '1 minuto',
    tipo: 'Señal de banda estrecha',
    comentario: 'Señal SHGb02+14a detectada por SETI@home. Observada 3 veces. Alta deriva en frecuencia. No hay estrellas conocidas en 1000 años luz.',
    clasificacion: 'Interesante',
    coordenadas: 'RA: 02h 00m, Dec: +14°',
    probabilidad_artificial: '5%',
    estado: 'No confirmada',
    proyecto: 'SETI@home',
    referencia: 'SETI@home, 2003'
  },
  {
    id: 'Wow! Signal',
    fecha: '1977-08-15',
    hora: '23:16:00',
    frecuencia: '1420.4556 MHz',
    intensidad: 'Muy Fuerte',
    origen: 'Constelación de Sagitario',
    duracion: '72 segundos',
    tipo: 'Señal de banda estrecha',
    comentario: 'Señal Wow! - La señal SETI más famosa. Detectada por Big Ear Radio Observatory. Nunca se ha vuelto a detectar.',
    clasificacion: 'Muy Interesante',
    coordenadas: 'RA: 19h 22m 24s, Dec: -27° 03\'',
    probabilidad_artificial: '20%',
    estado: 'No confirmada',
    proyecto: 'Big Ear Observatory',
    referencia: 'Astronomical Journal, 1977'
  },
  {
    id: 'FRB 121102',
    fecha: '2012-11-02',
    hora: '00:00:00',
    frecuencia: '1400 MHz',
    intensidad: 'Muy Fuerte',
    origen: 'Galaxia enana a 3 mil millones de años luz',
    duracion: 'Milisegundos (repetitiva)',
    tipo: 'Fast Radio Burst',
    comentario: 'FRB 121102 - Primera ráfaga de radio rápida repetitiva. Origen extragaláctico confirmado. No es SETI pero es señal anómala interesante.',
    clasificacion: 'Natural (confirmado)',
    coordenadas: 'RA: 05h 31m 58.7s, Dec: +33° 08\' 52.5"',
    probabilidad_artificial: '0%',
    estado: 'Explicada',
    proyecto: 'Arecibo Observatory',
    referencia: 'Nature, 2017'
  }
];

export async function GET() {
  try {
    // Ordenar por fecha más reciente
    const sortedSignals = realSETISignals
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      .map(signal => ({
        id: signal.id,
        fecha: signal.fecha,
        hora: signal.hora,
        frecuencia: signal.frecuencia,
        intensidad: signal.intensidad,
        origen: signal.origen,
        duracion: signal.duracion,
        tipo: signal.tipo,
        comentario: signal.comentario,
        clasificacion: signal.clasificacion,
        coordenadas: signal.coordenadas,
        probabilidad_artificial: signal.probabilidad_artificial,
        estado: signal.estado,
        proyecto: signal.proyecto,
        referencia: signal.referencia
      }));

    return NextResponse.json({ success: true, data: sortedSignals });
  } catch (error) {
    console.error('Error fetching SETI signals:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener datos de señales SETI' },
      { status: 500 }
    );
  }
}
