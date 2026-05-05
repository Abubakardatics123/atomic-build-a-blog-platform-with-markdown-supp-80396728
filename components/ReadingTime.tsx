import { Clock } from "lucide-react";

interface ReadingTimeProps {
  minutes: number;
  wordCount?: number;
  className?: string;
}

export default function ReadingTime({ minutes, wordCount, className = "" }: ReadingTimeProps) {
  return (
    <span className={"inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 " + className}>
      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
      <span>{minutes} min read</span>
      {wordCount !== undefined && (
        <span className="text-gray-400 dark:text-gray-500">· {wordCount.toLocaleString()} words</span>
      )}
    </span>
  );
}
