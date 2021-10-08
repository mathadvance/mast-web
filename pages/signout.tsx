import router from "next/router";
import { useAuth } from "@/contexts/AuthProvider";

export default function Logout() {
  const { setUser } = useAuth();
  (async () => {
    await fetch("/api/signout",
      {
        method: "POST",
        credentials: "include",
      });
    setUser(undefined);

    router.push("/about");
  })();

  return <>
    <h1>Redirecting...</h1>
    <p>You are being taken to the About page.</p>
  </>;
}
