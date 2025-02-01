import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        colorSwap: {
          "0%, 100%": { color: "black" },
          "50%": { color: "#22c55e" },
        },
      },
      animation: {
        colorChange: "colorSwap 2s infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
