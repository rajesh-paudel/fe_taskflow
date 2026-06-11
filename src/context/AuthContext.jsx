import React, { createContext, useState, useEffect, useContext } from "react";
import { api } from "../services/api";
import { useQueryClient } from "@tanstack/react-query";
const AuthContext = createContext(null);
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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

    // Setup response interceptor to handle cache clearing on auth errors
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        // If 401 (Unauthorized), clear cache and user state
        if (error.response?.status === 401) {
          localStorage.clear();
          sessionStorage.clear();
          setUser(null);
        }
        return Promise.reject(error);
      },
    );

    initializeAuthSession();

    // Cleanup interceptor on unmount
    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const login = async (credentials) => {
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      // Clear old cache before login
      queryClient.clear();
      localStorage.clear();
      sessionStorage.clear();

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
      // Clear React Query cache
      queryClient.clear();

      // Clear localStorage and sessionStorage
      localStorage.clear();
      sessionStorage.clear();

      // Clear user state
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
