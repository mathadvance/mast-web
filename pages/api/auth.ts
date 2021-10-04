import client from "@/utils/server/mongodb";
import redis from "@/utils/server/redis";
import sessionKeygen from "@/utils/server/sessionKeygen";
import cookie from "cookie";

export default async (req, res) => {
  const session = req.headers.cookie.session;
  if (session) {
    const sessionObject = JSON.parse(session);
    const redisValString = await redis.get(sessionObject.sessionID);
    if (!redisValString) {
      res.status(400).json(null);
      return;
      // It's 400 because you're sending an invalid sessionID
      // which should not happen, so it's an error
    } else {
      const redisValObject = JSON.parse(redisValString);
      const user = await client
        .db(process.env.MONGODB_URI)
        .collection("users")
        .findOne({ username: { $eq: redisValObject.username } });
      delete user.hashedPassword;
      const redisTimestamp = new Date(redisValObject.timestamp);
      // timestamp checks; regenerate cookies if appropriate
      // also logout (i.e. delete session on client and serverside)
      // if earliestAcceptableAuthTimestamp is greater than
      // timestamp for this current session ID.
      if (redisTimestamp < user.earliestAcceptableAuthTimestamp) {
        fetch("api/logout");
        res.status(200).json(null);
        return;
      } else {
        if (
          new Date(Date.now()) >
            new Date(redisTimestamp.getTime() + 1000 * 60 * 60) &&
          redisValObject.regenerate
        ) {
          if (!sessionObject.regenerate) {
            // Send status 400 because your session object should not
            // be different from your redis value object
            // Because you are tampering with your cookie and it is untrustworthy,
            // logout.
            fetch("api/logout");
            res.status(400).json(null);
            return;
          }
          // if it's an hour past when we set the token,
          // AND it regenerates (which should always be true??) refresh it
          const sessionID = sessionKeygen();

          const cookieString = JSON.stringify({
            sessionID,
            regenerate: true,
          });

          const redisValString = JSON.stringify({
            username: user.username,
            timestamp: redisTimestamp,
            regenerate: true,
          });

          const maxAge = 60 * 60 * 24 * 30;

          res.setHeader(
            "Set-Cookie",
            cookie.serialize("session", cookieString, {
              maxAge,
              path: "/",
              httpOnly: true,
              sameSite: "strict",
              secure: process.env.NODE_ENV !== "development",
            })
          );

          redis.set(sessionID, redisValString, "EX", maxAge);
        }
        // otherwise, don't refresh token
        res.status(200).json(user);
        return;
      }
    }
  } else {
    res.status(200).json(null);
    return;
  }
};
