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
        bg: "#222222",
        accent: "#666666",
        primary: "#f5f5f5",
        secondary: "#f5f4f4"
      },
    },
  },
  plugins: [],
};
export default config;
