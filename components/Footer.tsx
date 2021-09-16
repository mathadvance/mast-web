import { FC } from 'react'
import Link from 'next/link'
function Footer() {
    return (
        <>
            <div className="flex flex-auto flex-row max-width-7xl m-auto text-center text-primary-900 justify-center p-2 space-x-4">
                <div className="font-extralight text-center ">
                    © Copyright 2021
                </div>
                <Link href="/privacy">
                    Privacy Policy
                </Link>
            </div>
        </>
    );
}

export default Footer;