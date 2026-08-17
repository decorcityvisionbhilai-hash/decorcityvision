import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Token NAMES are kept stable on purpose (ink/sand/clay/gold/cream/moss
      // are used across every component) — only the hex values swap below,
      // so reverting the whole site's palette is a one-line comment-swap here
      // rather than touching every component that references these tokens.
      colors: {
        // --- Previous palette (warm terracotta/editorial) — uncomment to revert ---
        // ink: "#0c0b09",   // near-black
        // sand: "#f4ede3",  // warm tan (2nd alternating section bg)
        // clay: "#b8865b",  // terracotta accent (light-bg contexts)
        // gold: "#c9a876",  // gold accent (dark-bg contexts)
        // cream: "#faf6ef", // warm ivory (1st alternating section bg)
        // moss: "#4a5943",  // moss green — Kerala-specific accent, unchanged below

        // --- Current palette (high-end minimal: ivory / charcoal / gold) ---
        ink: "#1F1F1F", // Primary — Charcoal Black
        sand: "#FFFFFF", // 2nd alternating section bg — White
        clay: "#C8A96A", // Accent — Gold (unified with `gold`, see note below)
        gold: "#C8A96A", // Accent — Gold
        cream: "#F8F6F2", // 1st alternating section bg — Soft Ivory
        moss: "#4a5943", // unchanged — not part of the new palette spec
        // Deeper gold for TEXT on light (white/cream) backgrounds — `clay`/`gold`
        // at #C8A96A fail WCAG AA contrast (~2.2:1) for eyebrows/accent text on
        // white or cream; this passes 4.5:1+ while staying in the gold family.
        // Keep using `clay`/`gold` for icons, borders, backgrounds and for text
        // on dark (ink) backgrounds, where the brighter gold already passes.
        clayText: "#856326",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Georgia",
          "Iowan Old Style",
          "Palatino Linotype",
          "URW Palladio L",
          "P052",
          "serif",
        ],
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 45s linear infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
