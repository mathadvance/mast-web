import { createContext, useContext, useEffect, useState } from "react";
import { User } from "./User";
import Cookies from "js-cookie"

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
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
    })();
  }, [user]);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
