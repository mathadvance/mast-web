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
import { useAuth } from "@/contexts/AuthProvider";

export default function Signup() {
  const { setUser } = useAuth();

  const [newUser, setNewUser] = useState(new User());
  const [gradYear, setGradYear] = useState("");
  const setUserProperty = (property: string, value: string | number) => {
    newUser[property] = value.toString();
    setNewUser(newUser);
  };
  const [error, setError] = useState("");

  async function Submit() {
    setUserProperty("graduation_year", gradYear);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(newUser),
    });
    if (res.status >= 300) {
      setError(await res.text());
      return;
    } else {
      setError("");
      fetch("/api/email/send-verification", {
        method: "POST",
        body: newUser.username,
      })
      await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: newUser.username,
          password: newUser.password,
          rememberMe: false,
        }),
      });
      const userRes = await fetch("/api/auth", {
        method: "POST",
        credentials: "include",
      });
      const userJSON = await userRes.text();
      const user = new User(JSON.parse(userJSON));
      setUser(user);
      router.push("/home");
      return;
    }
  }

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
          if (UserError(newUser)) {
            setError(UserError(newUser));
          } else {
            Submit();
          }
        }}
      />
      <div>
        {`Have an account already? `}
        <NextLink href="login">
          <a className="blue-link">Log in.</a>
        </NextLink>
        <FormError error={error} />
      </div>
    </FormBox>
  );
}
