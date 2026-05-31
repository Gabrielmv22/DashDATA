// src/components/Dashboard/KPIStats.jsx
const KPIStats = () => {
  // Datos dummy por ahora
  const stats = [
    { label: 'TASA DE FALLAS CRÍTICAS', value: '12.5%', color: 'border-red-500' },
    { label: 'DESGASTE PROMEDIO HERRAMIENTA', value: '145.2 min', color: 'border-orange-500' },
    { label: 'TEMP. MÁXIMA PROCESO', value: '312 K', color: 'border-green-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className={`bg-white p-6 rounded shadow border-l-4 ${stat.color}`}>
          <p className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default KPIStats;