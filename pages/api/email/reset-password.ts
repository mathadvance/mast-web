import { mastDB } from "@/utils/server/mongodb";
import { redis_passwordResetIDS } from "@/utils/server/redis";
import argon2 from "argon2";

export default async (req, res) => {
  const reqObject = JSON.parse(req.body);
  if (reqObject.action != "verify" && reqObject.action != "change") {
    res
      .status(500)
      .send(`The requested action is neither "verify" nor "change".`);
  }
  const redisValString = await redis_passwordResetIDS.get(reqObject.key);
  if (!redisValString) {
    res.status(400).send("The password reset key is invalid.");
    return;
  }
  const redisValObject = JSON.parse(redisValString);
  const user = await mastDB
    .collection("users")
    .findOne({ username: redisValObject.username });
  if (
    redisValObject.timestamp <
    user.Timestamps.most_recent_password_reset_timestamp
  ) {
    res
      .status(400)
      .send("This is not the most recently issued password reset key.");
    return;
  }
  if (reqObject.action === "verify") {
    res.status(200).send("This password reset key is valid.");
    return;
  }
  if (reqObject.action === "change") {
    const hashedPassword = await argon2.hash(reqObject.password);
    redis_passwordResetIDS.del(reqObject.key);
    mastDB
      .collection("users")
      .updateOne(
        { username: redisValObject.username },
        { $set: { hashedPassword: hashedPassword } }
      );
    res.status(200).send("Your password has been reset.");
    return;
  }
};
