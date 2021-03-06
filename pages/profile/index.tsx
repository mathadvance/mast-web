import { FormInput, FormSubmit, FormError } from "@/components/FormComponents";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import router from "next/router";
import EmailValidator from "email-validator";

export default function Profile() {
  const { user, setUser } = useAuth();

  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwdError, setPwdError] = useState("");

  function changeEmail() {
    if (!EmailValidator.validate(newEmail)) {
      setEmailError("You must input a valid email.");
      return;
    }
    setEmailError("");
    setNewEmail("");
    fetch("/api/email/change-email", {
      method: "POST",
      body: JSON.stringify({
        username: user.username,
        oldEmail: user.email,
        newEmail,
        action: "send",
      }),
    });
  }

  function changePassword() {
    if (currentPassword.length < 8) {
      setPwdError("The current password you entered is incorrect."); // by definition, all passwords must be >= 8 chars, so if it's not then it's wrong
      return;
    }
    (async () => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: user.username,
          password: currentPassword,
          dontCreateSession: true,
        }),
      });
      if (res.status >= 300) {
        setPwdError("The current password you entered is incorrect.");
        return;
      }
      if (newPassword.length < 8) {
        setPwdError("Your new password must be 8 characters or longer.");
        return;
      }
      if (newPassword === currentPassword) {
        setPwdError(
          "Your new password must be different from your old password."
        );
        return;
      }
      await fetch("/api/profile/change-password", {
        method: "POST",
        body: JSON.stringify({
          username: user.username,
          password: newPassword,
        }),
      });
      await fetch("/api/auth/signout", {
        method: "POST",
        credentials: "include",
      });
      setUser(undefined);
      setPwdError("");
      router.push("/about");
      return;
    })();
    return;
  }

  function SignOut() {
    fetch("/api/auth/set-earliest-acceptable-auth", {
      method: "POST",
      body: user.username,
      credentials: "include",
    });
    router.push("/about");
    return;
  }

  return (
    <div className="space-y-4">
      <h1>Profile</h1>
      <div className="space-y-2">
        <h2>Change Email</h2>
        <p>
          Your account's current email address is <em>{user.email}</em>.
        </p>
        <p>
          Clicking the "change email" button will send a confirmation email to
          the new email.
        </p>
      </div>
      <FormInput
        placeholder="New Email"
        value={newEmail}
        onChange={(event) => {
          setNewEmail(event.target.value);
        }}
      />
      <div className="space-y-2">
        <FormSubmit
          text="Change Email"
          onClick={() => {
            changeEmail();
          }}
        />
        <FormError error={emailError} />
      </div>
      <div className="space-y-2">
        <h2>Change Password</h2>
        <p>Input your current and new password in the fields below.</p>
        <p>Changing your password will sign you out of all sessions.</p>
      </div>
      <FormInput
        type="password"
        placeholder="Current Password"
        onChange={(event) => {
          setCurrentPassword(event.target.value);
        }}
      />
      <FormInput
        type="password"
        placeholder="New Password"
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
      <div className="space-y-2">
        <FormSubmit
          text="Change Password"
          onClick={() => {
            changePassword();
          }}
        />
        <FormError error={pwdError} />
      </div>
      <h2>Sign Out of All Sessions</h2>
      <p>
        Clicking the button below will sign you out of all sessions,{" "}
        <em>including this one</em>.
      </p>
      <FormSubmit
        text="Sign Out of All Sessions"
        onClick={() => {
          SignOut();
        }}
      />
    </div>
  );
}
