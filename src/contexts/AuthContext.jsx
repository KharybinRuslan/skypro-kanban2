import { createContext, useState, useEffect } from "react";
import { registerUser, loginUser } from "../services/userApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (login, password) => {
    try {
      const userData = await loginUser(login, password);
      localStorage.setItem("token", userData.token);
      setUser(userData);
      setIsAuth(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (login, name, password) => {
    try {
      const userData = await registerUser(login, name, password);
      localStorage.setItem("token", userData.token);
      setUser(userData);
      setIsAuth(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, user, login, register, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
