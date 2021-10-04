export default async function Logout() {
  await fetch("/api/logout");
}
