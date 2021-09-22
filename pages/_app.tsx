import Head from "next/head";
import { useRouter } from "next/router";

import ThemeProvider from "@/utils/ThemeProvider";

import "@/styles/global.css";
import TopBar from "@/components/TopBar";
import SideBar from "@/components/SideBar";

const emptyPages = ["login", "signup"];
// pages where components
// like NavBar and SideBar

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  const paths = asPath.split("/");
  const lastPath = paths[paths.length - 1];

  return (
    <ThemeProvider>
      <html>
        <Head>
          <title>MAST</title>
          <link rel="shortcut icon" type="image/x-icon" href="sail.svg" />
        </Head>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center">
          {emptyPages.indexOf(lastPath) > -1 ? (
            <Component {...pageProps} />
          ) : (
            <div className="px-12 py-6 w-full max-w-screen-lg">
              <TopBar />
              <div className="my-8" />
              <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-3 md:grid-cols-4 gap-x-10">
                <div className="order-last sm:order-first sm:col-span-2 md:col-span-3">
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg space-y-2">
                    <Component {...pageProps} />
                  </div>
                </div>
                <div>
                  <SideBar />
                </div>
              </div>
            </div>
          )}
        </div>
      </html>
    </ThemeProvider>
  );
}

export default MyApp;
