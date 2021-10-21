import router from "next/router";
import { useAuth } from "@/contexts/AuthProvider";
import { useEffect } from "react";

export default function Signout() {
  const { setUser } = useAuth();
  useEffect(() => {
    fetch("/api/auth/signout", {
      method: "POST",
      credentials: "include",
    });
    setUser(undefined);
    router.push("/about");
  });
  return null;
}
