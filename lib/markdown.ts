import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import type { TocItem } from "./types";

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["anchor-link"],
      },
    })
    .use(rehypeHighlight, { detect: true } as any)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return result.toString();
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      const isAlphaNum =
        (code >= 48 && code <= 57) ||
        (code >= 65 && code <= 90) ||
        (code >= 97 && code <= 122);
      if (isAlphaNum) return c;
      if (c === " " || c === "-") return "-";
      return "";
    })
    .join("")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");
}

function stripMarkdownInline(text: string): string {
  const backtick = String.fromCharCode(96);
  const backtickRe = new RegExp(backtick, "g");
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/__/g, "")
    .replace(/_/g, "")
    .replace(backtickRe, "")
    .trim();
}

export function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const toc: TocItem[] = [];

  for (const line of lines) {
    const trimmed = line.trimStart();
    if (!trimmed.startsWith("#")) continue;

    const spaceIdx = trimmed.indexOf(" ");
    if (spaceIdx === -1) continue;

    const hashes = trimmed.slice(0, spaceIdx);
    let allHash = true;
    for (let i = 0; i < hashes.length; i++) {
      if (hashes.charAt(i) !== "#") {
        allHash = false;
        break;
      }
    }
    if (!allHash) continue;

    const level = hashes.length;
    if (level < 1 || level > 6) continue;

    const rawText = trimmed.slice(spaceIdx + 1).trim();
    const text = stripMarkdownInline(rawText);
    const id = slugifyHeading(text);

    const item: TocItem = { id: id, text: text, level: level };
    toc.push(item);
  }

  return toc;
}
