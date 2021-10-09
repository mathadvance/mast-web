import NextLink from "next/link";
import {
  FormBox,
  FormInput,
  FormSubmit,
  FormError,
} from "@/components/FormComponents";
import { useState } from "react";
import { User, UserError } from "@/utils/server/User";
import router from "next/router";

export default function Signup() {
  const [user, setUser] = useState(new User());
  const [gradYear, setGradYear] = useState("");
  const setUserProperty = (property: string, value: string | number) => {
    const updatedUser: User = user;
    updatedUser[property] = value.toString();
    setUser(updatedUser);
  };
  const [error, setError] = useState("");

  const Submit = async () => {
    setUserProperty("graduation_year", gradYear);
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(user),
    });
    if (res.status >= 300) {
      setError(await res.text());
      return;
    } else {
      setError("");
      const loginRes = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          username: user.username,
          password: user.password,
          rememberMe: false,
        }),
      });
      if (loginRes.status < 300) {
        await fetch("/api/auth", {
          method: "POST",
          credentials: "include",
        });
      }
      router.push("/home");
      return;
    }
  };

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
          }}
        />
      </div>
      <FormInput
        placeholder="Email Address"
        onChange={(event) => {
          setUserProperty("email", event.target.value);
        }}
      />
      <FormInput
        placeholder="Username"
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
          setGradYear((gradYear) =>
            event.target.validity.valid ? event.target.value : gradYear
          );
        }}
      />
      <FormInput
        placeholder="Password"
        type="password"
        desc={
          <>
            It is recommended you use a{` `}
            <NextLink href="https://baekdal.com/thoughts/password-security-usability/">
              <a className="blue-link">string of words</a>
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
        onClick={() => {
          if (UserError(user)) {
            setError(UserError(user));
          } else {
            Submit();
          }
        }}
      />
      <div className="h-10">
        {`Have an account already? `}
        <NextLink href="login">
          <a className="blue-link">Log in.</a>
        </NextLink>
        <FormError error={error} />
      </div>
    </FormBox>
  );
}
