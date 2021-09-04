import Head from "next/head";
import MDXComponents from "@/utils/MDXComponents";
import { FC } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import React from "react";

const PageRender: FC<{ props }> = ({ props }) => {
  const Content = React.useMemo(
    () => getMDXComponent(props.code),
    [props.code]
  );
  return (
    <>
      <Head>
        <title>{props.data.title}</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.13.2/dist/katex.css"
          integrity="sha384-2vkq42dvFAQl88n6UuPWLKSKnFnHyyoSgy788ohlfWZ4xEmF8g0kCMZe1CkaXHDd"
          crossOrigin="anonymous"
        />
        <meta
          name="description"
          content={`${props.data.desc || props.data.title}`}
        />
      </Head>
      <h1>{props.data.title}</h1>
      <Content components={MDXComponents} />
    </>
  );
};

export default PageRender;
