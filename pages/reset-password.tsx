import {
  FormBox,
  FormInput,
  FormSubmit,
  FormError,
} from "@/components/FormComponents";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

export default function reset_password() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetted, setResetted] = useState(false);
  const [verificationSucceeded, setVerificationSucceeded] = useState(false);
  let key;

  function reset_password() {
    if (password.length < 8) {
      setError("Your new password must be 8 characters or longer.");
      return;
    }
    (async () => {
      const res = await fetch("/api/email/reset-password", {
        method: "POST",
        body: JSON.stringify({
          action: "change",
          key: router.query.key,
          password,
        }),
      });
      if (res.status === 200) {
        setResetted(true);
        setError("");
        return;
      } else {
        setVerificationSucceeded(false);
        return;
      }
    })();
  }

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    key = router.query.key || {};
    (async () => {
      if (key) {
        const res = await fetch("/api/email/reset-password", {
          method: "POST",
          body: JSON.stringify({
            action: "verify",
            key,
          }),
        });
        const status = await res.status;
        if (status === 200) {
          setVerificationSucceeded(true);
        }
      }
      setLoading(false);
    })();
  }, [router.isReady]);

  if (loading) {
    return null;
  }

  if (verificationSucceeded) {
    return (
      <FormBox>
        <h1>Reset Password</h1>
        {resetted ? (
          <>
            <p>Your password has been reset.</p>
          </>
        ) : (
          <>
            <FormInput
              placeholder="New Password"
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <FormSubmit
              text="Reset Password"
              onClick={() => {
                reset_password();
              }}
            />
            <FormError error={error} />
          </>
        )}
      </FormBox>
    );
  }

  return (
    <FormBox>
      <h1>Reset Password</h1>
      <p>
        The password reset key is either malformed, expired, or already has been
        used.
      </p>
    </FormBox>
  );
}
