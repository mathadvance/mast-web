import NextLink from "next/link";
import { logoPath } from "@/utils/paths";

function TopBar() {
  return (
    <div className="w-full mx-auto flex justify-between p-2 border-b border-gray-300 text-lg">
      <NextLink href="/">
        <a>
          <img
            src={logoPath}
            className="h-8 text-blue-600"
            alt="MAST"
          />
        </a>
      </NextLink>
      <div className="flex gap-x-1.5">
        <div>
          <NextLink href="signup">
            <a className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 hover:underline">
              Sign Up
            </a>
          </NextLink>
        </div>
        <div className="text-gray-400">|</div>
        <div>
          <NextLink href="login">
            <a className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 hover:underline">
              Log In
            </a>
          </NextLink>
        </div>
      </div>
    </div>
  );
}

export default TopBar;