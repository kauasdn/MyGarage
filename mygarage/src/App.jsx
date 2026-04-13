import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <TopNav page={page} setPage={setPage} />

      <div className="max-w-6xl mx-auto p-6">
        {page === "dashboard" && <Dashboard />}
        {page === "veiculos" && <Veiculos />}
        {page === "abastecimentos" && <Abastecimentos />}
        {page === "manutencoes" && <Manutencoes />}
      </div>
    </div>
  );
}

function TopNav({ page, setPage }) {
  return (
    <div className="bg-white shadow sticky top-0 z-50">
      <div className="flex flex-col items-center py-4">
        <h1 className="text-3xl font-bold tracking-tight">MyGarage</h1>

        <div className="flex gap-6 mt-4 border-b">
          <NavItem text="Dashboard" active={page === "dashboard"} onClick={() => setPage("dashboard")} />
          <NavItem text="Veículos" active={page === "veiculos"} onClick={() => setPage("veiculos")} />
          <NavItem text="Abastecimentos" active={page === "abastecimentos"} onClick={() => setPage("abastecimentos")} />
          <NavItem text="Manutenções" active={page === "manutencoes"} onClick={() => setPage("manutencoes")} />
        </div>
      </div>
    </div>
  );
}

function NavItem({ text, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`pb-2 font-medium transition border-b-2 ${
        active
          ? "text-blue-600 border-blue-600"
          : "text-gray-500 border-transparent hover:text-blue-500"
      }`}
    >
      {text}
    </button>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
      <h2 className="text-gray-500 text-sm">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Consumo médio" value="10.5 km/l" />
        <Card title="Abastecimentos" value="12" />
        <Card title="Manutenções" value="5" />
      </div>
    </div>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
    >
      {children}
    </button>
  );
}

function Table({ headers, data, renderRow }) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 text-gray-600 text-sm">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="p-3 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="border-t hover:bg-gray-50 transition">
              {renderRow(item)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [form, setForm] = useState({ marca: "", modelo: "", ano: "", placa: "" });

  function addVeiculo() {
    setVeiculos([...veiculos, form]);
    setForm({ marca: "", modelo: "", ano: "", placa: "" });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Veículos</h1>

      <div className="bg-white p-4 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-5 gap-3">
        <Input placeholder="Marca" value={form.marca} onChange={e => setForm({ ...form, marca: e.target.value })} />
        <Input placeholder="Modelo" value={form.modelo} onChange={e => setForm({ ...form, modelo: e.target.value })} />
        <Input placeholder="Ano" value={form.ano} onChange={e => setForm({ ...form, ano: e.target.value })} />
        <Input placeholder="Placa" value={form.placa} onChange={e => setForm({ ...form, placa: e.target.value })} />
        <Button onClick={addVeiculo}>Adicionar</Button>
      </div>

      <Table
        headers={["Marca", "Modelo", "Ano", "Placa"]}
        data={veiculos}
        renderRow={(v) => (
          <>
            <td className="p-3">{v.marca}</td>
            <td className="p-3">{v.modelo}</td>
            <td className="p-3">{v.ano}</td>
            <td className="p-3">{v.placa}</td>
          </>
        )}
      />
    </div>
  );
}

function Abastecimentos() {
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState({ data: "", km: "", litros: "", valor: "" });

  function add() {
    setLista([...lista, form]);
    setForm({ data: "", km: "", litros: "", valor: "" });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Abastecimentos</h1>

      <div className="bg-white p-4 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-5 gap-3">
        <Input placeholder="Data" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} />
        <Input placeholder="KM" value={form.km} onChange={e => setForm({ ...form, km: e.target.value })} />
        <Input placeholder="Litros" value={form.litros} onChange={e => setForm({ ...form, litros: e.target.value })} />
        <Input placeholder="Valor" value={form.valor} onChange={e => setForm({ ...form, valor: e.target.value })} />
        <Button onClick={add}>Adicionar</Button>
      </div>

      <Table
        headers={["Data", "KM", "Litros", "Valor"]}
        data={lista}
        renderRow={(a) => (
          <>
            <td className="p-3">{a.data}</td>
            <td className="p-3">{a.km}</td>
            <td className="p-3">{a.litros}</td>
            <td className="p-3">{a.valor}</td>
          </>
        )}
      />
    </div>
  );
}

function Manutencoes() {
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState({ tipo: "", km: "", valor: "" });

  function add() {
    setLista([...lista, form]);
    setForm({ tipo: "", km: "", valor: "" });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manutenções</h1>

      <div className="bg-white p-4 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-4 gap-3">
        <Input placeholder="Tipo" value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} />
        <Input placeholder="KM" value={form.km} onChange={e => setForm({ ...form, km: e.target.value })} />
        <Input placeholder="Valor" value={form.valor} onChange={e => setForm({ ...form, valor: e.target.value })} />
        <Button onClick={add}>Adicionar</Button>
      </div>

      <Table
        headers={["Tipo", "KM", "Valor"]}
        data={lista}
        renderRow={(m) => (
          <>
            <td className="p-3">{m.tipo}</td>
            <td className="p-3">{m.km}</td>
            <td className="p-3">{m.valor}</td>
          </>
        )}
      />
    </div>
  );
}