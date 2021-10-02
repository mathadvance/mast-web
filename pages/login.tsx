import { useState } from "react";
import NextLink from "next/link";
import { FormBox, FormInput, FormSubmit } from "@/components/FormComponents";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormBox>
      <h1 className="font-normal">Login</h1>
      <FormInput placeholder="Username" />
      <FormInput placeholder="Password" type="password" />
      <FormSubmit text="Login" />
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
    </FormBox>
  );
}

export default Login;
