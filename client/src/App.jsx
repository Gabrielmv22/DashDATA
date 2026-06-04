// src/App.jsx
import { useState, useEffect } from 'react';
import { db } from './firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import datosLocales from './datosMaquinas.json'; 

import Header from './components/Layout/Header';
import Filters from './components/Dashboard/Filters';
import KPIStats from './components/Dashboard/KPIStats';
import ChartsGrid from './components/Charts/ChartsGrid';

function App() {
  const [subiendo, setSubiendo] = useState(false);

  // Estado de filtros
  const [filters, setFilters] = useState({
    machineType: 'Todos',
    failureType: 'Todos',
    dateRange: ''
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const poblarFirestore = async () => {
    if (!datosLocales || datosLocales.length === 0) {
      alert("El archivo JSON no tiene datos.");
      return;
    }

    if (window.confirm(`¿Estás seguro de que quieres subir ${datosLocales.length} registros?`)) {
      try {
        setSubiendo(true);
        const colRef = collection(db, "mediciones");

        for (const item of datosLocales) {
          await addDoc(colRef, item);
        }

        alert("¡Todos los datos se subieron con éxito!");
      } catch (error) {
        console.error("Error:", error);
        alert(`Hubo un error: ${error.message}`);
      } finally {
        setSubiendo(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      
      {/* BOTÓN TEMPORAL DE SIEMBRA */}
      <div className="bg-yellow-100 p-4 text-center border-b border-yellow-300">
        <p className="text-sm text-yellow-800 mb-2 font-medium">
          Panel de Control de Datos (Eliminar antes de entregar)
        </p>
        <button
          onClick={poblarFirestore}
          disabled={subiendo}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded shadow disabled:opacity-50"
        >
          {subiendo ? "Subiendo registros..." : `Subir ${datosLocales.length} registros a Firebase`}
        </button>
      </div>

      <main className="p-6 md:p-8">
        <Filters currentFilters={filters} onFilterChange={handleFilterChange} />
        <KPIStats />
        <ChartsGrid />
      </main>

      <footer className="text-center p-4 text-sm text-slate-500 mt-10">
        Dashboard Mantenimiento Predictivo v0.1 - {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;