import { mastDB } from "@/utils/server/mongodb"
import { redis_emailVerificationIDs } from "@/utils/server/redis";

export default async (req, res) => {

    const body = JSON.parse(req.body)

    const user = await mastDB.collection("users").findOne(
        {
            username:
                { $eq: body.username }
        },
        {
            projection: { hashedPassword: 0 }
        }
    );

    mastDB.collection("users").updateOne({ username: { $eq: body.username } }, { $set: { power: body.power }, $unset: { destructionDate: "" } })
    res.status(200).send("Successfully changed power.")
    return;
}