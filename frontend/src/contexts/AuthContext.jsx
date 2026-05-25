import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verifica se já existe um token guardado ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem('mygarage_token');
    const storedUser = localStorage.getItem('mygarage_user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email, senha) => {
    try {
      const response = await api.post('/auth/login', { email, senha });
      
      // Guarda o Token e os dados do utilizador
      localStorage.setItem('mygarage_token', response.data.token);
      localStorage.setItem('mygarage_user', JSON.stringify(response.data.usuario));
      
      setUser(response.data.usuario);
      return true;
    } catch (error) {
      console.error("Erro no login", error);
      return false;
    }
  };

  const handleRegister = async (nome, email, senha) => {
    try {
      await api.post('/auth/register', { nome, email, senha });
      return true;
    } catch (error) {
      console.error("Erro no registo", error);
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mygarage_token');
    localStorage.removeItem('mygarage_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleRegister, handleLogout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};