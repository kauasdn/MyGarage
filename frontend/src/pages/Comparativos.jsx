import { useContext } from "react";
import Button from "../components/UI/Button";
import { AuthContext } from "../contexts/AuthContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Comparativos({ setPage }) {
  const { user } = useContext(AuthContext);
  
  const veiculosInfo = [
    { id: 1, categoria: "hatch", modelo: "Renault Kwid 1.0", consumo: "15.3 km/l", consumoNum: 15.3, manutencao: "R$ 600/ano", manutencaoNum: 600, nota: 9.0 },
    { id: 8, categoria: "hatch", modelo: "Chevrolet Onix 1.0", consumo: "13.9 km/l", consumoNum: 13.9, manutencao: "R$ 650/ano", manutencaoNum: 650, nota: 8.9 },
    { id: 5, categoria: "hatch", modelo: "Hyundai HB20 1.0", consumo: "14.5 km/l", consumoNum: 14.5, manutencao: "R$ 750/ano", manutencaoNum: 750, nota: 8.8 },
    { id: 2, categoria: "sedan", modelo: "Toyota Corolla 2.0", consumo: "11.6 km/l", consumoNum: 11.6, manutencao: "R$ 1.200/ano", manutencaoNum: 1200, nota: 8.5 },
    { id: 6, categoria: "sedan", modelo: "Honda Civic 2.0", consumo: "11.0 km/l", consumoNum: 11.0, manutencao: "R$ 1.300/ano", manutencaoNum: 1300, nota: 8.7 },
    { id: 3, categoria: "suv", modelo: "Jeep Compass 1.3T", consumo: "10.2 km/l", consumoNum: 10.2, manutencao: "R$ 2.100/ano", manutencaoNum: 2100, nota: 7.0 },
    { id: 7, categoria: "suv", modelo: "VW T-Cross 1.0T", consumo: "12.5 km/l", consumoNum: 12.5, manutencao: "R$ 1.500/ano", manutencaoNum: 1500, nota: 8.2 },
    { id: 4, categoria: "antigo", modelo: "VW Fusca 1500", consumo: "8.0 km/l", consumoNum: 8.0, manutencao: "R$ 400/ano", manutencaoNum: 400, nota: 8.0 },
  ];

  const categorias = ["hatch", "sedan", "suv", "antigo"];

  const topPorCategoria = categorias.map(categoria => {
    const carrosDaCategoria = veiculosInfo.filter(v => v.categoria === categoria);
    return carrosDaCategoria.sort((a, b) => b.nota - a.nota)[0];
  }).filter(Boolean);

  const topEconomia = [...veiculosInfo].sort((a, b) => b.consumoNum - a.consumoNum).slice(0, 5);
  const topNota = [...veiculosInfo].sort((a, b) => b.nota - a.nota).slice(0, 5);
  const topManutencao = [...veiculosInfo].sort((a, b) => a.manutencaoNum - b.manutencaoNum).slice(0, 5);

  const CustomTooltip = ({ active, payload, label, prefix = "", suffix = "" }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-100 dark:border-gray-700 rounded-lg shadow-md">
          <p className="font-bold text-gray-800 dark:text-gray-100 mb-1">{label}</p>
          <p className="text-red-600 dark:text-red-500 font-medium">
            {prefix}{payload[0].value}{suffix}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-10 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-500 mb-2">Ranking MyGarage</h1>
          <p className="text-gray-500 dark:text-gray-400">Os veículos mais bem avaliados pela nossa comunidade em cada categoria.</p>
        </div>
        
        {/* Renderiza o botão de Login APENAS se o usuário não estiver logado */}
        {!user && (
          <Button onClick={() => setPage("login")} className="px-6 py-2">
            Fazer Login
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {topPorCategoria.map((carro) => (
          <div key={carro.id} className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
            
            <div className="absolute -top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              👑 Top {carro.categoria}
            </div>

            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mt-2 mb-4 truncate">{carro.modelo}</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Consumo Médio</p>
                <p className="text-gray-800 dark:text-gray-200 font-medium">{carro.consumo}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Custo de Manutenção</p>
                <p className="text-red-600 dark:text-red-400 font-medium">{carro.manutencao}</p>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Nota Geral</p>
                <p className="text-gray-800 dark:text-gray-200 font-bold text-lg">{carro.nota.toFixed(1)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
          Rankings
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Gráfico 1: Economia */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-6 text-center text-sm uppercase tracking-wider">Mais Econômicos (km/l)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topEconomia} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="modelo" type="category" width={110} tick={{fill: '#9ca3af', fontSize: 11}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip suffix=" km/l" />} cursor={{fill: 'rgba(156, 163, 175, 0.1)'}} />
                  <Bar dataKey="consumoNum" fill="#10b981" radius={[0, 4, 4, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico 2: Menor Manutenção */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-6 text-center text-sm uppercase tracking-wider">Menor Custo de Manutenção</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topManutencao} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="modelo" type="category" width={110} tick={{fill: '#9ca3af', fontSize: 11}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip prefix="R$ " suffix="/ano" />} cursor={{fill: 'rgba(156, 163, 175, 0.1)'}} />
                  <Bar dataKey="manutencaoNum" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico 3: Notas */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-6 text-center text-sm uppercase tracking-wider">Melhores Notas da Comunidade</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topNota} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <XAxis type="number" domain={[0, 10]} hide />
                  <YAxis dataKey="modelo" type="category" width={110} tick={{fill: '#9ca3af', fontSize: 11}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip suffix=" / 10" />} cursor={{fill: 'rgba(156, 163, 175, 0.1)'}} />
                  <Bar dataKey="nota" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
      
      {!user && (
        <div className="bg-red-50 dark:bg-red-900/10 p-8 rounded-2xl border border-red-100 dark:border-red-900/30 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Quer descobrir se o seu carro entra no ranking?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Crie sua conta gratuitamente, registre seus abastecimentos e manutenções e ajude a comunidade a descobrir quais são os carros mais econômicos do Brasil.
          </p>
          <Button onClick={() => setPage("cadastro")} className="px-8 py-3 text-lg">
            Criar Minha Conta Grátis
          </Button>
        </div>
      )}
    </div>
  );
}