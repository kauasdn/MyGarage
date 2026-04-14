import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const handleLogin = async (email, senha) => {
    // AQUI ENTRARÁ A LIGAÇÃO AO BACK-END
    if (email && senha) {
      setUser({ nome: "Gestor", email: email });
      return true; // Login com sucesso
    }
    return false; // Falhou
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}