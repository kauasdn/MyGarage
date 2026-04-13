import { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Table from "../components/Table";

export default function Abastecimentos({ veiculo }) {
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState({ data: "", km: "", litros: "", valor: "" });

  const add = () => {
    if (!form.data || !form.valor) return alert("Dados incompletos!");
    setLista([...lista, { ...form, id: Date.now() }]);
    setForm({ data: "", km: "", litros: "", valor: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Abastecimentos</h1>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Visualizando dados de:</p>
          <p className="text-lg font-bold text-red-600 dark:text-red-500">{veiculo?.modelo} - {veiculo?.placa}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-5 gap-4 items-end border border-gray-100 dark:border-gray-700">
        <Input type="date" label="Data" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} />
        <Input type="number" label="KM" value={form.km} onChange={e => setForm({ ...form, km: e.target.value })} />
        <Input type="number" label="Litros" value={form.litros} onChange={e => setForm({ ...form, litros: e.target.value })} />
        <Input type="number" label="Valor Total" value={form.valor} onChange={e => setForm({ ...form, valor: e.target.value })} />
        <Button onClick={add}>Adicionar</Button>
      </div>

      <Table
        headers={["Data", "KM", "Litros", "Valor"]}
        data={lista}
        renderRow={(a) => (
          <>
            <td className="p-4 text-gray-600 dark:text-gray-400">{new Date(a.data).toLocaleDateString()}</td>
            <td className="p-4">{a.km} km</td>
            <td className="p-4">{a.litros}L</td>
            <td className="p-4 font-bold text-green-600 dark:text-green-500">R$ {a.valor}</td>
          </>
        )}
      />
    </div>
  );
}