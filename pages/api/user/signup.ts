import { User, UserError } from "@/utils/server/User";
import client from "@/utils/server/mongodb";
import { ObjectId } from "mongodb";
import argon2 from "argon2";

export default async (req, res) => {
  const user: User = JSON.parse(req.body);
  user.power = 0;

  if (UserError(user)) {
    const error: string = UserError(user).toString(); // will never be false so this is OK
    res.status(400).send(error);
    return;
  } else {
    const matching_emails = await client
      .db(process.env.MONGODB_DB)
      .collection("email_proxy")
      .findOne({
        email: { $eq: user.email },
      });
    const matching_usernames = await client
      .db(process.env.MONGODB_DB)
      .collection("users")
      .findOne({
        username: { $eq: user.username },
      });
    if (!matching_emails && !matching_usernames) {
      // Hash with argon2
      const hashedPassword = await argon2.hash(user.password);

      const _id = new ObjectId();
      // Basically, all we do in the email_proxy collection is add emails
      // so we can check if they are used or not, no more no less.
      // However, it is important that we actually associate emails with users,
      // because we want to remove the TTL index (creationDate) when a user is verified.
      client.db(process.env.MONGODB_DB).collection("email_proxy").insertOne({
        _id: _id,
        creationDate: new Date(),
        // A little counterintuitive, but creationDate is used
        // to delete unverified users, so we actually want to
        // get rid of the creationDate field
        // once a user verifies.
        email: user.email,
      });
      client.db(process.env.MONGODB_DB).collection("users").insertOne({
        _id: _id,
        creationDate: new Date(),
        // A little counterintuitive, but creationDate is used
        // to delete unverified users, so we actually want to
        // get rid of the creationDate field
        // once a user verifies.
        username: user.username,
        hashedPassword,
        email: user.email,
        power: user.power,
        first_name: user.first_name,
        last_name: user.last_name,
        graduation_year: user.graduation_year,
      });
      res.status(200).send("User successfully created.");
      return;
    } else if (matching_emails) {
      res.status(400).send("This email address is already in use.");
      return;
    } else {
      // This means that matching_usernames must be true
      res.status(400).send("This username is already in use.");
      return;
    }
  }
};