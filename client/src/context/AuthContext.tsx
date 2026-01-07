import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // 1️⃣ טעינה ראשונית מ־localStorage (מהיר)
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

 useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/me",
        { withCredentials: true }
      );
      if (res.data.user) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    } catch (err) {
      console.error(err);
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  fetchUser();
}, []);


  // 3️⃣ logout
  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");

  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
