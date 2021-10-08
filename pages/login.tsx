import { useState } from "react";
import NextLink from "next/link";
import router from "next/router";
import {
  FormBox,
  FormInput,
  FormSubmit,
  FormError,
} from "@/components/FormComponents";
import CheckBox from "@/components/CheckBox";
import { useAuth } from "@/contexts/AuthProvider";
import { User } from "@/utils/server/User";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { setUser } = useAuth();

  const Submit = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        rememberMe,
      }),
    });
    if (res.status >= 300) {
      setError(await res.text());
      return;
    } else {
      setError("");
      const userRes = await fetch("/api/auth", {
        method: "POST",
        credentials: "include",
      })
      const userJSON = await userRes.text()
      const user = new User(JSON.parse(userJSON));
      setUser(user);
      router.push("/home");
      return;
    }
  };
  return (
    <FormBox>
      <h1 className="font-normal">Login</h1>
      <FormInput
        placeholder="Username/Email"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <FormInput
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <div className="space-y-3">
        <FormSubmit
          text="Login"
          onClick={() => {
            Submit();
          }}
        />
        <CheckBox
          text="Remember me"
          onClick={() => {
            setRememberMe(!rememberMe);
          }}
        />
      </div>
      <div className="h-10">
        <div className="flex justify-between">
          <NextLink href="forgot-password">
            <a className="blue-link">
              Forgot password?
            </a>
          </NextLink>
          <div>
            {`Don't have an account? `}
            <NextLink href="signup">
              <a className="blue-link">
                Create one.
              </a>
            </NextLink>
          </div>
        </div>
        <FormError error={error} />
      </div>
    </FormBox>
  );
}
