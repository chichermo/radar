
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { GlobeMethods } from 'react-globe.gl';
import * as satellite from 'satellite.js';

const GlobeGL = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function Globe({ objects }: { objects: any[] }) {
  const globeEl = useRef<GlobeMethods | null>(null);
  const [points, setPoints] = useState<
    {
      lat: number;
      lng: number;
      size: number;
      color: string;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    const formatted = objects.map(obj => {
      try {
        const satrec = satellite.twoline2satrec(obj.TLE_LINE1, obj.TLE_LINE2);
        const positionAndVelocity = satellite.propagate(satrec, new Date());
        const positionEci = positionAndVelocity.position;
        if (!positionEci) throw new Error("No se pudo calcular la posición");

        const gmst = satellite.gstime(new Date());
        const positionGd = satellite.eciToGeodetic(positionEci, gmst);
        const latitude = satellite.degreesLat(positionGd.latitude);
        const longitude = satellite.degreesLong(positionGd.longitude);

        return {
          lat: latitude,
          lng: longitude,
          size: 1,
          color: 'cyan',
          name: obj.OBJECT_NAME
        };
      } catch (error) {
        console.error("Error calculando posición para", obj.OBJECT_NAME, error);
        return null;
      }
    }).filter(Boolean) as {
      lat: number;
      lng: number;
      size: number;
      color: string;
      name: string;
    }[];

    setPoints(formatted);
  }, [objects]);

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden bg-black/80 border border-gray-700 p-2">
      <GlobeGL
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={points}
        pointLat={(d) => d.lat}
        pointLng={(d) => d.lng}
        pointAltitude={0.01}
        pointColor={(d) => d.color}
        pointLabel={(d) => d.name}
      />
    </div>
  );
}
