import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050608",
        graphite: "#0d1117",
        pearl: "#eef4ff",
        haze: "#9aa8bd",
        cyanite: "#7dd3fc",
        ion: "#9ee7d4",
        ember: "#f6c177"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(125, 211, 252, 0.18)",
        lift: "0 24px 90px rgba(0, 0, 0, 0.38)"
      },
      fontFamily: {
        sans: ["Inter", "Satoshi", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
