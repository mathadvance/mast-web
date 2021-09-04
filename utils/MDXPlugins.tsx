import remarkFootnotes from "remark-footnotes";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export const remarkPlugins = [remarkFootnotes, remarkMath];

export const rehypePlugins = [rehypeKatex];
