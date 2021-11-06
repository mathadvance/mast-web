import { useAuth } from "@/contexts/AuthProvider";
import { powerToRole } from "@/utils/server/powerToRole";
import { FormSubmit } from "@/components/FormComponents";
import NextLink from "next/link";
import router from "next/router";

export default function Home() {
  const { user, setUser } = useAuth();

  const roleName = powerToRole(user.power);

  function Unverified() {
    function send_verification_email() {
      fetch("/api/email/send-verification", {
        method: "POST",
        body: user.username,
      });
    }

    return (
      <div className="space-y-4">
        <p>
          Please verify your account through your email address{" "}
          <em>({user.email})</em>. If the verification email did not send or the
          link has expired, you can resend it.
        </p>
        <p>
          If your account is not verified in fourteen days, it will be
          automatically deleted.
        </p>
        <FormSubmit
          text="Resend Verification Email"
          onClick={() => {
            send_verification_email();
          }}
        />
      </div>
    );
  }

  function User() {
    function become_applicant() {
      fetch("/api/profile/change-power", {
        method: "POST",
        body: JSON.stringify({ username: user.username, power: 2 }),
      });
      const updatedUser = user;
      updatedUser.power = 2;
      setUser(updatedUser);
      router.push("/home"); // Forces page to reinitialize
    }
    return (
      <div className="space-y-4">
        <p>
          If you just signed up to check out the website or aren't sure about
          applying yet, you should remain a user.
        </p>
        <p>
          Otherwise, click the button below to become an applicant and get
          access to the application portal.
        </p>
        <p>
          <em>This operation is irreversible</em>, though you are not obligated
          if you do click the button. It's just so I get a better idea of who's
          planning to apply.
        </p>
        <FormSubmit
          text="Become an Applicant"
          onClick={() => {
            become_applicant();
          }}
        />
      </div>
    );
  }

  function Applicant() {
    if (user.data.applied) {
      return (
        <div className="space-y-4">
          <p>
            Congratulations on applying for MAST! The staff team will get back
            to you regarding your application.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <p>
          Follow the{" "}
          <NextLink href="/apply">
            <a className="blue-link">application instructions</a>
          </NextLink>{" "}
          and enter the{" "}
          <NextLink href="/profile/app-portal">
            <a className="blue-link">application portal</a>
          </NextLink>{" "}
          to begin applying.
        </p>
        <div>
          <NextLink href="/profile/app-portal">
            <a>
              <FormSubmit text="Go to Application Portal" />
            </a>
          </NextLink>
        </div>
      </div>
    );
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
        return Unverified();
      case 1:
        return User();
      case 2:
        return Applicant();
      case 3:
        return Student();
      case 4:
        return Staff();
      case 5:
        return Admin();
      case 6:
        return SuperAdmin();
    }
  }

  return (
    <>
      <h1>Home</h1>
      <p>
        Greetings, <em>{user.first_name}</em>. Your account role is{" "}
        <em>{roleName}</em>.
      </p>
      <RenderRole />
    </>
  );
}
