import { useState, useContext } from "react";
import TopNav from "./components/TopNav";
import Dashboard from "./pages/Dashboard";
import Veiculos from "./pages/Veiculos";
import Abastecimentos from "./pages/Abastecimentos";
import Manutencoes from "./pages/Manutencoes";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import Comparativos from "./pages/Comparativos";
import MinhaConta from "./pages/MinhaConta";

function AppContent() {
  const { user } = useContext(AuthContext);
  
  // 1. Alterado o estado inicial de "login" para "comparativos"
  const [page, setPage] = useState("comparativos");

  // Estado global de veículos
  const [veiculos, setVeiculos] = useState([
    { id: 1, marca: "Toyota", modelo: "Corolla", ano: "2020", placa: "ABC-1234" }
  ]);
  const [veiculoAtivoId, setVeiculoAtivoId] = useState(veiculos[0]?.id);
  const veiculoAtivo = veiculos.find(v => v.id === veiculoAtivoId);

  // 2. Nova lógica de proteção de rotas e áreas públicas
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        
        {/* Se a página for 'comparativos', renderiza de forma ampla e limpa */}
        {page === "comparativos" ? (
          <main className="w-full max-w-6xl mx-auto p-6">
            <Comparativos setPage={setPage} />
          </main>
        ) : (
          /* Caso contrário, centraliza as caixas de Login e Cadastro no meio do ecrã */
          <div className="flex items-center justify-center min-h-[80vh]">
            <main className="w-full max-w-6xl p-6 flex justify-center">
              {page === "cadastro" ? <Cadastro setPage={setPage} /> : <Login setPage={setPage} />}
            </main>
          </div>
        )}
        
      </div>
    );
  }

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard veiculo={veiculoAtivo} />;
      case "veiculos": return <Veiculos veiculos={veiculos} setVeiculos={setVeiculos} />;
      case "abastecimentos": return <Abastecimentos veiculo={veiculoAtivo} />;
      case "manutencoes": return <Manutencoes veiculo={veiculoAtivo} />;
      case "minha-conta": return <MinhaConta />;
      case "comparativos": return <Comparativos setPage={setPage} />;
      default: return <Dashboard veiculo={veiculoAtivo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <TopNav 
        page={page} 
        setPage={setPage} 
        veiculos={veiculos} 
        veiculoAtivoId={veiculoAtivoId} 
        setVeiculoAtivoId={setVeiculoAtivoId} 
      />
      <main className="max-w-6xl mx-auto p-6">
        {renderPage()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}