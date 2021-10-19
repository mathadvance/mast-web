import { redis_sessionIDs } from "@/utils/server/redis";
import Cookies from "cookies"

export default async (req, res) => {
  const cookies = new Cookies(req, res);
  const session = cookies.get("session");
  if (session) {
    cookies.set("session");
    redis_sessionIDs.del(session);
    res.status(200).send("Signed out.");
  } else {
    res.status(400).send("There is no session to sign out of.");
  }
};
