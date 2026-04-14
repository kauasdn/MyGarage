import { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

export default function Cadastro({ setPage }) {
  const [form, setForm] = useState({ nome: "", email: "", senha: "", confirmaSenha: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.senha !== form.confirmaSenha) {
      return alert("As senhas não coincidem!");
    }
    console.log("Dados para Cadastro:", form);
    alert("Simulação: Cadastro realizado!");
    setPage("login");
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] w-full">
      {/* 🚀 Alterado: max-w-xl (ainda maior para acomodar a grade de senhas) e md:p-12 */}
      <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-lg w-full max-w-xl border border-gray-100 dark:border-gray-700">
        <div className="text-center mb-10">
          {/* 🚀 Alterado: Fontes maiores */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">Criar Conta</h1>
          <p className="text-gray-500 dark:text-gray-400 md:text-lg">Junte-se ao MyGarage hoje mesmo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            type="text" 
            label="Nome Completo" 
            placeholder="João Silva"
            value={form.nome} 
            onChange={e => setForm({ ...form, nome: e.target.value })} 
            required
          />

          <Input 
            type="email" 
            label="E-mail" 
            placeholder="seu@email.com"
            value={form.email} 
            onChange={e => setForm({ ...form, email: e.target.value })} 
            required
          />
          
          {/* A grade para senhas vai respirar muito melhor agora */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input 
              type="password" 
              label="Senha" 
              placeholder="••••••••"
              value={form.senha} 
              onChange={e => setForm({ ...form, senha: e.target.value })} 
              required
            />
            <Input 
              type="password" 
              label="Confirmar Senha" 
              placeholder="••••••••"
              value={form.confirmaSenha} 
              onChange={e => setForm({ ...form, confirmaSenha: e.target.value })} 
              required
            />
          </div>

          <div className="pt-6 flex justify-center">
            {/* 🚀 Alterado: Botão largo e robusto */}
            <Button type="submit" className="w-full py-3.5 text-lg">Cadastrar</Button>
          </div>
        </form>

        <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
          Já tem uma conta?{" "}
          <button 
            type="button"
            onClick={() => setPage("login")}
            className="text-red-600 dark:text-red-500 font-bold hover:underline"
          >
            Fazer Login
          </button>
        </p>
      </div>
    </div>
  );
}