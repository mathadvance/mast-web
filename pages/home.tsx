import { useAuth } from "@/utils/server/AuthProvider";
import { powerToRole } from "@/utils/server/powerToRole";
import router from "next/router";
import { useEffect } from "react";
import { FormSubmit } from "@/components/FormComponents"

export default function Home() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/about");
    }
  }, [loading]);

  if (!user) {
    return (
      <>
        <h1>Redirecting...</h1>
        <p>Since you aren't logged in, you will be taken to the About page.</p>
      </>
    );
  }
  const roleName = powerToRole(user.power);

  function User() {
    return (
      <div className="space-y-4">
        <p>
          Please verify your account through your email address <em>({user.email})</em>.
        </p>
        <FormSubmit text="Resend Verification Email" />
      </div>
    );
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
      <p>Greetings, <em>{user.first_name}</em>. Your current role is <em>{roleName}</em>.</p>
      <RenderRole />
    </>
  );
}