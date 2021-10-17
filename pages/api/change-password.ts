import { mastDB } from "@/utils/server/mongodb";
import argon2 from "argon2";
export default async (req, res) => {
  const reqObject = JSON.parse(req.body);
  const password = await argon2.hash(reqObject.password);
  await mastDB
    .collection("users")
    .updateOne(
      { username: reqObject.username },
      { $set: { hashedPassword: password } }
    )
    .catch((err) => {
      console.log(err);
      res.status(500).send("Could not change password.");
      return;
    });
  res.status(200).send("Password changed.");
  return;
};
