"use client";

import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  ColumnFiltersState,
  GlobalFilterTableState,
} from "@tanstack/react-table";
import type { SpaceObject } from "@/types/space";
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  AlertTriangle, 
  Satellite, 
  Globe,
  Star,
  Trash2,
  Eye,
  Filter,
  SortAsc,
  SortDesc,
  Calendar,
  MapPin,
  Zap,
  EyeOff,
} from "lucide-react";
import { formatDateOnly } from '@/utils/formatters';

interface SpaceObjectsTableProps {
  objects: SpaceObject[];
  error?: string;
}

const columnHelper = createColumnHelper<SpaceObject>();

const COLORS = {
  earth: "#3fa7d6",
  satellite: "#ffd700",
  asteroid: "#ff5e5b",
  debris: "#bdbdbd",
  hazardous: "#ff2e63",
};

// Función para calcular el próximo acercamiento (simulada)
const calculateNextApproach = (object: SpaceObject) => {
  if (!object.distance || !object.velocity) return null;
  
  // Simulación más realista basada en datos orbitales
  const speed = Math.sqrt(object.velocity.x ** 2 + object.velocity.y ** 2 + object.velocity.z ** 2);
  
  // Calcular período orbital aproximado (simulado)
  const orbitalPeriod = Math.max(1, Math.floor(365 / (speed * 0.1))); // Días
  
  // Calcular días hasta el próximo acercamiento
  const daysToApproach = Math.floor(Math.random() * orbitalPeriod) + 1;
  
  // Calcular distancia de acercamiento (más realista)
  let approachDistance;
  if (object.type === 'asteroid') {
    // Asteroides pueden acercarse más
    approachDistance = Math.max(object.distance * 0.05, 500); // 5% de la distancia actual o mínimo 500km
  } else if (object.type === 'satellite') {
    // Satélites tienen órbitas más estables
    approachDistance = Math.max(object.distance * 0.8, 200); // 80% de la distancia actual o mínimo 200km
  } else {
    // Basura espacial
    approachDistance = Math.max(object.distance * 0.1, 1000); // 10% de la distancia actual o mínimo 1000km
  }
  
  // Ajustar distancia si es peligroso
  if (object.isHazardous) {
    approachDistance = Math.min(approachDistance, 5000); // Máximo 5000km para objetos peligrosos
  }
  
  const approachDate = new Date(Date.now() + daysToApproach * 24 * 60 * 60 * 1000);
  
  return {
    days: daysToApproach,
    distance: approachDistance,
    date: approachDate,
    isClose: approachDistance < 10000, // Considerar "cercano" si está a menos de 10,000km
    isDangerous: object.isHazardous && approachDistance < 5000 // Peligroso si está a menos de 5000km
  };
};

export default function SpaceObjectsTable({ objects = [], error }: SpaceObjectsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRowExpansion = (objectId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(objectId)) {
      newExpanded.delete(objectId);
    } else {
      newExpanded.add(objectId);
    }
    setExpandedRows(newExpanded);
  };

  const getObjectIcon = (type: string, isHazardous: boolean) => {
    if (isHazardous) return <AlertTriangle className="w-4 h-4 text-red-400" />;
    switch (type) {
      case "satellite": return <Satellite className="w-4 h-4 text-yellow-400" />;
      case "asteroid": return <Star className="w-4 h-4 text-orange-400" />;
      case "debris": return <Trash2 className="w-4 h-4 text-gray-400" />;
      default: return <Globe className="w-4 h-4 text-blue-400" />;
    }
  };

  const getDistanceColor = (distance: number) => {
    if (distance < 1000) return "text-red-400 font-semibold";
    if (distance < 10000) return "text-orange-400 font-semibold";
    if (distance < 50000) return "text-yellow-400 font-semibold";
    return "text-green-400 font-semibold";
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleRowExpansion(info.getValue())}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              {expandedRows.has(info.getValue()) ? (
                <ChevronDown className="w-4 h-4 text-gray-300" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-300" />
              )}
            </button>
            <span className="font-mono text-sm text-gray-200">{info.getValue()}</span>
          </div>
        ),
        size: 100,
      }),
      columnHelper.accessor("name", {
        header: "Nombre",
        cell: (info) => (
          <div className="flex items-center space-x-2">
            {getObjectIcon(info.row.original.type, info.row.original.isHazardous)}
            <span className="font-medium text-gray-100">{info.getValue()}</span>
          </div>
        ),
        size: 200,
      }),
      columnHelper.accessor("type", {
        header: "Tipo",
        cell: (info) => {
          const type = info.getValue();
          const isHazardous = info.row.original.isHazardous;
          const typeLabels = {
            satellite: "Satélite",
            asteroid: "Asteroide",
            debris: "Basura espacial",
            earth: "Tierra",
          };
          return (
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                isHazardous 
                  ? "bg-red-900/50 text-red-300 border border-red-700" 
                  : type === "satellite" 
                    ? "bg-yellow-900/50 text-yellow-300 border border-yellow-700"
                    : type === "asteroid"
                      ? "bg-orange-900/50 text-orange-300 border border-orange-700"
                      : type === "debris"
                        ? "bg-gray-800/50 text-gray-300 border border-gray-600"
                        : "bg-blue-900/50 text-blue-300 border border-blue-700"
              }`}>
                {typeLabels[type as keyof typeof typeLabels] || type}
                {isHazardous && " ⚠️"}
              </span>
            </div>
          );
        },
        size: 150,
      }),
      columnHelper.accessor("isHazardous", {
        header: "Peligroso",
        cell: (info) => {
          const isHazardous = info.getValue();
          return (
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                isHazardous 
                  ? "bg-red-900/50 text-red-300 border border-red-700" 
                  : "bg-green-900/50 text-green-300 border border-green-700"
              }`}>
                {isHazardous ? "⚠️ Sí" : "✅ No"}
              </span>
            </div>
          );
        },
        size: 100,
      }),
      columnHelper.accessor("position", {
        header: "Posición",
        cell: (info) => {
          const pos = info.getValue();
          return (
            <div className="text-sm text-gray-300">
              <div>X: {pos?.x?.toFixed(2) || "N/A"}</div>
              <div>Y: {pos?.y?.toFixed(2) || "N/A"}</div>
              <div>Z: {pos?.z?.toFixed(2) || "N/A"}</div>
            </div>
          );
        },
        size: 120,
      }),
      columnHelper.accessor("velocity", {
        header: "Velocidad",
        cell: (info) => {
          const vel = info.getValue();
          if (!vel) return <span className="text-gray-500">N/A</span>;
          const speed = Math.sqrt(vel.x ** 2 + vel.y ** 2 + vel.z ** 2);
          return (
            <div className="text-sm">
              <div className="font-medium text-gray-100">{speed.toFixed(2)} km/s</div>
              <div className="text-gray-400 text-xs">
                Vx: {vel.x?.toFixed(2)}, Vy: {vel.y?.toFixed(2)}, Vz: {vel.z?.toFixed(2)}
              </div>
            </div>
          );
        },
        size: 150,
      }),
      columnHelper.accessor("distance", {
        header: "Distancia & Próximo Acercamiento",
        cell: (info) => {
          const distance = info.getValue();
          const object = info.row.original;
          const nextApproach = calculateNextApproach(object);
          
          if (!distance) return <span className="text-gray-500">N/A</span>;
          
          return (
            <div className="space-y-2">
              <div className={`${getDistanceColor(distance)}`}>
                {distance.toLocaleString()} km
              </div>
              {nextApproach && (
                <div className="text-xs space-y-1">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className={`${nextApproach.isDangerous ? 'text-red-400 font-semibold' : nextApproach.isClose ? 'text-orange-400' : 'text-gray-400'}`}>
                      Próximo: {formatDateOnly(nextApproach.date)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className={`${nextApproach.isDangerous ? 'text-red-400 font-semibold' : nextApproach.isClose ? 'text-orange-400' : 'text-gray-400'}`}>
                      Dist: {nextApproach.distance.toLocaleString()} km
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-gray-400" />
                    <span className={`${nextApproach.isDangerous ? 'text-red-400 font-semibold' : nextApproach.isClose ? 'text-orange-400' : 'text-gray-400'}`}>
                      En {nextApproach.days} días
                    </span>
                  </div>
                  {nextApproach.isDangerous && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertTriangle className="w-3 h-3 text-red-400" />
                      <span className="text-red-400 font-semibold text-xs">
                        ¡ACERCAMIENTO PELIGROSO!
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        },
        size: 200,
      }),
      columnHelper.accessor("lastUpdated", {
        header: "Última actualización",
        cell: (info) => {
          const date = info.getValue();
          if (!date) return <span className="text-gray-500">N/A</span>;
          return <span className="text-gray-300">{new Date(date).toLocaleString("es-ES")}</span>;
        },
        size: 180,
      }),
    ],
    [expandedRows]
  );

  const table = useReactTable({
    data: objects,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 text-center">
        <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-300 mb-2">Error al cargar datos</h3>
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header con estadísticas */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-100">Objetos Espaciales</h2>
            <p className="text-gray-400 mt-1">
              {objects.length} objetos detectados • Última actualización: {formatDateOnly(new Date())}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-700">
              {objects.filter(obj => obj.type === "satellite").length} Satélites
            </div>
            <div className="bg-orange-900/50 text-orange-300 px-3 py-1 rounded-full text-sm font-medium border border-orange-700">
              {objects.filter(obj => obj.type === "asteroid").length} Asteroides
            </div>
            <div className="bg-gray-800/50 text-gray-300 px-3 py-1 rounded-full text-sm font-medium border border-gray-600">
              {objects.filter(obj => obj.type === "debris").length} Basura espacial
            </div>
            <div className="bg-red-900/50 text-red-300 px-3 py-1 rounded-full text-sm font-medium border border-red-700">
              {objects.filter(obj => obj.isHazardous).length} Peligrosos
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar objetos..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={columnFilters.find(f => f.id === "type")?.value as string || ""}
              onChange={(e) => {
                const filter = e.target.value;
                if (filter) {
                  table.getColumn("type")?.setFilterValue(filter);
                } else {
                  table.getColumn("type")?.setFilterValue(undefined);
                }
              }}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
            >
              <option value="">Todos los tipos</option>
              <option value="satellite">Satélites</option>
              <option value="asteroid">Asteroides</option>
              <option value="debris">Basura espacial</option>
            </select>
            <select
              value={columnFilters.find(f => f.id === "isHazardous")?.value as string || ""}
              onChange={(e) => {
                const filter = e.target.value;
                if (filter) {
                  table.getColumn("isHazardous")?.setFilterValue(filter === "true");
                } else {
                  table.getColumn("isHazardous")?.setFilterValue(undefined);
                }
              }}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
            >
              <option value="">Todos los objetos</option>
              <option value="true">Solo peligrosos</option>
              <option value="false">Solo seguros</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900 border-b border-gray-700">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center space-x-1 ${
                            header.column.getCanSort() ? "cursor-pointer select-none" : ""
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <span>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </span>
                          {header.column.getCanSort() && (
                            <div className="flex flex-col">
                              {header.column.getIsSorted() === "asc" ? (
                                <SortAsc className="w-3 h-3 text-blue-400" />
                              ) : header.column.getIsSorted() === "desc" ? (
                                <SortDesc className="w-3 h-3 text-blue-400" />
                              ) : (
                                <div className="flex flex-col">
                                  <ChevronUp className="w-3 h-3 text-gray-500" />
                                  <ChevronDown className="w-3 h-3 text-gray-500" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <tr className="hover:bg-gray-700 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-sm text-gray-200">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                  {expandedRows.has(row.original.id) && (
                    <tr>
                      <td colSpan={columns.length} className="px-4 py-4 bg-gray-900">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-100 mb-3">
                            Detalles de {row.original.name}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                              <h5 className="font-medium text-gray-300 mb-2">Información General</h5>
                              <div className="space-y-1 text-sm text-gray-400">
                                <div><span className="font-medium text-gray-300">ID:</span> {row.original.id}</div>
                                <div><span className="font-medium text-gray-300">Nombre:</span> {row.original.name}</div>
                                <div><span className="font-medium text-gray-300">Tipo:</span> {row.original.type}</div>
                                <div><span className="font-medium text-gray-300">Peligroso:</span> {row.original.isHazardous ? "Sí" : "No"}</div>
                              </div>
                            </div>
                            <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                              <h5 className="font-medium text-gray-300 mb-2">Posición 3D</h5>
                              <div className="space-y-1 text-sm text-gray-400">
                                <div><span className="font-medium text-gray-300">X:</span> {row.original.position?.x?.toFixed(4) || "N/A"}</div>
                                <div><span className="font-medium text-gray-300">Y:</span> {row.original.position?.y?.toFixed(4) || "N/A"}</div>
                                <div><span className="font-medium text-gray-300">Z:</span> {row.original.position?.z?.toFixed(4) || "N/A"}</div>
                                <div><span className="font-medium text-gray-300">Distancia:</span> {row.original.distance?.toLocaleString() || "N/A"} km</div>
                              </div>
                            </div>
                            <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                              <h5 className="font-medium text-gray-300 mb-2">Velocidad</h5>
                              <div className="space-y-1 text-sm text-gray-400">
                                <div><span className="font-medium text-gray-300">Vx:</span> {row.original.velocity?.x?.toFixed(4) || "N/A"} km/s</div>
                                <div><span className="font-medium text-gray-300">Vy:</span> {row.original.velocity?.y?.toFixed(4) || "N/A"} km/s</div>
                                <div><span className="font-medium text-gray-300">Vz:</span> {row.original.velocity?.z?.toFixed(4) || "N/A"} km/s</div>
                                <div><span className="font-medium text-gray-300">Magnitud:</span> {row.original.velocity ? Math.sqrt(row.original.velocity.x ** 2 + row.original.velocity.y ** 2 + row.original.velocity.z ** 2).toFixed(4) : "N/A"} km/s</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer con información de paginación */}
        <div className="bg-gray-900 px-4 py-3 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-300">
              Mostrando {table.getFilteredRowModel().rows.length} de {objects.length} objetos
            </div>
            <div className="text-sm text-gray-400">
              {table.getFilteredRowModel().rows.length > 0 && (
                <>
                  Objetos peligrosos: {table.getFilteredRowModel().rows.filter(row => row.original.isHazardous).length} • 
                  Objetos cercanos (&lt;10,000 km): {table.getFilteredRowModel().rows.filter(row => row.original.distance && row.original.distance < 10000).length}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 