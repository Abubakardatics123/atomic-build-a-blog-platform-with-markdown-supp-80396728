"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, X } from "lucide-react";
import type { PostMeta } from "@/lib/types";
import PostCard from "./PostCard";
import TagBadge from "./TagBadge";
import Pagination from "./Pagination";

const POSTS_PER_PAGE = 6;

interface SearchAndFilterProps {
  posts: PostMeta[];
  allTags: string[];
  initialTag?: string;
}

export default function SearchAndFilter({ posts, allTags, initialTag }: SearchAndFilterProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(initialTag ?? null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = posts;

    if (activeTag) {
      result = result.filter((p) =>
        p.frontmatter.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.frontmatter.title.toLowerCase().includes(q) ||
          p.frontmatter.excerpt.toLowerCase().includes(q) ||
          p.frontmatter.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [posts, activeTag, query]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleTagClick = useCallback(
    (tag: string) => {
      setActiveTag((prev) => (prev === tag ? null : tag));
      setPage(1);
    },
    []
  );

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
    setPage(1);
  }, []);

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-6">
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={handleSearch}
          placeholder="Search posts by title, excerpt, or tag…"
          aria-label="Search posts"
          className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
        />
        {query && (
          <button
            onClick={clearSearch}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by tag">
        <button
          onClick={() => { setActiveTag(null); setPage(1); }}
          className={
            "px-3 py-1 rounded-full text-sm font-medium transition-colors " +
            (activeTag === null
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700")
          }
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            aria-pressed={activeTag === tag}
            className={
              "px-3 py-1 rounded-full text-sm font-medium transition-colors " +
              (activeTag === tag
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700")
            }
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        {filtered.length === posts.length
          ? posts.length + " posts"
          : filtered.length + " of " + posts.length + " posts"}
        {activeTag && <span> tagged <strong className="text-gray-700 dark:text-gray-300">{activeTag}</strong></span>}
        {query && <span> matching <strong className="text-gray-700 dark:text-gray-300">&ldquo;{query}&rdquo;</strong></span>}
      </p>

      {/* Post grid */}
      {paginated.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginated.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No posts found</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Try a different search term or clear the tag filter.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
