"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
    >
      <Sun
        className="w-4.5 h-4.5 absolute transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0"
        aria-hidden="true"
      />
      <Moon
        className="w-4.5 h-4.5 absolute transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100"
        aria-hidden="true"
      />
    </button>
  );
}
