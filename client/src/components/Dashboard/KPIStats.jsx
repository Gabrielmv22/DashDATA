// client/src/components/Dashboard/KPIStats.jsx
const KPIStats = ({ datos }) => {
  
  // 1. Calcular el Total de Registros
  const totalRegistros = datos.length;

  // 2. Calcular el Promedio de Desgaste de Herramienta (Tool Wear)
  const sumaDesgaste = datos.reduce((acumulador, item) => acumulador + (item.toolWear || 0), 0);
  const promedioDesgaste = totalRegistros > 0 ? (sumaDesgaste / totalRegistros).toFixed(1) : 0;

  // 3. Encontrar la Temperatura Máxima de Proceso Registrada
  const temperaturas = datos.map(item => item.processTemp || 0);
  const tempMaxima = datos.length > 0 ? Math.max(...temperaturas) : 0;

  // Preparamos el arreglo para renderizar visualmente
  const stats = [
    { 
      label: 'TOTAL DE MEDICIONES', 
      value: totalRegistros, 
      color: 'border-blue-500' 
    },
    { 
      label: 'DESGASTE PROMEDIO (MIN)', 
      value: promedioDesgaste, 
      color: 'border-orange-500' 
    },
    { 
      label: 'TEMP. MÁXIMA PROCESO (K)', 
      value: tempMaxima, 
      color: 'border-red-500' 
    },
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