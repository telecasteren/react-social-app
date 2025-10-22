import { loadKey, logoutFromStorage } from "@/services/helpers/storage";
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { login as loginApi } from "@/services/api/auth/loginUser";
import { register as registerApi } from "@/services/api/auth/registerUser";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Checking for token and logged in user in localStorage
  useEffect(() => {
    const token = loadKey("token");
    const profile = loadKey("profile");
    setUser(profile);
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const profile = await loginApi(email, password);

    setUser(profile);
    setIsAuthenticated(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Resolving login promise with:", profile);
        resolve(profile);
      }, 10);
    });
  };

  const register = async (name: string, email: string, password: string) => {
    const result = await registerApi(name, email, password);
    return result;
  };

  const logout = () => {
    logoutFromStorage();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
