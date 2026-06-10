import React, { createContext, useState, useEffect, useContext } from "react";
import { api } from "../services/api";
const AuthContext = createContext(null);
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    const initializeAuthSession = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data);
      } catch (err) {
        console.error("Session verification handshake failed:", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuthSession();
  }, []);

  const login = async (credentials) => {
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      const response = await api.post("/auth/login", credentials);
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      const errMsg =
        err.response?.data?.message || "Authentication system rejection.";
      setLoginError(errMsg);
      throw err;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("logout successfull");
    } catch (err) {
      console.error("Backend logout cleanup failed:", err);
      toast.error("failed to log out");
    } finally {
      setUser(null);
      navigate("/login");
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, loginError, isLoggingIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
