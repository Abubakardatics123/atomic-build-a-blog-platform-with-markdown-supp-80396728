import Link from "next/link";
import { Github, Twitter, FileText } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 dark:text-gray-100 mb-3">
              <span className="flex items-center justify-center w-7 h-7 bg-blue-600 rounded-md">
                <FileText className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              </span>
              DevLog
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              A developer blog covering modern web development, TypeScript, React, and performance engineering.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wider">
              Navigate
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "All Posts" },
                { href: "/tags", label: "Browse Tags" },
                { href: "/about", label: "About" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wider">
              Topics
            </h3>
            <ul className="space-y-2">
              {["Next.js", "TypeScript", "React", "Performance", "Tailwind CSS"].map((tag) => (
                <li key={tag}>
                  <Link
                    href={"/tags/" + encodeURIComponent(tag.toLowerCase())}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            © {year} DevLog · Built with Next.js &amp; Tailwind CSS
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
