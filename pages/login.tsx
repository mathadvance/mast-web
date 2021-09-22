import NextLink from "next/link";
import { FormBox, FormInput } from "@/components/FormComponents";

function Login() {
  return (
    <FormBox>
      <h1 className="font-normal">Log In</h1>
      <FormInput placeholder="Username" />
      <FormInput placeholder="Password" />
      <div>
        {`Don't have an account? `}
        <NextLink href="login">
          <a className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 hover:underline">
            Create one.
          </a>
        </NextLink>
      </div>
    </FormBox>
  );
}

export default Login;
