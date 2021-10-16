import { mastDB } from "@/utils/server/mongodb";
import EmailValidator from "email-validator";
import keygen from "@/utils/server/keygen";
import password_reset from "@/utils/email_templates/password_reset";
import { createNoReplyMail } from "@/utils/server/email";
import { redis_passwordResetIDS } from "@/utils/server/redis";

export default async (req, res) => {
    let username = req.body;
    if (EmailValidator.validate(username)) {
        const email_proxy = await mastDB.collection("email_proxy").findOne({
            email: username
        })
        if (email_proxy) {
            username = email_proxy.username;
        } else {
            res.status(400).send("There is no user associated with this email.");
            return;
        }
    }
    const user = await mastDB.collection("users").findOne({
        username: username
    });
    if (!user) {
        res.status(400).send("There is no user associated with this username.");
        return;
    }
    const resetPasswordID = keygen(); // TO-DO redis stuff here
    const timestamp = Date.now();

    const redisValString = JSON.stringify({
        username,
        timestamp
    })

    redis_passwordResetIDS.set(resetPasswordID, redisValString, "EX", 60 * 30) // 30 minutes to verify

    mastDB.collection("users").updateOne({ username: username }, { $set: { "Timestamps.most_recent_password_reset_timestamp": timestamp } });

    const reset_link = `${process.env.NODE_ENV === "development" ? `http://localhost:3000` : process.env.DOMAIN}/reset-password?key=${resetPasswordID}`
    const html = password_reset({ username, reset_link });

    createNoReplyMail({
        recipient: user.email,
        subject: "Reset your password for MAST",
        html
    })

    res.status(200).send("Password reset email sent.");
    return;
}