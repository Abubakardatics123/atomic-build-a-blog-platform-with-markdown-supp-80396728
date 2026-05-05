import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/types";
import { formatDate } from "@/lib/posts";
import TagBadge from "./TagBadge";
import ReadingTime from "./ReadingTime";

interface PostCardProps {
  post: PostMeta;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const { slug, frontmatter, readingTime } = post;

  if (featured) {
    return (
      <article className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in">
        {frontmatter.coverImage && (
          <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
            <Link href={"/blog/" + slug} className="after:absolute after:inset-0">
              {frontmatter.title}
            </Link>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5 line-clamp-3">
            {frontmatter.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {frontmatter.authorAvatar && (
                <img
                  src={frontmatter.authorAvatar}
                  alt={frontmatter.author}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800"
                />
              )}
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{frontmatter.author}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="w-3 h-3" aria-hidden="true" />
                  <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
                  <span>·</span>
                  <ReadingTime minutes={readingTime} />
                </div>
              </div>
            </div>
            <span className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform duration-200">
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-fade-in">
      <div className="flex flex-wrap gap-1.5 mb-3">
        {frontmatter.tags.slice(0, 2).map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
        <Link href={"/blog/" + slug} className="after:absolute after:inset-0">
          {frontmatter.title}
        </Link>
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
        {frontmatter.excerpt}
      </p>
      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        <Calendar className="w-3 h-3" aria-hidden="true" />
        <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
        <span>·</span>
        <ReadingTime minutes={readingTime} />
      </div>
    </article>
  );
}
