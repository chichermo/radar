'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Viewer, Entity, EntityDescription } from 'resium';
import { Cartesian3, Color, JulianDate, TimeInterval, TimeIntervalCollection } from 'cesium';
import type { SpaceObject } from '@/types/space';

interface SkyMapProps {
  objects: SpaceObject[];
  showTrajectories?: boolean;
}

export default function SkyMap({ objects = [], showTrajectories = true }: SkyMapProps) {
  const [selectedObject, setSelectedObject] = useState<SpaceObject | null>(null);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    if (viewerRef.current && objects.length > 0) {
      // Centrar la vista en el primer objeto
      const firstObject = objects[0];
      viewerRef.current.camera.flyTo({
        destination: Cartesian3.fromDegrees(
          firstObject.position.x,
          firstObject.position.y,
          firstObject.position.z
        ),
        duration: 2
      });
    }
  }, [objects]);

  const calculateTrajectory = (object: SpaceObject) => {
    if (!object.velocity) return null;

    const startTime = JulianDate.now();
    const stopTime = JulianDate.addHours(startTime, 24, new JulianDate());
    const positions: Cartesian3[] = [];

    // Calcular posiciones futuras cada hora
    for (let i = 0; i <= 24; i++) {
      const time = JulianDate.addHours(startTime, i, new JulianDate());
      const position = new Cartesian3(
        object.position.x + object.velocity.x * i,
        object.position.y + object.velocity.y * i,
        object.position.z + object.velocity.z * i
      );
      positions.push(position);
    }

    return new TimeIntervalCollection([
      new TimeInterval({
        start: startTime,
        stop: stopTime,
        data: positions
      })
    ]);
  };

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      <Viewer
        ref={viewerRef}
        full
        timeline={false}
        animation={false}
        baseLayerPicker={false}
        navigationHelpButton={false}
        homeButton={false}
        geocoder={false}
        sceneModePicker={false}
        skyBox={false}
        skyAtmosphere={false}
        contextOptions={{
          webgl: {
            alpha: true
          }
        }}
      >
        {objects.map((object) => {
          const position = Cartesian3.fromDegrees(
            object.position.x,
            object.position.y,
            object.position.z
          );

          const trajectory = showTrajectories ? calculateTrajectory(object) : null;
          const size = Math.max(object.size.min, object.size.max) * 1000; // Escalar para mejor visualización

          return (
            <Entity
              key={object.id}
              position={position}
              name={object.name}
              description={
                `\n${object.name}\nTipo: ${object.type === 'asteroid' ? 'Asteroide' : 'Satélite'}\nTamaño: ${object.size.min.toFixed(1)} - ${object.size.max.toFixed(1)} metros\n` +
                (object.isHazardous ? '¡Objeto potencialmente peligroso!\n' : '') +
                (object.orbit ? `Órbita:\n  Eje semi-mayor: ${object.orbit.semiMajorAxis.toFixed(2)} km\n  Excentricidad: ${object.orbit.eccentricity.toFixed(4)}\n  Inclinación: ${object.orbit.inclination.toFixed(2)}°\n` : '') +
                `Última actualización: ${new Date(object.lastUpdated).toLocaleString()}`
              }
              point={{
                pixelSize: size,
                color: object.isHazardous ? Color.RED : Color.WHITE,
                outlineColor: Color.BLACK,
                outlineWidth: 2
              }}
              path={trajectory ? {
                resolution: 1,
                material: Color.YELLOW.withAlpha(0.5),
                width: 2,
                leadTime: 24 * 3600, // 24 horas en segundos
                trailTime: 0
              } : undefined}
              onClick={() => setSelectedObject(object)}
            />
          );
        })}
      </Viewer>

      {selectedObject && (
        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-sm">
          <h3 className="text-lg font-semibold mb-2">{selectedObject.name}</h3>
          <p className="text-sm text-gray-600">
            Tipo: {selectedObject.type === 'asteroid' ? 'Asteroide' : 'Satélite'}
          </p>
          {selectedObject.isHazardous && (
            <p className="text-red-500 font-medium mt-2">
              ¡Objeto potencialmente peligroso!
            </p>
          )}
          <button
            onClick={() => setSelectedObject(null)}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800"
          >
            Cerrar
          </button>
        </div>
      )}

      <p className="mt-2 text-sm">{(objects?.length ?? 0)} objetos en el mapa</p>
    </div>
  );
}