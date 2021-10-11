import router from "next/router";
import { useAuth } from "@/contexts/AuthProvider";

export default function Logout() {
  const { setUser } = useAuth();
  (async () => {
    fetch("/api/signout", {
      method: "POST",
      credentials: "include",
    });
    setUser(undefined);
    router.push("/about");
  })();
  return null;
}
