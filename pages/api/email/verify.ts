import { mastDB } from "@/utils/server/mongodb";
import { redis_emailVerificationIDs } from "@/utils/server/redis";

export default async (req, res) => {
  const redisValString = await redis_emailVerificationIDs.get(req.body);
  if (!redisValString) {
    res.status(400).send("The email verification key is invalid.");
    return;
  }

  const redisValObject = JSON.parse(redisValString);

  const user = await mastDB.collection("users").findOne(
    {
      username: { $eq: redisValObject.username },
    },
    {
      projection: { hashedPassword: 0 },
    }
  );

  if (
    redisValObject.timestamp <
    user.Timestamps.most_recent_email_verification_timestamp
  ) {
    res
      .status(400)
      .send("This is not the most recently issued verification key.");
  }

  if (user.power > 0) {
    res.status(400).send("This user is already verified.");
  }

  mastDB
    .collection("users")
    .updateOne(
      { username: { $eq: redisValObject.username } },
      { $set: { power: 1 }, $unset: { destructionDate: "" } }
    );
  redis_emailVerificationIDs.del(req.body);
  res.status(200).send("Successfully verified email.");
  return;
};
