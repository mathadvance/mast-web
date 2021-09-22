import NextLink from "next/link";
import { FormBox, FormInput } from "@/components/FormComponents";

function Signup() {
  return (
    <FormBox>
      <h1 className="font-normal">Sign Up</h1>
      <FormInput placeholder="Email Address" />
      <FormInput placeholder="Name" />
      <FormInput placeholder="Username" />
      <FormInput placeholder="Graduation Year" />
      <FormInput placeholder="Password" />
      <FormInput placeholder="Confirm Password" />
      <div>
        {`Have an account already? `}
        <NextLink href="login">
          <a className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 hover:underline">
            Log in.
          </a>
        </NextLink>
      </div>
    </FormBox>
  );
}

export default Signup;
