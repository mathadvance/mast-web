import router from "next/router";
import { useAuth } from "@/contexts/AuthProvider";
import { useEffect } from "react";

export default function Logout() {
  const { user } = useAuth();
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
  return <>
    <h1>Redirecting...</h1>
    <p>You are being taken to the About page.</p>
  </>;
}
