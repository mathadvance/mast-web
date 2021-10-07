import router from "next/router";
import { useAuth } from "@/utils/server/AuthProvider";
import { useEffect } from "react";

export default function Logout() {
  const user = useAuth();
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    (async () => {
      fetch("/api/signout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      router.push("/about");
    })();
  }, [user]);
  return null;
}
