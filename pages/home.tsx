import { useAuth } from "@/contexts/AuthProvider";
import { powerToRole } from "@/utils/server/powerToRole";
import { FormSubmit } from "@/components/FormComponents";

export default function Home() {
  const { user } = useAuth();

  const roleName = powerToRole(user.power);

  function User() {
    const onSubmit = () => {};
    return (
      <div className="space-y-4">
        <p>
          Please verify your account through your email address{" "}
          <em>({user.email})</em>. If the verification email did not send or the
          link has expired, you can resend it.
        </p>
        <FormSubmit
          text="Resend Verification Email"
          onClick={() => {
            onSubmit();
          }}
        />
      </div>
    );
  }

  function Applicant() {
    return <></>;
  }

  function Student() {
    return <></>;
  }

  function Staff() {
    return <></>;
  }

  function Admin() {
    return <></>;
  }

  function SuperAdmin() {
    return <></>;
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
      <p>
        Greetings, <em>{user.first_name}</em>. Your account role is{" "}
        <em>{roleName}</em>.
      </p>
      <RenderRole />
    </>
  );
}
