import { useContext } from "react";
import Button from "../components/UI/Button";
import { AuthContext } from "../contexts/AuthContext";

// Gráfico de barras horizontais em SVG puro — sem dependências externas
function BarChart({ data, valueKey, labelKey, color, suffix = "" }) {
  const max = Math.max(...data.map(d => d[valueKey]));
  const height = 220;
  const barHeight = 22;
  const gap = 14;
  const labelWidth = 120;
  const chartWidth = 260;

  return (
    <svg width="100%" viewBox={`0 0 ${labelWidth + chartWidth + 60} ${data.length * (barHeight + gap)}`}>
      {data.map((item, i) => {
        const barWidth = (item[valueKey] / max) * chartWidth;
        const y = i * (barHeight + gap);
        return (
          <g key={i}>
            <text
              x={labelWidth - 8}
              y={y + barHeight / 2 + 4}
              textAnchor="end"
              fontSize="11"
              fill="#9ca3af"
            >
              {item[labelKey].length > 16 ? item[labelKey].slice(0, 15) + "…" : item[labelKey]}
            </text>
            <rect x={labelWidth} y={y} width={barWidth} height={barHeight} fill={color} rx="3" />
            <text
              x={labelWidth + barWidth + 6}
              y={y + barHeight / 2 + 4}
              fontSize="11"
              fill="#6b7280"
            >
              {item[valueKey]}{suffix}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Comparativos({ setPage }) {
  const { user } = useContext(AuthContext);

  const veiculosInfo = [
    { id: 1, categoria: "hatch",  modelo: "Renault Kwid 1.0",    consumoNum: 15.3, manutencaoNum: 600,  nota: 9.0 },
    { id: 8, categoria: "hatch",  modelo: "Chevrolet Onix 1.0",  consumoNum: 13.9, manutencaoNum: 650,  nota: 8.9 },
    { id: 5, categoria: "hatch",  modelo: "Hyundai HB20 1.0",    consumoNum: 14.5, manutencaoNum: 750,  nota: 8.8 },
    { id: 2, categoria: "sedan",  modelo: "Toyota Corolla 2.0",  consumoNum: 11.6, manutencaoNum: 1200, nota: 8.5 },
    { id: 6, categoria: "sedan",  modelo: "Honda Civic 2.0",     consumoNum: 11.0, manutencaoNum: 1300, nota: 8.7 },
    { id: 3, categoria: "suv",    modelo: "Jeep Compass 1.3T",   consumoNum: 10.2, manutencaoNum: 2100, nota: 7.0 },
    { id: 7, categoria: "suv",    modelo: "VW T-Cross 1.0T",     consumoNum: 12.5, manutencaoNum: 1500, nota: 8.2 },
    { id: 4, categoria: "antigo", modelo: "VW Fusca 1500",       consumoNum: 8.0,  manutencaoNum: 400,  nota: 8.0 },
  ];

  const categorias = ["hatch", "sedan", "suv", "antigo"];
  const topPorCategoria = categorias.map(cat =>
    [...veiculosInfo].filter(v => v.categoria === cat).sort((a, b) => b.nota - a.nota)[0]
  ).filter(Boolean);

  const topEconomia   = [...veiculosInfo].sort((a, b) => b.consumoNum   - a.consumoNum).slice(0, 5);
  const topNota       = [...veiculosInfo].sort((a, b) => b.nota         - a.nota).slice(0, 5);
  const topManutencao = [...veiculosInfo].sort((a, b) => a.manutencaoNum - b.manutencaoNum).slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-10 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-500 mb-2">Ranking MyGarage</h1>
          <p className="text-gray-500 dark:text-gray-400">Os veículos mais bem avaliados pela nossa comunidade em cada categoria.</p>
        </div>
        {!user && (
          <Button onClick={() => setPage("login")} className="px-6 py-2">
            Fazer Login
          </Button>
        )}
      </div>

      {/* Cards top por categoria */}
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
                <p className="text-gray-800 dark:text-gray-200 font-medium">{carro.consumoNum} km/l</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Custo de Manutenção</p>
                <p className="text-red-600 dark:text-red-400 font-medium">R$ {carro.manutencaoNum}/ano</p>
              </div>
              <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Nota Geral</p>
                <p className="text-gray-800 dark:text-gray-200 font-bold text-lg">{carro.nota.toFixed(1)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos SVG */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
          Rankings
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-6 text-center text-sm uppercase tracking-wider">Mais Econômicos (km/l)</h3>
            <BarChart data={topEconomia} valueKey="consumoNum" labelKey="modelo" color="#10b981" suffix=" km/l" />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-6 text-center text-sm uppercase tracking-wider">Menor Custo de Manutenção</h3>
            <BarChart data={topManutencao} valueKey="manutencaoNum" labelKey="modelo" color="#3b82f6" suffix=" R$/ano" />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-6 text-center text-sm uppercase tracking-wider">Melhores Notas da Comunidade</h3>
            <BarChart data={topNota} valueKey="nota" labelKey="modelo" color="#f59e0b" suffix=" / 10" />
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