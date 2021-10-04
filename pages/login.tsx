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

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const Submit = async () => {
    const res = await fetch("/api/user/login", {
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
            <a className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 hover:underline">
              Forgot password?
            </a>
          </NextLink>
          <div>
            {`Don't have an account? `}
            <NextLink href="signup">
              <a className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 hover:underline">
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

export default Login;
