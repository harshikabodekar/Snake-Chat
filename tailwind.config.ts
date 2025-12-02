import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "venom-green": "#39ff14",
        "venom-dark": "#0a0f0a",
      },
      fontFamily: {
        // We can add a custom spooky font later or use standard ones
      },
    },
  },
  plugins: [],
};
export default config;
