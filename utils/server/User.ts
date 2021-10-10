import EmailValidator from "email-validator";

// We should use the Mongo DB user interface here.
// The fields `username` and `password`
// should be MongoDB's `username` and `pwd` fields,
// while everything else should go in `customData`.

export class User {
  username: string; // createIndex on this when setting up database
  // https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/#mongodb-method-db.collection.createIndex
  password: string;
  power: number;
  // We use @/utils/server/powerToRole.ts to get role name
  // We will not have the user input this; instead, we will just give new users no roles.

  // Newly created accounts get the UNVERIFIED (0) role,
  // Email-verified accounts get the USER (1) role,
  // staff-verified accounts get the STUDENT (2) role,
  // staff get the ADMIN (3) role
  // current director gets SUPERADMIN (4) role
  // It is expected that roles are cumulative, i.e. you have all the roles below you

  first_name: string;
  last_name: string;
  email: string; // createIndex on this when setting up database/
  graduation_year: number;

  Timestamps: Timestamps; // contains earliest_acceptable_auth_timestamp
  // we don't put creation date here because creation date exists only for us
  // to destroy user objects
  Settings: Settings;
  data: any;

  constructor(userObject = {}) {
    for (const prop in userObject) {
      this[prop] = userObject[prop];
    }
  }
}

export class Timestamps {
  earliest_acceptable_auth_timestamp: Date;
}

export class Settings {
  theme_preference: string;
  sidebar_color: string;
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
  if (!/^[A-Za-z0-9\_\-]+$/.test(user.username)) {
    return "Usernames must be alphanumeric (with hyphens and underscores).";
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
    return "You must input a password.";
  }
  return;
};
