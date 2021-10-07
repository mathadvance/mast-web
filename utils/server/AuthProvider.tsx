import { createContext, useContext, useEffect, useState } from "react";
import { User } from "./User";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/auth", {
        method: "POST",
        credentials: "include",
      })
      const fetchedUserText = await res.text();
      if (fetchedUserText) {
        const fetchedUserObject = JSON.parse(fetchedUserText);
        const fetchedUser: User = new User(fetchedUserObject);
        setUser(fetchedUser);
      }
    }
    )();
    setLoading(false);
  }, []);
  return <AuthContext.Provider value={
    {
      user,
      loading
    }
  }>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
