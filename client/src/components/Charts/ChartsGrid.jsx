// src/components/Charts/ChartsGrid.jsx
const ChartsGrid = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Contenedor Gráfico 1 */}
      <div className="bg-white p-4 rounded shadow min-h-[300px]">
        <h3 className="font-semibold text-lg mb-2">Distribución Tipos de Fallo (Barras)</h3>
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">
          [Placeholder Gráfico]
        </div>
      </div>
      
      {/* Contenedor Gráfico 2 */}
      <div className="bg-white p-4 rounded shadow min-h-[300px]">
        <h3 className="font-semibold text-lg mb-2">Relación Torque vs RPM (Dispersión)</h3>
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">
          [Placeholder Gráfico]
        </div>
      </div>

      {/* Contenedor Gráfico 3 */}
      <div className="bg-white p-4 rounded shadow min-h-[300px]">
        <h3 className="font-semibold text-lg mb-2">Desgaste por Tipo Máquina (Boxplot)</h3>
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">
          [Placeholder Gráfico]
        </div>
      </div>
    </div>
  );
};

export default ChartsGrid;