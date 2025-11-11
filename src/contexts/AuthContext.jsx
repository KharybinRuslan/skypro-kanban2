import { createContext, useState, useEffect } from "react";
import { registerUser, loginUser } from "../services/userApi";

const AuthContext = createContext(null);

const readUserFromStorage = () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

const persistUserToStorage = (userData) => {
  try {
    localStorage.setItem("user", JSON.stringify(userData));
  } catch {
    // Если localStorage переполнен, просто пропускаем сохранение.
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = readUserFromStorage();

    if (storedUser) {
      setUser(storedUser);
    }

    setIsAuth(Boolean(token));
    setIsLoading(false);
  }, []);

  const handleAuthSuccess = (userData) => {
    if (userData?.token) {
      localStorage.setItem("token", userData.token);
    }

    persistUserToStorage(userData);
    setUser(userData);
    setIsAuth(true);
    return { success: true };
  };

  const login = async (loginValue, password) => {
    try {
      const userData = await loginUser(loginValue, password);
      return handleAuthSuccess(userData);
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (loginValue, name, password) => {
    try {
      const userData = await registerUser(loginValue, name, password);
      return handleAuthSuccess(userData);
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
