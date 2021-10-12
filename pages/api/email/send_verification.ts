import client from "@/utils/server/mongodb"
import { redis_emailVerificationIDs } from "@/utils/server/redis";
import { createNoReplyMail } from "@/utils/server/email";
import keygen from "@/utils/server/keygen";
import no_reply from "@/utils/email_templates/no_reply";

export default async (req, res) => {
    const username: string = req.body;
    const user = await client.db(process.env.MONGODB_DB).collection("users").findOne({ username: { $eq: username } })

    client.db(process.env.MONGODB_DB).collection("users").updateOne({ username: { $eq: username } }, { $set: { "Timestamps.earliest_acceptable_email_verification_timestamp": Date.now() } });

    const emailVerificationID = keygen();

    const redisValObject = JSON.stringify({
        username,
        timestamp: Date.now()
    })

    redis_emailVerificationIDs.set(emailVerificationID, redisValObject, "EX", 60 * 30); // 30 minutes to verify

    const verification_link = `${process.env.NODE_ENV === "development" ? `http://localhost:3000` : process.env.DOMAIN}/profile/verifyEmail?key=${emailVerificationID}` // Change what URL is being sent in dev because test emails come from test domain, not actual production domain, so why link to production domain?

    const html = no_reply({ username, verification_link });

    await createNoReplyMail({
        recipient: user.email, subject: "Verify your email for MAST", html
    });

    res.status(200).send("Successfully sent verification email.")
}