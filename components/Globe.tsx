'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import type { GlobeMethods } from 'react-globe.gl';
import satellite from 'satellite.js';

const GlobeGL = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function Globe({ objects }: { objects: any[] }) {
  const globeEl = useRef<GlobeMethods>();
  const [points, setPoints] = useState<any[]>([]);

  useEffect(() => {
    if (!objects || objects.length === 0) return;

    const formatted = objects.map(obj => {
      try {
        const satrec = satellite.twoline2satrec(obj.TLE_LINE1, obj.TLE_LINE2);
        const positionAndVelocity = satellite.propagate(satrec, new Date());
        const positionEci = positionAndVelocity.position;

        if (!positionEci) throw new Error('No se pudo calcular la posición');

        const gmst = satellite.gstime(new Date());
        const positionGd = satellite.eciToGeodetic(positionEci, gmst);
        const lat = satellite.degreesLat(positionGd.latitude);
        const lng = satellite.degreesLong(positionGd.longitude);

        return {
          lat,
          lng,
          size: 0.6,
          color: 'red',
          name: obj.OBJECT_NAME
        };
      } catch (error) {
        console.error(`Error calculando posición para ${obj.OBJECT_NAME}:`, error);
        return null;
      }
    }).filter(Boolean);

    setPoints(formatted);
  }, [objects]);

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden bg-black/80 border border-gray-700 p-2">
      <GlobeGL
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={points}
        pointAltitude="size"
        pointColor="color"
        pointLabel="name"
      />
    </div>
  );
}
