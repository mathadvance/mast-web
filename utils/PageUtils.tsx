import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { Page } from "@/utils/types";

const pagePaths = (dir: string) => {
  const pageDir = path.join(process.cwd(), dir);
  const pagePaths = fs
    .readdirSync(pageDir)
    .filter((path) => /\.mdx$/.test(path));
  return pagePaths;
};

export const getPages = (dir: string) => {
  const pages: Page[] = pagePaths(dir).map((pagePath) => {
    const source = fs.readFileSync(
      path.join(process.cwd(), `${dir}/${pagePath}`)
    );
    const { content, data } = matter(source);
    return {
      slug: pagePath.replace(/\.mdx$/, ""),
      data,
      content,
    };
  });
  return pages;
};

export const getPathsRecurse = (dir: string, arrayOfFiles: string[]) => {
  const files = fs.readdirSync(dir);
  arrayOfFiles = arrayOfFiles || []; // Set to empty array if defined
  files.forEach(function (file) {
    if (fs.statSync(dir + "/" + file).isDirectory()) {
      arrayOfFiles = getPathsRecurse(dir + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dir, "/", file));
    }
  });
  return arrayOfFiles;
};
