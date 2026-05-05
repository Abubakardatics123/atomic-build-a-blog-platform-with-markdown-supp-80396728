import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, PostMeta, PostFrontmatter } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

function getWordCount(content: string): number {
  return content.trim().split(/\s+/).length;
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, slug + ".md");
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const parsed = matter(fileContents);

  const frontmatter = parsed.data as PostFrontmatter;
  const content = parsed.content;
  const readingTime = calculateReadingTime(content);
  const wordCount = getWordCount(content);

  return {
    slug,
    frontmatter,
    content,
    readingTime,
    wordCount,
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllSlugs();
  const posts: PostMeta[] = [];

  for (const slug of slugs) {
    const post = getPostBySlug(slug);
    if (!post) continue;
    posts.push({
      slug: post.slug,
      frontmatter: post.frontmatter,
      readingTime: post.readingTime,
      wordCount: post.wordCount,
      excerpt: post.frontmatter.excerpt,
    });
  }

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.frontmatter.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.frontmatter.tags.some(
      (t) => t.toLowerCase() === tag.toLowerCase()
    )
  );
}

export function getFeaturedPosts(): PostMeta[] {
  return getAllPosts().filter((post) => post.frontmatter.featured);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
