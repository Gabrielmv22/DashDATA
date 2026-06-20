import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { AlertCircle, Zap, Thermometer, LogOut, Menu } from 'lucide-react';

// Type definitions
interface MachineRecord {
  id: number;
  type: 'L' | 'M' | 'H';
  airTemp: number;
  processTemp: number;
  rotSpeed: number;
  torque: number;
  toolWear: number;
  failureType: 'None' | 'Power' | 'Tool Wear' | 'Overstrain' | 'Heat Dissipation';
  target: 0 | 1;
}

interface FilterState {
  machineType: string;
  failureType: string;
  dateRange: string;
}

// Generate realistic mock data
const generateMockData = (): MachineRecord[] => {
  const failureTypes = ['None', 'Power', 'Tool Wear', 'Overstrain', 'Heat Dissipation'] as const;
  const machineTypes = ['L', 'M', 'H'] as const;
  const data: MachineRecord[] = [];

  for (let i = 1; i <= 100; i++) {
    const type = machineTypes[Math.floor(Math.random() * 3)];
    const failureRoll = Math.random();
    const failureType = failureRoll < 0.4 ? 'None' : failureTypes[Math.floor(Math.random() * 4) + 1];

    data.push({
      id: i,
      type,
      airTemp: 295 + Math.random() * 20,
      processTemp: 305 + Math.random() * 30,
      rotSpeed: 1000 + Math.random() * 2500,
      torque: 3 + Math.random() * 80,
      toolWear: Math.random() * 250,
      failureType: failureType as MachineRecord['failureType'],
      target: failureRoll < 0.4 ? 0 : 1,
    });
  }

  return data;
};

const MOCK_DATA = generateMockData();

// Component: Filter Panel
const FilterPanel: React.FC<{
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}> = ({ filters, setFilters }) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const failureTypes = ['All', 'None', 'Power', 'Tool Wear', 'Overstrain', 'Heat Dissipation'];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Top row: User profile and logout */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-slate-900">DashDATA</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">Usuario: Ing. García</span>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-gray-100 rounded transition">
              <LogOut size={18} />
              Salir
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="lg:hidden mb-3">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-100 rounded hover:bg-slate-200 transition"
          >
            <Menu size={18} />
            Filtros
          </button>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 ${showMobileFilters ? 'block' : 'hidden lg:grid'}`}>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Tipo de Máquina</label>
            <select
              value={filters.machineType}
              onChange={(e) => setFilters({ ...filters, machineType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">Todos</option>
              <option value="L">L</option>
              <option value="M">M</option>
              <option value="H">H</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Tipo de Fallo</label>
            <select
              value={filters.failureType}
              onChange={(e) => setFilters({ ...filters, failureType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {failureTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Rango de Fecha</label>
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos</option>
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
              <option value="quarter">Último trimestre</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition text-sm">
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component: KPI Card
const KPICard: React.FC<{
  title: string;
  value: string | number;
  unit?: string;
  type: 'critical' | 'warning' | 'normal';
  icon: React.ReactNode;
}> = ({ title, value, unit = '', type, icon }) => {
  const baseStyles = 'rounded-lg p-6 text-white shadow-lg';
  const typeStyles = {
    critical: 'bg-red-600',
    warning: 'bg-amber-500',
    normal: 'bg-emerald-600',
  };

  return (
    <div className={`${baseStyles} ${typeStyles[type]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{title}</p>
          <p className="text-3xl font-bold mt-2">
            {value}
            <span className="text-lg ml-1">{unit}</span>
          </p>
        </div>
        <div className="opacity-70">{icon}</div>
      </div>
    </div>
  );
};

// Component: Failure Distribution Chart
const FailureDistributionChart: React.FC<{ data: MachineRecord[] }> = ({ data }) => {
  const chartData = useMemo(() => {
    const counts = data.reduce(
      (acc, record) => {
        acc[record.failureType] = (acc[record.failureType] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    return Object.entries(counts).map(([name, value]) => ({
      name,
      count: value,
    }));
  }, [data]);

  const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Distribución de Tipos de Fallo</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Component: Torque vs Speed Chart
const TorqueSpeedChart: React.FC<{ data: MachineRecord[] }> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Relación Torque vs Velocidad de Rotación</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rotSpeed" name="Velocidad (rpm)" />
          <YAxis dataKey="torque" name="Torque (Nm)" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Máquinas" data={data} fill="#3b82f6" opacity={0.6} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

// Component: Tool Wear by Machine Type
const ToolWearChart: React.FC<{ data: MachineRecord[] }> = ({ data }) => {
  const chartData = useMemo(() => {
    const grouped = data.reduce(
      (acc, record) => {
        if (!acc[record.type]) {
          acc[record.type] = [];
        }
        acc[record.type].push(record.toolWear);
        return acc;
      },
      {} as Record<string, number[]>
    );

    return Object.entries(grouped).map(([type, values]) => {
      const sorted = [...values].sort((a, b) => a - b);
      const q1 = sorted[Math.floor(sorted.length * 0.25)];
      const median = sorted[Math.floor(sorted.length * 0.5)];
      const q3 = sorted[Math.floor(sorted.length * 0.75)];
      const min = sorted[0];
      const max = sorted[sorted.length - 1];

      return {
        type,
        min,
        q1,
        median,
        q3,
        max,
        avg: values.reduce((a, b) => a + b, 0) / values.length,
      };
    });
  }, [data]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Desgaste de Herramientas por Tipo de Máquina</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="min" fill="#dbeafe" />
          <Bar dataKey="q1" fill="#93c5fd" />
          <Bar dataKey="median" fill="#3b82f6" />
          <Bar dataKey="q3" fill="#1e40af" />
          <Bar dataKey="max" fill="#1e3a8a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Component: Recent Alerts Panel
const AlertsPanel: React.FC<{ data: MachineRecord[] }> = ({ data }) => {
  const recentAlerts = useMemo(() => {
    return data
      .filter((r) => r.target === 1)
      .slice(0, 8)
      .map((record) => ({
        id: record.id,
        failureType: record.failureType,
        machineType: record.type,
      }));
  }, [data]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md h-full">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Alertas Recientes</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {recentAlerts.length > 0 ? (
          recentAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
              <AlertCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900">
                  ID {alert.id} - {alert.failureType}
                </p>
                <p className="text-xs text-slate-600">Tipo: {alert.machineType}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-600 text-center py-8">Sin alertas</p>
        )}
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [filters, setFilters] = useState<FilterState>({
    machineType: 'All',
    failureType: 'All',
    dateRange: 'all',
  });

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter((record) => {
      if (filters.machineType !== 'All' && record.type !== filters.machineType) return false;
      if (filters.failureType !== 'All' && record.failureType !== filters.failureType) return false;
      return true;
    });
  }, [filters]);

  const stats = useMemo(() => {
    const failureCount = filteredData.filter((r) => r.target === 1).length;
    const criticalFailureRate = ((failureCount / filteredData.length) * 100).toFixed(1);
    const avgToolWear = (filteredData.reduce((sum, r) => sum + r.toolWear, 0) / filteredData.length).toFixed(1);
    const maxProcessTemp = Math.max(...filteredData.map((r) => r.processTemp)).toFixed(1);

    return { criticalFailureRate, avgToolWear, maxProcessTemp };
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Filter Panel */}
      <FilterPanel filters={filters} setFilters={setFilters} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <KPICard
            title="Tasa de Fallos Críticos"
            value={stats.criticalFailureRate}
            unit="%"
            type="critical"
            icon={<AlertCircle size={24} />}
          />
          <KPICard
            title="Desgaste Promedio de Herramientas"
            value={stats.avgToolWear}
            unit="min"
            type="warning"
            icon={<Zap size={24} />}
          />
          <KPICard
            title="Temp Máxima de Proceso"
            value={stats.maxProcessTemp}
            unit="K"
            type="normal"
            icon={<Thermometer size={24} />}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <FailureDistributionChart data={filteredData} />
          </div>
          <div className="lg:col-span-2">
            <TorqueSpeedChart data={filteredData} />
          </div>
        </div>

        {/* Tool Wear Chart */}
        <div className="mb-6">
          <ToolWearChart data={filteredData} />
        </div>

        {/* Bottom Row: Charts and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {/* Placeholder for additional analysis */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Estadísticas Generales</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded">
                  <p className="text-2xl font-bold text-blue-600">{filteredData.length}</p>
                  <p className="text-xs text-slate-600 mt-1">Total Registros</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded">
                  <p className="text-2xl font-bold text-emerald-600">{filteredData.filter((r) => r.target === 0).length}</p>
                  <p className="text-xs text-slate-600 mt-1">Sin Fallos</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded">
                  <p className="text-2xl font-bold text-red-600">{filteredData.filter((r) => r.target === 1).length}</p>
                  <p className="text-xs text-slate-600 mt-1">Con Fallos</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded">
                  <p className="text-2xl font-bold text-amber-600">
                    {(
                      filteredData.reduce((sum, r) => sum + r.rotSpeed, 0) / filteredData.length
                    ).toFixed(0)}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">Vel. Promedio (rpm)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts Panel */}
          <div>
            <AlertsPanel data={filteredData} />
          </div>
        </div>
      </div>
    </div>
  );
}