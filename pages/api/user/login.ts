import client from "@/utils/server/mongodb";
import argon2 from "argon2";
import EmailValidator from "email-validator";
import { setCookie } from "nookies";
import sessionKeygen from "@/utils/server/sessionKeygen";
import redis from "@/utils/server/redis";

export default async (req, res) => {
  const request = JSON.parse(req.body);
  if (EmailValidator.validate(request.username)) {
    const email_proxy = await client
      .db(process.env.MONGODB_DB)
      .collection("email_proxy")
      .findOne({ email: { $eq: request.username } });
    if (email_proxy) {
      request.username = email_proxy.username;
    } else {
      res.status(400).send("There is no user associated with this email.");
    }
  }
  const user = await client
    .db(process.env.MONGODB_DB)
    .collection("users")
    .findOne({
      username: { $eq: request.username },
    });
  if (!user) {
    res.status(400).send("There is no user associated with this username.");
    return;
  }
  if (await argon2.verify(user.hashedPassword, request.password)) {
    let maxAge: number;
    if (request.rememberMe) {
      maxAge = 60 * 60 * 24 * 30;
      // We regenerate tokens if request.rememberMe is true,
      // so if a user doesn't visit the website through the same computer in a month,
      // it's probably not too much of an inconvenience for them to relog.
    } else {
      maxAge = 60 * 60;
    }

    const SSID = sessionKeygen();

    const cookieObject = JSON.stringify({
      SSID,
      regenerate: request.rememberMe,
    });

    const redisValObject = JSON.stringify({
      username: request.username,
      timestamp: new Date(),
    });

    setCookie(null, "session", cookieObject, {
      maxAge,
      path: "/",
      httpOnly: true,
      sameSite: "strict",
    });

    redis.set(SSID, redisValObject, "EX", maxAge);

    res.status(200).send("Login successful.");
    return;
  } else {
    res.status(400).send("Incorrect password.");
    return;
  }
};
