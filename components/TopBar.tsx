import NextLink from "next/link";
import { logoPath } from "@/utils/paths";
import { useAuth } from "@/contexts/AuthProvider";

export default function TopBar() {
  const { user } = useAuth();
  return (
    <div className="w-full mx-auto flex justify-between p-2 border-b border-gray-300 text-lg">
      <NextLink href="/">
        <a>
          <img src={logoPath} className="h-8 text-blue-600" alt="MAST" />
        </a>
      </NextLink>
      <div className="flex items-center gap-x-1.5">
        {!user ? (
          <>
            <div>
              <NextLink href="/signup">
                <a className="blue-link">Sign Up</a>
              </NextLink>
            </div>
            <div className="text-gray-400">|</div>
            <div>
              <NextLink href="/login">
                <a className="blue-link">Log In</a>
              </NextLink>
            </div>
          </>
        ) : (
          <>
            <NextLink href="/profile">
              <a className="blue-link">{user.username}</a>
            </NextLink>
            <div className="text-gray-400">|</div>
            <NextLink href="/signout">
              <a className="blue-link">Sign Out</a>
            </NextLink>
          </>
        )}
      </div>
    </div>
  );
}
