import { useState, useContext } from "react";
import ThemeToggle from "./ThemeToggle";
import { AuthContext } from "../contexts/AuthContext"; 

import logoGarage from "../assets/logo.png";

export default function TopNav({ page, setPage, veiculos, veiculoAtivoId, setVeiculoAtivoId }) {
  const { user, handleLogout } = useContext(AuthContext); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "veiculos", label: "Veículos" },
    { id: "abastecimentos", label: "Abastecimentos" },
    { id: "manutencoes", label: "Manutenções" },
    { id: "comparativos", label: "Ranking Geral" },
  ];

  const handlePageChange = (id) => {
    setPage(id);
    setIsMobileMenuOpen(false); 
  };

  const userInitial = user?.nome ? user.nome.charAt(0).toUpperCase() : "U";

  return (
    <nav className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center gap-4">
        
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handlePageChange("dashboard")}>
          <img 
            src={logoGarage}
            alt="MyGarage Logo"
            className="w-12 h-12 object-contain"
          />
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-500 tracking-tight">
            MyGarage
          </h1>
        </div>

        {/* Controles Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-xl border dark:border-gray-700">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Veículo:</span>
            <select 
              value={veiculoAtivoId || ""} 
              onChange={(e) => setVeiculoAtivoId(Number(e.target.value))}
              className="bg-transparent font-bold text-gray-700 dark:text-gray-200 outline-none cursor-pointer"
            >
              {veiculos.length === 0 && <option value="" className="dark:bg-gray-800">Nenhum cadastrado</option>}
              {veiculos.map(v => (
                <option key={v.id} value={v.id} className="dark:bg-gray-800">
                  {v.modelo} ({v.placa})
                </option>
              ))}
            </select>
          </div>
          
          <ThemeToggle />

          {/* Menu de Perfil (Desktop) */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition focus:outline-none"
            >
              <div className="w-10 h-10 bg-red-600 flex items-center justify-center rounded-full text-white font-bold shadow-sm">
                {userInitial}
              </div>
            </button>

            {/* Dropdown de Conta */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50 overflow-hidden">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 mb-2">
                  <p className="font-bold text-gray-800 dark:text-gray-100 truncate">{user?.nome}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                </div>
                <button 
                  onClick={() => {
                    setPage("minha-conta");
                    setIsProfileDropdownOpen(false); // Fecha o dropdown ao clicar
                  }}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Minha Conta
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm font-bold text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                >
                  Sair do Sistema
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Controles Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Abas de Navegação Desktop */}
      <div className="hidden md:flex gap-4 md:gap-8 border-t dark:border-gray-700 justify-center">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handlePageChange(item.id)}
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

      {/* Menu Dropdown Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col px-6 py-4 space-y-4 border-t dark:border-gray-700 bg-white dark:bg-gray-900 shadow-inner">
          
          {/* Perfil do User no Mobile */}
          <div className="flex items-center gap-3 px-2 pb-4 border-b dark:border-gray-800">
            <div className="w-12 h-12 bg-red-600 flex items-center justify-center rounded-full text-white font-bold text-xl shadow-sm">
              {userInitial}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-gray-800 dark:text-gray-100 truncate">{user?.nome || "Utilizador"}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Veículo Selecionado:</span>
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-xl border dark:border-gray-700">
              <select 
                value={veiculoAtivoId || ""} 
                onChange={(e) => setVeiculoAtivoId(Number(e.target.value))}
                className="bg-transparent font-bold text-gray-700 dark:text-gray-200 outline-none cursor-pointer w-full"
              >
                {veiculos.length === 0 && <option value="" className="dark:bg-gray-800">Nenhum cadastrado</option>}
                {veiculos.map(v => (
                  <option key={v.id} value={v.id} className="dark:bg-gray-800">
                    {v.modelo} ({v.placa})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t dark:border-gray-800">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className={`py-3 px-4 rounded-xl font-medium text-left transition ${
                  page === item.id
                    ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-500"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <button 
              onClick={() => handlePageChange("minha-conta")}
              className="py-3 px-4 rounded-xl font-medium text-left text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition mt-2 border-t dark:border-gray-800"
            >
              Minha Conta
            </button>
            <button 
              onClick={handleLogout}
              className="py-3 px-4 rounded-xl font-bold text-left text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            >
              Sair do Sistema
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}