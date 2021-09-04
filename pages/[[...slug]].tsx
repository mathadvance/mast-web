import PageRender from "@/components/PageRender";
import React from "react";
import fs from "fs";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import { getPathsRecurse } from "@/utils/PageUtils";
import { GetStaticProps, GetStaticPaths } from "next";
import { remarkPlugins, rehypePlugins } from "@/utils/MDXPlugins";

export default function PostPage(props) {
  return <PageRender props={props} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  var slug: string[];

  if (typeof params.slug === "string") {
    slug = [params.slug];
  } else {
    slug = params.slug;
  }

  var pagePath;
  if (slug == undefined) {
    pagePath = "pages/index";
  } else {
    pagePath = `pages${slug.map((str) => `/${str}`).join("")}`;
    if (fs.existsSync(pagePath) && fs.statSync(pagePath).isDirectory()) {
      pagePath += "/index";
    }
  }
  pagePath += ".mdx";

  const source = fs.readFileSync(pagePath);
  const { content, data } = matter(source);

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  // Esbuild has to be manually told
  // where to be pointed
  // because Next JS breaks stuff
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }

  const PAGES_PATH = path.join(process.cwd(), "pages");

  const { code } = await bundleMDX(content, {
    cwd: PAGES_PATH,
    // doesn't actually matter,
    // since all of my imports
    // are absolute.
    xdmOptions(options) {
      // https://github.com/kentcdodds/mdx-bundler#options
      // This is why there is the weird syntax at the front.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        ...remarkPlugins,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        ...rehypePlugins,
      ];
      return options;
    },
  });

  return {
    props: {
      code,
      data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allFiles = getPathsRecurse("pages", []).map((file) => {
    const fileAsArray = file.split("/");
    return fileAsArray;
  });

  const paths = allFiles
    .filter((path) => /\.mdx$/.test(path[path.length - 1]))
    .map((path) => {
      path.splice(0, 1);
      path[path.length - 1] = path[path.length - 1].replace(/\.mdx$/, "");
      if (path[path.length - 1] === "index") {
        path.pop();
      }
      return {
        params: {
          slug: path,
        },
      };
    });
  return {
    paths,
    fallback: false,
  };
};
