"use client";

import React, { useRef, useEffect, useState } from "react";
import type { SpaceObject } from "@/types/space";

interface SkyMapProps {
  objects: SpaceObject[];
  error?: string;
}

const COLORS = {
  earth: "#3fa7d6",
  satellite: "#ffd700",
  asteroid: "#ff5e5b",
  debris: "#bdbdbd",
  hazardous: "#ff2e63",
};

const LEGEND = [
  { color: COLORS.satellite, label: "Satélite" },
  { color: COLORS.asteroid, label: "Asteroide" },
  { color: COLORS.debris, label: "Basura espacial" },
  { color: COLORS.hazardous, label: "Peligroso" },
];

// Utilidades para calcular distancia y ángulo a partir de x, y, z
function getDistance(pos: { x: number; y: number; z: number }) {
  return Math.sqrt(pos.x ** 2 + pos.y ** 2 + pos.z ** 2);
}
function getAngle(pos: { x: number; y: number; z: number }) {
  return Math.atan2(pos.y, pos.x);
}

// Función para obtener el color del objeto
function getColor(obj: SpaceObject) {
  if (obj.isHazardous) return COLORS.hazardous;
  if (obj.type === "satellite") return COLORS.satellite;
  if (obj.type === "asteroid") return COLORS.asteroid;
  if (obj.type === "debris") return COLORS.debris;
  return COLORS.earth;
}

// Nueva función para calcular posiciones de etiquetas distribuidas
function getLabelPosition(cx: number, cy: number, i: number, total: number, width: number, height: number) {
  const angle = (2 * Math.PI * i) / total;
  const radius = Math.min(width, height) * 0.45 + 60;
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

// Función para obtener la posición real del objeto en el canvas
function getCanvasPosition(obj: SpaceObject, width: number, height: number) {
  if (!obj.position) return { x: width / 2, y: height / 2 };
  
  const cx = width / 2;
  const cy = height / 2;
  const earthRadius = Math.min(width, height) * 0.09;
  const maxDist = 1; // Normalizar a 1 para simplificar
  
  const dist = getDistance(obj.position);
  const distNorm = dist / maxDist;
  const angle = getAngle(obj.position);
  const r = earthRadius + distNorm * (height * 0.38);
  
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

export default function SkyMap({ objects = [], error }: SkyMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<SpaceObject | null>(null);
  const [selected, setSelected] = useState<SpaceObject | null>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 600 });

  // Asegurar que objects sea siempre un array
  const safeObjects = Array.isArray(objects) ? objects : [];

  // Responsive - usar el ancho completo del contenedor
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = Math.max(600, containerWidth * 0.6); // Proporción 5:3
        setDimensions({ 
          width: containerWidth, 
          height: containerHeight 
        });
      }
    }
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dibujo principal
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Establecer las dimensiones del canvas
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fondo con estrellas
    ctx.save();
    ctx.fillStyle = "#181c2b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 120; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2 + 0.5,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = "rgba(255,255,255," + (Math.random() * 0.5 + 0.2) + ")";
      ctx.fill();
    }
    ctx.restore();

    // Centro: Tierra
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const earthRadius = Math.min(canvas.width, canvas.height) * 0.08;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, earthRadius, 0, 2 * Math.PI);
    ctx.fillStyle = COLORS.earth;
    ctx.shadowColor = "#1e90ff";
    ctx.shadowBlur = 30;
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.font = "bold 24px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("Tierra", cx, cy + 8);
    ctx.restore();

    // Escala de distancias (círculos concéntricos)
    const maxDist = Math.max(...safeObjects.map(o => o.position ? getDistance(o.position) : 1), 1);
    const rings = [0.25, 0.5, 0.75, 1];
    rings.forEach((r, i) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, earthRadius + r * (canvas.height * 0.35), 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([10, 15]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = "14px sans-serif";
      ctx.fillStyle = "#aaa";
      ctx.fillText(
        `${Math.round(r * maxDist).toLocaleString()} km`,
        cx + earthRadius + r * (canvas.height * 0.35) + 50,
        cy - 5
      );
      ctx.restore();
    });

    // Dibuja los objetos y sus etiquetas con líneas
    const total = safeObjects.length;
    safeObjects.forEach((obj, i) => {
      if (!obj.position) return;
      
      // Calcula posición real del objeto
      const pos = getCanvasPosition(obj, dimensions.width, dimensions.height);
      
      // Calcula posición de la etiqueta
      const labelPos = getLabelPosition(cx, cy, i, total, dimensions.width, dimensions.height);
      
      // Dibuja la trayectoria si existe
      if (obj.orbit) {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(
          cx,
          cy,
          earthRadius + (obj.orbit.semiMajorAxis || 0) * (canvas.height * 0.35) / maxDist,
          earthRadius + (obj.orbit.semiMajorAxis || 0) * (1 - (obj.orbit.eccentricity || 0)) * (canvas.height * 0.35) / maxDist,
          ((obj.orbit.inclination || 0) * Math.PI) / 180,
          0,
          2 * Math.PI
        );
        ctx.strokeStyle = obj.isHazardous ? COLORS.hazardous : "rgba(255,255,255,0.1)";
        ctx.lineWidth = obj.isHazardous ? 3 : 1.5;
        ctx.setLineDash(obj.isHazardous ? [10, 8] : [5, 10]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }
      
      // Línea del objeto a la etiqueta
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(labelPos.x, labelPos.y);
      ctx.strokeStyle = getColor(obj);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
      
      // Dibuja el objeto
      ctx.save();
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, obj.isHazardous ? 12 : 8, 0, 2 * Math.PI);
      ctx.fillStyle = getColor(obj);
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = obj.isHazardous ? 20 : 10;
      ctx.fill();
      ctx.restore();
      
      // Dibuja la etiqueta
      ctx.save();
      ctx.font = "14px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = labelPos.x < cx ? "right" : "left";
      ctx.textBaseline = "middle";
      ctx.fillText(obj.name, labelPos.x, labelPos.y);
      ctx.restore();
    });
  }, [safeObjects, dimensions, hovered]);

  // Interactividad: hover y click
  function handleCanvasEvent(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    let found: SpaceObject | null = null;
    safeObjects.forEach((obj) => {
      if (!obj.position) return;
      const pos = getCanvasPosition(obj, dimensions.width, dimensions.height);
      const d = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
      if (d < (obj.isHazardous ? 20 : 15)) found = obj;
    });
    setHovered(found);
    if (e.type === "click") setSelected(found);
  }

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: "100%", 
        height: "100%",
        display: "flex", 
        flexDirection: "column",
        alignItems: "flex-start"
      }}
    >
      <div style={{ 
        width: "100%", 
        height: dimensions.height, 
        position: "relative",
        marginBottom: 20
      }}>
        <canvas
          ref={canvasRef}
          style={{ 
            width: "100%", 
            height: "100%", 
            borderRadius: 16, 
            cursor: hovered ? "pointer" : "default", 
            background: "#16161a",
            display: "block"
          }}
          onMouseMove={handleCanvasEvent}
          onClick={handleCanvasEvent}
          onMouseLeave={() => setHovered(null)}
        />
        {/* Leyenda */}
        <div style={{ position: "absolute", top: 16, right: 16, background: "#232946cc", borderRadius: 12, padding: 16, fontSize: 14, color: "#fff", zIndex: 2, minWidth: 180 }}>
          <b>Leyenda</b>
          <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0 0" }}>
            {LEGEND.map((item) => (
              <li key={item.label} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                <span style={{ display: "inline-block", width: 12, height: 12, borderRadius: "50%", background: item.color, marginRight: 8 }} />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        {/* Tooltip */}
        {hovered && hovered.position && (
          <div style={{
            position: "absolute",
            left: `${Math.min(dimensions.width - 300, Math.max(0, getCanvasPosition(hovered, dimensions.width, dimensions.height).x + 20))}px`,
            top: `${Math.max(0, getCanvasPosition(hovered, dimensions.width, dimensions.height).y - 60)}px`,
            background: "#232946f2",
            color: "#fff",
            borderRadius: 12,
            padding: "12px 16px",
            fontSize: 14,
            pointerEvents: "none",
            zIndex: 10,
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
          }}>
            <b>{hovered.name}</b><br />
            {hovered.isHazardous && <span style={{ color: COLORS.hazardous, fontWeight: 600 }}>¡Peligroso!</span>}<br />
            <span>Distancia: {getDistance(hovered.position).toLocaleString()} km</span>
          </div>
        )}
        {/* Panel de detalles */}
        {selected && selected.position && (
          <div style={{
            position: "absolute",
            left: 20,
            top: 20,
            background: "#232946f2",
            color: "#fff",
            borderRadius: 16,
            padding: "24px 32px",
            fontSize: 16,
            zIndex: 20,
            minWidth: 400,
            maxWidth: 600,
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <b style={{ fontSize: 20 }}>{selected.name}</b>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#fff", fontSize: 24, cursor: "pointer" }}>&#10005;</button>
            </div>
            <hr style={{ border: 0, borderTop: "2px solid #444", margin: "12px 0 16px 0" }} />
            <div><b>Tipo:</b> {selected.type}</div>
            {selected.isHazardous && <div style={{ color: COLORS.hazardous, fontWeight: 600 }}>¡Objeto potencialmente peligroso!</div>}
            <div><b>Distancia actual:</b> {getDistance(selected.position).toLocaleString()} km</div>
            {selected.orbit && (
              <div>
                <b>Órbita:</b> a={selected.orbit.semiMajorAxis?.toLocaleString()} km, e={selected.orbit.eccentricity}, i={selected.orbit.inclination}&deg;
              </div>
            )}
            {typeof (selected as any).infoUrl === 'string' && (
              <div style={{ marginTop: 12 }}>
                <a href={(selected as any).infoUrl} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.satellite, textDecoration: "underline" }}>Más información</a>
              </div>
            )}
          </div>
        )}
        {/* Mensaje de error o vacío */}
        {error && <div style={{ color: "#ff2e63", textAlign: "center", marginTop: 20, fontSize: 16 }}>{error}</div>}
      </div>
      <p className="mt-2 text-sm" style={{ color: "#fff", margin: 0 }}>{safeObjects?.length || 0} objetos en el mapa</p>
    </div>
  );
}