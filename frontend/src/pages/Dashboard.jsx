import { useState, useEffect } from "react";
import Card from "../components/Card";
import api from "../services/api";

export default function Dashboard({ veiculo }) {
  const [stats, setStats] = useState({
    totalAbastecimentos: 0,
    totalManutencoes: 0,
    consumoMedio: null,
  });

  useEffect(() => {
    if (!veiculo?.id) return;

    async function carregarStats() {
      try {
        const [resAbast, resManu] = await Promise.all([
          api.get(`/abastecimentos/veiculo/${veiculo.id}`),
          api.get(`/manutencoes/veiculo/${veiculo.id}`)
        ]);

        const abastecimentos = resAbast.data;
        const manutencoes = resManu.data;

        // Calcula consumo médio: diferença de KM / total de litros
        let consumoMedio = null;
        if (abastecimentos.length >= 2) {
          const kmMax = Math.max(...abastecimentos.map(a => a.kmAtual));
          const kmMin = Math.min(...abastecimentos.map(a => a.kmAtual));
          const totalLitros = abastecimentos.reduce((acc, a) => acc + a.litros, 0);
          if (totalLitros > 0) {
            consumoMedio = ((kmMax - kmMin) / totalLitros).toFixed(1);
          }
        }

        setStats({
          totalAbastecimentos: abastecimentos.length,
          totalManutencoes: manutencoes.length,
          consumoMedio,
        });
      } catch (error) {
        console.error("Erro ao carregar stats do dashboard", error);
      }
    }

    carregarStats();
  }, [veiculo?.id]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Visualizando dados de:</p>
          <p className="text-lg font-bold text-red-600 dark:text-red-500">
            {veiculo ? `${veiculo.modelo} - ${veiculo.placa}` : "Nenhum veículo selecionado"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Consumo Médio" value={stats.consumoMedio ? `${stats.consumoMedio} km/l` : "—"} />
        <Card title="Abastecimentos" value={String(stats.totalAbastecimentos)} />
        <Card title="Manutenções" value={String(stats.totalManutencoes)} />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-2">Resumo do Veículo</h2>
        {veiculo ? (
          <p className="text-gray-600 dark:text-gray-400 font-mono italic">
            {veiculo.marca} {veiculo.modelo} | Ano: {veiculo.ano} | Placa: {veiculo.placa}
          </p>
        ) : (
          <p className="text-gray-400 dark:text-gray-500 italic">Nenhum veículo cadastrado. Vá em "Veículos" para adicionar.</p>
        )}
      </div>
    </div>
  );
}
