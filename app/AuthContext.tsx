import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  token: string | null;
  username: string | null;
  role: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<string>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  username: null,
  role: null,
  loading: true,
  login: async () => "",
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        const storedUsername = await AsyncStorage.getItem("username");
        const storedRole = await AsyncStorage.getItem("userRole");

        if (storedToken) setToken(storedToken);
        if (storedUsername) setUsername(storedUsername);
        if (storedRole) setRole(storedRole);
      } catch (err) {
        console.log("Error restoring session", err);
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  // The login function
  const login = async (username: string, password: string): Promise<string> => {
    try {
      const response = await fetch("http://127.0.0.1:8081/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await response.json();

      if (!data.role || !data.username) {
        throw new Error("Server response missing required information");
      }

      setToken(data.access_token);
      setUsername(data.username); 
      setRole(data.role);

      // Store in AsyncStorage
      await AsyncStorage.setItem("authToken", data.access_token);
      await AsyncStorage.setItem("username", data.username); 
      await AsyncStorage.setItem("userRole", data.role);

      return data.role;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("userRole");

      setToken(null);
      setUsername(null);
      setRole(null);
    } catch (err) {
      console.log("Error logging out", err);
    }
  };

  const value: AuthContextType = {
    token,
    username, 
    role,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
