import router from "next/router";
import { useAuth } from "@/contexts/AuthProvider";

export default function Signout() {
  const { setUser } = useAuth();
  fetch("http://localhost:3000/api/auth/signout", {
    method: "POST",
    credentials: "include",
  });
  setUser(undefined);
  router.push("/about");
  return null;
}
