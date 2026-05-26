import { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Table from "../components/Table";
import api from "../services/api";

export default function Veiculos({ veiculos, setVeiculos, setVeiculoAtivoId }) {
  const [form, setForm] = useState({ marca: "", modelo: "", ano: "", placa: "" });

  async function addVeiculo() {
    if (!form.marca || !form.modelo || !form.ano || !form.placa) {
      return alert("Preencha todos os campos.");
    }
    try {
      const response = await api.post('/vehicles', form);
      const novosVeiculos = [...veiculos, response.data];
      setVeiculos(novosVeiculos);
      // Se for o primeiro veículo, seleciona automaticamente
      if (novosVeiculos.length === 1) {
        setVeiculoAtivoId(response.data.id);
      }
      setForm({ marca: "", modelo: "", ano: "", placa: "" });
    } catch (error) {
      alert("Erro ao adicionar veículo. Verifique se a placa já está em uso.");
    }
  }

  async function removeVeiculo(id) {
    if (!window.confirm("Tem certeza que deseja remover este veículo?")) return;
    try {
      await api.delete(`/vehicles/${id}`);
      const novosVeiculos = veiculos.filter(v => v.id !== id);
      setVeiculos(novosVeiculos);
      if (novosVeiculos.length > 0) {
        setVeiculoAtivoId(novosVeiculos[0].id);
      } else {
        setVeiculoAtivoId(null);
      }
    } catch (error) {
      alert("Erro ao remover veículo.");
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Meus Veículos</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-5 gap-4 items-end border border-gray-100 dark:border-gray-700">
        <Input label="Marca" value={form.marca} onChange={e => setForm({ ...form, marca: e.target.value })} />
        <Input label="Modelo" value={form.modelo} onChange={e => setForm({ ...form, modelo: e.target.value })} />
        <Input label="Ano" value={form.ano} onChange={e => setForm({ ...form, ano: e.target.value })} />
        <Input label="Placa" value={form.placa} onChange={e => setForm({ ...form, placa: e.target.value })} />
        <Button onClick={addVeiculo}>Cadastrar</Button>
      </div>

      <Table
        headers={["Marca", "Modelo", "Ano", "Placa", ""]}
        data={veiculos}
        renderRow={(v) => (
          <>
            <td className="p-4 text-gray-600 dark:text-gray-400">{v.marca}</td>
            <td className="p-4 font-bold">{v.modelo}</td>
            <td className="p-4 text-gray-600 dark:text-gray-400">{v.ano}</td>
            <td className="p-4 font-mono text-red-600 dark:text-red-500 font-bold">{v.placa}</td>
            <td className="p-4">
              <button
                onClick={() => removeVeiculo(v.id)}
                className="text-sm text-red-500 hover:underline"
              >
                Remover
              </button>
            </td>
          </>
        )}
      />
    </div>
  );
}