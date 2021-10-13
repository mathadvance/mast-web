import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function verify_email() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [verificationSucceeded, setVerificationSucceded] = useState(false)
    let key;

    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        key = router.query.key || {};
        (async () => {
            if (key) {
                const res = await fetch("/api/email/verify", {
                    method: "POST",
                    body: key
                })
                const status = await res.status;
                if (status < 300) {
                    setVerificationSucceded(true);
                }
            }
            setLoading(false);
        })();
    }, [router.isReady]);

    if (loading) {
        return null;
    }

    if (verificationSucceeded) {
        return (
            <>
                <h1>
                    Email Verified
                </h1>
                <p>
                    Head over to <a href="/home">your homepage</a>.
                </p>
            </>
        )
    }

    return (
        <>
            <h1>Email Validation Error</h1>
            <p>The verification key is either malformed, expired, or already has been used.</p>
        </>
    );
}