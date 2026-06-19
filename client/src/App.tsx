// client/src/App.jsx
import { useState, useEffect } from 'react';
import { db } from './firebase'; 
import { collection, getDocs } from 'firebase/firestore'; // Cambiamos addDoc por getDocs

import Header from './components/Layout/Header';
import Filters from './components/Dashboard/Filters';
import KPIStats from './components/Dashboard/KPIStats';
import ChartsGrid from './components/Charts/ChartsGrid';

function App() {
  // Estados para manejar los datos
  const [datosFirebase, setDatosFirebase] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estado de filtros
  const [filters, setFilters] = useState({
    machineType: 'Todos',
    failureType: 'Todos',
    dateRange: ''
  });

  // Efecto para LEER los datos de Firebase al cargar la app
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        setCargando(true);
        const colRef = collection(db, "mediciones");
        const snapshot = await getDocs(colRef);
        
        // Mapeamos los documentos a un arreglo de objetos normal
        const datosExtraidos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setDatosFirebase(datosExtraidos);
        console.log("Datos descargados de Firebase:", datosExtraidos);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, []); // El arreglo vacío [] significa que esto se ejecuta solo 1 vez al inicio

  // Manejador de filtros
  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      
      <main className="p-6 md:p-8">
        <Filters currentFilters={filters} onFilterChange={handleFilterChange} />
        
        {cargando ? (
          <div className="text-center py-10 font-bold text-slate-500">
            Descargando información desde Firebase...
          </div>
        ) : (
          <>
            {/* Le pasamos los datos reales a nuestros componentes mediante PROPS */}
            <KPIStats datos={datosFirebase} />
            <ChartsGrid datos={datosFirebase} />
          </>
        )}
      </main>

      <footer className="text-center p-4 text-sm text-slate-500 mt-10">
        Dashboard Mantenimiento Predictivo v0.2 - {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
