import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import api from "../services/api";

export default function MinhaConta() {
  const { user, handleLogout } = useContext(AuthContext);

  const [form, setForm] = useState({
    nome: user?.nome || "",
    email: user?.email || "",
    senhaAtual: "",
    novaSenha: "",
    confirmarNovaSenha: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.novaSenha && form.novaSenha !== form.confirmarNovaSenha) {
      return alert("As novas senhas não coincidem!");
    }

    try {
      const payload = { nome: form.nome, email: form.email };
      if (form.novaSenha) {
        payload.senhaAtual = form.senhaAtual;
        payload.novaSenha = form.novaSenha;
      }

      await api.put('/users/me', payload);

      // Atualiza os dados no localStorage
      const updatedUser = { ...user, nome: form.nome, email: form.email };
      localStorage.setItem('mygarage_user', JSON.stringify(updatedUser));

      alert("Dados da conta atualizados com sucesso!");
      setForm(prev => ({ ...prev, senhaAtual: "", novaSenha: "", confirmarNovaSenha: "" }));
    } catch (error) {
      const msg = error.response?.data?.error || "Erro ao atualizar dados.";
      alert(msg);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmacao = window.confirm(
      "Tem a certeza absoluta de que deseja excluir a sua conta? Esta ação é irreversível e todos os seus veículos e registros serão perdidos."
    );

    if (confirmacao) {
      try {
        await api.delete('/users/me');
        alert("A sua conta foi excluída com sucesso.");
        handleLogout();
      } catch (error) {
        alert("Erro ao excluir a conta.");
      }
    }
  };

  const userInitial = form.nome ? form.nome.charAt(0).toUpperCase() : "U";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Minha Conta</h2>
        <p className="text-gray-500 dark:text-gray-400">Altere as suas informações pessoais e credenciais de acesso.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">

        {/* Cabeçalho do Perfil */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-gray-700">
          <div className="w-16 h-16 bg-red-600 flex items-center justify-center rounded-full text-white font-bold text-2xl shadow-sm">
            {userInitial}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{form.nome || "Utilizador"}</h3>
            <p className="text-gray-500 dark:text-gray-400">{form.email}</p>
          </div>
        </div>

        {/* Formulário de Atualização */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              type="text"
              label="Nome"
              value={form.nome}
              onChange={e => setForm({ ...form, nome: e.target.value })}
              required
            />
            <Input
              type="email"
              label="E-mail"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="pt-4">
            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-4">Alterar Senha</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="password"
                label="Senha Atual"
                placeholder="••••••••"
                value={form.senhaAtual}
                onChange={e => setForm({ ...form, senhaAtual: e.target.value })}
              />
              <Input
                type="password"
                label="Nova Senha"
                placeholder="••••••••"
                value={form.novaSenha}
                onChange={e => setForm({ ...form, novaSenha: e.target.value })}
              />
              <Input
                type="password"
                label="Confirmar Nova"
                placeholder="••••••••"
                value={form.confirmarNovaSenha}
                onChange={e => setForm({ ...form, confirmarNovaSenha: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <Button type="submit" className="px-8 py-2.5">Salvar Alterações</Button>
          </div>
        </form>
      </div>

      <div className="mt-8 bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30">
        <button
          type="button"
          onClick={handleDeleteAccount}
          className="px-6 py-2.5 bg-white dark:bg-gray-800 text-red-600 dark:text-red-500 font-bold rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/50 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Excluir Minha Conta
        </button>
        <p className="text-sm text-red-500/80 dark:text-red-400/80 mt-4">
          A exclusão da sua conta é permanente. Todos os seus veículos, históricos de abastecimento e registros de manutenções serão apagados do sistema e não poderão ser recuperados.
        </p>
      </div>
    </div>
  );
}
