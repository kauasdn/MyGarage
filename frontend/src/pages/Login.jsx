import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

export default function Login({ setPage }) {
  const { handleLogin } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", senha: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sucesso = await handleLogin(form.email, form.senha);
    if (sucesso) {
      setPage("dashboard");
    } else {
      alert("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] w-full">
      <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-lg w-full max-w-lg border border-gray-100 dark:border-gray-700">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-500 mb-3">MyGarage</h1>
          <p className="text-gray-500 dark:text-gray-400 md:text-lg">Faça login para gerenciar seus veículos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            type="email" 
            label="E-mail" 
            placeholder="seu@email.com"
            value={form.email} 
            onChange={e => setForm({ ...form, email: e.target.value })} 
            required
          />
          
          <Input 
            type="password" 
            label="Senha" 
            placeholder="••••••••"
            value={form.senha} 
            onChange={e => setForm({ ...form, senha: e.target.value })} 
            required
          />

          <div className="pt-6 flex justify-center">
            <Button type="submit" className="w-full py-3.5 text-lg">Entrar no MyGarage</Button>
          </div>
        </form>

        <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
          Ainda não tem uma conta?{" "}
          <button 
            type="button"
            onClick={() => setPage("cadastro")}
            className="text-red-600 dark:text-red-500 font-bold hover:underline"
          >
            Registe-se
          </button>
        </p>
      </div>
    </div>
  );
}