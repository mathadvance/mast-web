import { createContext, useContext, useEffect, useState } from "react";
import { User } from "./User";

const AuthContext = createContext<{ user: User }>({ user: null });

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async () => {
      const res = await fetch("/api/auth");
    };
  });
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
