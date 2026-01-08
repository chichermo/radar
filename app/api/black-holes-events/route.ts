import { NextResponse } from 'next/server';

// Datos reales de eventos de agujeros negros documentados
// Fuentes: LIGO-Virgo, Event Horizon Telescope, observatorios profesionales
const realBlackHoleEvents = [
  {
    fecha: '2019-04-10',
    evento: 'Primera imagen de un agujero negro - M87*',
    tipo: 'Observación histórica',
    masa: '6.5 mil millones M☉',
    distancia: '55 millones de años luz',
    observatorio: 'Event Horizon Telescope',
    importancia: 'Muy Alta',
    descripcion: 'Primera imagen directa de un agujero negro, confirmando la teoría de la relatividad de Einstein',
    referencia: 'Astrophysical Journal Letters, 2019'
  },
  {
    fecha: '2022-05-12',
    evento: 'Primera imagen de Sagitario A*',
    tipo: 'Observación histórica',
    masa: '4.1 millones M☉',
    distancia: '26,000 años luz',
    observatorio: 'Event Horizon Telescope',
    importancia: 'Muy Alta',
    descripcion: 'Primera imagen del agujero negro en el centro de nuestra galaxia',
    referencia: 'Astrophysical Journal Letters, 2022'
  },
  {
    fecha: '2019-05-21',
    evento: 'GW190521 - Fusión de agujeros negros',
    tipo: 'Onda Gravitacional',
    masa: '142 M☉ (masa final)',
    distancia: '5,000 millones de años luz',
    observatorio: 'LIGO-Virgo',
    importancia: 'Muy Alta',
    descripcion: 'Fusión más masiva detectada hasta la fecha, creando un agujero negro de masa intermedia',
    referencia: 'Physical Review Letters, 2020'
  },
  {
    fecha: '2017-08-14',
    evento: 'GW170814 - Primera detección con tres detectores',
    tipo: 'Onda Gravitacional',
    masa: '53.4 M☉ (masa final)',
    distancia: '1,800 millones de años luz',
    observatorio: 'LIGO-Virgo',
    importancia: 'Alta',
    descripcion: 'Primera detección de ondas gravitacionales con tres detectores simultáneos',
    referencia: 'Physical Review Letters, 2017'
  },
  {
    fecha: '2021-09-27',
    evento: 'Descubrimiento de agujero negro más cercano - Gaia BH1',
    tipo: 'Descubrimiento',
    masa: '9.6 M☉',
    distancia: '1,560 años luz',
    observatorio: 'Gaia Space Telescope',
    importancia: 'Alta',
    descripcion: 'Agujero negro estelar más cercano a la Tierra descubierto',
    referencia: 'Monthly Notices of the Royal Astronomical Society, 2022'
  }
];

export async function GET() {
  try {
    // Ordenar por fecha más reciente
    const sortedEvents = realBlackHoleEvents
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      .map(event => ({
        fecha: event.fecha,
        evento: event.evento,
        tipo: event.tipo,
        masa: event.masa,
        distancia: event.distancia,
        observatorio: event.observatorio,
        importancia: event.importancia,
        descripcion: event.descripcion,
        referencia: event.referencia
      }));

    return NextResponse.json({ success: true, data: sortedEvents });
  } catch (error) {
    console.error('Error fetching black hole events:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener datos de agujeros negros' },
      { status: 500 }
    );
  }
}
