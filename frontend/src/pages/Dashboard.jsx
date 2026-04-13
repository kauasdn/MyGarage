import Card from "../components/Card";

export default function Dashboard({ veiculo }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Visualizando dados de:</p>
          <p className="text-lg font-bold text-red-600 dark:text-red-500">{veiculo?.modelo} - {veiculo?.placa}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Consumo Médio" value="10.5 km/l" />
        <Card title="Abastecimentos" value="12" />
        <Card title="Manutenções" value="5" />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-2">Resumo do Veículo</h2>
        <p className="text-gray-600 dark:text-gray-400 font-mono italic">
          {veiculo?.marca} {veiculo?.modelo} | Ano: {veiculo?.ano}
        </p>
      </div>
    </div>
  );
}