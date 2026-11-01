import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background, #FAFAF8)",
        foreground: "var(--foreground, #202124)",
        "secondary-text": "var(--secondary-text, #737373)",
        primary: {
          DEFAULT: "var(--primary, #176B50)",
          hover: "#12543E",
          subtle: "#EBF5F1",
          border: "#C8E3D8",
        },
        "card-background": "var(--card-background, #FFFFFF)",
        border: {
          DEFAULT: "var(--border, #E7E7E3)",
          hover: "#D3D3CD",
          dark: "#202124",
        },
        "muted-background": "var(--muted-background, #F3F3F0)",
        muted: {
          DEFAULT: "#737373",
          light: "#A3A3A3",
        },
        accent: {
          DEFAULT: "#176B50",
          hover: "#12543E",
          subtle: "#EBF5F1",
          border: "#C8E3D8",
        },
        card: {
          DEFAULT: "#FFFFFF",
          subtle: "#F5F5F2",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        mono: [
          '"Geist Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)",
        card: "0 1px 3px rgba(0, 0, 0, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.02)",
      },
    },
  },
  plugins: [],
};

export default config;
