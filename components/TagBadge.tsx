import Link from "next/link";

interface TagBadgeProps {
  tag: string;
  clickable?: boolean;
  size?: "sm" | "md";
}

const COLORS: Record<string, string> = {
  "Next.js": "bg-black/10 text-gray-800 dark:bg-white/10 dark:text-gray-200 hover:bg-black/20 dark:hover:bg-white/20",
  React: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/50",
  TypeScript: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50",
  JavaScript: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/50",
  "Tailwind CSS": "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/50",
  CSS: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50",
  Performance: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50",
  Optimization: "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/50",
  Hooks: "bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-900/50",
  Programming: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50",
  Design: "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50",
  "Web Development": "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/50",
};

const DEFAULT_COLOR =
  "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";

export default function TagBadge({ tag, clickable = true, size = "sm" }: TagBadgeProps) {
  const colorClass = COLORS[tag] ?? DEFAULT_COLOR;
  const sizeClass = size === "md" ? "px-3 py-1 text-sm" : "px-2.5 py-0.5 text-xs";
  const cls = ["inline-flex items-center rounded-full font-medium transition-colors", sizeClass, colorClass].join(" ");

  if (clickable) {
    return (
      <Link href={"/tags/" + encodeURIComponent(tag.toLowerCase())} className={cls}>
        {tag}
      </Link>
    );
  }

  return <span className={cls}>{tag}</span>;
}
