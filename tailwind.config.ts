import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.blue.600"),
              textDecoration: "none",
              fontWeight: "500",
              "&:hover": {
                color: theme("colors.blue.700"),
                textDecoration: "underline",
              },
            },
            "h1, h2, h3, h4": {
              color: theme("colors.gray.900"),
              fontWeight: "700",
              scrollMarginTop: "5rem",
            },
            code: {
              color: theme("colors.blue.600"),
              backgroundColor: theme("colors.blue.50"),
              borderRadius: "0.25rem",
              padding: "0.125rem 0.375rem",
              fontWeight: "400",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            pre: {
              backgroundColor: "#0d1117",
              color: "#e6edf3",
              borderRadius: "0.75rem",
              padding: "1.5rem",
              overflowX: "auto",
            },
            "pre code": {
              backgroundColor: "transparent",
              color: "inherit",
              padding: "0",
              fontWeight: "400",
            },
            blockquote: {
              borderLeftColor: theme("colors.blue.400"),
              color: theme("colors.gray.600"),
              fontStyle: "italic",
            },
            hr: {
              borderColor: theme("colors.gray.200"),
            },
            table: {
              fontSize: "0.875rem",
            },
            "thead th": {
              color: theme("colors.gray.900"),
              fontWeight: "600",
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.blue.400"),
              "&:hover": {
                color: theme("colors.blue.300"),
              },
            },
            "h1, h2, h3, h4": {
              color: theme("colors.gray.100"),
            },
            code: {
              color: theme("colors.blue.300"),
              backgroundColor: "rgba(59, 130, 246, 0.1)",
            },
            blockquote: {
              borderLeftColor: theme("colors.blue.500"),
              color: theme("colors.gray.400"),
            },
            hr: {
              borderColor: theme("colors.gray.700"),
            },
            "thead th": {
              color: theme("colors.gray.100"),
            },
            "tbody tr": {
              borderBottomColor: theme("colors.gray.700"),
            },
          },
        },
      }),
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
