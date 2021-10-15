import { mastDB } from "@/utils/server/mongodb"
import Cookies from "cookies";

export default async (req, res) => {
    const cookies = new Cookies(req, res);
    cookies.set("session");
    mastDB.collection("users").updateOne({ username: req.body }, { $set: { "Timestamps.earliest_acceptable_auth_timestamp": Date.now() } });
    res.status(200).send("Signed out of all devices.");
}