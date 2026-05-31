// src/App.jsx
import Header from './components/Layout/Header'
import Filters from './components/Dashboard/Filters'
import KPIStats from './components/Dashboard/KPIStats'
import ChartsGrid from './components/Charts/ChartsGrid'

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      
      <main className="p-6 md:p-8">
        <Filters />
        <KPIStats />
        <ChartsGrid />
      </main>

      <footer className="text-center p-4 text-sm text-slate-500 mt-10">
        Dashboard Mantenimiento Predictivo v0.1 - {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default App