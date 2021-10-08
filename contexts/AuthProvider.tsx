import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/utils/server/User";

import router, { useRouter } from "next/router";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {

  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const { asPath } = useRouter();
  const paths = asPath.split("/");
  const lastPath = paths[paths.length - 1];

  const protectedPages = ["", "home", "settings"];
  const antiProtectedPages = ["", "login", "signup", "signout"];

  const isProtectedPage: boolean = protectedPages.indexOf(lastPath) > -1;
  const isAntiProtectedPage: boolean = antiProtectedPages.indexOf(lastPath) > -1;

  const getUser = async () => {
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
    setLoading(false);
  };

  useEffect(() => {
    if (!loading && !user && isProtectedPage) {
      router.push("/about");
    }
    if (!loading && user && isAntiProtectedPage) {
      router.push("/home");
    }
  }, [loading, asPath])

  // Make signout update properly
  useEffect(() => {
    if (lastPath == "signout") {
      setUser(undefined);
    }
  }, [lastPath == "signout"])

  useEffect(() => {
    getUser();
  }, [user]);

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
