import { mastDB } from "@/utils/server/mongodb";
import { redis_sessionIDs } from "@/utils/server/redis";
import keygen from "@/utils/server/keygen";
import Cookies from "cookies";

const Auth = async (req, res) => {
  const cookies = new Cookies(req, res);
  const session = cookies.get("session");
  if (session) {
    const redisValString = await redis_sessionIDs.get(session);
    if (!redisValString) {
      res.status(400).send(null);
      return;
      // It's 400 because you're sending an invalid sessionID
      // which should not happen, so it's an error
    } else {
      const redisValObject = JSON.parse(redisValString);
      const user = await mastDB
        .collection("users")
        .findOne(
          { username: { $eq: redisValObject.username } },
          { projection: { hashedPassword: 0 } }
        );
      // projection filters out the hashed password
      const redisTimestamp = new Date(redisValObject.timestamp);
      const redisLastRegenerated = new Date(redisValObject.lastRegenerated);
      // timestamp checks; regenerate cookies if appropriate
      // also logout (i.e. delete session on client and serverside)
      // if earliest_acceptable_auth_timestamp is greater than
      // timestamp for this current session ID.
      if (redisTimestamp < user.Timestamps.earliest_acceptable_auth_timestamp) {
        fetch("api/logout");
        res.status(200).send(null);
        return;
      } else {
        if (
          new Date(Date.now()) >
            new Date(redisLastRegenerated.getTime() + 1000 * 60 * 60) &&
          redisValObject.regenerate
        ) {
          // if it's an hour past when we set the token,
          // AND it regenerates (which should always be true??) refresh it
          const session = keygen();

          const redisValString = JSON.stringify({
            username: user.username,
            timestamp: redisTimestamp,
            regenerate: true,
            lastRegenerated: Date.now(),
          });

          const maxAge = 60 * 60 * 24 * 30;

          cookies.set("session", session, {
            maxAge: Date.now() + maxAge,
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
          });

          redis_sessionIDs.set(session, redisValString, "EX", maxAge);
        }
        // otherwise, don't refresh token
        res.status(200).send(JSON.stringify(user));
        return;
      }
    }
  } else {
    cookies.set("session");
    redis_sessionIDs.del(session);
    res.status(200).send(null);
    return;
  }
};

export default Auth;
