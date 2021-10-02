import NextLink from "next/link";

function Error404() {
    return (
        <>
            <h1>
                404 Error
            </h1>
            <p>
                {`This URL does not exist. `}
                <NextLink href="/">
                    <a className="text-blue-600 hover:text-blue-500 hover:underline">Return to the homepage?</a>
                </NextLink>
            </p>
        </>
    )
}

export default Error404;