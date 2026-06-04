// client/src/components/Charts/ChartsGrid.jsx
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter
} from 'recharts';

const ChartsGrid = ({ datos }) => {
  
  // ==========================================
  // TRANSFORMACIÓN DE DATOS (LÓGICA)
  // ==========================================

  // 1. Datos para Gráfico de Barras: Contar frecuencia de cada 'Failure Type'
  const conteoFallos = datos.reduce((acumulador, item) => {
    const tipo = item.failureType || 'Desconocido';
    if (!acumulador[tipo]) {
      acumulador[tipo] = { nombreFallo: tipo, cantidad: 0 };
    }
    acumulador[tipo].cantidad += 1;
    return acumulador;
  }, {});
  
  // Convertimos el objeto en un arreglo para que Recharts lo entienda
  const datosBarras = Object.values(conteoFallos);

  // 2. Datos para Gráfico de Dispersión: Relación Torque vs Rotational Speed
  const datosDispersion = datos.map(item => ({
    torque: item.torque || 0,
    velocidad: item.rotationalSpeed || 0,
  }));


  // ==========================================
  // RENDERIZADO VISUAL (INTERFAZ)
  // ==========================================
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      
      {/* CONTENEDOR 1: Gráfico de Barras */}
      <div className="bg-white p-4 rounded shadow min-h-[350px]">
        <h3 className="font-semibold text-lg mb-4 text-slate-700">Distribución de Tipos de Fallo</h3>
        
        {/* ResponsiveContainer hace que el gráfico se adapte a celulares o monitores */}
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={datosBarras}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="nombreFallo" />
              <YAxis />
              <Tooltip cursor={{fill: '#f1f5f9'}} />
              <Legend />
              <Bar dataKey="cantidad" fill="#3b82f6" name="Cantidad de Máquinas" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CONTENEDOR 2: Gráfico de Dispersión */}
      <div className="bg-white p-4 rounded shadow min-h-[350px]">
        <h3 className="font-semibold text-lg mb-4 text-slate-700">Relación Torque vs RPM</h3>
        
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="velocidad" name="Velocidad" unit=" rpm" />
              <YAxis type="number" dataKey="torque" name="Torque" unit=" Nm" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Lecturas de Sensores" data={datosDispersion} fill="#f97316" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default ChartsGrid;