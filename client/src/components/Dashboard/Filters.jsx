// src/components/Dashboard/Filters.jsx
const Filters = () => {
  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-3">Panel de Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm text-slate-600 mb-1">Tipo de Máquina</label>
          <select className="w-full border p-2 rounded bg-gray-50">
            <option>L, M, H, Todos</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Tipo de Fallo</label>
          <select className="w-full border p-2 rounded bg-gray-50">
            <option>Power, Tool Wear...</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Rango de Fecha</label>
          <input type="date" className="w-full border p-2 rounded bg-gray-50" />
        </div>
        <div>
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;