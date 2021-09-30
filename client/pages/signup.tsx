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
  const [user, setUser] = useState(new User());
  const [gradYear, setGradYear] = useState("");
  const setUserProperty = (property: string, value: string | number) => {
    const updatedUser: User = user;
    updatedUser[property] = value.toString();
    setUser(updatedUser);
  }
  const [error, setError] = useState("");
  return (
    <FormBox>
      <h1 className="font-normal">Sign Up</h1>
      <div className="grid grid-cols-2 gap-x-4">
        <FormInput
          placeholder="First Name"
          onChange={(event) => {
            setUserProperty("first_name", event.target.value);
          }}
        />
        <FormInput
          placeholder="Last Name"
          onChange={(event) => {
            setUserProperty("last_name", event.target.value);
          }} />
      </div>
      <FormInput
        placeholder="Email Address"
        onChange={(event) => {
          setUserProperty("email", event.target.value);
        }}
      />
      <FormInput
        placeholder="Username"
        value={user.username}
        onChange={(event) => {
          setUserProperty("username", event.target.value);
        }}
      />
      <FormInput
        placeholder="Graduation Year"
        desc="Enter your high school graduation year."
        value={gradYear}
        pattern="\d{0,4}"
        onChange={(event) => {
          setGradYear((gradYear) => (event.target.validity.valid ? event.target.value : gradYear))
        }}
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
        onChange={(event) => {
          setUserProperty("password", event.target.value);
        }}
      />
      <FormSubmit
        text="Sign Up"
        disabled={false}
        onClick={() => {
          setUserProperty("graduation_year", gradYear);
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
