import { createContext, useContext, useEffect, useState } from "react";
import { User } from "./User";

const AuthContext = createContext(undefined);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    async () => {
      const req = await fetch("/api/auth")
      const user = req.body
      setUser(user);
    };
  });
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
