import EmailValidator from "email-validator";

// We should use the Mongo DB user interface here.
// The fields `username` and `password`
// should be MongoDB's `username` and `pwd` fields,
// while everything else should go in `customData`.

export class User {
  username: string;
  password: string;
  role: string; // Will have to do a little data manipulation before feeding this into MongoDB
  // We will not have the user input this; instead, we will just give new users the UNVERIFIED role.

  first_name: string;
  last_name: string;
  email: string;
  graduation_year: number;
}

export const UserError = (user: User) => {
  if (!user.first_name || user.first_name.length === 0) {
    return "Your first name may not be empty.";
  }
  if (!/^[A-Za-z\-]+$/.test(user.first_name)) {
    return "Your first name must only contain letters and hyphens.";
  }
  if (user.first_name.length > 20) {
    return "Your first name may not be longer than 20 characters.";
  }
  if (!user.last_name || user.last_name.length === 0) {
    return "Your last name may not be empty.";
  }
  if (!/^[A-Za-z\-]+$/.test(user.last_name)) {
    return "Your last name must only contain letters and hyphens.";
  }
  if (user.last_name.length > 20) {
    return "Your last name may not be longer than 20 characters.";
  }
  if (!EmailValidator.validate(user.email)) {
    return "Please enter a valid email address.";
  }
  if (!user.username || user.username === "") {
    return "Your username may not be empty.";
  }
  if (user.username.indexOf(" ") > -1) {
    return "Your username may not contain any spaces.";
  }
  if (user.username.length > 20) {
    return "Your username may not be longer than 20 characters.";
  }
  if (user.graduation_year < 1900 || user.graduation_year > 2100) {
    return "Your graduation year must be between 1900 and 2100.";
  }
  if (!user.password || user.password.length === 0) {
    return "You must input a password."
  }
  return false;
};
