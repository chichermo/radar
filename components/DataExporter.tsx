"use client";

import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, FileJson } from 'lucide-react';

export interface ExportData {
  id: string;
  name: string;
  data: any;
  timestamp: Date;
  type: 'observations' | 'discoveries' | 'statistics' | 'images';
}

interface DataExporterProps {
  data: ExportData[];
  onExport: (format: string, data: ExportData[]) => void;
}

export const DataExporter: React.FC<DataExporterProps> = ({ data, onExport }) => {
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isExporting, setIsExporting] = useState(false);

  const formats = [
    { id: 'csv', name: 'CSV', icon: FileSpreadsheet, description: 'Excel compatible' },
    { id: 'json', name: 'JSON', icon: FileJson, description: 'Datos estructurados' },
    { id: 'pdf', name: 'PDF', icon: FileText, description: 'Reporte formateado' },
    { id: 'txt', name: 'Texto', icon: FileText, description: 'Formato simple' },
  ];

  const handleSelectAll = () => {
    if (selectedData.length === data.length) {
      setSelectedData([]);
    } else {
      setSelectedData(data.map(item => item.id));
    }
  };

  const handleExport = async () => {
    if (selectedData.length === 0) return;

    setIsExporting(true);
    
    try {
      const filteredData = data.filter(item => selectedData.includes(item.id));
      await onExport(selectedFormat, filteredData);
    } catch (error) {
      console.error('Error exporting data:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToCSV = (data: ExportData[]) => {
    const headers = ['ID', 'Nombre', 'Tipo', 'Fecha', 'Datos'];
    const csvContent = [
      headers.join(','),
      ...data.map(item => [
        item.id,
        `"${item.name}"`,
        item.type,
        item.timestamp.toISOString(),
        `"${JSON.stringify(item.data).replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    downloadFile(csvContent, 'data.csv', 'text/csv');
  };

  const exportToJSON = (data: ExportData[]) => {
    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, 'data.json', 'application/json');
  };

  const exportToPDF = async (data: ExportData[]) => {
    // Simulated PDF export
    const pdfContent = `
      <html>
        <head>
          <title>Reporte de Datos</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Reporte de Datos</h1>
          <p>Generado el: ${new Date().toLocaleString('es-ES')}</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              ${data.map(item => `
                <tr>
                  <td>${item.id}</td>
                  <td>${item.name}</td>
                  <td>${item.type}</td>
                  <td>${item.timestamp.toLocaleString('es-ES')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    downloadFile(pdfContent, 'report.html', 'text/html');
  };

  const exportToTXT = (data: ExportData[]) => {
    const txtContent = data.map(item => 
      `ID: ${item.id}\nNombre: ${item.name}\nTipo: ${item.type}\nFecha: ${item.timestamp.toLocaleString('es-ES')}\nDatos: ${JSON.stringify(item.data)}\n\n`
    ).join('---\n');

    downloadFile(txtContent, 'data.txt', 'text/plain');
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFormatExport = async (data: ExportData[]) => {
    switch (selectedFormat) {
      case 'csv':
        exportToCSV(data);
        break;
      case 'json':
        exportToJSON(data);
        break;
      case 'pdf':
        await exportToPDF(data);
        break;
      case 'txt':
        exportToTXT(data);
        break;
      default:
        exportToCSV(data);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Download className="h-5 w-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Exportar Datos</h3>
          <p className="text-sm text-gray-400">Selecciona el formato y los datos a exportar</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Rango de fechas
          </label>
          <div className="flex space-x-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tipo de datos
          </label>
          <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
            <option value="all">Todos los tipos</option>
            <option value="observations">Observaciones</option>
            <option value="discoveries">Descubrimientos</option>
            <option value="statistics">Estadísticas</option>
            <option value="images">Imágenes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Formato de exportación
          </label>
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
          >
            {formats.map(format => (
              <option key={format.id} value={format.id}>
                {format.name} - {format.description}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Formatos disponibles */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Formatos disponibles</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {formats.map(format => (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format.id)}
              className={`p-3 rounded-lg border transition-colors ${
                selectedFormat === format.id
                  ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                  : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
              }`}
            >
              <format.icon className="h-5 w-5 mb-2" />
              <div className="text-xs font-medium">{format.name}</div>
              <div className="text-xs text-gray-400">{format.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Lista de datos */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-300">
            Datos disponibles ({data.length})
          </h4>
          <button
            onClick={handleSelectAll}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            {selectedData.length === data.length ? 'Deseleccionar todo' : 'Seleccionar todo'}
          </button>
        </div>
        
        <div className="max-h-64 overflow-y-auto space-y-2">
          {data.map(item => (
            <label key={item.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedData.includes(item.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedData(prev => [...prev, item.id]);
                  } else {
                    setSelectedData(prev => prev.filter(id => id !== item.id));
                  }
                }}
                className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-white">{item.name}</div>
                <div className="text-xs text-gray-400">
                  {item.type} • {item.timestamp.toLocaleString('es-ES')}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Botón de exportación */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          {selectedData.length} de {data.length} elementos seleccionados
        </div>
        <button
          onClick={handleExport}
          disabled={selectedData.length === 0 || isExporting}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
        >
          {isExporting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Download className="h-4 w-4" />
          )}
          <span>{isExporting ? 'Exportando...' : 'Exportar'}</span>
        </button>
      </div>
    </div>
  );
}; 