import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        electric: "#00D4FF",
        ultraviolet: "#7B2FFF",
        coral: "#FF5757",
        lime: "#BFFF00",
        midnight: "#060B18",
        deepspace: "#0D1426",
        panel: "#111827",
        muted: "#6B7280",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #7B2FFF 0%, #00D4FF 100%)",
        "card-gradient": "linear-gradient(145deg, #111827 0%, #1a2235 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
