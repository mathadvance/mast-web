import Head from "next/head"
import { useRouter } from "next/router";

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
    <>
      <Head>
        <title>MAST</title>
        <link rel="shortcut icon" type="image/x-icon" href="masticon.svg" />
      </Head>
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="px-12 py-6 w-full max-w-screen-lg">
          {emptyPages.indexOf(lastPath) > -1 ?
            (
              <div className="p-6 bg-white rounded-xl shadow-lg space-y-2">
                <Component {...pageProps} />
              </div>
            ) : (
              <>
                <TopBar />
                <div className="my-8" />
                <div className="flex gap-x-10">
                  <div className="p-6 bg-white rounded-xl shadow-lg space-y-2">
                    <Component {...pageProps} />
                  </div>
                  <div className="w-48 sm:w-96">
                    <SideBar />
                  </div>
                </div>
              </>
            )
          }
        </div>
      </div>
    </>
  );
};

export default MyApp;
