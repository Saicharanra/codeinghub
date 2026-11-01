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
        background: "#06080e",
        surface: "#0c101c",
        "surface-card": "#101626",
        "surface-card-hover": "#151d33",
        border: "#1c253d",
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        electric: {
          cyan: "#22d3ee",
          sky: "#38bdf8",
          blue: "#3b82f6",
          indigo: "#6366f1",
          violet: "#8b5cf6",
          purple: "#a855f7",
          fuchsia: "#d946ef",
          pink: "#ec4899",
          emerald: "#10b981",
        },
      },
      backgroundImage: {
        "grid-pattern": "radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px)",
        "mesh-glow": "radial-gradient(ellipse 70% 45% at 50% -15%, rgba(139, 92, 246, 0.28), rgba(34, 211, 238, 0.12), transparent)",
        "aurora-gradient": "linear-gradient(135deg, #06080e 0%, #0d1224 40%, #15112e 70%, #06080e 100%)",
        "gradient-cool": "linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)",
        "gradient-electric": "linear-gradient(to right, #06b6d4, #6366f1, #a855f7, #ec4899)",
        "gradient-card": "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      boxShadow: {
        glow: "0 0 35px -5px rgba(99, 102, 241, 0.35)",
        "glow-violet": "0 0 45px -8px rgba(139, 92, 246, 0.4)",
        "glow-cyan": "0 0 45px -8px rgba(34, 211, 238, 0.35)",
        "glow-multi": "0 0 50px -10px rgba(99, 102, 241, 0.3), 0 0 30px -5px rgba(34, 211, 238, 0.2)",
        spotlight: "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
      },
      animation: {
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
