import { createNoReplyMail } from "@/utils/server/email";
import change_email, {
  change_email_notify,
} from "@/utils/email_templates/change_email";
import keygen from "@/utils/server/keygen";
import { redis_changeEmailIDS } from "@/utils/server/redis";
import { mastDB } from "@/utils/server/mongodb";

export default async (req, res) => {
  const reqObject = JSON.parse(req.body);
  if (reqObject.action === "send") {
    const notifyHtml = change_email_notify({
      username: reqObject.username,
      new_email: reqObject.newEmail,
    });

    createNoReplyMail({
      recipient: reqObject.oldEmail,
      subject: "Email change requested for MAST",
      html: notifyHtml,
    });

    const verificationId = keygen();
    const verification_link = `${
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000`
        : process.env.DOMAIN
    }/profile/change-email?key=${verificationId}`;

    const html = change_email({
      username: reqObject.username,
      verification_link,
    });
    reqObject;

    createNoReplyMail({
      recipient: reqObject.newEmail,
      subject: "Confirm your new email for MAST",
      html,
    });

    const timestamp = Date.now();

    redis_changeEmailIDS.set(
      verificationId,
      JSON.stringify({
        username: reqObject.username,
        timestamp,
        email: reqObject.newEmail,
      }),
      "EX",
      60 * 30 // Key expires 30 minutes after setting
    );

    mastDB
      .collection("users")
      .updateOne(
        { username: reqObject.username },
        { $set: { "Timestamps.most_recent_email_change_timestamp": timestamp } }
      );

    res.status(200).send("Email verification sent.");
    return;
  }
  if (reqObject.action === "verify") {
    const redisValString = await redis_changeEmailIDS.get(reqObject.key);
    const redisValObject = JSON.parse(redisValString);
    const user = await mastDB
      .collection("users")
      .findOne({ username: redisValObject.username });
    if (
      redisValObject.timestamp !=
      user.Timestamps.most_recent_email_change_timestamp
    ) {
      res
        .status(400)
        .send("This is not the most recently issued verification key.");
      return;
    }
    mastDB
      .collection("users")
      .updateOne(
        { username: redisValObject.username },
        { $set: { email: redisValObject.email } }
      );
    redis_changeEmailIDS.del(reqObject.key);
    res.status(200).send("Email address successfully updated.");
    return;
  }
  res
    .status(500)
    .send(`The requested action is neither "verify" nor "change".`);
  return;
};
