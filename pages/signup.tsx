import { logoPath } from "@/utils/paths"
import NextLink from "next/link";

function Signup() {
    return (
        <div className="flex w-full min-h-screen justify-center items-center">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-lg">
                <div className="px-7 pt-7 pb-5 border-b border-gray-200">
                    <NextLink href="/">
                        <a>
                            <img src={logoPath} className="h-14" />
                        </a>
                    </NextLink>
                </div>
                <div className="px-7 pt-5 pb-7">
                    <h1 className="font-normal">
                        Sign Up
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Signup;