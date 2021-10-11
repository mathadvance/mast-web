import NextLink from "next/link";

export default function Error404() {
  return (
    <>
      <h1>404 Error</h1>
      <p>
        {`This URL does not exist. `}
        <NextLink href="/">
          <a className="blue-link">
            Return to the homepage?
          </a>
        </NextLink>
      </p>
    </>
  );
}
