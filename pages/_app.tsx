import "styles/global.css";
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MAST</title>
        <link rel="shortcut icon" type="image/x-icon" href="masticon.svg" />
      </Head>
      <div className="flex justify-center">
        <div className="mx-12 my-12 w-full max-w-screen-lg space-y-2">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
};

export default MyApp;
