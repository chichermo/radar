// components/Dashboard.tsx
'use client'

import { useEffect, useState } from 'react'

interface DataResponse {
  data?: any;
  error?: string;
}

export default function Dashboard() {
  const [heavensData, setHeavensData] = useState<DataResponse | null>(null);
  const [satnogsData, setSatnogsData] = useState<DataResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resHeavens = await fetch('/api/heavens');
        if (!resHeavens.ok) {
          throw new Error('Failed to fetch Heavens-Above data');
        }
        const heavens = await resHeavens.json();
        setHeavensData(heavens);

        const resSatnogs = await fetch('/api/satnogs');
        if (!resSatnogs.ok) {
          throw new Error('Failed to fetch SatNOGS data');
        }
        const satnogs = await resSatnogs.json();
        setSatnogsData(satnogs);
      } catch (error) {
        console.error('Error fetching data:', error);
        setHeavensData({ error: (error as Error).message });
        setSatnogsData({ error: (error as Error).message });
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <h1>Espacio Anomalías</h1>
      <h2>Heavens Above Data</h2>
      {heavensData?.error ? (
        <p>Error: {heavensData.error}</p>
      ) : (
        <pre>{JSON.stringify(heavensData, null, 2)}</pre>
      )}
      <h2>SatNOGS Data</h2>
      {satnogsData?.error ? (
        <p>Error: {satnogsData.error}</p>
      ) : (
        <pre>{JSON.stringify(satnogsData, null, 2)}</pre>
      )}
    </main>
  );
}