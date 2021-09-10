import NextLink from "next/link";

function TopBar() {
    return (
        <div className="w-full max-w-screen-lg mx-auto flex justify-between p-2 border-b-2 border-gray-300 text-lg">
            <div>
                MAST
            </div>
            <div className="flex gap-x-1.5">
                <div>
                    <NextLink href="signup">
                        <a className="text-blue-600 hover:text-blue-500 hover:underline">
                            Sign Up
                        </a>
                    </NextLink>
                </div>
                <div>|</div>
                <div>
                    <NextLink href="login">
                        <a className="text-blue-600 hover:text-blue-500 hover:underline">
                            Log In
                        </a>
                    </NextLink>
                </div>
            </div>
        </div>
    );
};

export default TopBar;