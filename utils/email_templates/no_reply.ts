export default function no_reply({ username = "", verification_link = "" }: { username: string, verification_link: string }) {
    return `
    <h1 style="font-weight:bold; color:1d4ed8">
        <img src = "${process.env.DOMAIN}/mast.svg" height="70" alt="MAST"/>
    </h1>
    
    <p>
        Greetings, ${username}. To verify your email for the MAST website, please click the following link: <a href="${verification_link}">${verification_link}</a>
    </p>

    <p>
        The verification link will expire in 30 minutes. If it does, you may request another at your <a href="${process.env.DOMAIN}/home">home page</a>. (You must be signed in to see the home page.)
    </p>
    
    <p>
        If you did not create an account on the MAST website, you may ignore this email.
    </p>
    `;
}