import Head from "next/head";

import ThemeProvider from "@/utils/ThemeProvider";
import AuthProvider from "@/utils/server/AuthProvider";

import "@/styles/global.css";
import AppPage from "@/components/AppPage";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Head>
          <title>MAST</title>
        </Head>
        <AppPage>
          <Component {...pageProps} />
        </AppPage>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
