import { useState, useContext, useEffect } from "react";
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
import Admin from "./pages/Admin";
import api from "./services/api";

function AppContent() {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState("comparativos");
  const [veiculos, setVeiculos] = useState([]);
  const [veiculoAtivoId, setVeiculoAtivoId] = useState(null);
  const veiculoAtivo = veiculos.find(v => v.id === veiculoAtivoId) || null;
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!user) { setVeiculos([]); setVeiculoAtivoId(null); return; }
    api.get('/vehicles').then(r => {
      setVeiculos(r.data);
      if (r.data.length > 0) setVeiculoAtivoId(r.data[0].id);
    }).catch(console.error);
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {page === "comparativos" ? (
          <main className="w-full max-w-6xl mx-auto p-6"><Comparativos setPage={setPage} /></main>
        ) : (
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
      case "dashboard":      return <Dashboard veiculo={veiculoAtivo} />;
      case "veiculos":       return <Veiculos veiculos={veiculos} setVeiculos={setVeiculos} setVeiculoAtivoId={setVeiculoAtivoId} />;
      case "abastecimentos": return <Abastecimentos veiculo={veiculoAtivo} />;
      case "manutencoes":    return <Manutencoes veiculo={veiculoAtivo} />;
      case "minha-conta":    return <MinhaConta />;
      case "comparativos":   return <Comparativos setPage={setPage} />;
      case "admin":          return isAdmin ? <Admin /> : <Dashboard veiculo={veiculoAtivo} />;
      default:               return <Dashboard veiculo={veiculoAtivo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <TopNav
        page={page} setPage={setPage}
        veiculos={veiculos} veiculoAtivoId={veiculoAtivoId} setVeiculoAtivoId={setVeiculoAtivoId}
        isAdmin={isAdmin}
      />
      <main className="max-w-6xl mx-auto p-6">{renderPage()}</main>
    </div>
  );
}

export default function App() {
  return <AuthProvider><AppContent /></AuthProvider>;
}
