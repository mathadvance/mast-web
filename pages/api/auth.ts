import client from "@/utils/server/mongodb";
import redis from "@/utils/server/redis";
import sessionKeygen from "@/utils/server/sessionKeygen";
import Cookies from "cookies";

const Auth = async (req, res) => {
  const cookies = new Cookies(req, res);
  const session = cookies.get("session");
  if (session) {
    const redisValString = await redis.get(session);
    if (!redisValString) {
      res.status(400).send(null);
      return;
      // It's 400 because you're sending an invalid sessionID
      // which should not happen, so it's an error
    } else {
      const redisValObject = JSON.parse(redisValString);
      const user = await client
        .db(process.env.MONGODB_DB)
        .collection("users")
        .findOne({ username: { $eq: redisValObject.username } }, { projection: { password: 0 } });
      // projection filters out the password
      const redisTimestamp = new Date(redisValObject.timestamp);
      // timestamp checks; regenerate cookies if appropriate
      // also logout (i.e. delete session on client and serverside)
      // if earliestAcceptableAuthTimestamp is greater than
      // timestamp for this current session ID.
      if (redisTimestamp < user.earliestAcceptableAuthTimestamp) {
        fetch("api/logout");
        res.status(200).send(null);
        return;
      } else {
        if (
          new Date(Date.now()) >
          new Date(redisTimestamp.getTime() + 1000 * 60 * 60) &&
          redisValObject.regenerate
        ) {
          // if it's an hour past when we set the token,
          // AND it regenerates (which should always be true??) refresh it
          const session = sessionKeygen();

          const redisValString = JSON.stringify({
            username: user.username,
            timestamp: redisTimestamp,
            regenerate: true,
          });

          const maxAge = 60 * 60 * 24 * 30;

          cookies.set("session", session, {
            maxAge,
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
          });

          redis.set(session, redisValString, "EX", maxAge);
        }
        // otherwise, don't refresh token
        res.status(200).send(JSON.stringify(user));
        return;
      }
    }
  } else {
    res.status(200).send(null);
    return;
  }
};

// Auth.getServerSideProps = ({ req, res }) => {
//   const cookies = new Cookies(req, res)
//   // const status = cookies.get("session");
//   const status = "oops"
//   return status;
// }

export default Auth;