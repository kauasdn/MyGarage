import { useState, useEffect } from "react";
import api from "../services/api";

// ── Sub-componentes

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-1">{label}</p>
      <p className={`text-4xl font-bold ${color}`}>{value ?? "—"}</p>
    </div>
  );
}

function Badge({ role }) {
  return role === "admin"
    ? <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-full">Admin</span>
    : <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs font-semibold rounded-full">User</span>;
}

// ── Aba Visão Geral
function AbaVisaoGeral() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/stats').then(r => setStats(r.data)).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Visão Geral da Plataforma</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Usuários"        value={stats?.totalUsuarios}        color="text-blue-600 dark:text-blue-400" />
        <StatCard label="Veículos"        value={stats?.totalVeiculos}        color="text-green-600 dark:text-green-400" />
        <StatCard label="Abastecimentos"  value={stats?.totalAbastecimentos}  color="text-yellow-600 dark:text-yellow-400" />
        <StatCard label="Manutenções"     value={stats?.totalManutencoes}     color="text-red-600 dark:text-red-400" />
      </div>
    </div>
  );
}

// ── Aba Usuários
function AbaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api.get('/admin/usuarios')
      .then(r => setUsuarios(r.data))
      .catch(console.error)
      .finally(() => setCarregando(false));
  }, []);

  const toggleRole = async (usuario) => {
    const novaRole = usuario.role === 'admin' ? 'user' : 'admin';
    const confirmMsg = `Alterar "${usuario.nome}" para ${novaRole}?`;
    if (!window.confirm(confirmMsg)) return;
    try {
      const r = await api.put(`/admin/usuarios/${usuario.id}/role`, { role: novaRole });
      setUsuarios(prev => prev.map(u => u.id === usuario.id ? { ...u, role: r.data.role } : u));
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao alterar role.');
    }
  };

  const deletar = async (usuario) => {
    if (!window.confirm(`Excluir permanentemente "${usuario.nome}" e todos os seus dados?`)) return;
    try {
      await api.delete(`/admin/usuarios/${usuario.id}`);
      setUsuarios(prev => prev.filter(u => u.id !== usuario.id));
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao excluir usuário.');
    }
  };

  if (carregando) return <p className="text-gray-400 py-8 text-center">Carregando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Usuários</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">{usuarios.length} registros</span>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-500 dark:text-gray-400">Nome</th>
              <th className="text-left p-4 font-semibold text-gray-500 dark:text-gray-400 hidden md:table-cell">Email</th>
              <th className="text-left p-4 font-semibold text-gray-500 dark:text-gray-400">Role</th>
              <th className="text-left p-4 font-semibold text-gray-500 dark:text-gray-400 hidden md:table-cell">Veículos</th>
              <th className="text-left p-4 font-semibold text-gray-500 dark:text-gray-400 hidden md:table-cell">Cadastro</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {usuarios.map(u => (
              <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                <td className="p-4 font-medium text-gray-800 dark:text-gray-100">{u.nome}</td>
                <td className="p-4 text-gray-500 dark:text-gray-400 hidden md:table-cell">{u.email}</td>
                <td className="p-4"><Badge role={u.role} /></td>
                <td className="p-4 text-gray-500 dark:text-gray-400 hidden md:table-cell">{u._count.veiculos}</td>
                <td className="p-4 text-gray-500 dark:text-gray-400 hidden md:table-cell">
                  {new Date(u.criadoEm).toLocaleDateString('pt-BR')}
                </td>
                <td className="p-4">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => toggleRole(u)}
                      className="px-3 py-1 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      {u.role === 'admin' ? 'Rebaixar' : 'Promover'}
                    </button>
                    <button
                      onClick={() => deletar(u)}
                      className="px-3 py-1 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-red-500 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Aba Veículos
function AbaVeiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    api.get('/admin/veiculos')
      .then(r => setVeiculos(r.data))
      .catch(console.error)
      .finally(() => setCarregando(false));
  }, []);

  const deletar = async (veiculo) => {
    if (!window.confirm(`Excluir "${veiculo.modelo} (${veiculo.placa})" e todos os seus registros?`)) return;
    try {
      await api.delete(`/admin/veiculos/${veiculo.id}`);
      setVeiculos(prev => prev.filter(v => v.id !== veiculo.id));
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao excluir veículo.');
    }
  };

  const filtrados = veiculos.filter(v =>
    [v.modelo, v.marca, v.placa, v.dono?.nome, v.dono?.email]
      .join(' ').toLowerCase().includes(busca.toLowerCase())
  );

  if (carregando) return <p className="text-gray-400 py-8 text-center">Carregando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-3 items-start md:items-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Veículos</h2>
        <input
          type="text"
          placeholder="Buscar por modelo, placa ou dono..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm w-full md:w-72 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-500 dark:text-gray-400">Veículo</th>
              <th className="text-left p-4 font-semibold text-gray-500 dark:text-gray-400 hidden md:table-cell">Placa</th>
              <th className="text-left p-4 font-semibold text-gray-500 dark:text-gray-400 hidden md:table-cell">Dono</th>
              <th className="text-left p-4 font-semibold text-gray-500 dark:text-gray-400 hidden md:table-cell">Registros</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {filtrados.map(v => (
              <tr key={v.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                <td className="p-4">
                  <p className="font-medium text-gray-800 dark:text-gray-100">{v.marca} {v.modelo}</p>
                  <p className="text-xs text-gray-400">{v.ano}</p>
                </td>
                <td className="p-4 font-mono text-red-600 dark:text-red-400 font-bold hidden md:table-cell">{v.placa}</td>
                <td className="p-4 hidden md:table-cell">
                  <p className="text-gray-700 dark:text-gray-300">{v.dono?.nome}</p>
                  <p className="text-xs text-gray-400">{v.dono?.email}</p>
                </td>
                <td className="p-4 text-gray-500 dark:text-gray-400 hidden md:table-cell">
                  {v._count.abastecimentos} abast. · {v._count.manutencoes} manut.
                </td>
                <td className="p-4">
                  <button
                    onClick={() => deletar(v)}
                    className="px-3 py-1 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-red-500 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400">Nenhum veículo encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Página Principal Admin
export default function Admin() {
  const [aba, setAba] = useState('geral');

  const abas = [
    { id: 'geral',    label: 'Visão Geral' },
    { id: 'usuarios', label: 'Usuários' },
    { id: 'veiculos', label: 'Veículos' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">A</div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Painel de Administração</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Gerencie usuários, veículos e monitore a plataforma.</p>
        </div>
      </div>

      {/* Abas */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {abas.map(a => (
          <button
            key={a.id}
            onClick={() => setAba(a.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition -mb-px ${
              aba === a.id
                ? 'border-red-600 text-red-600 dark:border-red-500 dark:text-red-500'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div>
        {aba === 'geral'    && <AbaVisaoGeral />}
        {aba === 'usuarios' && <AbaUsuarios />}
        {aba === 'veiculos' && <AbaVeiculos />}
      </div>
    </div>
  );
}