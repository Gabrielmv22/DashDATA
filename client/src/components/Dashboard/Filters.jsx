// src/components/Dashboard/Filters.jsx
const Filters = ({ currentFilters, onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-3">Panel de Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        
        {/* Filtro: Tipo de Máquina */}
        <div>
          <label className="block text-sm text-slate-600 mb-1">Tipo de Máquina</label>
          <select 
            className="w-full border p-2 rounded bg-gray-50"
            value={currentFilters.machineType}
            onChange={(e) => onFilterChange('machineType', e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="L">Baja Calidad (L)</option>
            <option value="M">Media Calidad (M)</option>
            <option value="H">Alta Calidad (H)</option>
          </select>
        </div>

        {/* Filtro: Tipo de Fallo */}
        <div>
          <label className="block text-sm text-slate-600 mb-1">Tipo de Fallo</label>
          <select 
            className="w-full border p-2 rounded bg-gray-50"
            value={currentFilters.failureType}
            onChange={(e) => onFilterChange('failureType', e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="Power">Fallo de Energía (Power)</option>
            <option value="Tool Wear">Desgaste Herramienta (Tool Wear)</option>
            <option value="Overstrain">Sobrecarga (Overstrain)</option>
            <option value="Random Failures">Fallos Aleatorios</option>
          </select>
        </div>

        {/* Filtro: Fecha */}
        <div>
          <label className="block text-sm text-slate-600 mb-1">Fecha de Análisis</label>
          <input 
            type="date" 
            className="w-full border p-2 rounded bg-gray-50"
            value={currentFilters.dateRange}
            onChange={(e) => onFilterChange('dateRange', e.target.value)}
          />
        </div>

        {/* Botón de Acción (Simulación por ahora) */}
        <div>
          <button 
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            onClick={() => alert(`Aplicando filtros: ${JSON.stringify(currentFilters)}`)}
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;