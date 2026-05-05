export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: string;
  authorBio?: string;
  authorAvatar?: string;
  coverImage?: string;
  featured?: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: number;
  wordCount: number;
}

export interface PostMeta {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: number;
  wordCount: number;
  excerpt: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface Author {
  name: string;
  bio: string;
  avatar: string;
  twitter?: string;
  github?: string;
  website?: string;
}
