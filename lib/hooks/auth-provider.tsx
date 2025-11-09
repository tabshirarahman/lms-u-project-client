/* eslint-disable @typescript-eslint/no-explicit-any */
// AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { getUserInfo } from "@/services/auth.services";
import { isLoggedIn } from "@/services/auth.services";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: any;
  setIsAuthenticated: (val: boolean) => void;
  setUser: (user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loggedIn = isLoggedIn();
    const userData = getUserInfo();
    if (loggedIn) {
      setIsAuthenticated(true);
      setUser(userData);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
