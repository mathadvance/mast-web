export default function change_email({
  username = "",
  verification_link = "",
}: {
  username: string;
  verification_link: string;
}) {
  return `
    <h1 style="font-weight:bold; color:1d4ed8">
        <img src = "${process.env.DOMAIN}/mast.svg" height="70" alt="MAST"/>
    </h1>
    
    <p>
        Greetings, ${username}. To verify your new email for the MAST website, please click the following link: <a href="${verification_link}">${verification_link}</a>
    </p>

    <p>
        The verification link will expire in 30 minutes. If it does, you may request another at your <a href="${process.env.DOMAIN}/profile">profile page</a> by sending another email change request.
    </p>
    
    <p>
        If you did not issue this request, you may ignore this email.
    </p>
    `;
}

export function change_email_notify({
  username = "",
  new_email = "",
}: {
  username: string;
  new_email: string;
}) {
  // Notify old email of the change email request
  return `
    <h1 style="font-weight:bold; color:1d4ed8">
        <img src = "${process.env.DOMAIN}/mast.svg" height="70" alt="MAST"/>
    </h1>
    
    <p>
        Greetings, ${username}. You have requested to change your email address for your MAST account to ${new_email}.
    </p>

    <p>
        Until you verify the new email address, this email will remain associated with your MAST account.
    </p>

    <p>
        If you did not make this request, then please contact <a href="mailto:dchen@mathadvance.org">dchen@mathadvance.org</a>.
    </p>
    `;
}
