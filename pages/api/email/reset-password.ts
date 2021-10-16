import { mastDB } from "@/utils/server/mongodb";
import { redis_passwordResetIDS } from "@/utils/server/redis";

export default async (req, res) => {
    const reqObject = JSON.parse(req.body);
    if (reqObject.operation != "verify" && reqObject.operation != "change") {
        res.status(500).send(`The request operation is not either "verify" or "change".`)
    }
    const redisValString = await redis_passwordResetIDS.get(reqObject.key);
    if (!redisValString) {
        res.status(400).send("The password reset key is invalid.")
        return;
    }
    const redisValObject = JSON.parse(redisValString);
    const user = await mastDB.collection("users").findOne({ username: redisValObject.username });
    if (redisValObject.timestamp < user.Timestamps.most_recent_password_reset_timestamp) {
        res.status(400).send("This is not the most recently issued password reset key.")
        return;
    }
    if (reqObject.operation === "verify") {
        res.status(200).send("This password reset key is valid.");
        return;
    }
    if (reqObject.operation === "change") {

    }
    return;
}