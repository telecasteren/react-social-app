import {
  loadKey,
  saveKey,
  logoutFromStorage,
} from "@/services/helpers/storage";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Checking for token in local storage
  useEffect(() => {
    const token = loadKey("token");
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const login = (token: string) => {
    saveKey("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    logoutFromStorage();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
