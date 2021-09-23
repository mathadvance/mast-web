import NextLink from "next/link";
import { FormBox, FormInput, FormSubmit } from "@/components/FormComponents";

function Signup() {
  return (
    <FormBox>
      <h1 className="font-normal">Sign Up</h1>
      <div className="grid grid-cols-2 gap-x-4">
        <FormInput placeholder="First Name" />
        <FormInput placeholder="Last Name" />
      </div>
      <FormInput placeholder="Email Address" />
      <FormInput placeholder="Username" />
      <FormInput placeholder="Graduation Year" desc="Enter your high school graduation year." />
      <FormInput placeholder="Password" type="password" desc={
        <>
          It is recommended you use a{` `}
          <NextLink href="https://baekdal.com/thoughts/password-security-usability/">
            <a className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 hover:underline">string of words</a>
          </NextLink>.
        </>
      } />
      <FormSubmit text="Sign Up" />
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
