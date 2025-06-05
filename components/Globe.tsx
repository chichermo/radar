'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, MutableRefObject, forwardRef } from 'react';
import { GlobeMethods } from 'react-globe.gl';
import * as satellite from 'satellite.js';

const GlobeGL = dynamic(() => import('react-globe.gl'), { ssr: false });

interface TLEObject {
  TLE_LINE1: string;
  TLE_LINE2: string;
  OBJECT_NAME: string;
}

function ErrorAlert({ message }: { message: string }) {
  return (
    <div className="p-2 bg-red-100 border border-red-500 text-red-700 rounded">
      Error: {message}
    </div>
  );
}

function Loading() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  );
}

const Globe = forwardRef<GlobeMethods, { objects: TLEObject[] }>(({ objects }, ref) => {
  const [points, setPoints] = useState<{ lat: number; lng: number; size: number; color: string; name: string; }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const validTLEObjects = (objects || []).filter(obj => obj && obj.TLE_LINE1 && obj.TLE_LINE2);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      const formatted = validTLEObjects.map((obj) => {
        try {
          const satrec = satellite.twoline2satrec(obj.TLE_LINE1, obj.TLE_LINE2);
          const positionAndVelocity = satellite.propagate(satrec, new Date());

          if (!positionAndVelocity || !positionAndVelocity.position) {
            throw new Error("No se pudo calcular la posición");
          }

          const positionEci = positionAndVelocity.position;
          const gmst = satellite.gstime(new Date());
          const positionGd = satellite.eciToGeodetic(positionEci, gmst);

          const lat = satellite.degreesLat(positionGd.latitude);
          const lng = satellite.degreesLong(positionGd.longitude);

          return { lat, lng, size: 0.5, color: 'red', name: obj.OBJECT_NAME };
        } catch (err) {
          console.error("Error calculando posición para", obj.OBJECT_NAME, err);
          return null;
        }
      }).filter((item): item is { lat: number; lng: number; size: number; color: string; name: string; } => item !== null);
      setPoints(formatted);
    } catch (err) {
      setError("Error al procesar los datos de TLE.");
    } finally {
      setIsLoading(false);
    }
  }, [objects]);

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden bg-black/80 border border-gray-700 p-2">
      {isLoading ? <Loading /> : error ? <ErrorAlert message={error} /> : (
         <GlobeGL
           ref={ref as any}
           globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
           backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
           pointsData={points}
         />
      )}
    </div>
  );
});

Globe.displayName = 'Globe';

export default Globe;
