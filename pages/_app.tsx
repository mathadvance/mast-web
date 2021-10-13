import Head from "next/head";

import AuthProvider from "@/contexts/AuthProvider";
import ThemeProvider from "@/contexts/ThemeProvider";

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
