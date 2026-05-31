const Header = () => {
  return (
    <header className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        {/* Aquí podrías poner un logo pequeño */}
        <h1 className="text-2xl font-bold">IndusPredict Dash</h1>
        <span className="text-sm text-slate-300">- Mantenimiento Predictivo</span>
      </div>
      <div className="flex items-center gap-4">
        <span>Usuario: Ing. García</span>
        <button className="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600">
          Salir
        </button>
      </div>
    </header>
  );
};

export default Header;