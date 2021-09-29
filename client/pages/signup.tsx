import NextLink from "next/link";
import {
  FormBox,
  FormInput,
  FormSubmit,
  FormError,
} from "@/components/FormComponents";
import { ChangeEvent, useState } from "react";
import { User, UserError } from "@/utils/server/User";

function Signup() {
  const [user, setUserRaw] = useState(new User());
  const setUser = (property: string, value: string) => {};
  const [error, setError] = useState("");
  return (
    <FormBox>
      <h1 className="font-normal">Sign Up</h1>
      <div className="grid grid-cols-2 gap-x-4">
        <FormInput
          placeholder="First Name"
          onChange={(event: ChangeEvent, newValue: string | null) => {
            setUser("first_name", newValue || " ");
          }}
        />
        <FormInput placeholder="Last Name" />
      </div>
      <FormInput placeholder="Email Address" />
      <FormInput placeholder="Username" />
      <FormInput
        placeholder="Graduation Year"
        desc="Enter your high school graduation year."
      />
      <FormInput
        placeholder="Password"
        type="password"
        desc={
          <>
            It is recommended you use a{` `}
            <NextLink href="https://baekdal.com/thoughts/password-security-usability/">
              <a className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 hover:underline">
                string of words
              </a>
            </NextLink>
            .
          </>
        }
      />
      <button
        className="bg-red-500 h-10 w-full"
        onClick={(event) => {
          if (UserError(user)) {
            setError(UserError(user).toString()); // use toString even though by definition UserError has to return a string, because Typescript thinks it can be a boolean
          } else {
            Submit;
          }
        }}
      />
      <FormSubmit
        text="Sign Up"
        onClick={(event) => {
          if (UserError(user)) {
            setError(UserError(user).toString()); // use toString even though by definition UserError has to return a string, because Typescript thinks it can be a boolean
          } else {
            Submit;
          }
        }}
      />
      <div className="h-10">
        {`Have an account already? `}
        <NextLink href="login">
          <a className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 hover:underline">
            Log in.
          </a>
        </NextLink>
        <FormError error={error} />
      </div>
    </FormBox>
  );
}

const Submit = async (user: User) => {
  const res = await fetch("/api/signup", {
    body: JSON.stringify(user),
  });
  return false;
};

export default Signup;
