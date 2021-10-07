import router from "next/router";

export default function Logout() {
  fetch("/api/signout",
    {
      method: "POST",
      credentials: "include",
    }
  );
  router.push("/about");
  return null;
}
