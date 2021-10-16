import { FormBox, FormInput, FormSubmit, FormError } from "@/components/FormComponents";
import { useState } from "react";

export default function forgot_password() {
    const [resetted, setResetted] = useState(false);
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    async function send_reset_link() {
        const res = await fetch("/api/email/forgot-password", {
            method: "POST",
            body: input,
        });
        if (res.status < 300) {
            setError("");
            setResetted(true);
        } else {
            setError(await res.text());
        }
        return;
    }
    return <FormBox>
        <h1 className="font-normal">Forgot Password</h1>
        {!resetted ?
            <>
                <FormInput
                    placeholder="Email/Username"
                    desc="If you forgot your username, it will be emailed to you along with the password reset link."
                    onChange={(event) => {
                        setInput(event.target.value);
                    }} />
                <FormSubmit text="Submit" onClick={() => { send_reset_link() }} />
                <FormError error={error} />
            </> : <p>The password reset email has been sent.</p>}
    </FormBox>
}