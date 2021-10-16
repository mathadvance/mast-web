export default function password_reset({ username = "", reset_link = "", }: { username?: string, reset_link?: string }) {
    return `
    <h1 style="font-weight:bold; color:1d4ed8">
        <img src = "${process.env.DOMAIN}/mast.svg" height="70" alt="MAST"/>
    </h1>

    <p>
        The username of your MAST account is ${username}.
    </p>

    <p>
        To reset your password, click the following link: <a href="${reset_link}">${reset_link}</a>
    </p>

    `;
}