import { useAuth } from "@/utils/server/AuthProvider";
import { powerToRole } from "@/utils/server/powerToRole";
import router from "next/router";
import { useEffect } from "react";

export default function Home({ user }) {
  useEffect(() => {
    if (!user.username) {
      // router.push("/about");
    }
  }, user)
  if (!user.username) {
    return (
      <>
        <h1>Redirecting...</h1>
        <p>Since you aren't logged in, you will be taken to the About page.</p>
      </>
    );
  }
  const roleName = powerToRole(user.power);

  function User() {
    return <></>
  }

  function Applicant() {
    return <></>
  }

  function Student() {
    return <></>
  }

  function Staff() {
    return <></>
  }

  function Admin() {
    return <></>
  }

  function SuperAdmin() {
    return <></>
  }

  function RenderRole() {
    switch (user.power) {
      case 0:
        return User();
      case 1:
        return Applicant();
      case 2:
        return Student();
      case 3:
        return Staff();
      case 4:
        return Admin();
      case 5:
        return SuperAdmin();
    }
  }

  return (
    <>
      <p>Greetings, {user.first_name}. Your current role is {roleName}.</p>
      <RenderRole />
    </>
  );
}

export async function getServerSideProps(context) {
  const user = await ("/api/auth")
  return {
    props: { user },
  };
}