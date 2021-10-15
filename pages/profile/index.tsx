import { FormInput, FormSubmit, FormError } from "@/components/FormComponents";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import router from "next/router";

export default function Profile() {
  const { user, setUser } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  async function changePassword() {
    if (currentPassword.length < 8) {
      setError("The current password you entered is incorrect."); // by definition, all passwords must be >= 8 chars, so if it's not then it's wrong
      return;
    }
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: user.username,
        password: currentPassword,
        dontCreateSession: true,
      }),
    });
    if (res.status >= 300) {
      setError("The current password you entered is incorrect.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Your new password must be 8 characters or longer.");
      return;
    }
    await fetch("/api/change_password", {
      method: "POST",
      body: JSON.stringify({
        username: user.username,
        password: newPassword,
      }),
    });
    await fetch("/api/signout", {
      method: "POST",
      credentials: "include",
    });
    setUser(undefined);
    setError("");
    router.push("/about");
    return;
  }

  function SignOut() {
    fetch("/api/set_earliest_acceptable_auth", {
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
      <h2>Change Password</h2>
      <p>Input your current and new password in the fields below.</p>
      <p>Changing your password will sign you out of all sessions.</p>
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
      <FormSubmit
        text="Change Password"
        onClick={() => {
          changePassword();
        }}
      />
      <h2>Sign Out of All Sessions</h2>
      <p>
        Clicking the button below will sign you out of all sessions{" "}
        <em>including this one</em>.
      </p>
      <FormSubmit
        text="Sign Out of All Sessions"
        onClick={() => {
          SignOut();
        }}
      />
      <div>
        <FormError error={error} />
      </div>
    </div>
  );
}
