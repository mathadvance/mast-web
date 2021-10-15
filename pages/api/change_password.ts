import { mastDB } from "@/utils/server/mongodb"
import argon2 from "argon2";

export default async (req, res) => {
    const reqObject = JSON.parse(req.body);
    const hashedPassword = await argon2.hash(reqObject.password);
    mastDB.collection("users").updateOne({ username: reqObject.username }, { $set: { hashedPassword: hashedPassword } });
    res.status(200).send("Password changed.");
}