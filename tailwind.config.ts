import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#162214",
          slate: "#1B2C1B",
          amber: "#D37A31",
          mint: "#C7CFBE",
          fog: "#F2E8DA"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 70px -30px rgba(211, 122, 49, 0.35)",
        glass: "0 20px 40px -25px rgba(0, 0, 0, 0.45)"
      },
      backgroundImage: {
        "hero-overlay":
          "linear-gradient(145deg, rgba(17,35,21,0.85) 5%, rgba(17,35,21,0.5) 45%, rgba(17,35,21,0.88) 100%)",
        grain:
          "radial-gradient(circle at 20% 20%, rgba(211, 122, 49, 0.11) 0px, transparent 40%), radial-gradient(circle at 80% 0%, rgba(88, 117, 76, 0.14) 0px, transparent 35%)"
      }
    }
  },
  plugins: []
};

export default config;
