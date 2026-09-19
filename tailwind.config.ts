import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: {
          dark: "#0B0F17",
          light: "#F8FAFC",
        },
        surface: {
          1: {
            dark: "#131B26",
            light: "#FFFFFF",
          },
          2: {
            dark: "#1C2636",
            light: "#F1F5F9",
          },
        },
        border: {
          dark: "rgba(255, 255, 255, 0.08)",
          light: "#E2E8F0",
        },
        brand: {
          indigo: "#6366F1",
          cyan: "#06B6D4",
        },
      },
      fontSize: {
        "table": ["13px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      height: {
        "row-compact": "32px",
        "dock-mobile": "56px",
      },
      boxShadow: {
        // Zero blur shadow philosophy
        none: "none",
      },
    },
  },
  plugins: [],
};

export default config;
