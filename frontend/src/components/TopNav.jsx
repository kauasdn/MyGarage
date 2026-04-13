import ThemeToggle from "./ThemeToggle";

export default function TopNav({ page, setPage, veiculos, veiculoAtivoId, setVeiculoAtivoId }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "veiculos", label: "Veículos" },
    { id: "abastecimentos", label: "Abastecimentos" },
    { id: "manutencoes", label: "Manutenções" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-500">MyGarage</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-xl border dark:border-gray-700">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Veículo:</span>
            <select 
              value={veiculoAtivoId || ""} 
              onChange={(e) => setVeiculoAtivoId(Number(e.target.value))}
              className="bg-transparent font-bold text-gray-700 dark:text-gray-200 outline-none cursor-pointer"
            >
              {veiculos.map(v => (
                <option key={v.id} value={v.id} className="dark:bg-gray-800">{v.modelo} ({v.placa})</option>
              ))}
            </select>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="flex gap-4 md:gap-8 border-t dark:border-gray-700 justify-center">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`py-3 px-2 font-medium transition border-b-2 ${
              page === item.id
                ? "text-red-600 border-red-600 dark:text-red-500 dark:border-red-500"
                : "text-gray-500 border-transparent hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}