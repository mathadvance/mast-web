import { mastDB } from "@/utils/server/mongodb";
import argon2 from "argon2";
import EmailValidator from "email-validator";
import Cookies from "cookies";
import keygen from "@/utils/server/keygen";
import { redis_sessionIDs } from "@/utils/server/redis";

export default async (req, res) => {
  const request = JSON.parse(req.body);
  if (EmailValidator.validate(request.username)) {
    const email_proxy = await mastDB
      .collection("email_proxy")
      .findOne({ email: { $eq: request.username } });
    if (email_proxy) {
      request.username = email_proxy.username;
    } else {
      res.status(400).send("There is no user associated with this email.");
    }
  }
  const user = await mastDB.collection("users").findOne({
    username: { $eq: request.username },
  });
  if (!user) {
    res.status(400).send("There is no user associated with this username.");
    return;
  }
  if (await argon2.verify(user.hashedPassword, request.password)) {
    if (!req.body.dontCreateSession) {
      let maxAge: number;
      if (request.rememberMe) {
        maxAge = 60 * 60 * 24 * 30;
        // We regenerate tokens if request.rememberMe is true,
        // so if a user doesn't visit the website through the same computer in a month,
        // it's probably not too much of an inconvenience for them to relog.
      } else {
        maxAge = 60 * 60;
      }

      const sessionID = keygen();

      const redisValString = JSON.stringify({
        username: request.username,
        timestamp: Date.now(),
        regenerate: request.rememberMe,
        lastRegenerated: Date.now(),
      });

      const cookies = new Cookies(req, res, { secure: true });

      cookies.set("session", sessionID, {
        maxAge: Date.now() + maxAge,
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });

      redis_sessionIDs.set(sessionID, redisValString, "EX", maxAge);
    }

    res.status(200).send("Login successful.");
    return;
  } else {
    res.status(400).send("Incorrect password.");
    return;
  }
};
