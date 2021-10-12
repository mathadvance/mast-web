import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "mail.mathadvance.org",
    port: 465,
    secure: true,
    auth: {
        user: process.env.NOREPLY_EMAIL,
        pass: process.env.NOREPLY_PASSWD,
    },
});

export function createNoReplyMail({ recipient, subject, html, attachments = [] }: { recipient: string, subject: string, html: string, attachments?: any[] }) {
    return transporter.sendMail({
        from: process.env.NOREPLY_NAME + " <" + process.env.NOREPLY_EMAIL + ">",
        to: recipient,
        subject,
        html,
        attachments
    })
}