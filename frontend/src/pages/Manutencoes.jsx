import { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Table from "../components/Table";

export default function Manutencoes({ veiculo }) {
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState({ tipo: "", km: "", valor: "" });

  const add = () => {
    if (!form.tipo || !form.valor) return alert("Dados incompletos!");
    setLista([...lista, { ...form, id: Date.now() }]);
    setForm({ tipo: "", km: "", valor: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manutenções</h1>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Visualizando dados de:</p>
          <p className="text-lg font-bold text-red-600 dark:text-red-500">{veiculo?.modelo} - {veiculo?.placa}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end border border-gray-100 dark:border-gray-700">
        <Input label="Tipo de Serviço" value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} />
        <Input type="number" label="KM Atual" value={form.km} onChange={e => setForm({ ...form, km: e.target.value })} />
        <Input type="number" label="Custo (R$)" value={form.valor} onChange={e => setForm({ ...form, valor: e.target.value })} />
        <Button onClick={add}>Registrar</Button>
      </div>

      <Table
        headers={["Serviço", "Quilometragem", "Valor"]}
        data={lista}
        renderRow={(m) => (
          <>
            <td className="p-4 font-medium">{m.tipo}</td>
            <td className="p-4">{m.km} km</td>
            <td className="p-4 font-bold text-red-600 dark:text-red-400 font-mono italic">R$ {m.valor}</td>
          </>
        )}
      />
    </div>
  );
}