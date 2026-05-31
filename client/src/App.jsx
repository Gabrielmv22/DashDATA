// src/App.jsx
import { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import Filters from './components/Dashboard/Filters';
import KPIStats from './components/Dashboard/KPIStats';
import ChartsGrid from './components/Charts/ChartsGrid';

function App() {
  // 1. Definimos el estado inicial de nuestros filtros
  const [filters, setFilters] = useState({
    machineType: 'Todos',
    failureType: 'Todos',
    dateRange: ''
  });

  // 2. Función para manejar los cambios en los filtros
  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  // Efecto secundario para observar los cambios (útil para debug y futura conexión a BD)
  useEffect(() => {
    console.log("Filtros actualizados, listos para consultar datos:", filters);
  }, [filters]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      
      <main className="p-6 md:p-8">
        {/* 3. Pasamos el estado y la función modificadora como PROPS */}
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