"use client";
import { useState, useEffect } from 'react';
import { Users, Globe, Calendar, Award, MapPin, Clock } from 'lucide-react';
import ClientDate from '@/components/ClientDate';
import React from 'react';

interface PersonInSpace {
  name: string;
  craft: string;
  nationality: string;
  mission: string;
  launch_date: string;
  days_in_space: number;
  role: string;
}

interface PeopleInSpaceData {
  message: string;
  number: number;
  people: PersonInSpace[];
  statistics: {
    total_people: number;
    by_craft: { [key: string]: number };
    by_nationality: { [key: string]: number };
    longest_stay: PersonInSpace;
  };
  note?: string;
}

export default function PeopleInSpacePage() {
  const [data, setData] = useState<PeopleInSpaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPeopleInSpace();
  }, []);

  const fetchPeopleInSpace = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/people-in-space');
      if (!response.ok) {
        throw new Error('Error obteniendo datos');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
            <p className="text-white mt-4">Cargando datos de personas en el espacio...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-red-400 text-xl">Error: {error}</p>
            <button 
              onClick={fetchPeopleInSpace}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Personas en el Espacio</h1>
        <p className="subtitle max-w-2xl mx-auto">Consulta cuántas personas están actualmente en el espacio, sus misiones y naves espaciales activas.</p>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Personas en el Espacio</h1>
          <p className="text-lg text-gray-300">
            Actualmente hay {data.number} personas orbitando la Tierra
          </p>
          {data.note && (
            <p className="text-sm text-yellow-400 mt-2">{data.note}</p>
          )}
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-8 w-8 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Total de Personas</h3>
            </div>
            <p className="text-3xl font-bold text-blue-400">{data.statistics.total_people}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-8 w-8 text-green-400" />
              <h3 className="text-xl font-bold text-white">Naves Espaciales</h3>
            </div>
            <p className="text-3xl font-bold text-green-400">
              {Object.keys(data.statistics.by_craft).length}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-8 w-8 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Más Tiempo en el Espacio</h3>
            </div>
            <p className="text-3xl font-bold text-purple-400">
              {data.statistics.longest_stay.days_in_space} días
            </p>
          </div>
        </div>

        {/* Distribución por nacionalidad */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-10">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Globe className="h-6 w-6 text-blue-400" />
            Distribución por Nacionalidad
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(data.statistics.by_nationality).map(([nationality, count]) => (
              <div key={nationality} className="text-center">
                <p className="text-2xl font-bold text-blue-400">{count}</p>
                <p className="text-gray-300 text-sm">{nationality}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de personas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.people.map((person, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{person.name}</h3>
                  <p className="text-sm text-gray-400">{person.role}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300">{person.craft}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">{person.nationality}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-purple-400" />
                  <span className="text-gray-300">{person.mission}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-400" />
                  <span className="text-gray-300">{person.days_in_space} días en el espacio</span>
                </div>

                <div className="text-xs text-gray-500">
                  Lanzamiento: <ClientDate 
                    date={person.launch_date} 
                    type="date" 
                    options={{
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 