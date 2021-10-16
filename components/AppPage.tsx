import router, { useRouter } from "next/router";

import TopBar from "@/components/TopBar";
import SideBar from "@/components/SideBar";

import { useAuth } from "@/contexts/AuthProvider";

import Loading from "@/components/Loading";
import { useEffect } from "react";

export default function AppPage({ children }) {
  const { asPath, pathname } = useRouter();

  const paths = asPath.split("/");
  const firstPath = paths[1];
  const lastPath = paths[paths.length - 1];

  const lastPathName = pathname.split("/")[paths.length - 1];

  const protectedPages = ["", "home", "settings"];
  const antiProtectedPages = ["", "login", "signup"];

  const isProtectedPage: boolean = protectedPages.indexOf(lastPath) > -1 || firstPath === "profile";
  const isAntiProtectedPage: boolean =
    antiProtectedPages.indexOf(lastPath) > -1;

  const noStylePages = ["", "login", "signup", "forgot-password", "reset-password"];

  // We choose to make index both protected and anti-protected
  // because we never want it to render.

  // Anti-protected pages also usually deal with auth (except index)
  // so they should not have sidebar, topbar, etc

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user && isProtectedPage) {
      router.push("/about");
    }
    if (!loading && user && isAntiProtectedPage) {
      router.push("/home");
    }
    if (!loading && user && user.power != 2 && lastPath === "app-portal") {
      router.push("/home")
    }
  }, [loading, asPath]);

  if (
    ((loading || !user) && isProtectedPage) ||
    ((loading || user) && isAntiProtectedPage)
  ) {
    return <Loading />;
  }

  // A little hacky, but whatever
  if (lastPath === "signout") {
    return (
      <>
        <Loading />
        {children}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center">
      {noStylePages.indexOf(lastPath) > -1 || noStylePages.indexOf(lastPathName) > -1 ? (
        <>{children}</>
      ) : (
        <div className="px-12 py-6 w-full max-w-screen-lg">
          <TopBar />
          <div className="my-8" />
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-3 md:grid-cols-4 gap-x-10">
            <div className="order-last sm:order-first sm:col-span-2 md:col-span-3">
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg space-y-2">
                {children}
              </div>
            </div>
            <div>
              <SideBar />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
