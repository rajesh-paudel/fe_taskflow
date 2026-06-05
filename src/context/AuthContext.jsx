import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: "12345",
    name: "rajesh paudel",
    email: "rajeshpaudel9863@gmail.com",
  });
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const initializeAuthSession = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/auth/me", {
  //         method: "GET",
  //         credentials: "include",
  //       });

  //       if (response.ok) {
  //         const userData = await response.json();
  //         setUser(userData);
  //       } else {
  //         setUser(null);
  //       }
  //     } catch (err) {
  //       console.error("Session verification handshake failed:", err);
  //       setUser(null);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   // initializeAuthSession();
  // }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Backend logout cleanup failed:", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
