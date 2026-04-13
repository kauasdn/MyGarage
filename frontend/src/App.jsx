import { useState, useEffect } from "react";
import TopNav from "./components/TopNav";
import Dashboard from "./pages/Dashboard";
import Veiculos from "./pages/Veiculos";
import Abastecimentos from "./pages/Abastecimentos";
import Manutencoes from "./pages/Manutencoes";

export default function App() {
  const [page, setPage] = useState("dashboard");
  
  // Placeholder pros veículos enqnt n conecto o back
  const [veiculos, setVeiculos] = useState([
    { id: 1, marca: "Toyota", modelo: "Corolla", ano: "2020", placa: "ABC-1234" },
    { id: 2, marca: "Honda", modelo: "Civic", ano: "2019", placa: "XYZ-9876" }
  ]);

  const [veiculoAtivoId, setVeiculoAtivoId] = useState(veiculos[0]?.id);

  // Encontra o objeto do veículo selecionado para passar às páginas
  const veiculoAtivo = veiculos.find(v => v.id === veiculoAtivoId);

  // Função para renderizar a página
  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard veiculo={veiculoAtivo} />;
      case "veiculos":
        return <Veiculos veiculos={veiculos} setVeiculos={setVeiculos} />;
      case "abastecimentos":
        return <Abastecimentos veiculo={veiculoAtivo} />;
      case "manutencoes":
        return <Manutencoes veiculo={veiculoAtivo} />;
      default:
        return <Dashboard veiculo={veiculoAtivo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300">
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